import { SupabaseClient } from '@supabase/supabase-js'
import { createEvent, EventAttributes } from 'ics'
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export class CalendarService {
  constructor(private supabase: SupabaseClient) {}

  async createICS(appointment: any): Promise<string> {
    const start = new Date(appointment.starts_at)
    const end = new Date(appointment.ends_at)

    const event: EventAttributes = {
      start: [
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate(),
        start.getHours(),
        start.getMinutes()
      ],
      end: [
        end.getFullYear(),
        end.getMonth() + 1,
        end.getDate(),
        end.getHours(),
        end.getMinutes()
      ],
      title: 'VoAI Verhandlungstermin',
      description: `Automatischer Verhandlungstermin für Ihre Angebotsoptimierung.
      
Wir werden Sie zur vereinbarten Zeit anrufen, um Ihr Einsparpotenzial zu besprechen.

Bei Fragen erreichen Sie uns unter support@voai.de`,
      location: 'Telefonisch',
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: {
        name: 'VoAI',
        email: 'termine@voai.de'
      },
      attendees: appointment.customers ? [
        {
          name: appointment.customers.name,
          email: appointment.customers.email,
          rsvp: true,
          role: 'REQ-PARTICIPANT'
        }
      ] : [],
      categories: ['VoAI', 'Verhandlung'],
      alarms: [
        {
          action: 'display',
          description: 'Erinnerung: VoAI Verhandlungstermin in 15 Minuten',
          trigger: { minutes: 15, before: true }
        }
      ],
      uid: appointment.ics_uid || `${appointment.id}@voai.de`,
      sequence: 0,
      productId: 'VoAI//Negotiation//DE'
    }

    return new Promise((resolve, reject) => {
      createEvent(event, (error, value) => {
        if (error) {
          reject(error)
        } else {
          resolve(value)
        }
      })
    })
  }

  async sendInvite(appointment: any): Promise<void> {
    const icsContent = await this.createICS(appointment)

    // Update appointment with ICS UID
    if (!appointment.ics_uid) {
      await this.supabase
        .from('negotiation_appointments')
        .update({ ics_uid: `${appointment.id}@voai.de` })
        .eq('id', appointment.id)
    }

    // In production, this would send an email with the ICS attachment
    // For now, we'll store it as metadata
    await this.supabase
      .from('negotiation_appointments')
      .update({
        metadata: {
          ...appointment.metadata,
          ics_sent: true,
          ics_sent_at: new Date().toISOString()
        }
      })
      .eq('id', appointment.id)

    // Create event
    await this.supabase.from('negotiation_events').insert({
      job_id: appointment.job_id,
      appointment_id: appointment.id,
      type: 'scheduled',
      data: {
        starts_at: appointment.starts_at,
        ends_at: appointment.ends_at,
        ics_sent: true
      }
    })
  }

  async sendReminder(appointment: any): Promise<void> {
    const start = new Date(appointment.starts_at)
    const formattedTime = format(start, 'HH:mm')
    const formattedDate = format(start, 'dd.MM.yyyy')

    const reminderText = `
Erinnerung: VoAI Verhandlungstermin

Ihr Termin: ${formattedDate} um ${formattedTime} Uhr
Dauer: ca. 20 Minuten

Wir rufen Sie zur vereinbarten Zeit unter ${appointment.customers?.phone || 'Ihrer hinterlegten Nummer'} an.

Bitte halten Sie Ihre Unterlagen bereit.

Mit freundlichen Grüßen
Ihr VoAI Team
`

    // In production, this would send SMS/Email
    // For now, we'll log and store metadata
    await this.supabase
      .from('negotiation_appointments')
      .update({
        reminder_sent: true,
        metadata: {
          ...appointment.metadata,
          reminder_sent_at: new Date().toISOString(),
          reminder_text: reminderText
        }
      })
      .eq('id', appointment.id)
  }

  async rescheduleAppointment(
    appointmentId: string,
    newStart: Date,
    newEnd: Date
  ): Promise<void> {
    const { data: appointment } = await this.supabase
      .from('negotiation_appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    if (!appointment) {
      throw new Error('Appointment not found')
    }

    // Update appointment
    await this.supabase
      .from('negotiation_appointments')
      .update({
        starts_at: newStart.toISOString(),
        ends_at: newEnd.toISOString(),
        status: 'scheduled',
        reminder_sent: false,
        metadata: {
          ...appointment.metadata,
          rescheduled: true,
          rescheduled_at: new Date().toISOString(),
          previous_start: appointment.starts_at
        }
      })
      .eq('id', appointmentId)

    // Send new invite
    const updatedAppointment = {
      ...appointment,
      starts_at: newStart.toISOString(),
      ends_at: newEnd.toISOString()
    }

    await this.sendInvite(updatedAppointment)
  }
}