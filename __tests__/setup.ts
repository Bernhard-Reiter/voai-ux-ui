import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfills für Node.js
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock Next.js Router
;(global as any).jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: (global as any).jest.fn(),
      replace: (global as any).jest.fn(),
      prefetch: (global as any).jest.fn(),
      back: (global as any).jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Environment Variables für Tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.N8N_API_URL = 'https://test-n8n.voai.com'
process.env.N8N_API_KEY = 'test-api-key'
process.env.N8N_WEBHOOK_URL = 'https://test-n8n.voai.com/webhook/offer-ingest'
