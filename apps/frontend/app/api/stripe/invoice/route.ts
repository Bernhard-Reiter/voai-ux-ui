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
    // Verify internal auth (this endpoint should only be called by our backend)
    const authHeader = request.headers.get('authorization')
    const internalSecret = process.env.WEBHOOK_SECRET
    
    if (authHeader !== `Bearer ${internalSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId, tenantId, savingsCents } = await request.json()

    if (!jobId || !tenantId || !savingsCents) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('tenant_id', tenantId)
      .single()

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Create or get Stripe customer
    let stripeCustomerId = customer.stripe_customer_id

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        metadata: {
          tenantId,
          customerId: customer.id
        }
      })

      stripeCustomerId = stripeCustomer.id

      // Update customer with Stripe ID
      await supabase
        .from('customers')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', customer.id)
    }

    // Calculate success fee
    const successFeePercent = parseFloat(process.env.BILLING_SUCCESS_FEE_PCT || '0.10')
    const successFeeCapCents = parseInt(process.env.BILLING_SUCCESS_FEE_CAP_CENTS || '5000')
    
    const calculatedFee = Math.floor(savingsCents * successFeePercent)
    const amount = Math.min(calculatedFee, successFeeCapCents)

    // Create invoice item
    await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      currency: process.env.BILLING_CURRENCY || 'eur',
      amount,
      description: `Erfolgsgebühr Verhandlung - Job ${jobId}`,
      metadata: {
        jobId,
        tenantId,
        savingsCents: savingsCents.toString(),
        calculatedFee: calculatedFee.toString()
      }
    }, {
      idempotencyKey: `invItem:${jobId}`
    })

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      collection_method: 'send_invoice',
      days_until_due: parseInt(process.env.STRIPE_DAYS_UNTIL_DUE || '14'),
      automatic_tax: {
        enabled: process.env.STRIPE_TAX_ENABLED === 'true'
      },
      metadata: {
        jobId,
        tenantId,
        type: 'success_fee'
      },
      custom_fields: [
        {
          name: 'Job ID',
          value: jobId
        }
      ],
      footer: 'Vielen Dank für Ihr Vertrauen in VoAI.'
    }, {
      idempotencyKey: `invoice:${jobId}`
    })

    // Send invoice
    await stripe.invoices.sendInvoice(invoice.id)

    // Store invoice in database
    await supabase.from('invoices').insert({
      tenant_id: tenantId,
      job_id: jobId,
      customer_id: customer.id,
      stripe_invoice_id: invoice.id,
      amount_cents: amount,
      currency: process.env.BILLING_CURRENCY || 'eur',
      status: 'sent',
      due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
      metadata: {
        savings_cents: savingsCents,
        success_fee_percent: successFeePercent,
        calculated_fee: calculatedFee,
        capped: calculatedFee > successFeeCapCents
      }
    })

    // Create event
    await supabase.from('negotiation_events').insert({
      job_id: jobId,
      type: 'invoice_created',
      data: {
        invoiceId: invoice.id,
        amount,
        dueDate: invoice.due_date
      }
    })

    return NextResponse.json({
      success: true,
      invoiceId: invoice.id,
      stripeInvoiceUrl: invoice.hosted_invoice_url,
      amount,
      dueDate: invoice.due_date
    })

  } catch (error) {
    console.error('Invoice creation error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ 
        error: error.message,
        type: error.type
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}