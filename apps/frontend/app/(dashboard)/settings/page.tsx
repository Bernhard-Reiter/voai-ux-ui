import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@voai/shared/lib/supabase-server'
import SettingsClient from './settings-client'

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return <SettingsClient user={user} />
}
