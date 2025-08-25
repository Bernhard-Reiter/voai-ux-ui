import PgBoss from 'pg-boss'
import { Logger } from 'pino'
import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai'
import { SchedulingService } from '../../packages/wf-core/src/services/scheduling.service'
import { VoiceService } from '../../packages/wf-core/src/services/voice.service'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

interface AnalysisJobData {
  jobId: string
  tenantId: string
  userId: string
}

export async function registerAnalysisWorker(boss: PgBoss, logger: Logger) {
  const schedulingService = new SchedulingService(supabase)
  const voiceService = new VoiceService(logger)

  await boss.work<AnalysisJobData>(
    'analysis',
    {
      teamSize: 3,
      teamConcurrency: 1,
      retryLimit: 5,
      retryBackoff: true
    },
    async (job) => {
      const { jobId, tenantId, userId } = job.data
      const log = logger.child({ jobId, tenantId, userId, worker: 'analysis' })

      try {
        log.info('Starting analysis job')
        await updateJobStatus(jobId, 'analysis_running', 'Starting negotiation analysis', 0)

        // Get job details
        const { data: jobData, error: jobError } = await supabase
          .from('workflow_jobs')
          .select('*, merchants(*), customers(*)')
          .eq('id', jobId)
          .single()

        if (jobError || !jobData) {
          throw new Error(`Job not found: ${jobId}`)
        }

        // Build query from job metadata
        const query = buildAnalysisQuery(jobData)
        log.info({ query }, 'Built analysis query')

        await updateJobStatus(jobId, 'analysis_running', 'Searching relevant information', 20)

        // Get embeddings for query
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: query
        })

        const queryEmbedding = embeddingResponse.data[0].embedding

        // Search similar chunks
        const { data: matches, error: matchError } = await supabase.rpc('match_vectors', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: 8,
          filter_tenant_id: tenantId,
          filter_job_id: jobId
        })

        if (matchError) {
          throw new Error(`Vector search failed: ${matchError.message}`)
        }

        log.info({ matchCount: matches?.length || 0 }, 'Found matching chunks')
        await updateJobStatus(jobId, 'analysis_running', 'Analyzing negotiation opportunities', 50)

        // Prepare context for LLM
        const context = matches?.map(m => m.content).join('\n\n') || ''

        // Analyze with LLM
        const analysisPrompt = `
Du bist ein Verhandlungsexperte. Analysiere das folgende Angebot und identifiziere Einsparpotenziale.

WICHTIG: Antworte NUR auf Basis der bereitgestellten Informationen. Wenn keine konkreten Belege vorhanden sind, sage "Keine Aussage möglich".

Kontext:
${context}

Anfrage: ${query}

Gib eine strukturierte Antwort im JSON-Format:
{
  "summary": "Kurze Zusammenfassung des Angebots",
  "savingsCents": Geschätzte Einsparung in Cent (oder 0 wenn unsicher),
  "confidence": Konfidenz von 0-1,
  "recommendedActions": ["Aktion 1", "Aktion 2"],
  "keyPoints": ["Wichtiger Punkt 1", "Wichtiger Punkt 2"],
  "negotiationStrategy": "Empfohlene Verhandlungsstrategie"
}`

        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo-preview',
          messages: [
            { role: 'system', content: 'Du bist ein Verhandlungsexperte. Antworte nur auf Basis des Kontexts.' },
            { role: 'user', content: analysisPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
          max_tokens: 1000
        })

        const result = JSON.parse(completion.choices[0].message.content || '{}')
        log.info({ result }, 'Analysis completed')

        await updateJobStatus(jobId, 'analysis_running', 'Finalizing analysis results', 80)

        // Store analysis result
        const { error: updateError } = await supabase
          .from('workflow_jobs')
          .update({
            status: 'analysis_completed',
            result: result,
            metadata: {
              ...jobData.metadata,
              analysis_completed: true,
              llm_model: 'gpt-4-turbo-preview',
              confidence: result.confidence
            }
          })
          .eq('id', jobId)

        if (updateError) {
          throw new Error(`Failed to update job: ${updateError.message}`)
        }

        // Create negotiation event
        await supabase.from('negotiation_events').insert({
          job_id: jobId,
          type: 'negotiation_completed',
          data: {
            savingsCents: result.savingsCents,
            confidence: result.confidence
          }
        })

        await updateJobStatus(jobId, 'analysis_completed', 'Analysis completed successfully', 100)

        // Decision: Call now or schedule
        log.info('Checking if should call now')
        const shouldCall = await schedulingService.shouldCallNow(jobId)

        if (shouldCall) {
          log.info('Starting immediate voice call')
          await updateJobStatus(jobId, 'calling', 'Initiating negotiation call', 100)
          
          await voiceService.startCall(jobId, {
            analysisResult: result,
            merchant: jobData.merchants,
            customer: jobData.customers
          })
        } else {
          log.info('Scheduling appointment')
          const slot = await schedulingService.nextSlot(jobId)
          
          const { data: appointment } = await supabase
            .from('negotiation_appointments')
            .insert({
              job_id: jobId,
              merchant_id: jobData.merchants?.id,
              customer_id: jobData.customers?.id,
              starts_at: slot.starts_at,
              ends_at: slot.ends_at,
              timezone: slot.tz,
              status: 'scheduled'
            })
            .select()
            .single()

          if (appointment) {
            // Schedule call and reminder
            await boss.publishAt('call.schedule', new Date(slot.starts_at), {
              appointmentId: appointment.id,
              jobId
            })

            const reminderTime = new Date(slot.starts_at)
            reminderTime.setMinutes(reminderTime.getMinutes() - 15)
            
            await boss.publishAt('call.reminder', reminderTime, {
              appointmentId: appointment.id,
              jobId
            })

            await updateJobStatus(jobId, 'scheduled', `Appointment scheduled for ${slot.starts_at}`, 100)
          }
        }

        log.info('Analysis job completed')

      } catch (error) {
        log.error({ error }, 'Analysis job failed')
        
        await updateJobStatus(jobId, 'failed', `Analysis failed: ${error.message}`, 0)
        
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

        throw error
      }
    }
  )
}

function buildAnalysisQuery(jobData: any): string {
  const metadata = jobData.metadata || {}
  
  // Build query based on job type and metadata
  const parts = []
  
  if (metadata.service_type) {
    parts.push(`Dienstleistung: ${metadata.service_type}`)
  }
  
  if (metadata.current_price) {
    parts.push(`Aktueller Preis: ${metadata.current_price}€`)
  }
  
  if (metadata.contract_duration) {
    parts.push(`Vertragslaufzeit: ${metadata.contract_duration}`)
  }
  
  // Default query if no specific metadata
  if (parts.length === 0) {
    parts.push('Analysiere das Angebot und finde Einsparpotenziale')
  }
  
  return parts.join('. ')
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