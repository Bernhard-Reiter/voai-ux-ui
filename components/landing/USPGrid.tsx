'use client'

import { useSearchParams } from 'next/navigation'

export default function USPGrid() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Alle Vorteile auf einen Blick',
      subtitle: 'Warum sich über 1.000 Unternehmen für voai entscheiden',
      features: [
        {
          icon: '⏱',
          title: '80% Zeitersparnis',
          description: 'Reduzieren Sie den Aufwand für Spesenabrechnungen von Stunden auf Minuten',
        },
        {
          icon: '✓',
          title: 'GoBD-konform',
          description: 'Vollständig rechtssicher und finanzamtkonform nach deutschen Standards',
        },
        {
          icon: '🔄',
          title: 'Nahtlose Integration',
          description: 'Verbindet sich automatisch mit Ihrer bestehenden Buchhaltungssoftware',
        },
        {
          icon: '📱',
          title: 'Mobile App',
          description: 'Belege unterwegs erfassen - verfügbar für iOS und Android',
        },
        {
          icon: '🔒',
          title: 'DSGVO-konform',
          description: 'Ihre Daten sind sicher bei uns - gehostet in Deutschland',
        },
        {
          icon: '📊',
          title: 'Echtzeit-Reporting',
          description: 'Behalten Sie Ihre Ausgaben immer im Blick mit Live-Dashboards',
        },
      ],
    },
    en: {
      title: 'All benefits at a glance',
      subtitle: 'Why over 1,000 companies choose voai',
      features: [
        {
          icon: '⏱',
          title: '80% time savings',
          description: 'Reduce expense report processing from hours to minutes',
        },
        {
          icon: '✓',
          title: 'Tax compliant',
          description: 'Fully compliant with German tax regulations and standards',
        },
        {
          icon: '🔄',
          title: 'Seamless integration',
          description: 'Automatically connects with your existing accounting software',
        },
        {
          icon: '📱',
          title: 'Mobile app',
          description: 'Capture receipts on the go - available for iOS and Android',
        },
        {
          icon: '🔒',
          title: 'GDPR compliant',
          description: 'Your data is secure - hosted in Germany',
        },
        {
          icon: '📊',
          title: 'Real-time reporting',
          description: 'Keep track of expenses with live dashboards',
        },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <section className="py-16 md:py-24 bg-white">
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
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
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