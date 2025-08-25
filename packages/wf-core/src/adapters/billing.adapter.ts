import { createClient } from '@supabase/supabase-js'
import { BillingService } from '@voai/billing'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export class BillingAdapter {
  private billingService: BillingService

  constructor() {
    this.billingService = new BillingService(supabase)
  }

  async init() {
    // Listen for negotiation completed events
    const channel = supabase
      .channel('billing-events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'negotiation_events',
          filter: 'type=eq.negotiation_completed'
        },
        async (payload) => {
          const event = payload.new
          const { job_id: jobId, data } = event

          // Get job details
          const { data: job } = await supabase
            .from('workflow_jobs')
            .select('tenant_id')
            .eq('id', jobId)
            .single()

          if (job && data.savingsCents > 0) {
            await this.billingService.handleNegotiationCompleted({
              jobId,
              tenantId: job.tenant_id,
              savingsCents: data.savingsCents
            })
          }
        }
      )
      .subscribe()

    // Listen for invoice paid events
    const invoiceChannel = supabase
      .channel('invoice-events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'negotiation_events',
          filter: 'type=eq.invoice_paid'
        },
        async (payload) => {
          const event = payload.new
          await this.billingService.handleInvoicePaid(event.data)
        }
      )
      .subscribe()

    console.log('Billing adapter initialized')
  }
}