import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { VoiceService } from '../../../../packages/wf-core/src/services/voice.service'
import PgBoss from 'pg-boss'
import pino from 'pino'

const logger = pino()

let boss: PgBoss | null = null

async function getBoss() {
  if (!boss) {
    boss = new PgBoss(process.env.DATABASE_URL!)
    await boss.start()
  }
  return boss
}

function verifyHmac(signature: string, payload: string, secret: string): boolean {
  const expectedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  const log = logger.child({ endpoint: '/api/voice/callback' })

  try {
    // Get raw body for HMAC verification
    const rawBody = await request.text()
    
    // Verify HMAC signature
    const signature = request.headers.get('x-voice-signature') || 
                     request.headers.get('x-vapi-signature') || ''
    
    const webhookSecret = process.env.VOICE_WEBHOOK_SECRET!
    
    if (!verifyHmac(signature, rawBody, webhookSecret)) {
      log.warn({ signature }, 'Invalid HMAC signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse body
    const body = JSON.parse(rawBody)
    log.info({ eventType: body.type, callId: body.call?.id }, 'Received voice callback')

    const voiceService = new VoiceService(logger)
    const pgBoss = await getBoss()

    // Extract metadata
    const { jobId, voiceCallId } = body.call?.metadata || body.metadata || {}

    if (!jobId) {
      log.warn('No jobId in callback metadata')
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 })
    }

    // Handle different event types
    switch (body.type || body.status) {
      case 'call-started':
      case 'answered':
        log.info({ jobId }, 'Call answered')
        await voiceService.handleCallbackEvent({
          type: 'call-started',
          call: body.call || body
        })
        break

      case 'call-ended':
      case 'completed':
        log.info({ jobId, duration: body.call?.duration }, 'Call completed')
        await voiceService.handleCallbackEvent({
          type: 'call-ended',
          call: body.call || body
        })
        break

      case 'call-failed':
      case 'failed':
        log.warn({ jobId, error: body.error }, 'Call failed')
        await voiceService.handleCallbackEvent({
          type: 'call-failed',
          call: body.call || body,
          error: body.error
        })
        break

      case 'no-answer':
      case 'busy':
      case 'voicemail':
        log.info({ jobId, status: body.type || body.status }, 'Call not answered')
        await pgBoss.publish('call.followup', {
          jobId,
          reason: body.type || body.status
        })
        break

      case 'transcript-complete':
        log.info({ jobId }, 'Transcript received')
        await voiceService.handleCallbackEvent({
          type: 'transcript-complete',
          transcript: body.transcript,
          call: { metadata: { voiceCallId } }
        })
        break

      case 'assistant-said':
      case 'user-said':
        // Log conversation but don't process
        log.debug({ 
          jobId, 
          type: body.type,
          message: body.message?.content 
        }, 'Conversation event')
        break

      default:
        log.warn({ type: body.type }, 'Unknown event type')
    }

    return NextResponse.json({ 
      success: true,
      received: true,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    log.error({ error }, 'Voice callback error')
    
    // Don't expose internal errors to webhook provider
    return NextResponse.json({ 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}