'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '../lib/supabase-client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface WorkflowStatus {
  id: string
  status: 'pending' | 'running' | 'success' | 'failed'
  progress?: number
  message?: string
  result?: any
  error?: any
  updatedAt: string
}

export interface UseWorkflowStatusOptions {
  jobId: string | null
  enabled?: boolean
  onComplete?: (status: WorkflowStatus) => void
  onError?: (error: Error) => void
  onProgress?: (status: WorkflowStatus) => void
}

export interface UseWorkflowStatusReturn {
  status: WorkflowStatus | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to track workflow execution status with Supabase Realtime
 */
export function useWorkflowStatus({
  jobId,
  enabled = true,
  onComplete,
  onError,
  onProgress,
}: UseWorkflowStatusOptions): UseWorkflowStatusReturn {
  const [status, setStatus] = useState<WorkflowStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabase = createClient()

  const fetchStatus = useCallback(async () => {
    if (!jobId || !enabled) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Fetch initial status from database
      const { data, error: fetchError } = await supabase
        .from('workflow_status')
        .select('*')
        .eq('id', jobId)
        .single()

      if (fetchError) throw fetchError

      if (data) {
        setStatus(data)

        if (onProgress) {
          onProgress(data)
        }

        // Check if workflow is complete
        if (data.status === 'success' || data.status === 'failed') {
          if (onComplete) {
            onComplete(data)
          }
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch workflow status')
      setError(error)

      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [jobId, enabled, supabase, onComplete, onError, onProgress])

  const refetch = useCallback(async () => {
    await fetchStatus()
  }, [fetchStatus])

  // Set up realtime subscription
  useEffect(() => {
    if (!jobId || !enabled) {
      setStatus(null)
      return
    }

    // Initial fetch
    fetchStatus()

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`workflow:${jobId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workflow_status',
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          if (payload.new) {
            const newStatus = payload.new as WorkflowStatus
            setStatus(newStatus)

            if (onProgress) {
              onProgress(newStatus)
            }

            // Check if workflow is complete
            if (newStatus.status === 'success' || newStatus.status === 'failed') {
              if (onComplete) {
                onComplete(newStatus)
              }
            }
          }
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
  }, [jobId, enabled, supabase, fetchStatus, onComplete, onProgress])

  return {
    status,
    isLoading,
    error,
    refetch,
  }
}

/**
 * Hook to create a workflow and track its status
 */
export function useWorkflowExecution() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executeError, setExecuteError] = useState<Error | null>(null)
  const supabase = createClient()

  const execute = useCallback(
    async (workflowId: string, data?: Record<string, any>) => {
      try {
        setIsExecuting(true)
        setExecuteError(null)

        // Create workflow status entry
        const { data: workflowStatus, error: insertError } = await supabase
          .from('workflow_status')
          .insert({
            status: 'pending',
            workflow_id: workflowId,
            input_data: data,
          })
          .select()
          .single()

        if (insertError) throw insertError

        setJobId(workflowStatus.id)

        // Trigger n8n workflow (this would be your actual API call)
        // For now, we'll just simulate it
        const response = await fetch('/api/workflows/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workflowId,
            jobId: workflowStatus.id,
            data,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to execute workflow')
        }

        return workflowStatus
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to execute workflow')
        setExecuteError(error)
        throw error
      } finally {
        setIsExecuting(false)
      }
    },
    [supabase]
  )

  const status = useWorkflowStatus({
    jobId,
    enabled: !!jobId,
  })

  return {
    execute,
    jobId,
    isExecuting,
    executeError,
    ...status,
  }
}
