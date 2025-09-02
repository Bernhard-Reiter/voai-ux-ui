'use client'

import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'

export default function Promises() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Versprechen & Garantien',
      subtitle: 'Kein Risiko, kein Aufwand – 100 % vertraulich.',
      promises: [
        { icon: '✓', title: 'Geld‑zurück‑Garantie', description: 'Wenn keine Ersparnis, dann volle Erstattung.' },
        { icon: '✓', title: '100 % vertraulich', description: 'DSGVO‑konform, sichere Verarbeitung.' },
        { icon: '✓', title: 'Kein Aufwand', description: 'Upload reicht – wir übernehmen den Rest.' },
        { icon: '✓', title: 'Unabhängig', description: 'Wir verhandeln in deinem Interesse, nicht im Händler‑Interesse.' },
      ],
    },
    en: {
      title: 'Promises & guarantees',
      subtitle: 'No risk, no effort – fully confidential.',
      promises: [
        { icon: '✓', title: 'Money‑back guarantee', description: 'Full refund if no savings.' },
        { icon: '✓', title: '100% confidential', description: 'GDPR‑compliant, secure processing.' },
        { icon: '✓', title: 'No effort', description: 'Upload is enough – we handle the rest.' },
        { icon: '✓', title: 'Independent', description: 'We negotiate in your interest, not the seller’s.' },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {t.promises.map((promise, index) => (
            <div key={index} className="text-center" data-reveal>
              <div className="text-2xl mb-2 text-green-600">{promise.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {promise.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}