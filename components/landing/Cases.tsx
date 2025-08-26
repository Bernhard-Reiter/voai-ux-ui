'use client'

import { useSearchParams } from 'next/navigation'

export default function Cases() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Erfolgsgeschichten unserer Kunden',
      subtitle: 'So profitieren Unternehmen von voai',
      cases: [
        {
          company: 'TechStart GmbH',
          industry: 'IT-Dienstleistungen',
          employees: '50 Mitarbeiter',
          quote: 'Früher haben wir 2 Tage im Monat nur für Spesenabrechnungen gebraucht. Mit voai sind es jetzt 2 Stunden.',
          author: 'Sarah Meyer',
          role: 'CFO',
          result: '90% Zeitersparnis',
        },
        {
          company: 'Beratung Plus AG',
          industry: 'Unternehmensberatung',
          employees: '200 Mitarbeiter',
          quote: 'Die automatische Kategorisierung und Integration in DATEV spart uns nicht nur Zeit, sondern auch Nerven.',
          author: 'Thomas Schmidt',
          role: 'Head of Finance',
          result: '15.000€ Ersparnis/Jahr',
        },
        {
          company: 'Vertrieb Direkt KG',
          industry: 'Außendienst',
          employees: '120 Mitarbeiter',
          quote: 'Unsere Außendienstler können Belege direkt unterwegs erfassen. Die Buchhaltung hat alles sofort im System.',
          author: 'Julia Wagner',
          role: 'Leiterin Buchhaltung',
          result: '100% digitale Belege',
        },
      ],
    },
    en: {
      title: 'Customer success stories',
      subtitle: 'How companies benefit from voai',
      cases: [
        {
          company: 'TechStart GmbH',
          industry: 'IT Services',
          employees: '50 employees',
          quote: 'We used to spend 2 days a month just on expense reports. With voai, it\'s now 2 hours.',
          author: 'Sarah Meyer',
          role: 'CFO',
          result: '90% time savings',
        },
        {
          company: 'Consulting Plus AG',
          industry: 'Business Consulting',
          employees: '200 employees',
          quote: 'Automatic categorization and DATEV integration saves us not only time but also nerves.',
          author: 'Thomas Schmidt',
          role: 'Head of Finance',
          result: '€15,000 savings/year',
        },
        {
          company: 'Sales Direct KG',
          industry: 'Field Sales',
          employees: '120 employees',
          quote: 'Our field staff can capture receipts on the go. Accounting has everything in the system immediately.',
          author: 'Julia Wagner',
          role: 'Head of Accounting',
          result: '100% digital receipts',
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
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.cases.map((case_, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{case_.company}</h3>
                <p className="text-sm text-gray-500">{case_.industry} • {case_.employees}</p>
              </div>
              
              <blockquote className="mb-6">
                <p className="text-gray-600 italic mb-4">&ldquo;{case_.quote}&rdquo;</p>
                <footer className="text-sm">
                  <p className="font-medium text-gray-900">{case_.author}</p>
                  <p className="text-gray-500">{case_.role}</p>
                </footer>
              </blockquote>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-green-600 font-semibold">{case_.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}