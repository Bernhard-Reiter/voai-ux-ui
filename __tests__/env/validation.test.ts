import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

describe('Environment Configuration', () => {
  test('.env.example contains all required variables', () => {
    const envExample = dotenv.parse(
      fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf-8')
    )

    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'N8N_API_URL',
      'N8N_API_KEY',
      'N8N_WEBHOOK_URL',
    ]

    for (const varName of requiredVars) {
      expect(envExample[varName]).toBeDefined()
    }
  })

  test('env schema validates correctly', async () => {
    // Dynamischer Import für ESM Module
    const { env, getPublicEnv, getServerEnv } = await import('../../apps/frontend/lib/env')

    expect(env).toBeDefined()
    expect(env.NODE_ENV).toBe('test')

    const publicEnv = getPublicEnv()
    expect(publicEnv.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co')

    const serverEnv = getServerEnv()
    expect(serverEnv.N8N_API_KEY).toBe('test-api-key')
  })

  test('feature flags parse correctly', async () => {
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true'
    process.env.NEXT_PUBLIC_ENABLE_SENTRY = 'false'

    // Module Cache leeren für fresh import
    jest.resetModules()

    const { env } = await import('../../apps/frontend/lib/env')

    expect(env.NEXT_PUBLIC_ENABLE_ANALYTICS).toBe(true)
    expect(env.NEXT_PUBLIC_ENABLE_SENTRY).toBe(false)
  })

  test('missing required variables throw error', async () => {
    const originalEnv = process.env

    // Temporarily remove required env vars
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      N8N_API_URL: undefined,
    }

    jest.resetModules()

    await expect(import('../../apps/frontend/lib/env')).rejects.toThrow(
      'Invalid environment variables'
    )

    // Restore env
    process.env = originalEnv
  })
})
