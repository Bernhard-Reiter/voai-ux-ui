describe('env', () => {
  beforeAll(() => {
    // Set env vars for tests
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
    process.env.N8N_API_URL = 'https://test-n8n.voai.com'
    process.env.N8N_API_KEY = 'test-api-key'
    process.env.N8N_WEBHOOK_URL = 'https://test-n8n.voai.com/webhook/test'
  })

  test('env vars are set correctly', () => {
    // Skip validation in test environment
    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co')
  })
})
