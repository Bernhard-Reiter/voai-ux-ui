import { createClient, createServerSupabaseClient } from '@voai/shared'
import { env } from '@voai/config'

describe('Supabase Client', () => {
  it('should create browser client with correct configuration', () => {
    const client = createClient()
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
    expect(client.from).toBeDefined()
  })

  it('should have required environment variables defined', () => {
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
  })

  it('should create server client', () => {
    // Mock Next.js cookies
    jest.mock('next/headers', () => ({
      cookies: jest.fn(() => ({
        getAll: jest.fn(() => []),
        set: jest.fn(),
      })),
    }))

    const serverClient = createServerSupabaseClient()
    expect(serverClient).toBeDefined()
    expect(serverClient.auth).toBeDefined()
  })
})
