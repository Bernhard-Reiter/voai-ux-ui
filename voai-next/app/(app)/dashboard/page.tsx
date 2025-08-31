import { auth } from "@/lib/auth/supabase-server";

export default async function DashboardPage() {
  const user = await auth();
  if (!user) return <div className="p-6 body">Bitte einloggen.</div>;
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="h2">Deine Angebote</h2>
      <p className="body text-muted mt-2">Uploads, Einsparungen, Erfolgsquote – bald hier.</p>
    </div>
  );
}