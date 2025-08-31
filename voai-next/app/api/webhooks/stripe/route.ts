import 'server-only'
import { NextRequest } from 'next/server'
// TODO: Uncomment when @voai/billing module is available
// import { StripeWebhookHandlerAdapter } from '@voai/billing/src/adapters/stripe-webhook-handler'

export const runtime = 'nodejs'            // Stripe braucht Node, kein Edge
export const dynamic = 'force-dynamic'     // Body muss „raw" sein

export async function POST(req: NextRequest) {
  try {
    // Roh-Body und Signatur extrahieren
    const sig = req.headers.get('stripe-signature') || ''
    const buf = Buffer.from(await req.arrayBuffer())
    // TODO: Use buf for webhook verification when module is available
    void buf // Suppress unused variable warning

    // TODO: Implement webhook verification when module is available
    console.log('Mock Stripe webhook received', { sig: sig.slice(0, 20) + '...' })

    // Mock response
    return new Response('ok', { status: 200 })
  } catch (e: unknown) {
    console.error('stripe webhook error', e)
    return new Response('bad request', { status: 400 })
  }
}