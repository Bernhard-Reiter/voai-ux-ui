'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'

export default function FAQ() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const content = {
    de: {
      title: 'Kundenstimmen',
      subtitle: 'Erste Erfahrungsberichte unserer Testnutzer',
      faqs: [
        { question: '„Ich habe 2.000 € bei meiner Küche gespart.“', answer: '– Tobias K., München' },
        { question: '„Das neue Angebot war 14 % günstiger – top!“', answer: '– Julia R., Berlin' },
        { question: '„Upload in 1 Minute, Ergebnis am nächsten Tag.“', answer: '– Marc L., Köln' },
      ],
    },
    en: {
      title: 'Customer voices',
      subtitle: 'Early feedback from test users',
      faqs: [
        { question: '“I saved €2,000 on my kitchen.”', answer: '– Tobias K., Munich' },
        { question: '“The new quote was 14% cheaper – great!”', answer: '– Julia R., Berlin' },
        { question: '“Upload in 1 minute, result next day.”', answer: '– Marc L., Cologne' },
      ],
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()

  return (
    <section id="stimmen" className="py-16 md:py-24 bg-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {t.faqs.map((faq, index) => (
            <div key={index} className="mb-4" data-reveal>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}