/**
 * MSW handlers for n8n API mocking
 * Note: This requires MSW to be installed in the consuming application
 */

export interface MockHandlerConfig {
  apiUrl: string
  webhookUrl: string
  defaultDelay?: number
}

// Mock data generators
export const mockExecutionResponse = (overrides?: Partial<any>) => ({
  executionId: `exec-${Date.now()}`,
  status: 'running',
  data: {},
  startedAt: new Date().toISOString(),
  ...overrides,
})

export const mockWorkflowStatus = (executionId: string, overrides?: Partial<any>) => ({
  id: executionId,
  status: 'running',
  progress: 50,
  currentNodeId: 'node-123',
  ...overrides,
})

export const mockWorkflowList = () => ({
  data: [
    {
      id: 'workflow-1',
      name: 'Process Upload',
      active: true,
    },
    {
      id: 'workflow-2',
      name: 'Generate Report',
      active: true,
    },
    {
      id: 'workflow-3',
      name: 'Send Notifications',
      active: false,
    },
  ],
})

/**
 * Create MSW handlers for n8n API
 * 
 * Usage in your app:
 * ```ts
 * import { http } from 'msw'
 * import { createN8nHandlers } from '@config/mocks/n8n-handlers'
 * 
 * const handlers = createN8nHandlers({
 *   apiUrl: process.env.N8N_API_URL,
 *   webhookUrl: process.env.N8N_WEBHOOK_URL,
 * }, http)
 * ```
 */
export function createN8nHandlers(
  config: MockHandlerConfig,
  http: any // MSW's http object
) {
  const { apiUrl, webhookUrl, defaultDelay = 500 } = config

  return [
    // Execute workflow via API
    http.post(`${apiUrl}/workflows/:workflowId/execute`, async ({ params, request }: any) => {
      const { workflowId } = params
      const body = await request.json()

      await new Promise(resolve => setTimeout(resolve, defaultDelay))

      return new Response(
        JSON.stringify(
          mockExecutionResponse({
            workflowId,
            data: body,
          })
        ),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }),

    // Execute workflow via webhook
    http.post(`${webhookUrl}/*`, async ({ request }: any) => {
      const body = await request.json()

      await new Promise(resolve => setTimeout(resolve, defaultDelay))

      return new Response(
        JSON.stringify(
          mockExecutionResponse({
            data: body,
          })
        ),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }),

    // Get execution status
    http.get(`${apiUrl}/executions/:executionId`, async ({ params }: any) => {
      const { executionId } = params

      await new Promise(resolve => setTimeout(resolve, defaultDelay))

      // Simulate workflow progression
      const randomStatus = Math.random()
      let status = 'running'
      let progress = Math.floor(Math.random() * 100)
      
      if (randomStatus > 0.7) {
        status = 'success'
        progress = 100
      } else if (randomStatus < 0.1) {
        status = 'failed'
      }

      return new Response(
        JSON.stringify(
          mockWorkflowStatus(executionId, {
            status,
            progress,
          })
        ),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }),

    // List workflows
    http.get(`${apiUrl}/workflows`, async () => {
      await new Promise(resolve => setTimeout(resolve, defaultDelay))

      return new Response(
        JSON.stringify(mockWorkflowList()),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }),
  ]
}

/**
 * Create handlers with predefined scenarios for testing
 */
export function createN8nScenarioHandlers(
  config: MockHandlerConfig,
  http: any,
  scenario: 'success' | 'failure' | 'timeout' | 'slow'
) {
  const baseHandlers = createN8nHandlers(config, http)

  switch (scenario) {
    case 'failure':
      return [
        http.post(`${config.apiUrl}/workflows/:workflowId/execute`, () => {
          return new Response(
            JSON.stringify({ error: 'Workflow execution failed' }),
            { status: 500 }
          )
        }),
        ...baseHandlers.slice(1),
      ]

    case 'timeout':
      return [
        http.post(`${config.apiUrl}/workflows/:workflowId/execute`, async () => {
          await new Promise(resolve => setTimeout(resolve, 35000)) // Longer than typical timeout
          return new Response(null, { status: 408 })
        }),
        ...baseHandlers.slice(1),
      ]

    case 'slow':
      return createN8nHandlers({ ...config, defaultDelay: 3000 }, http)

    default:
      return baseHandlers
  }
}