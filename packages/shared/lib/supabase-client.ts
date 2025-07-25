import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // During build time, return a dummy client to avoid build errors
  if (
    typeof window === 'undefined' &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ) {
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder-anon-key')
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
