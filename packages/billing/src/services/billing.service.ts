import { SupabaseClient } from '@supabase/supabase-js'
import { BillingPort } from '../ports/billing.port'
import { StripeAdapter } from '../adapters/stripe.adapter'

interface NegotiationCompletedEvent {
  jobId: string
  tenantId: string
  savingsCents: number
}

export class BillingService {
  private billingAdapter: BillingPort

  constructor(
    private supabase: SupabaseClient,
    billingAdapter?: BillingPort
  ) {
    this.billingAdapter = billingAdapter || new StripeAdapter()
  }

  async handleNegotiationCompleted(event: NegotiationCompletedEvent): Promise<void> {
    const { jobId, tenantId, savingsCents } = event

    // Skip if no savings
    if (savingsCents <= 0) {
      console.log(`No savings for job ${jobId}, skipping billing`)
      return
    }

    // Check if invoice already exists
    const { data: existingInvoice } = await this.supabase
      .from('invoices')
      .select('id')
      .eq('job_id', jobId)
      .single()

    if (existingInvoice) {
      console.log(`Invoice already exists for job ${jobId}`)
      return
    }

    // Create invoice via internal API
    const response = await fetch(`${process.env.FRONTEND_URL}/api/stripe/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
      },
      body: JSON.stringify({
        jobId,
        tenantId,
        savingsCents
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create invoice: ${error.error}`)
    }

    const invoice = await response.json()
    console.log(`Invoice created for job ${jobId}:`, invoice.invoiceId)
  }

  async handleInvoicePaid(event: any): Promise<void> {
    const { jobId, tenantId, amountPaidCents } = event

    // Update job to reflect payment
    await this.supabase
      .from('workflow_jobs')
      .update({
        billing_status: 'paid',
        metadata: {
          invoice_paid_at: new Date().toISOString(),
          amount_paid_cents: amountPaidCents
        }
      })
      .eq('id', jobId)

    // Could trigger additional actions here:
    // - Send thank you email
    // - Update CRM
    // - Generate report
    
    console.log(`Payment processed for job ${jobId}`)
  }

  async getInvoiceStatus(jobId: string): Promise<any> {
    const { data: invoice } = await this.supabase
      .from('invoices')
      .select('*')
      .eq('job_id', jobId)
      .single()

    return invoice
  }

  async getCustomerInvoices(customerId: string): Promise<any[]> {
    const { data: invoices } = await this.supabase
      .from('invoices')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })

    return invoices || []
  }

  async calculateMetrics(tenantId: string, startDate?: Date, endDate?: Date): Promise<{
    totalRevenue: number
    totalInvoices: number
    paidInvoices: number
    pendingRevenue: number
    averageInvoiceValue: number
  }> {
    let query = this.supabase
      .from('invoices')
      .select('amount_cents, status')
      .eq('tenant_id', tenantId)

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString())
    }

    if (endDate) {
      query = query.lte('created_at', endDate.toISOString())
    }

    const { data: invoices } = await query

    if (!invoices || invoices.length === 0) {
      return {
        totalRevenue: 0,
        totalInvoices: 0,
        paidInvoices: 0,
        pendingRevenue: 0,
        averageInvoiceValue: 0
      }
    }

    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount_cents, 0)

    const pendingRevenue = invoices
      .filter(inv => inv.status === 'sent')
      .reduce((sum, inv) => sum + inv.amount_cents, 0)

    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length

    return {
      totalRevenue: totalRevenue / 100,
      totalInvoices: invoices.length,
      paidInvoices,
      pendingRevenue: pendingRevenue / 100,
      averageInvoiceValue: invoices.length > 0 
        ? (invoices.reduce((sum, inv) => sum + inv.amount_cents, 0) / invoices.length) / 100
        : 0
    }
  }
}