'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '../lib/supabase-client'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signOut: async () => {},
})

export function AuthProviderSafe({ children }: { children: React.ReactNode }) {
  const [supabaseClient, setSupabaseClient] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Check if Supabase env vars are available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const client = createClient()
        setSupabaseClient(client)

        // Get initial session
        client.auth
          .getSession()
          .then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
          })
          .catch((err) => {
            console.error('Auth session error:', err)
            setLoading(false)
          })

        // Listen for auth changes
        const {
          data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })

        return () => subscription.unsubscribe()
      } else {
        console.warn('Supabase environment variables not configured. Auth features disabled.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const signOut = async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut()
    }
  }

  // If no Supabase client, just render children without auth
  if (!supabaseClient) {
    return (
      <AuthContext.Provider value={{ user: null, loading: false, signOut }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
    </SessionContextProvider>
  )
}

export const useAuthSafe = () => {
  const context = useContext(AuthContext)
  if (!context) {
    // Return safe defaults if no context
    return { user: null, loading: false, signOut: async () => {} }
  }
  return context
}
