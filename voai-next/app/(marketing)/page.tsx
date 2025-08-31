export const dynamic = 'force-static';
export const revalidate = 3600;

import { ButtonPrimary } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <h1 className="h1">voai – einfach gespart</h1>
        <p className="body text-muted mt-4 max-w-2xl">
          Angebote hochladen. Wir verhandeln. Du sparst. Zahlung nur bei echter Ersparnis.
        </p>
        <div className="mt-8">
          <a href="/dashboard"><ButtonPrimary>Jetzt starten</ButtonPrimary></a>
        </div>
      </section>
    </main>
  );
}