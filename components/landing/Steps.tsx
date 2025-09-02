'use client'

import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'

export default function Steps() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      title: 'Wie es funktioniert',
      subtitle: 'In 4 klaren Schritten zu deinem besseren Angebot',
      steps: [
        { number: '1', title: 'Angebot hochladen', description: 'Foto oder PDF – fertig.' },
        { number: '2', title: 'voai verhandelt', description: 'Automatisch & professionell.' },
        { number: '3', title: 'Ergebnis erhalten', description: 'Neues Angebot mit Preisnachlass.' },
        { number: '4', title: 'Nur bei Erfolg zahlen', description: '10 % Erfolgsprovision.' },
      ],
    },
    en: {
      title: 'How it works',
      subtitle: '4 clear steps to a better quote',
      steps: [
        { number: '1', title: 'Upload quote', description: 'Photo or PDF.' },
        { number: '2', title: 'voai negotiates', description: 'Automatic & professional.' },
        { number: '3', title: 'Get result', description: 'New discounted quote.' },
        { number: '4', title: 'Pay on success', description: '10% success fee.' },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()

  return (
    <section id="wie-es-funktioniert" className="py-16 md:py-24 bg-gray-50">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {t.steps.map((step, index) => (
            <div key={index} className="relative" data-reveal>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < t.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}