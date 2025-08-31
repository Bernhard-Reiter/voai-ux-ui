// Server-only facade around @voai/billing (Stripe)
import 'server-only'

// TODO: Uncomment when @voai/billing module is available
// import { StripeBillingAdapter } from '@voai/billing/src/adapters/stripe-billing'
// import type { BillingService, CreateInvoiceDTO } from '@voai/billing/src/ports/BillingService'

// Temporary types until module is available
type CreateInvoiceDTO = {
  customerId: string
  amount: number
  currency: string
  description?: string
  metadata?: Record<string, string | number | boolean>
}

type Invoice = {
  id: string
  customerId: string
  status: string
  total: number
  currency: string
  paid: boolean
  items: Array<{id: string; amount: number; description: string}>
  hostedInvoiceUrl?: string
}

type BillingPortalSession = {
  url: string
}

// Temporary mock implementation
export async function createOneOffInvoice(input: CreateInvoiceDTO): Promise<Invoice> {
  console.log('Mock createOneOffInvoice:', input)
  return {
    id: 'inv_mock_' + Date.now(),
    customerId: input.customerId,
    status: 'draft',
    total: input.amount * 100,
    currency: input.currency.toLowerCase(),
    paid: false,
    items: [],
    hostedInvoiceUrl: 'https://stripe.com/mock-invoice'
  }
}

export async function createBillingPortal(customerId: string, returnUrl: string): Promise<BillingPortalSession> {
  console.log('Mock createBillingPortal:', { customerId, returnUrl })
  return {
    url: 'https://stripe.com/mock-portal'
  }
}

export async function listCustomerInvoices(customerId: string): Promise<Invoice[]> {
  console.log('Mock listCustomerInvoices:', customerId)
  return []
}