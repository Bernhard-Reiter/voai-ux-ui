'use client'

import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'

export default function USPGrid() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Vorteile auf einen Blick',
      subtitle: 'Warum voai für dich verhandeln sollte',
      features: [
        { icon: '✓', title: 'Null Risiko', description: 'Du zahlst nur bei Ersparnis.' },
        { icon: '✓', title: 'Schnell & einfach', description: '1 Minute Upload, wir machen den Rest.' },
        { icon: '✓', title: 'Maximaler Gewinn', description: 'Wir kämpfen härter, weil wir mitverdienen.' },
        { icon: '✓', title: 'Transparent', description: 'Keine versteckten Händlerkosten.' },
        { icon: '✓', title: 'Unabhängig', description: 'Wir arbeiten für dich, nicht für den Verkäufer.' },
        { icon: '✓', title: 'Psychologisch optimiert', description: 'KI + Profi‑Verhandlungstaktiken.' },
      ],
    },
    en: {
      title: 'Benefits at a glance',
      subtitle: 'Why voai should negotiate for you',
      features: [
        { icon: '✓', title: 'Zero risk', description: 'You only pay if you save.' },
        { icon: '✓', title: 'Fast & simple', description: '1‑minute upload; we handle the rest.' },
        { icon: '✓', title: 'Maximum gain', description: 'We fight harder because we share success.' },
        { icon: '✓', title: 'Transparent', description: 'No hidden seller fees.' },
        { icon: '✓', title: 'Independent', description: 'We work for you, not the seller.' },
        { icon: '✓', title: 'Psychology‑optimized', description: 'AI + pro negotiation tactics.' },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()

  return (
    <section id="vorteile" className="py-16 md:py-24 bg-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.features.map((feature, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow" data-reveal>
              <div className="text-2xl mb-2 text-green-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}