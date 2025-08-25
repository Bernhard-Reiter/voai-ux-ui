import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SchedulingService } from '../../packages/wf-core/src/services/scheduling.service'
import { createClient } from '@supabase/supabase-js'

vi.mock('@supabase/supabase-js')

describe('SchedulingService', () => {
  let schedulingService: SchedulingService
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis()
    }
    
    schedulingService = new SchedulingService(mockSupabase)
  })

  describe('shouldCallNow', () => {
    it('should return true during business hours', async () => {
      // Mock Tuesday 10 AM
      vi.setSystemTime(new Date('2024-02-20T10:00:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              tue: { start: '09:00', end: '17:00' }
            }
          }
        }
      })

      const result = await schedulingService.shouldCallNow('test-job-id')
      expect(result).toBe(true)
    })

    it('should return false outside business hours', async () => {
      // Mock Tuesday 8 PM
      vi.setSystemTime(new Date('2024-02-20T20:00:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              tue: { start: '09:00', end: '17:00' }
            }
          }
        }
      })

      const result = await schedulingService.shouldCallNow('test-job-id')
      expect(result).toBe(false)
    })

    it('should return false on weekends', async () => {
      // Mock Saturday
      vi.setSystemTime(new Date('2024-02-24T10:00:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              mon: { start: '09:00', end: '17:00' },
              tue: { start: '09:00', end: '17:00' },
              wed: { start: '09:00', end: '17:00' },
              thu: { start: '09:00', end: '17:00' },
              fri: { start: '09:00', end: '17:00' }
            }
          }
        }
      })

      const result = await schedulingService.shouldCallNow('test-job-id')
      expect(result).toBe(false)
    })
  })

  describe('nextSlot', () => {
    it('should find next available slot on same day', async () => {
      // Mock Tuesday 2 PM
      vi.setSystemTime(new Date('2024-02-20T14:00:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              tue: { start: '09:00', end: '17:00' }
            }
          }
        }
      })
      
      // No existing appointments
      mockSupabase.eq.mockResolvedValue({
        data: []
      })

      const slot = await schedulingService.nextSlot('test-job-id')
      
      const slotDate = new Date(slot.starts_at)
      expect(slotDate.getDate()).toBe(20) // Same day
      expect(slotDate.getHours()).toBeGreaterThanOrEqual(14) // After current time
    })

    it('should skip to next day if no slots today', async () => {
      // Mock Tuesday 4:30 PM (near end of business)
      vi.setSystemTime(new Date('2024-02-20T16:30:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              tue: { start: '09:00', end: '17:00' },
              wed: { start: '09:00', end: '17:00' }
            }
          }
        }
      })
      
      mockSupabase.eq.mockResolvedValue({
        data: []
      })

      const slot = await schedulingService.nextSlot('test-job-id')
      
      const slotDate = new Date(slot.starts_at)
      expect(slotDate.getDate()).toBe(21) // Next day
      expect(slotDate.getHours()).toBe(9) // Start of business
    })

    it('should avoid conflicting appointments', async () => {
      vi.setSystemTime(new Date('2024-02-20T09:00:00'))
      
      mockSupabase.single.mockResolvedValue({
        data: {
          merchants: {
            timezone: 'Europe/Berlin',
            business_hours: {
              tue: { start: '09:00', end: '17:00' }
            }
          }
        }
      })
      
      // Existing appointment at 9:00-9:20
      mockSupabase.eq.mockResolvedValue({
        data: [{
          starts_at: '2024-02-20T09:00:00Z',
          ends_at: '2024-02-20T09:20:00Z'
        }]
      })

      const slot = await schedulingService.nextSlot('test-job-id')
      
      const slotTime = new Date(slot.starts_at).toISOString()
      expect(slotTime).not.toBe('2024-02-20T09:00:00.000Z')
      expect(new Date(slot.starts_at).getMinutes()).toBe(15) // Next 15-min slot
    })
  })
})