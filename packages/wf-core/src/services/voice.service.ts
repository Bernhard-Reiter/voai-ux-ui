import { Logger } from 'pino'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface VapiCallRequest {
  assistantId?: string
  assistantOverrides?: {
    name: string
    firstMessage: string
    model: {
      provider: string
      model: string
      temperature: number
    }
    transcriber: {
      provider: string
      model: string
      language: string
    }
    voice: {
      provider: string
      voiceId: string
    }
  }
  phoneNumberId?: string
  customer: {
    number: string
    name?: string
  }
  metadata: Record<string, any>
}

export class VoiceService {
  private vapiClient: axios.AxiosInstance

  constructor(private logger: Logger) {
    this.vapiClient = axios.create({
      baseURL: 'https://api.vapi.ai',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async startCall(jobId: string, payload: any): Promise<void> {
    const log = this.logger.child({ jobId, service: 'voice' })

    try {
      const { analysisResult, merchant, customer } = payload

      // Create voice call record
      const { data: voiceCall } = await supabase
        .from('voice_calls')
        .insert({
          job_id: jobId,
          provider: 'vapi',
          status: 'initiated',
          direction: 'outbound',
          to_number: merchant?.phone || customer?.phone,
          metadata: { analysisResult }
        })
        .select()
        .single()

      if (!voiceCall) {
        throw new Error('Failed to create voice call record')
      }

      // Prepare call request
      const callRequest: VapiCallRequest = {
        assistantOverrides: {
          name: 'VoAI Verhandlungsassistent',
          firstMessage: this.generateFirstMessage(analysisResult, merchant),
          model: {
            provider: 'openai',
            model: 'gpt-4-turbo',
            temperature: 0.7
          },
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'de'
          },
          voice: {
            provider: 'elevenlabs',
            voiceId: 'rachel' // German voice
          }
        },
        customer: {
          number: merchant?.phone || '',
          name: merchant?.name
        },
        metadata: {
          jobId,
          voiceCallId: voiceCall.id,
          webhookUrl: `${process.env.FRONTEND_URL}/api/voice/callback`
        }
      }

      log.info({ callRequest }, 'Initiating Vapi call')

      // Start the call
      const response = await this.vapiClient.post('/calls', callRequest)
      const vapiCall = response.data

      // Update voice call with provider ID
      await supabase
        .from('voice_calls')
        .update({
          provider_call_id: vapiCall.id,
          status: 'ringing',
          started_at: new Date().toISOString()
        })
        .eq('id', voiceCall.id)

      // Create event
      await supabase.from('negotiation_events').insert({
        job_id: jobId,
        type: 'call_started',
        data: {
          voiceCallId: voiceCall.id,
          vapiCallId: vapiCall.id
        }
      })

      log.info({ vapiCallId: vapiCall.id }, 'Call initiated successfully')

    } catch (error) {
      log.error({ error }, 'Failed to start call')
      
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

  async startCallForAppointment(appointmentId: string): Promise<void> {
    const { data: appointment } = await supabase
      .from('negotiation_appointments')
      .select('*, workflow_jobs(*, merchants(*), customers(*))')
      .eq('id', appointmentId)
      .single()

    if (!appointment) {
      throw new Error('Appointment not found')
    }

    const job = appointment.workflow_jobs
    const analysisResult = job.result

    await this.startCall(job.id, {
      analysisResult,
      merchant: job.merchants,
      customer: job.customers
    })

    // Update appointment status
    await supabase
      .from('negotiation_appointments')
      .update({ status: 'started' })
      .eq('id', appointmentId)
  }

  private generateFirstMessage(analysisResult: any, merchant: any): string {
    const greeting = merchant?.name ? `Guten Tag Herr/Frau ${merchant.name}` : 'Guten Tag'
    
    return `${greeting}, hier ist VoAI, Ihr digitaler Verhandlungsassistent. 
    Ich rufe Sie bezüglich Ihres aktuellen Angebots an. 
    Unsere Analyse hat ergeben, dass hier ein Einsparpotenzial von ${(analysisResult.savingsCents / 100).toFixed(2)}€ möglich ist. 
    Hätten Sie kurz Zeit, dies zu besprechen?`
  }

  async handleCallbackEvent(event: any): Promise<void> {
    const log = this.logger.child({ 
      vapiCallId: event.call?.id,
      eventType: event.type,
      service: 'voice-callback' 
    })

    try {
      const { jobId, voiceCallId } = event.call?.metadata || {}

      if (!jobId || !voiceCallId) {
        log.warn('Missing metadata in callback event')
        return
      }

      // Update voice call status based on event
      const statusMap: Record<string, string> = {
        'call-started': 'answered',
        'call-ended': 'completed',
        'call-failed': 'failed',
        'assistant-said': 'answered',
        'user-said': 'answered'
      }

      const newStatus = statusMap[event.type]
      
      if (newStatus) {
        await supabase
          .from('voice_calls')
          .update({
            status: newStatus,
            metadata: {
              ...event,
              updated_at: new Date().toISOString()
            }
          })
          .eq('id', voiceCallId)
      }

      // Handle specific events
      switch (event.type) {
        case 'call-ended':
          await this.handleCallEnded(event, jobId, voiceCallId)
          break
          
        case 'call-failed':
          await this.handleCallFailed(event, jobId, voiceCallId)
          break
          
        case 'transcript-complete':
          await this.handleTranscript(event, voiceCallId)
          break
      }

    } catch (error) {
      log.error({ error }, 'Failed to handle callback event')
      throw error
    }
  }

  private async handleCallEnded(event: any, jobId: string, voiceCallId: string): Promise<void> {
    const { duration, endedReason } = event.call || {}

    await supabase
      .from('voice_calls')
      .update({
        status: 'completed',
        duration_seconds: duration,
        ended_at: new Date().toISOString(),
        metadata: {
          endedReason,
          ...event
        }
      })
      .eq('id', voiceCallId)

    // Check if call was successful
    if (endedReason === 'assistant-ended' || duration > 30) {
      // Call was successful
      await supabase
        .from('workflow_jobs')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', jobId)

      await supabase.from('negotiation_events').insert({
        job_id: jobId,
        type: 'call_completed',
        data: {
          duration,
          endedReason,
          voiceCallId
        }
      })

      // Emit event for billing
      const { data: job } = await supabase
        .from('workflow_jobs')
        .select('result')
        .eq('id', jobId)
        .single()

      if (job?.result?.savingsCents > 0) {
        await supabase.from('negotiation_events').insert({
          job_id: jobId,
          type: 'negotiation_completed',
          data: {
            savingsCents: job.result.savingsCents
          }
        })
      }
    } else {
      // Call was too short or failed
      await supabase.publish('call.followup', {
        jobId,
        reason: endedReason || 'short_call'
      })
    }
  }

  private async handleCallFailed(event: any, jobId: string, voiceCallId: string): Promise<void> {
    const { error } = event

    await supabase
      .from('voice_calls')
      .update({
        status: 'failed',
        ended_at: new Date().toISOString(),
        metadata: {
          error,
          ...event
        }
      })
      .eq('id', voiceCallId)

    // Schedule followup
    await supabase.publish('call.followup', {
      jobId,
      reason: error?.code || 'call_failed'
    })
  }

  private async handleTranscript(event: any, voiceCallId: string): Promise<void> {
    const { transcript } = event

    if (transcript) {
      await supabase
        .from('voice_calls')
        .update({ transcript })
        .eq('id', voiceCallId)
    }
  }
}