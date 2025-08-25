import PgBoss from 'pg-boss'
import { Logger } from 'pino'
import { createClient } from '@supabase/supabase-js'
import { ImageAnnotatorClient } from '@google-cloud/vision'
import { OpenAI } from 'openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { 
  recordJobProcessing, 
  ocrProcessingDuration, 
  embeddingProcessingDuration,
  activeJobsGauge 
} from '../../packages/wf-core/src/utils/monitoring'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const vision = new ImageAnnotatorClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

interface IngestJobData {
  jobId: string
  tenantId: string
  userId: string
}

export async function registerIngestWorker(boss: PgBoss, logger: Logger) {
  await boss.work<IngestJobData>(
    'ingest',
    {
      teamSize: 5,
      teamConcurrency: 1,
      retryLimit: 5,
      retryDelay: 60000,
      retryBackoff: true
    },
    async (job) => {
      const { jobId, tenantId, userId } = job.data
      const log = logger.child({ jobId, tenantId, userId, worker: 'ingest' })

      const startTime = Date.now()
      activeJobsGauge.inc({ type: 'ingest' })
      
      try {
        log.info('Starting ingest job')

        // Update status
        await updateJobStatus(jobId, 'ingest_running', 'Starting document processing', 0)

        // Get job details
        const { data: jobData, error: jobError } = await supabase
          .from('workflow_jobs')
          .select('*')
          .eq('id', jobId)
          .single()

        if (jobError || !jobData) {
          throw new Error(`Job not found: ${jobId}`)
        }

        // Generate signed URL
        const { data: signedUrlData, error: urlError } = await supabase
          .storage
          .from('offers')
          .createSignedUrl(jobData.file_url, 3600)

        if (urlError || !signedUrlData) {
          throw new Error('Failed to generate signed URL')
        }

        log.info('Performing OCR')
        await updateJobStatus(jobId, 'ingest_running', 'Extracting text from document', 20)

        // OCR with Google Vision
        const ocrStart = Date.now()
        const [result] = await vision.documentTextDetection(signedUrlData.signedUrl)
        const fullText = result.fullTextAnnotation?.text || ''
        ocrProcessingDuration.observe((Date.now() - ocrStart) / 1000)

        if (!fullText) {
          throw new Error('No text extracted from document')
        }

        log.info({ textLength: fullText.length }, 'OCR completed')
        await updateJobStatus(jobId, 'ingest_running', 'Splitting document into chunks', 40)

        // Split text into chunks
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1200,
          chunkOverlap: 150,
          separators: ['\n\n', '\n', '.', '!', '?', ';', ':', ' ', '']
        })

        const chunks = await splitter.splitText(fullText)
        log.info({ chunkCount: chunks.length }, 'Text split into chunks')

        await updateJobStatus(jobId, 'ingest_running', 'Generating embeddings', 60)

        // Generate embeddings in batches
        const batchSize = 20
        const embeddings = []
        const embeddingStart = Date.now()

        for (let i = 0; i < chunks.length; i += batchSize) {
          const batch = chunks.slice(i, i + batchSize)
          const response = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: batch
          })

          embeddings.push(...response.data)
          
          const progress = 60 + Math.floor((i / chunks.length) * 30)
          await updateJobStatus(
            jobId,
            'ingest_running',
            `Processing embeddings: ${i + batch.length}/${chunks.length}`,
            progress
          )
        }
        
        embeddingProcessingDuration.observe((Date.now() - embeddingStart) / 1000)

        log.info('Storing embeddings')
        await updateJobStatus(jobId, 'ingest_running', 'Storing embeddings in database', 90)

        // Prepare items for vector_upsert
        const items = chunks.map((chunk, index) => ({
          job_id: jobId,
          tenant_id: tenantId,
          chunk_index: index,
          content: chunk,
          embedding: embeddings[index].embedding,
          metadata: {
            file_name: jobData.file_name,
            chunk_position: index,
            total_chunks: chunks.length
          }
        }))

        // Store embeddings using vector_upsert RPC
        const { error: upsertError } = await supabase.rpc('vector_upsert', {
          items: items
        })

        if (upsertError) {
          throw new Error(`Failed to store embeddings: ${upsertError.message}`)
        }

        // Update job status
        await updateJobStatus(jobId, 'ingest_completed', 'Document processing completed', 100)
        
        // Update job record
        const { error: updateError } = await supabase
          .from('workflow_jobs')
          .update({
            status: 'ingest_completed',
            metadata: {
              ...jobData.metadata,
              ocr_completed: true,
              text_length: fullText.length,
              chunk_count: chunks.length,
              embedding_model: 'text-embedding-3-small'
            }
          })
          .eq('id', jobId)

        if (updateError) {
          log.error({ error: updateError }, 'Failed to update job record')
        }

        // Queue analysis job
        await boss.publish('analysis', { jobId, tenantId, userId })
        log.info('Ingest completed, analysis job queued')
        
        recordJobProcessing('ingest', 'success', Date.now() - startTime)
        activeJobsGauge.dec({ type: 'ingest' })

      } catch (error) {
        log.error({ error }, 'Ingest job failed')
        
        await updateJobStatus(jobId, 'failed', `Ingest failed: ${error.message}`, 0)
        
        await supabase
          .from('workflow_jobs')
          .update({
            status: 'failed',
            metadata: {
              error: error.message,
              failed_at: new Date().toISOString()
            }
          })
          .eq('id', jobId)

        recordJobProcessing('ingest', 'failed', Date.now() - startTime)
        activeJobsGauge.dec({ type: 'ingest' })
        
        throw error
      }
    }
  )
}

async function updateJobStatus(
  jobId: string,
  status: string,
  message: string,
  progress: number
) {
  await supabase.from('workflow_status').insert({
    job_id: jobId,
    status,
    message,
    progress,
    metadata: {
      timestamp: new Date().toISOString()
    }
  })
}