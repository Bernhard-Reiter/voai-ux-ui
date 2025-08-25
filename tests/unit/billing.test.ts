import { describe, it, expect, beforeEach, vi } from 'vitest'
import { BillingService } from '../../packages/billing/src/services/billing.service'
import { createClient } from '@supabase/supabase-js'

vi.mock('@supabase/supabase-js')

// Mock fetch globally
global.fetch = vi.fn()

describe('BillingService', () => {
  let billingService: BillingService
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis()
    }
    
    billingService = new BillingService(mockSupabase)
    vi.clearAllMocks()
  })

  describe('handleNegotiationCompleted', () => {
    it('should skip billing if no savings', async () => {
      await billingService.handleNegotiationCompleted({
        jobId: 'test-job',
        tenantId: 'test-tenant',
        savingsCents: 0
      })

      expect(mockSupabase.from).not.toHaveBeenCalled()
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should skip if invoice already exists', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { id: 'existing-invoice' }
      })

      await billingService.handleNegotiationCompleted({
        jobId: 'test-job',
        tenantId: 'test-tenant',
        savingsCents: 5000
      })

      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should create invoice for successful negotiation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null })
      
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          invoiceId: 'inv_123',
          amount: 500
        })
      }
      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      await billingService.handleNegotiationCompleted({
        jobId: 'test-job',
        tenantId: 'test-tenant',
        savingsCents: 5000
      })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/stripe/invoice'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            jobId: 'test-job',
            tenantId: 'test-tenant',
            savingsCents: 5000
          })
        })
      )
    })
  })

  describe('calculateMetrics', () => {
    it('should calculate correct metrics', async () => {
      mockSupabase.lte.mockResolvedValue({
        data: [
          { amount_cents: 1000, status: 'paid' },
          { amount_cents: 2000, status: 'paid' },
          { amount_cents: 1500, status: 'sent' },
          { amount_cents: 500, status: 'void' }
        ]
      })

      const metrics = await billingService.calculateMetrics('test-tenant')

      expect(metrics).toEqual({
        totalRevenue: 30, // (1000 + 2000) / 100
        totalInvoices: 4,
        paidInvoices: 2,
        pendingRevenue: 15, // 1500 / 100
        averageInvoiceValue: 12.5 // (1000+2000+1500+500) / 4 / 100
      })
    })

    it('should handle empty invoice list', async () => {
      mockSupabase.lte.mockResolvedValue({ data: [] })

      const metrics = await billingService.calculateMetrics('test-tenant')

      expect(metrics).toEqual({
        totalRevenue: 0,
        totalInvoices: 0,
        paidInvoices: 0,
        pendingRevenue: 0,
        averageInvoiceValue: 0
      })
    })

    it('should filter by date range', async () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-31')

      await billingService.calculateMetrics('test-tenant', startDate, endDate)

      expect(mockSupabase.gte).toHaveBeenCalledWith('created_at', startDate.toISOString())
      expect(mockSupabase.lte).toHaveBeenCalledWith('created_at', endDate.toISOString())
    })
  })

  describe('handleInvoicePaid', () => {
    it('should update job billing status', async () => {
      await billingService.handleInvoicePaid({
        jobId: 'test-job',
        tenantId: 'test-tenant',
        amountPaidCents: 500
      })

      expect(mockSupabase.update).toHaveBeenCalledWith({
        billing_status: 'paid',
        metadata: {
          invoice_paid_at: expect.any(String),
          amount_paid_cents: 500
        }
      })
    })
  })
})