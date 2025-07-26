'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { createClient } from '../lib/supabase-client'
import { RealtimeChannel } from '@supabase/supabase-js'

interface WorkflowStatus {
  id: string
  user_id: string
  workflow_id: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  result?: any
  metadata?: any
  created_at: string
  updated_at: string
}

export function useWorkflowStatus(workflowId: string | null) {
  const supabase = createClient()

  const fetcher = async (key: string) => {
    if (!workflowId) return null

    const { data, error } = await supabase
      .from('workflow_status')
      .select('*')
      .eq('workflow_id', workflowId)
      .single()

    if (error) throw error
    return data as WorkflowStatus
  }

  const { data, error, mutate } = useSWR(
    workflowId ? [`workflow-status`, workflowId] : null,
    fetcher,
    { refreshInterval: 5000 }
  )

  useEffect(() => {
    if (!workflowId) return

    let channel: RealtimeChannel

    const setupRealtimeSubscription = async () => {
      channel = supabase
        .channel(`workflow-status:${workflowId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'workflow_status',
            filter: `workflow_id=eq.${workflowId}`,
          },
          (payload) => {
            if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
              mutate(payload.new as WorkflowStatus, false)
            }
          }
        )
        .subscribe()
    }

    setupRealtimeSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [workflowId, supabase, mutate])

  return {
    data,
    error,
    isLoading: !error && !data && workflowId !== null,
    mutate,
  }
}
