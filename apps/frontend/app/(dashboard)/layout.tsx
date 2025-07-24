'use client'

import { DashboardShell } from '@voai/ui'
import { useAuth, createClient } from '@voai/shared'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <DashboardShell onLogout={handleLogout} userEmail={user?.email}>
      {children}
    </DashboardShell>
  )
}
