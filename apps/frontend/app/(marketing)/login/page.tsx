'use client'

import Link from 'next/link'
import { Button, Card } from '@voai/ui'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <Link href="/dashboard" className="block">
            <Button
              className="w-full"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('auth-token', 'mock-token')
                }
              }}
            >
              Sign in
            </Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Phase 4 will implement real Supabase auth
          </p>
        </div>
      </Card>
    </div>
  )
}
