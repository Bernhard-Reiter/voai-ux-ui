import { describe, it, expect } from 'vitest'
import * as billing from '@/lib/modules/billing'

describe('billing facade', () => {
  it('creates invoice', async () => {
    const inv = await billing.createOneOffInvoice({ 
      customerId:'cus_1', 
      amount:10, 
      currency:'EUR' 
    })
    expect(inv.id).toContain('inv_mock_')
    expect(inv.customerId).toBe('cus_1')
    expect(inv.total).toBe(1000)
    expect(inv.currency).toBe('eur')
  })
})