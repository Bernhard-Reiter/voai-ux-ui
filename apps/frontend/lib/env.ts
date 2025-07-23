import { z } from 'zod'
import { frontendEnvSchema, validateEnv as validateEnvBase, FrontendEnv } from '@config'

// Use the shared frontend schema
const envSchema = frontendEnvSchema

// Separate schemas for build time vs runtime
const buildEnvSchema = envSchema.pick({
  NODE_ENV: true,
  SENTRY_AUTH_TOKEN: true,
  SENTRY_ORG: true,
  SENTRY_PROJECT: true,
})

const publicEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
  NEXT_PUBLIC_SENTRY_DSN: true,
  NEXT_PUBLIC_POSTHOG_KEY: true,
  NEXT_PUBLIC_POSTHOG_HOST: true,
  NEXT_PUBLIC_ENABLE_ANALYTICS: true,
  NEXT_PUBLIC_ENABLE_SENTRY: true,
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: true,
})

const serverEnvSchema = envSchema.omit({
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
  NEXT_PUBLIC_SENTRY_DSN: true,
  NEXT_PUBLIC_POSTHOG_KEY: true,
  NEXT_PUBLIC_POSTHOG_HOST: true,
  NEXT_PUBLIC_ENABLE_ANALYTICS: true,
  NEXT_PUBLIC_ENABLE_SENTRY: true,
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: true,
})

// Type exports
export type Env = FrontendEnv
export type BuildEnv = z.infer<typeof buildEnvSchema>
export type PublicEnv = z.infer<typeof publicEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>

// Parse and validate
function validateEnv() {
  return validateEnvBase(envSchema, process.env)
}

// Export validated env
export const env = process.env.NODE_ENV === 'test' ? (process.env as any) : validateEnv()

// Helper to get public runtime config
export function getPublicEnv(): PublicEnv {
  return publicEnvSchema.parse(env)
}

// Helper to get server runtime config
export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse(env)
}

export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
