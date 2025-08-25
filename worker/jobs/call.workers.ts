import PgBoss from 'pg-boss'
import { Logger } from 'pino'
import { createClient } from '@supabase/supabase-js'
import { VoiceService } from '../../packages/wf-core/src/services/voice.service'
import { SchedulingService } from '../../packages/wf-core/src/services/scheduling.service'
import { CalendarService } from '../../packages/wf-core/src/services/calendar.service'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function registerCallWorkers(boss: PgBoss, logger: Logger) {
  const voiceService = new VoiceService(logger)
  const schedulingService = new SchedulingService(supabase)
  const calendarService = new CalendarService(supabase)

  // Call scheduler worker
  await boss.work('call.schedule', async (job) => {
    const { appointmentId, jobId } = job.data
    const log = logger.child({ appointmentId, jobId, worker: 'call.schedule' })

    try {
      log.info('Processing scheduled call')

      const { data: appointment } = await supabase
        .from('negotiation_appointments')
        .select('*, workflow_jobs(*)')
        .eq('id', appointmentId)
        .single()

      if (!appointment) {
        throw new Error('Appointment not found')
      }

      // Check if still in valid time window
      const now = new Date()
      const startsAt = new Date(appointment.starts_at)
      const endsAt = new Date(appointment.ends_at)

      if (now < startsAt || now > endsAt) {
        log.warn('Outside appointment window, rescheduling')
        await boss.publish('call.followup', { jobId, reason: 'missed_window' })
        return
      }

      // Update appointment status
      await supabase
        .from('negotiation_appointments')
        .update({ status: 'started' })
        .eq('id', appointmentId)

      // Start the call
      await voiceService.startCallForAppointment(appointmentId)

    } catch (error) {
      log.error({ error }, 'Failed to process scheduled call')
      throw error
    }
  })

  // Call reminder worker
  await boss.work('call.reminder', async (job) => {
    const { appointmentId, jobId } = job.data
    const log = logger.child({ appointmentId, jobId, worker: 'call.reminder' })

    try {
      log.info('Sending appointment reminder')

      const { data: appointment } = await supabase
        .from('negotiation_appointments')
        .select('*, customers(*), merchants(*)')
        .eq('id', appointmentId)
        .single()

      if (!appointment || appointment.reminder_sent) {
        log.info('Appointment not found or reminder already sent')
        return
      }

      // Send reminder email/SMS
      await calendarService.sendReminder(appointment)

      // Update reminder status
      await supabase
        .from('negotiation_appointments')
        .update({ 
          reminder_sent: true,
          status: 'reminded' 
        })
        .eq('id', appointmentId)

      // Create event
      await supabase.from('negotiation_events').insert({
        job_id: jobId,
        appointment_id: appointmentId,
        type: 'reminder_sent',
        data: {
          sent_at: new Date().toISOString()
        }
      })

    } catch (error) {
      log.error({ error }, 'Failed to send reminder')
      throw error
    }
  })

  // Call followup worker (for failed/no-answer calls)
  await boss.work('call.followup', async (job) => {
    const { jobId, reason } = job.data
    const log = logger.child({ jobId, reason, worker: 'call.followup' })

    try {
      log.info('Processing call followup')

      const { data: jobData } = await supabase
        .from('workflow_jobs')
        .select('*, merchants(*), customers(*)')
        .eq('id', jobId)
        .single()

      if (!jobData) {
        throw new Error('Job not found')
      }

      // Get next available slot
      const nextSlot = await schedulingService.nextSlot(jobId)
      log.info({ nextSlot }, 'Found next available slot')

      // Create new appointment
      const { data: appointment } = await supabase
        .from('negotiation_appointments')
        .insert({
          job_id: jobId,
          merchant_id: jobData.merchants?.id,
          customer_id: jobData.customers?.id,
          starts_at: nextSlot.starts_at,
          ends_at: nextSlot.ends_at,
          timezone: nextSlot.tz,
          status: 'scheduled',
          metadata: {
            followup_reason: reason,
            previous_attempts: (jobData.metadata?.call_attempts || 0) + 1
          }
        })
        .select()
        .single()

      if (!appointment) {
        throw new Error('Failed to create appointment')
      }

      // Send calendar invite
      await calendarService.sendInvite(appointment)

      // Schedule the call
      await boss.publishAt('call.schedule', new Date(nextSlot.starts_at), {
        appointmentId: appointment.id,
        jobId
      })

      // Schedule reminder
      const reminderTime = new Date(nextSlot.starts_at)
      reminderTime.setMinutes(reminderTime.getMinutes() - 15)
      
      await boss.publishAt('call.reminder', reminderTime, {
        appointmentId: appointment.id,
        jobId
      })

      // Update job metadata
      await supabase
        .from('workflow_jobs')
        .update({
          metadata: {
            ...jobData.metadata,
            call_attempts: (jobData.metadata?.call_attempts || 0) + 1,
            last_followup: new Date().toISOString(),
            next_appointment: nextSlot.starts_at
          }
        })
        .eq('id', jobId)

      log.info('Followup appointment scheduled')

    } catch (error) {
      log.error({ error }, 'Failed to process followup')
      throw error
    }
  })
}