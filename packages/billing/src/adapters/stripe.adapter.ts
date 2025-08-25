import Stripe from 'stripe'
import { BillingPort, CreateInvoiceRequest, Invoice } from '../ports/billing.port'

export class StripeAdapter implements BillingPort {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    })
  }

  async createInvoice(request: CreateInvoiceRequest): Promise<Invoice> {
    // Create invoice item
    await this.stripe.invoiceItems.create({
      customer: request.customerId,
      amount: request.amountCents,
      currency: process.env.BILLING_CURRENCY || 'eur',
      description: request.description,
      metadata: request.metadata
    })

    // Create invoice
    const stripeInvoice = await this.stripe.invoices.create({
      customer: request.customerId,
      collection_method: 'send_invoice',
      days_until_due: request.dueDate 
        ? Math.ceil((request.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : parseInt(process.env.STRIPE_DAYS_UNTIL_DUE || '14'),
      automatic_tax: {
        enabled: process.env.STRIPE_TAX_ENABLED === 'true'
      },
      metadata: request.metadata
    })

    return this.mapStripeInvoice(stripeInvoice)
  }

  async sendInvoice(invoiceId: string): Promise<void> {
    await this.stripe.invoices.sendInvoice(invoiceId)
  }

  async voidInvoice(invoiceId: string): Promise<void> {
    await this.stripe.invoices.voidInvoice(invoiceId)
  }

  async getInvoice(invoiceId: string): Promise<Invoice | null> {
    try {
      const stripeInvoice = await this.stripe.invoices.retrieve(invoiceId)
      return this.mapStripeInvoice(stripeInvoice)
    } catch (error) {
      if (error.type === 'StripeInvalidRequestError' && error.code === 'resource_missing') {
        return null
      }
      throw error
    }
  }

  private mapStripeInvoice(stripeInvoice: Stripe.Invoice): Invoice {
    return {
      id: stripeInvoice.id,
      customerId: stripeInvoice.customer as string,
      amountCents: stripeInvoice.amount_due,
      status: this.mapStripeStatus(stripeInvoice.status!),
      dueDate: stripeInvoice.due_date ? new Date(stripeInvoice.due_date * 1000) : undefined,
      paidAt: stripeInvoice.status_transitions.paid_at 
        ? new Date(stripeInvoice.status_transitions.paid_at * 1000) 
        : undefined,
      hostedUrl: stripeInvoice.hosted_invoice_url || undefined,
      metadata: stripeInvoice.metadata
    }
  }

  private mapStripeStatus(status: string): Invoice['status'] {
    const statusMap: Record<string, Invoice['status']> = {
      'draft': 'draft',
      'open': 'sent',
      'paid': 'paid',
      'void': 'void',
      'uncollectible': 'uncollectible'
    }
    return statusMap[status] || 'draft'
  }
}