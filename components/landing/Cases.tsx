'use client'

import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'

export default function Cases() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'

  const content = {
    de: {
      title: 'Echter Vergleich / Beispielrechnung',
      subtitle: 'Sofort verständlich, emotional stark.',
      original: 'Ursprungsangebot',
      negotiated: 'voai verhandelt',
      savings: 'Ersparnis',
      fee: 'Dein Anteil an voai (10%)',
      net: 'Dein Netto‑Gewinn',
      originalValue: 10000,
      negotiatedValue: 8500,
    },
    en: {
      title: 'Real comparison / example calculation',
      subtitle: 'Instantly clear, emotionally strong.',
      original: 'Original offer',
      negotiated: 'voai negotiates',
      savings: 'Savings',
      fee: 'Your share to voai (10%)',
      net: 'Your net gain',
      originalValue: 10000,
      negotiatedValue: 8500,
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()
  const savings = t.originalValue - t.negotiatedValue
  const fee = Math.round(savings * 0.1)
  const net = savings - fee

  return (
    <section id="beispiel" className="py-16 md:py-24 bg-gray-50">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto" data-reveal>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">{t.original}</p>
                <p className="text-3xl font-bold text-gray-900">€{t.originalValue.toLocaleString('de-DE')}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">{t.negotiated}</p>
                <p className="text-3xl font-bold text-gray-900">€{t.negotiatedValue.toLocaleString('de-DE')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">{t.savings}</p>
                <p className="text-2xl font-bold text-green-700">€{savings.toLocaleString('de-DE')}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">{t.fee}</p>
                <p className="text-2xl font-bold text-gray-900">€{fee.toLocaleString('de-DE')}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">{t.net}</p>
                <p className="text-2xl font-bold text-gray-900">€{net.toLocaleString('de-DE')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}