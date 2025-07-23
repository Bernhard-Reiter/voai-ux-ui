/**
 * n8n Workflow Client
 * Provides integration with n8n workflow automation
 */

export interface WorkflowExecutionRequest {
  workflowId: string
  data?: Record<string, any>
  webhookPath?: string
}

export interface WorkflowExecutionResponse {
  executionId: string
  status: 'running' | 'success' | 'failed' | 'waiting'
  data?: Record<string, any>
  error?: string
  startedAt: string
  finishedAt?: string
}

export interface WorkflowStatus {
  executionId: string
  status: 'running' | 'success' | 'failed' | 'waiting'
  progress?: number
  currentStep?: string
  error?: string
}

export interface N8nClientConfig {
  apiUrl: string
  apiKey: string
  webhookUrl: string
  timeout?: number
}

export class N8nClient {
  private config: N8nClientConfig

  constructor(config: N8nClientConfig) {
    this.config = {
      timeout: 30000, // 30 seconds default
      ...config,
    }
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(request: WorkflowExecutionRequest): Promise<WorkflowExecutionResponse> {
    const url = request.webhookPath
      ? `${this.config.webhookUrl}/${request.webhookPath}`
      : `${this.config.apiUrl}/workflows/${request.workflowId}/execute`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': this.config.apiKey,
      },
      body: JSON.stringify(request.data || {}),
      signal: AbortSignal.timeout(this.config.timeout!),
    })

    if (!response.ok) {
      throw new Error(`Failed to execute workflow: ${response.statusText}`)
    }

    const result = await response.json()
    
    return {
      executionId: result.executionId || result.data?.executionId || 'unknown',
      status: result.status || 'running',
      data: result.data,
      error: result.error,
      startedAt: result.startedAt || new Date().toISOString(),
      finishedAt: result.finishedAt,
    }
  }

  /**
   * Get workflow execution status
   */
  async getExecutionStatus(executionId: string): Promise<WorkflowStatus> {
    const response = await fetch(`${this.config.apiUrl}/executions/${executionId}`, {
      headers: {
        'X-N8N-API-KEY': this.config.apiKey,
      },
      signal: AbortSignal.timeout(this.config.timeout!),
    })

    if (!response.ok) {
      throw new Error(`Failed to get execution status: ${response.statusText}`)
    }

    const result = await response.json()
    
    return {
      executionId: result.id,
      status: result.status,
      progress: result.progress,
      currentStep: result.currentNodeId,
      error: result.error?.message,
    }
  }

  /**
   * Wait for workflow completion
   */
  async waitForCompletion(
    executionId: string,
    options: {
      pollInterval?: number
      maxWaitTime?: number
      onProgress?: (status: WorkflowStatus) => void
    } = {}
  ): Promise<WorkflowStatus> {
    const { pollInterval = 2000, maxWaitTime = 300000, onProgress } = options
    const startTime = Date.now()

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getExecutionStatus(executionId)
      
      if (onProgress) {
        onProgress(status)
      }

      if (status.status === 'success' || status.status === 'failed') {
        return status
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval))
    }

    throw new Error(`Workflow execution timeout after ${maxWaitTime}ms`)
  }

  /**
   * List available workflows
   */
  async listWorkflows(): Promise<Array<{ id: string; name: string; active: boolean }>> {
    const response = await fetch(`${this.config.apiUrl}/workflows`, {
      headers: {
        'X-N8N-API-KEY': this.config.apiKey,
      },
      signal: AbortSignal.timeout(this.config.timeout!),
    })

    if (!response.ok) {
      throw new Error(`Failed to list workflows: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || []
  }
}

/**
 * Create n8n client instance
 */
export function createN8nClient(config: N8nClientConfig): N8nClient {
  return new N8nClient(config)
}

/**
 * Default client factory using environment variables
 */
export function createDefaultN8nClient(): N8nClient {
  if (!process.env.N8N_API_URL || !process.env.N8N_API_KEY || !process.env.N8N_WEBHOOK_URL) {
    throw new Error('Missing required n8n environment variables')
  }

  return createN8nClient({
    apiUrl: process.env.N8N_API_URL,
    apiKey: process.env.N8N_API_KEY,
    webhookUrl: process.env.N8N_WEBHOOK_URL,
  })
}