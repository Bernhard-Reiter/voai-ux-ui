'use client'

import { motion } from 'framer-motion'
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react'

const faqCategories = [
  {
    category: 'Allgemein',
    icon: HelpCircle,
    questions: [
      {
        question: 'Was ist VOAI?',
        answer:
          'VOAI ist eine KI-gestützte Plattform für automatisierte Preisverhandlungen. Wir nutzen fortschrittliche Algorithmen und maschinelles Lernen, um für Sie bessere Konditionen bei Ihren Lieferanten zu erzielen - durchschnittlich 23% Ersparnis.',
      },
      {
        question: 'Für welche Unternehmen ist VOAI geeignet?',
        answer:
          'VOAI eignet sich für Unternehmen jeder Größe - vom Startup bis zum Großkonzern. Besonders profitieren Unternehmen mit regelmäßigen Einkäufen, wiederkehrenden Verträgen oder einem breiten Lieferantennetzwerk.',
      },
      {
        question: 'Wie schnell kann ich VOAI einsetzen?',
        answer:
          'Nach der Registrierung können Sie sofort loslegen. Die Einrichtung dauert weniger als 10 Minuten. Erste Verhandlungsergebnisse erhalten Sie bereits nach wenigen Stunden.',
      },
      {
        question: 'Ist VOAI DSGVO-konform?',
        answer:
          'Ja, VOAI ist vollständig DSGVO-konform. Wir speichern alle Daten auf deutschen Servern, nutzen Ende-zu-Ende-Verschlüsselung und sind ISO 27001 zertifiziert.',
      },
    ],
  },
  {
    category: 'Funktionsweise',
    icon: HelpCircle,
    questions: [
      {
        question: 'Wie funktioniert die KI-Verhandlung?',
        answer:
          'Unsere KI analysiert Ihre Dokumente, vergleicht Marktpreise, identifiziert Einsparpotenziale und führt dann automatisierte Verhandlungen durch. Dabei nutzt sie bewährte Verhandlungsstrategien und passt sich dynamisch an die Reaktionen der Gegenseite an.',
      },
      {
        question: 'Welche Dokumente kann ich hochladen?',
        answer:
          'Sie können Angebote, Rechnungen, Verträge und Preislisten in allen gängigen Formaten hochladen (PDF, Excel, Word, etc.). Unsere OCR-Technologie extrahiert automatisch alle relevanten Informationen.',
      },
      {
        question: 'Kann ich den Verhandlungsprozess beeinflussen?',
        answer:
          'Ja, Sie können Verhandlungsziele, Limits und Prioritäten festlegen. Die KI berücksichtigt Ihre Vorgaben und handelt nur in dem von Ihnen definierten Rahmen.',
      },
      {
        question: 'Was passiert nach einer erfolgreichen Verhandlung?',
        answer:
          'Sie erhalten einen detaillierten Report mit allen Ergebnissen, Einsparungen und nächsten Schritten. Die finalen Verträge müssen Sie selbst abschließen - VOAI bereitet alles optimal vor.',
      },
    ],
  },
  {
    category: 'Preise & Abrechnung',
    icon: HelpCircle,
    questions: [
      {
        question: 'Wie viel kostet VOAI?',
        answer:
          'Unsere Preise starten bei 299€/Monat für den Starter-Plan. Professional kostet 899€/Monat, Enterprise-Preise auf Anfrage. Alle Pläne können 14 Tage kostenlos getestet werden.',
      },
      {
        question: 'Gibt es versteckte Kosten?',
        answer:
          'Nein, bei VOAI gibt es keine versteckten Kosten. Sie zahlen nur den monatlichen Festpreis für Ihren gewählten Plan. Keine Setup-Gebühren, keine Transaktionskosten.',
      },
      {
        question: 'Kann ich meinen Plan ändern?',
        answer:
          'Ja, Sie können jederzeit upgraden oder downgraden. Upgrades werden sofort wirksam, Downgrades zum nächsten Abrechnungszeitraum.',
      },
      {
        question: 'Welche Zahlungsmethoden werden akzeptiert?',
        answer:
          'Wir akzeptieren Kreditkarten (Visa, Mastercard, Amex), SEPA-Lastschrift und Rechnung (ab Professional-Plan).',
      },
    ],
  },
  {
    category: 'Sicherheit & Datenschutz',
    icon: HelpCircle,
    questions: [
      {
        question: 'Wie sicher sind meine Daten?',
        answer:
          'Ihre Daten sind bei uns maximal geschützt: Ende-zu-Ende-Verschlüsselung, deutsche Server, ISO 27001 Zertifizierung, regelmäßige Sicherheitsaudits und strenge Zugriffskontrollen.',
      },
      {
        question: 'Wer hat Zugriff auf meine Verhandlungsdaten?',
        answer:
          'Nur Sie und explizit autorisierte Mitarbeiter Ihres Unternehmens haben Zugriff. Unsere Mitarbeiter haben keinen Zugriff auf Ihre Daten, außer zur technischen Unterstützung mit Ihrer ausdrücklichen Erlaubnis.',
      },
      {
        question: 'Was passiert mit meinen Daten nach Vertragsende?',
        answer:
          'Nach Vertragsende haben Sie 30 Tage Zeit, alle Daten zu exportieren. Danach werden alle Ihre Daten vollständig und unwiderruflich gelöscht.',
      },
      {
        question: 'Werden meine Daten für KI-Training verwendet?',
        answer:
          'Nein, Ihre Geschäftsdaten werden niemals für das Training unserer KI-Modelle verwendet. Wir nutzen ausschließlich anonymisierte, aggregierte Daten zur Verbesserung unserer Algorithmen.',
      },
    ],
  },
  {
    category: 'Integration & Support',
    icon: HelpCircle,
    questions: [
      {
        question: 'Welche Integrationen bietet VOAI?',
        answer:
          'VOAI integriert sich nahtlos mit SAP, Microsoft Dynamics, Salesforce, Oracle und vielen anderen Systemen. Über unsere REST API können Sie auch eigene Integrationen erstellen.',
      },
      {
        question: 'Wie erhalte ich Support?',
        answer:
          'Je nach Plan erhalten Sie E-Mail-Support (Starter), Prioritäts-Support mit garantierten Antwortzeiten (Professional) oder 24/7 Dedicated Support (Enterprise).',
      },
      {
        question: 'Gibt es Schulungen?',
        answer:
          'Ja, wir bieten umfangreiche Onboarding-Sessions, Video-Tutorials und regelmäßige Webinare. Enterprise-Kunden erhalten maßgeschneiderte Schulungen.',
      },
      {
        question: 'In welchen Sprachen ist VOAI verfügbar?',
        answer:
          'Die Plattform ist aktuell auf Deutsch und Englisch verfügbar. Weitere Sprachen sind in Planung.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Häufig gestellte Fragen
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Finden Sie schnell Antworten auf Ihre Fragen zu VOAI
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Suchen Sie nach Stichworten..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  {category.category}
                </h2>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <motion.details
                      key={questionIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {item.question}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.details>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Questions Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Noch Fragen?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Unser Support-Team hilft Ihnen gerne weiter
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Chatten Sie direkt mit unserem Support
                </p>
                <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold flex items-center justify-center">
                  Chat starten
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </motion.a>

              <motion.a
                href="mailto:support@voai.de"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">E-Mail Support</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Antwort innerhalb von 24 Stunden
                </p>
                <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold flex items-center justify-center">
                  support@voai.de
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </motion.a>

              <motion.a
                href="tel:+4930123456789"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Telefon Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Mo-Fr 9:00 - 18:00 Uhr
                </p>
                <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold flex items-center justify-center">
                  +49 30 123 456 789
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Bereit, VOAI auszuprobieren?</h2>
          <p className="text-xl mb-8 opacity-90">
            Starten Sie Ihre 14-tägige kostenlose Testversion und erleben Sie die Zukunft der
            Preisverhandlungen.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Kostenlos testen
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
