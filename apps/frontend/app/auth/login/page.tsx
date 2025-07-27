'use client'

import { useState } from 'react'
import { createClient } from '@voai/shared/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '../../../components/icons'
import Link from 'next/link'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })

      if (error) {
        console.error('Login error:', error)
        toast.error('Login fehlgeschlagen. Bitte versuchen Sie es erneut.')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Zurück
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Willkommen zurück</CardTitle>
            <CardDescription className="text-center">
              Melden Sie sich an, um auf Ihr Dashboard zuzugreifen
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Anmelden mit</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="w-full"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Mit Google fortfahren
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Mit der Anmeldung stimmen Sie unseren{' '}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Nutzungsbedingungen
                </Link>{' '}
                und{' '}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Datenschutzrichtlinien
                </Link>{' '}
                zu.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
