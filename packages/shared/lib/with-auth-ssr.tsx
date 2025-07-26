import { createServerSupabaseClient } from './supabase-server'
import { redirect } from 'next/navigation'
import { ReactElement } from 'react'

export function withAuthSsr<T extends Record<string, any>>(
  Component: (props: T) => ReactElement | Promise<ReactElement>
) {
  return async function AuthenticatedComponent(props: T) {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      redirect('/login')
    }

    return <Component {...props} user={user} />
  }
}
