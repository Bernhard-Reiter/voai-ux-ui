import { SupabaseClient } from '@supabase/supabase-js'
import { addMinutes, isWithinInterval, setHours, setMinutes, startOfDay, addDays, format, parseISO } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

interface BusinessHours {
  start: string // "09:00"
  end: string   // "17:00"
}

interface MerchantBusinessHours {
  mon?: BusinessHours
  tue?: BusinessHours
  wed?: BusinessHours
  thu?: BusinessHours
  fri?: BusinessHours
  sat?: BusinessHours
  sun?: BusinessHours
}

export class SchedulingService {
  constructor(private supabase: SupabaseClient) {}

  async shouldCallNow(jobId: string): Promise<boolean> {
    const { data: job } = await this.supabase
      .from('workflow_jobs')
      .select('*, merchants(*)')
      .eq('id', jobId)
      .single()

    if (!job?.merchants) {
      // No merchant info, default to business hours check
      return this.isBusinessHours()
    }

    const merchantTz = job.merchants.timezone || 'Europe/Berlin'
    const businessHours = job.merchants.business_hours as MerchantBusinessHours

    return this.isWithinBusinessHours(new Date(), businessHours, merchantTz)
  }

  async nextSlot(jobId: string): Promise<{
    starts_at: string
    ends_at: string
    tz: string
  }> {
    const { data: job } = await this.supabase
      .from('workflow_jobs')
      .select('*, merchants(*), customers(*)')
      .eq('id', jobId)
      .single()

    const merchantTz = job?.merchants?.timezone || 'Europe/Berlin'
    const businessHours = (job?.merchants?.business_hours || this.getDefaultBusinessHours()) as MerchantBusinessHours

    // Get existing appointments to avoid conflicts
    const { data: existingAppointments } = await this.supabase
      .from('negotiation_appointments')
      .select('starts_at, ends_at')
      .gte('starts_at', new Date().toISOString())
      .lte('starts_at', addDays(new Date(), 7).toISOString())
      .eq('status', 'scheduled')

    // Find next available slot
    let searchDate = new Date()
    const maxDays = 7

    for (let dayOffset = 0; dayOffset < maxDays; dayOffset++) {
      const currentDate = addDays(searchDate, dayOffset)
      const dayName = format(currentDate, 'EEE').toLowerCase() as keyof MerchantBusinessHours
      const dayHours = businessHours[dayName]

      if (!dayHours) continue // Closed this day

      // Convert to merchant timezone
      const merchantDate = utcToZonedTime(currentDate, merchantTz)
      const dayStart = this.parseTimeToDate(merchantDate, dayHours.start)
      const dayEnd = this.parseTimeToDate(merchantDate, dayHours.end)

      // Generate 15-minute slots
      let slotStart = dayStart
      
      // If today, start from next 15-minute interval
      if (dayOffset === 0) {
        const now = utcToZonedTime(new Date(), merchantTz)
        if (now > slotStart) {
          const minutes = now.getMinutes()
          const nextQuarter = Math.ceil(minutes / 15) * 15
          slotStart = setMinutes(setHours(now, now.getHours()), nextQuarter)
          
          if (slotStart >= dayEnd) continue // No slots left today
        }
      }

      while (slotStart < dayEnd) {
        const slotEnd = addMinutes(slotStart, 20) // 20-minute slots

        if (slotEnd > dayEnd) break

        // Check for conflicts
        const hasConflict = existingAppointments?.some(apt => {
          const aptStart = parseISO(apt.starts_at)
          const aptEnd = parseISO(apt.ends_at)
          return isWithinInterval(slotStart, { start: aptStart, end: aptEnd }) ||
                 isWithinInterval(slotEnd, { start: aptStart, end: aptEnd })
        })

        if (!hasConflict) {
          // Found available slot - convert back to UTC
          return {
            starts_at: zonedTimeToUtc(slotStart, merchantTz).toISOString(),
            ends_at: zonedTimeToUtc(slotEnd, merchantTz).toISOString(),
            tz: merchantTz
          }
        }

        slotStart = addMinutes(slotStart, 15) // Move to next 15-min interval
      }
    }

    // Fallback: return slot tomorrow at 10 AM
    const tomorrow = addDays(new Date(), 1)
    const fallbackStart = setMinutes(setHours(tomorrow, 10), 0)
    const fallbackEnd = addMinutes(fallbackStart, 20)

    return {
      starts_at: fallbackStart.toISOString(),
      ends_at: fallbackEnd.toISOString(),
      tz: merchantTz
    }
  }

  private isBusinessHours(): boolean {
    const now = new Date()
    const hours = now.getHours()
    const day = now.getDay()

    // Simple business hours: Mon-Fri 9-17
    if (day === 0 || day === 6) return false // Weekend
    return hours >= 9 && hours < 17
  }

  private isWithinBusinessHours(
    date: Date,
    businessHours: MerchantBusinessHours,
    timezone: string
  ): boolean {
    const zonedDate = utcToZonedTime(date, timezone)
    const dayName = format(zonedDate, 'EEE').toLowerCase() as keyof MerchantBusinessHours
    const dayHours = businessHours[dayName]

    if (!dayHours) return false

    const dayStart = this.parseTimeToDate(zonedDate, dayHours.start)
    const dayEnd = this.parseTimeToDate(zonedDate, dayHours.end)

    return isWithinInterval(zonedDate, { start: dayStart, end: dayEnd })
  }

  private parseTimeToDate(baseDate: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number)
    return setMinutes(setHours(startOfDay(baseDate), hours), minutes)
  }

  private getDefaultBusinessHours(): MerchantBusinessHours {
    const defaultHours = { start: '09:00', end: '17:00' }
    return {
      mon: defaultHours,
      tue: defaultHours,
      wed: defaultHours,
      thu: defaultHours,
      fri: defaultHours
    }
  }
}