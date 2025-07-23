import { useState, useEffect, useCallback, useRef } from 'react'
import { WorkflowStatus, N8nClient } from '@config/services'

export interface UseWorkflowStatusOptions {
  client: N8nClient
  executionId: string | null
  pollInterval?: number
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
  cancel: () => void
}

/**
 * Hook to track workflow execution status
 */
export function useWorkflowStatus({
  client,
  executionId,
  pollInterval = 2000,
  enabled = true,
  onComplete,
  onError,
  onProgress,
}: UseWorkflowStatusOptions): UseWorkflowStatusReturn {
  const [status, setStatus] = useState<WorkflowStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  const cancel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const fetchStatus = useCallback(async () => {
    if (!executionId || !enabled) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const newStatus = await client.getExecutionStatus(executionId)
      
      if (!isMountedRef.current) return
      
      setStatus(newStatus)
      
      if (onProgress) {
        onProgress(newStatus)
      }
      
      // Check if workflow is complete
      if (newStatus.status === 'success' || newStatus.status === 'failed') {
        cancel()
        if (onComplete) {
          onComplete(newStatus)
        }
      }
    } catch (err) {
      if (!isMountedRef.current) return
      
      const error = err instanceof Error ? err : new Error('Failed to fetch workflow status')
      setError(error)
      cancel()
      
      if (onError) {
        onError(error)
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [client, executionId, enabled, cancel, onComplete, onError, onProgress])

  const refetch = useCallback(async () => {
    await fetchStatus()
  }, [fetchStatus])

  // Initial fetch and polling setup
  useEffect(() => {
    if (!executionId || !enabled) {
      setStatus(null)
      return
    }

    // Initial fetch
    fetchStatus()

    // Set up polling
    intervalRef.current = setInterval(fetchStatus, pollInterval)

    return () => {
      cancel()
    }
  }, [executionId, enabled, pollInterval, fetchStatus, cancel])

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    
    return () => {
      isMountedRef.current = false
      cancel()
    }
  }, [cancel])

  return {
    status,
    isLoading,
    error,
    refetch,
    cancel,
  }
}

/**
 * Hook to execute and track a workflow
 */
export function useWorkflowExecution(client: N8nClient) {
  const [executionId, setExecutionId] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executeError, setExecuteError] = useState<Error | null>(null)

  const execute = useCallback(async (workflowId: string, data?: Record<string, any>) => {
    try {
      setIsExecuting(true)
      setExecuteError(null)
      
      const response = await client.executeWorkflow({
        workflowId,
        data,
      })
      
      setExecutionId(response.executionId)
      return response
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to execute workflow')
      setExecuteError(error)
      throw error
    } finally {
      setIsExecuting(false)
    }
  }, [client])

  const status = useWorkflowStatus({
    client,
    executionId,
    enabled: !!executionId,
  })

  return {
    execute,
    executionId,
    isExecuting,
    executeError,
    ...status,
  }
}