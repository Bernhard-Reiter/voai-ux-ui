import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@voai/ui';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth');
  }

  // Fetch user's negotiations
  const { data: negotiations } = await supabase
    .from('negotiations')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="ghost">
              Sign Out
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Negotiations</CardTitle>
              <div className="text-3xl font-bold">{negotiations?.length || 0}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active</CardTitle>
              <div className="text-3xl font-bold">
                {negotiations?.filter(n => n.status === 'active').length || 0}
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <div className="text-3xl font-bold">
                {negotiations?.filter(n => n.status === 'completed').length || 0}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Negotiations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Negotiations</CardTitle>
              <Button size="sm">New Negotiation</Button>
            </div>
          </CardHeader>
          <CardContent>
            {negotiations && negotiations.length > 0 ? (
              <div className="space-y-4">
                {negotiations.map((negotiation) => (
                  <div key={negotiation.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{negotiation.title}</h3>
                      <p className="text-sm text-gray-600">{negotiation.description}</p>
                    </div>
                    <Badge variant={
                      negotiation.status === 'active' ? 'success' :
                      negotiation.status === 'completed' ? 'default' :
                      negotiation.status === 'draft' ? 'secondary' :
                      'outline'
                    }>
                      {negotiation.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No negotiations yet. Create your first one!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}