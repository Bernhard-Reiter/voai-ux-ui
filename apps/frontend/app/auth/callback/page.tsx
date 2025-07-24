'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@voai/shared/lib/supabase-client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      // Get the code from URL
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        try {
          await supabase.auth.exchangeCodeForSession(code)
        } catch (error) {
          console.error('Error exchanging code for session:', error)
        }
      }

      // Redirect to dashboard
      router.push('/dashboard')
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Logging you in...</h2>
        <p className="text-muted-foreground mt-2">Please wait while we complete your login.</p>
      </div>
    </div>
  )
}
