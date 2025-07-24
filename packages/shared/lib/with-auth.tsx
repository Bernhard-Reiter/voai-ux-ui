'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Higher-order component that provides authentication guard functionality.
 * Redirects to login page if no session is detected.
 *
 * @example
 * ```tsx
 * export default withAuth(DashboardPage)
 * ```
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter()

    useEffect(() => {
      // TODO: Replace with actual Supabase session check in Phase 4
      const checkAuth = async () => {
        // Temporary: Check for a mock auth token in localStorage
        const isAuthenticated =
          typeof window !== 'undefined' &&
          (localStorage.getItem('auth-token') || process.env.NODE_ENV === 'development')

        if (!isAuthenticated) {
          router.push('/login')
        }
      }

      checkAuth()
    }, [router])

    // TODO: Add loading state while checking auth
    return <Component {...props} />
  }
}
