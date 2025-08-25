import PgBoss from 'pg-boss'
import { Logger } from 'pino'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function registerRetentionWorker(boss: PgBoss, logger: Logger) {
  // Schedule daily retention job
  await boss.schedule('retention-cleanup', '0 2 * * *', {}, { tz: 'Europe/Berlin' })

  await boss.work('retention-cleanup', async () => {
    const log = logger.child({ worker: 'retention-cleanup' })
    
    try {
      log.info('Starting retention cleanup')

      const retentionDays = 180
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays)

      // Get old jobs
      const { data: oldJobs } = await supabase
        .from('workflow_jobs')
        .select('id, file_url, tenant_id')
        .lt('created_at', cutoffDate.toISOString())

      if (!oldJobs || oldJobs.length === 0) {
        log.info('No old jobs to clean up')
        return
      }

      log.info({ jobCount: oldJobs.length }, 'Found old jobs to clean up')

      // Delete files from storage
      for (const job of oldJobs) {
        if (job.file_url) {
          try {
            const path = job.file_url.replace(/^offers\//, '')
            await supabase.storage.from('offers').remove([path])
            log.info({ jobId: job.id, path }, 'Deleted file from storage')
          } catch (error) {
            log.error({ error, jobId: job.id }, 'Failed to delete file')
          }
        }
      }

      // Delete embeddings
      const { data: embeddingStats } = await supabase.rpc('cleanup_old_embeddings', {
        days_old: retentionDays
      })

      log.info({ deletedEmbeddings: embeddingStats }, 'Cleaned up embeddings')

      // Delete old events
      const { error: eventError } = await supabase
        .from('negotiation_events')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (eventError) {
        log.error({ error: eventError }, 'Failed to delete old events')
      }

      // Delete old status records
      const { error: statusError } = await supabase
        .from('workflow_status')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (statusError) {
        log.error({ error: statusError }, 'Failed to delete old status records')
      }

      // Delete old voice calls
      const { error: voiceError } = await supabase
        .from('voice_calls')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (voiceError) {
        log.error({ error: voiceError }, 'Failed to delete old voice calls')
      }

      // Delete old appointments
      const { error: appointmentError } = await supabase
        .from('negotiation_appointments')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (appointmentError) {
        log.error({ error: appointmentError }, 'Failed to delete old appointments')
      }

      // Finally, delete old jobs
      const { error: jobError, count } = await supabase
        .from('workflow_jobs')
        .delete()
        .lt('created_at', cutoffDate.toISOString())

      if (jobError) {
        log.error({ error: jobError }, 'Failed to delete old jobs')
      } else {
        log.info({ deletedJobs: count }, 'Retention cleanup completed')
      }

      // Log retention stats
      const stats = {
        cutoffDate: cutoffDate.toISOString(),
        deletedJobs: count,
        deletedFiles: oldJobs.filter(j => j.file_url).length,
        retentionDays
      }

      await supabase.from('negotiation_events').insert({
        job_id: null,
        type: 'retention_cleanup',
        data: stats
      })

    } catch (error) {
      log.error({ error }, 'Retention cleanup failed')
      throw error
    }
  })
}