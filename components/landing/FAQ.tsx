'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FAQ() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const content = {
    de: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Alles, was Sie über voai wissen müssen',
      faqs: [
        {
          question: 'Wie lange dauert die Einrichtung von voai?',
          answer: 'Die Einrichtung dauert in der Regel weniger als 24 Stunden. Nach der Registrierung können Sie sofort mit dem Erfassen von Belegen beginnen. Die Integration in Ihre bestehende Buchhaltungssoftware wird von unserem Support-Team begleitet.',
        },
        {
          question: 'Ist voai GoBD-konform?',
          answer: 'Ja, voai erfüllt alle Anforderungen der GoBD. Alle Belege werden revisionssicher archiviert, mit einem Zeitstempel versehen und sind unveränderbar gespeichert. Sie erhalten auf Wunsch auch einen Verfahrensdokumentation.',
        },
        {
          question: 'Welche Buchhaltungssoftware wird unterstützt?',
          answer: 'voai integriert sich nahtlos mit DATEV, SAP, Lexware, sevDesk, Personio und vielen weiteren Systemen. Falls Ihre Software nicht dabei ist, können wir über unsere API oder CSV-Export eine Lösung finden.',
        },
        {
          question: 'Was kostet voai?',
          answer: 'voai startet bei 8€ pro Nutzer und Monat. Der genaue Preis hängt von der Anzahl der Nutzer und dem gewählten Funktionsumfang ab. Größere Unternehmen erhalten individuelle Angebote.',
        },
        {
          question: 'Kann ich voai kostenlos testen?',
          answer: 'Ja, Sie können voai 30 Tage kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich. Zusätzlich bieten wir eine 30-Tage Geld-zurück-Garantie.',
        },
        {
          question: 'Wie sicher sind meine Daten?',
          answer: 'Ihre Daten werden in deutschen Rechenzentren gehostet und sind durch modernste Verschlüsselungstechnologien geschützt. Wir sind DSGVO-konform und ISO 27001 zertifiziert.',
        },
      ],
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about voai',
      faqs: [
        {
          question: 'How long does it take to set up voai?',
          answer: 'Setup usually takes less than 24 hours. After registration, you can start capturing receipts immediately. Integration with your existing accounting software is supported by our support team.',
        },
        {
          question: 'Is voai tax compliant?',
          answer: 'Yes, voai meets all German tax compliance requirements. All receipts are archived securely, time-stamped, and stored immutably. Documentation is available upon request.',
        },
        {
          question: 'Which accounting software is supported?',
          answer: 'voai integrates seamlessly with DATEV, SAP, Lexware, sevDesk, Personio and many other systems. If your software is not listed, we can find a solution via our API or CSV export.',
        },
        {
          question: 'How much does voai cost?',
          answer: 'voai starts at €8 per user per month. The exact price depends on the number of users and features selected. Larger companies receive custom quotes.',
        },
        {
          question: 'Can I try voai for free?',
          answer: 'Yes, you can try voai free for 30 days with no obligation. No credit card required. Additionally, we offer a 30-day money-back guarantee.',
        },
        {
          question: 'How secure is my data?',
          answer: 'Your data is hosted in German data centers and protected by state-of-the-art encryption technologies. We are GDPR compliant and ISO 27001 certified.',
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
        
        <div className="max-w-3xl mx-auto">
          {t.faqs.map((faq, index) => (
            <div key={index} className="mb-4">
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