import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@voai/shared/lib/supabase-server'
import { Card } from '@voai/ui'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück, {user.email}</p>
      </div>

      {/* Main Workflow Panel Placeholder */}
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-lg bg-muted p-3">
            <svg
              className="h-10 w-10 text-muted-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Main Workflow Panel</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Placeholder für Phase 5: Upload → n8n → Status Panel
            </p>
          </div>
          <div className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Coming Soon
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Workflows</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Processes</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Completed Today</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
      </div>
    </div>
  )
}
