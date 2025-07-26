'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '../lib/supabase-client'
import { useState } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClient())

  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
}
