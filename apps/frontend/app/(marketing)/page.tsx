import Link from 'next/link'
import { Button } from '@voai/ui'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">Welcome to VOAI Enterprise</h1>
        <p className="text-xl text-muted-foreground">
          Streamline your workflow automation with our powerful platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
