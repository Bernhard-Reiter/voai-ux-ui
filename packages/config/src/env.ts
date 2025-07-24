import { z } from 'zod'

// Base environment schema used across all apps
export const baseEnvSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // n8n Workflow Integration
  N8N_API_URL: z.string().url(),
  N8N_API_KEY: z.string().min(1),
  N8N_WEBHOOK_URL: z.string().url(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  NEXT_PUBLIC_ENABLE_SENTRY: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
})

// Frontend-specific environment schema
export const frontendEnvSchema = baseEnvSchema.extend({
  // URLs
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

  // Sentry
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),

  // Additional Feature Flags
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  // Vercel
  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
})

// CRM-specific environment schema
export const crmEnvSchema = baseEnvSchema.extend({
  // CRM-specific URLs
  NEXT_PUBLIC_CRM_URL: z.string().url().default('http://localhost:3001'),

  // CRM API
  CRM_API_URL: z.string().url().optional(),
  CRM_API_KEY: z.string().min(1).optional(),

  // Integrations
  STRIPE_API_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
})

// Workflow-specific environment schema
export const workflowEnvSchema = baseEnvSchema.extend({
  // Workflow-specific settings
  WORKFLOW_EXECUTION_TIMEOUT: z.string().transform(Number).default('300000'), // 5 minutes
  WORKFLOW_MAX_RETRIES: z.string().transform(Number).default('3'),

  // Queue settings
  REDIS_URL: z.string().url().optional(),
  QUEUE_CONCURRENCY: z.string().transform(Number).default('10'),
})

// Type exports
export type BaseEnv = z.infer<typeof baseEnvSchema>
export type FrontendEnv = z.infer<typeof frontendEnvSchema>
export type CRMEnv = z.infer<typeof crmEnvSchema>
export type WorkflowEnv = z.infer<typeof workflowEnvSchema>

// Validation helper
export function validateEnv<T extends z.ZodType>(
  schema: T,
  env: Record<string, unknown>
): z.infer<T> {
  try {
    return schema.parse(env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
      throw new Error('Invalid environment variables')
    }
    throw error
  }
}

// Environment helpers
export const isProduction = (env: { NODE_ENV?: string }) => env.NODE_ENV === 'production'
export const isDevelopment = (env: { NODE_ENV?: string }) => env.NODE_ENV === 'development'
export const isTest = (env: { NODE_ENV?: string }) => env.NODE_ENV === 'test'
