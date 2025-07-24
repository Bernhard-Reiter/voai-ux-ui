import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from './supabase-server'

export function withAuthSsr<P extends Record<string, any>>(
  Component: React.ComponentType<P & { user: any }>
) {
  return async function AuthComponent(props: P) {
    const supabase = createServerSupabaseClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/login')
    }

    return <Component {...props} user={user} />
  }
}
