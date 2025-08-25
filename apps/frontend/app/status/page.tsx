'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface WorkflowJob {
  id: string
  status: string
  result?: any
  created_at: string
  completed_at?: string
  file_name?: string
}

interface WorkflowStatus {
  id: string
  status: string
  message: string
  progress: number
  created_at: string
}

interface NegotiationEvent {
  id: string
  type: string
  data: any
  created_at: string
}

interface NegotiationAppointment {
  id: string
  starts_at: string
  ends_at: string
  status: string
  ics_uid?: string
}

export default function StatusPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  
  const [job, setJob] = useState<WorkflowJob | null>(null)
  const [statuses, setStatuses] = useState<WorkflowStatus[]>([])
  const [events, setEvents] = useState<NegotiationEvent[]>([])
  const [appointment, setAppointment] = useState<NegotiationAppointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId) {
      setError('Keine Job-ID angegeben')
      setLoading(false)
      return
    }

    // Initial data fetch
    fetchData()

    // Setup realtime subscriptions
    const jobChannel = supabase
      .channel(`job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workflow_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          setJob(payload.new as WorkflowJob)
        }
      )
      .subscribe()

    const statusChannel = supabase
      .channel(`status-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'workflow_status',
          filter: `job_id=eq.${jobId}`
        },
        (payload) => {
          setStatuses(prev => [...prev, payload.new as WorkflowStatus])
        }
      )
      .subscribe()

    const eventChannel = supabase
      .channel(`events-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'negotiation_events',
          filter: `job_id=eq.${jobId}`
        },
        (payload) => {
          setEvents(prev => [...prev, payload.new as NegotiationEvent])
        }
      )
      .subscribe()

    // Cleanup
    return () => {
      jobChannel.unsubscribe()
      statusChannel.unsubscribe()
      eventChannel.unsubscribe()
    }
  }, [jobId])

  async function fetchData() {
    try {
      // Fetch job
      const { data: jobData, error: jobError } = await supabase
        .from('workflow_jobs')
        .select('*')
        .eq('id', jobId)
        .single()

      if (jobError) throw jobError
      setJob(jobData)

      // Fetch statuses
      const { data: statusData } = await supabase
        .from('workflow_status')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: true })

      setStatuses(statusData || [])

      // Fetch events
      const { data: eventData } = await supabase
        .from('negotiation_events')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: true })

      setEvents(eventData || [])

      // Fetch appointment
      const { data: appointmentData } = await supabase
        .from('negotiation_appointments')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (appointmentData) {
        setAppointment(appointmentData)
      }

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status: string) {
    const colors = {
      queued: 'bg-gray-500',
      ingest_running: 'bg-blue-500',
      ingest_completed: 'bg-green-500',
      analysis_running: 'bg-blue-500',
      analysis_completed: 'bg-green-500',
      calling: 'bg-yellow-500',
      scheduled: 'bg-purple-500',
      completed: 'bg-green-600',
      failed: 'bg-red-500',
      paid: 'bg-green-700'
    }
    return colors[status] || 'bg-gray-400'
  }

  function getStatusLabel(status: string) {
    const labels = {
      queued: 'In Warteschlange',
      ingest_running: 'Dokument wird verarbeitet',
      ingest_completed: 'Dokument verarbeitet',
      analysis_running: 'Analyse läuft',
      analysis_completed: 'Analyse abgeschlossen',
      calling: 'Anruf läuft',
      scheduled: 'Termin geplant',
      completed: 'Abgeschlossen',
      failed: 'Fehlgeschlagen',
      paid: 'Bezahlt'
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Status...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Fehler</h2>
          <p className="text-red-600">{error || 'Job nicht gefunden'}</p>
        </div>
      </div>
    )
  }

  const latestStatus = statuses[statuses.length - 1]
  const progress = latestStatus?.progress || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verhandlungsstatus
          </h1>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Job ID:</span>
              <span className="ml-2 font-mono text-xs">{job.id}</span>
            </div>
            <div>
              <span className="text-gray-500">Datei:</span>
              <span className="ml-2">{job.file_name || 'Unbekannt'}</span>
            </div>
            <div>
              <span className="text-gray-500">Erstellt:</span>
              <span className="ml-2">
                {format(new Date(job.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${getStatusColor(job.status)}`}>
                {getStatusLabel(job.status)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Fortschritt</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Result */}
        {job.result && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Ergebnis</h2>
            
            <div className="space-y-4">
              {job.result.summary && (
                <div>
                  <h3 className="font-medium text-gray-700">Zusammenfassung</h3>
                  <p className="mt-1 text-gray-600">{job.result.summary}</p>
                </div>
              )}
              
              {job.result.savingsCents > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700">Einsparpotenzial</h3>
                  <p className="mt-1 text-2xl font-bold text-green-600">
                    {(job.result.savingsCents / 100).toFixed(2)} €
                  </p>
                </div>
              )}
              
              {job.result.recommendedActions && (
                <div>
                  <h3 className="font-medium text-gray-700">Empfohlene Maßnahmen</h3>
                  <ul className="mt-1 list-disc list-inside text-gray-600">
                    {job.result.recommendedActions.map((action: string, i: number) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointment */}
        {appointment && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Termin</h2>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Datum:</span>
                <span className="ml-2">
                  {format(new Date(appointment.starts_at), 'dd.MM.yyyy', { locale: de })}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Uhrzeit:</span>
                <span className="ml-2">
                  {format(new Date(appointment.starts_at), 'HH:mm', { locale: de })} - 
                  {format(new Date(appointment.ends_at), 'HH:mm', { locale: de })} Uhr
                </span>
              </div>
              {appointment.ics_uid && (
                <div className="mt-4">
                  <a
                    href={`/api/calendar/download?appointmentId=${appointment.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Kalendereinladung herunterladen
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Verlauf</h2>
          
          <div className="space-y-4">
            {statuses.map((status, index) => (
              <div key={status.id} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${getStatusColor(status.status)}`} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {status.message}
                    </p>
                    <time className="text-xs text-gray-500">
                      {format(new Date(status.created_at), 'HH:mm:ss')}
                    </time>
                  </div>
                  {index < statuses.length - 1 && (
                    <div className="ml-1.5 mt-2 h-8 border-l-2 border-gray-200" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}