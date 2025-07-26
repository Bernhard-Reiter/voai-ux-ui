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
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient, setSupabaseClient] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      // Check if environment variables are set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase environment variables not configured. Auth features disabled.')
        setLoading(false)
        return
      }

      // Initialize Supabase client
      const client = createClient()
      setSupabaseClient(client)

      // Get initial session
      client.auth
        .getSession()
        .then(({ data: { session } }) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to get session:', error)
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
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      setLoading(false)
    }
  }, [])

  const signOut = async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut()
    }
  }

  // If no Supabase client available, render without SessionContextProvider
  if (!supabaseClient) {
    return (
      <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
    )
  }

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
    </SessionContextProvider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
