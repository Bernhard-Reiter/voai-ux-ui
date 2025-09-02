'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Closer() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Jetzt dein Angebot hochladen & sofort sparen',
      subtitle: 'Kein Risiko. Du zahlst nur, wenn du sparst.',
      cta: 'Angebot hochladen',
      ctaSecondary: 'Wie es funktioniert',
      guarantee: 'Geld‑zurück‑Garantie • 100 % unabhängig • DSGVO‑konform',
    },
    en: {
      title: 'Upload your quote now & start saving',
      subtitle: 'No risk. You only pay if you save.',
      cta: 'Upload quote',
      ctaSecondary: 'How it works',
      guarantee: 'Money‑back guarantee • 100% independent • GDPR‑compliant',
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
            <Link href="/#upload" className="btn-primary text-lg px-8 py-4">
              {t.cta}
            </Link>
            <Link href="/#wie-es-funktioniert" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
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