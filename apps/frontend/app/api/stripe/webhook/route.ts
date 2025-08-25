import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.arrayBuffer()
    const buf = Buffer.from(rawBody)
    
    // Verify webhook signature
    const signature = request.headers.get('stripe-signature')!
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    
    let event: Stripe.Event
    
    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Check if event already processed (idempotency)
    const { data: existingEvent } = await supabase
      .from('stripe_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single()

    if (existingEvent) {
      console.log(`Event ${event.id} already processed`)
      return NextResponse.json({ received: true, duplicate: true })
    }

    // Store event
    await supabase.from('stripe_events').insert({
      stripe_event_id: event.id,
      type: event.type,
      data: event.data,
      processed: false
    })

    // Process event based on type
    switch (event.type) {
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break
        
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        // Handle subscription events if needed
        console.log(`Subscription event: ${event.type}`)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Mark event as processed
    await supabase
      .from('stripe_events')
      .update({ processed: true })
      .eq('stripe_event_id', event.id)

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    
    // Return 200 to avoid Stripe retries for unrecoverable errors
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      received: true
    }, { status: 200 })
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const { jobId, tenantId } = invoice.metadata

  if (!jobId || !tenantId) {
    console.error('Missing metadata in invoice:', invoice.id)
    return
  }

  // Update invoice status
  const { error: updateError } = await supabase
    .from('invoices')
    .update({
      status: 'paid',
      paid_at: new Date(invoice.status_transitions.paid_at! * 1000).toISOString(),
      metadata: {
        stripe_payment_intent: invoice.payment_intent,
        amount_paid: invoice.amount_paid
      }
    })
    .eq('stripe_invoice_id', invoice.id)

  if (updateError) {
    console.error('Failed to update invoice:', updateError)
    throw updateError
  }

  // Update job billing status
  await supabase
    .from('workflow_jobs')
    .update({ billing_status: 'paid' })
    .eq('id', jobId)

  // Create events
  await supabase.from('negotiation_events').insert({
    job_id: jobId,
    type: 'invoice_paid',
    data: {
      invoiceId: invoice.id,
      amountPaid: invoice.amount_paid,
      paidAt: invoice.status_transitions.paid_at
    }
  })

  console.log(`Invoice ${invoice.id} paid for job ${jobId}`)
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const { jobId } = invoice.metadata

  if (!jobId) {
    console.error('Missing jobId in invoice metadata:', invoice.id)
    return
  }

  // Update invoice status
  await supabase
    .from('invoices')
    .update({
      status: 'payment_failed',
      metadata: {
        last_payment_error: invoice.last_payment_error,
        attempt_count: invoice.attempt_count
      }
    })
    .eq('stripe_invoice_id', invoice.id)

  // Create event
  await supabase.from('negotiation_events').insert({
    job_id: jobId,
    type: 'payment_failed',
    data: {
      invoiceId: invoice.id,
      error: invoice.last_payment_error,
      attemptCount: invoice.attempt_count
    }
  })

  console.log(`Payment failed for invoice ${invoice.id}`)
}