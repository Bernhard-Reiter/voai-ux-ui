'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Hero() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      headline: 'Spesenabrechnungen in 3 Minuten statt 3 Stunden',
      subheadline: 'Reduzieren Sie Ihren Verwaltungsaufwand um 80% mit automatisierter Spesenabrechnung',
      cta: 'Jetzt kostenlos testen',
      ctaSecondary: 'Demo anfordern',
      trustedBy: 'Vertrauen Sie auf voai wie über 1.000 Unternehmen',
    },
    en: {
      headline: 'Expense reports in 3 minutes instead of 3 hours',
      subheadline: 'Reduce your administrative effort by 80% with automated expense management',
      cta: 'Try for free',
      ctaSecondary: 'Request demo',
      trustedBy: 'Trusted by over 1,000 companies',
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-width">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {t.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn-primary text-lg px-8 py-4">
              {t.cta}
            </Link>
            <Link href="/" className="btn-secondary text-lg px-8 py-4">
              {t.ctaSecondary}
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            {t.trustedBy}
          </p>
        </div>
      </div>
    </section>
  )
}