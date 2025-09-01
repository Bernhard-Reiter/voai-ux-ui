'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Closer() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Bereit, Ihre Spesenabrechnung zu revolutionieren?',
      subtitle: 'Schließen Sie sich über 1.000 Unternehmen an, die bereits Zeit und Geld sparen',
      cta: 'Jetzt kostenlos starten',
      ctaSecondary: 'Demo vereinbaren',
      guarantee: '30 Tage kostenlos testen • Keine Kreditkarte erforderlich • Jederzeit kündbar',
    },
    en: {
      title: 'Ready to revolutionize your expense management?',
      subtitle: 'Join over 1,000 companies already saving time and money',
      cta: 'Start for free',
      ctaSecondary: 'Book a demo',
      guarantee: '30-day free trial • No credit card required • Cancel anytime',
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/" className="btn-primary text-lg px-8 py-4">
              {t.cta}
            </Link>
            <Link href="/" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
              {t.ctaSecondary}
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            {t.guarantee}
          </p>
        </div>
      </div>
    </section>
  )
}