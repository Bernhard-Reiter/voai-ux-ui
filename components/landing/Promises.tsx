'use client'

import { useSearchParams } from 'next/navigation'

export default function Promises() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Das voai Versprechen',
      subtitle: 'Wir stehen für Qualität und Kundenzufriedenheit',
      promises: [
        {
          icon: '🚀',
          title: 'Schnelle Einrichtung',
          description: 'In weniger als 24 Stunden einsatzbereit - garantiert',
        },
        {
          icon: '💬',
          title: 'Persönlicher Support',
          description: 'Deutschsprachiger Kundensupport per Telefon, E-Mail und Chat',
        },
        {
          icon: '💰',
          title: 'Transparente Preise',
          description: 'Keine versteckten Kosten, keine Überraschungen',
        },
        {
          icon: '🔄',
          title: '30 Tage Geld-zurück',
          description: 'Testen Sie voai risikofrei - bei Nichtgefallen erstatten wir den vollen Betrag',
        },
      ],
    },
    en: {
      title: 'The voai Promise',
      subtitle: 'We stand for quality and customer satisfaction',
      promises: [
        {
          icon: '🚀',
          title: 'Quick setup',
          description: 'Ready to use in less than 24 hours - guaranteed',
        },
        {
          icon: '💬',
          title: 'Personal support',
          description: 'German-speaking customer support via phone, email and chat',
        },
        {
          icon: '💰',
          title: 'Transparent pricing',
          description: 'No hidden costs, no surprises',
        },
        {
          icon: '🔄',
          title: '30-day money-back',
          description: 'Try voai risk-free - full refund if not satisfied',
        },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]

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
            <div key={index} className="text-center">
              <div className="text-5xl mb-4">{promise.icon}</div>
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