export interface CreateInvoiceRequest {
  customerId: string
  amountCents: number
  description: string
  metadata?: Record<string, any>
  dueDate?: Date
}

export interface Invoice {
  id: string
  customerId: string
  amountCents: number
  status: 'draft' | 'sent' | 'paid' | 'void' | 'uncollectible'
  dueDate?: Date
  paidAt?: Date
  hostedUrl?: string
  metadata?: Record<string, any>
}

export interface BillingPort {
  createInvoice(request: CreateInvoiceRequest): Promise<Invoice>
  sendInvoice(invoiceId: string): Promise<void>
  voidInvoice(invoiceId: string): Promise<void>
  getInvoice(invoiceId: string): Promise<Invoice | null>
}