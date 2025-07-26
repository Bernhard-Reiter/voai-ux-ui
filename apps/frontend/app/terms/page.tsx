'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Shield,
  Info,
  AlertCircle,
  CheckCircle,
  Scale,
  Calendar,
  Mail,
} from 'lucide-react'

const sections = [
  {
    id: 'general',
    title: '1. Geltungsbereich',
    icon: FileText,
    content: [
      'Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge, die zwischen der VOAI GmbH (nachfolgend "VOAI") und ihren Kunden über die Nutzung der VOAI-Plattform geschlossen werden.',
      'Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nur dann und insoweit Vertragsbestandteil, als VOAI ihrer Geltung ausdrücklich schriftlich zugestimmt hat.',
      'Diese AGB gelten nur gegenüber Unternehmern im Sinne von § 14 BGB.',
    ],
  },
  {
    id: 'services',
    title: '2. Leistungsumfang',
    icon: Shield,
    content: [
      'VOAI stellt eine cloud-basierte Software-as-a-Service (SaaS) Plattform zur Verfügung, die KI-gestützte Preisverhandlungen ermöglicht.',
      'Der genaue Funktionsumfang ergibt sich aus der jeweiligen Leistungsbeschreibung und dem gewählten Tarifmodell.',
      'VOAI ist berechtigt, die Plattform weiterzuentwickeln und Änderungen vorzunehmen, sofern diese die vertragsgemäße Nutzung nicht wesentlich beeinträchtigen.',
      'Die Verfügbarkeit der Plattform beträgt im Jahresmittel mindestens 99,5%, ausgenommen geplante Wartungsarbeiten.',
    ],
  },
  {
    id: 'registration',
    title: '3. Registrierung und Vertragsschluss',
    icon: CheckCircle,
    content: [
      'Die Nutzung der VOAI-Plattform setzt eine Registrierung voraus.',
      'Bei der Registrierung sind alle Pflichtfelder wahrheitsgemäß und vollständig auszufüllen.',
      'Der Vertrag kommt mit der Freischaltung des Kundenaccounts durch VOAI zustande.',
      'VOAI behält sich vor, Registrierungen ohne Angabe von Gründen abzulehnen.',
    ],
  },
  {
    id: 'usage',
    title: '4. Nutzungsrechte',
    icon: Info,
    content: [
      'VOAI räumt dem Kunden für die Vertragslaufzeit ein nicht ausschließliches, nicht übertragbares Nutzungsrecht an der Plattform ein.',
      'Die Nutzung ist auf die im Vertrag vereinbarte Anzahl von Nutzern beschränkt.',
      'Eine Weitergabe von Zugangsdaten an Dritte ist untersagt.',
      'Der Kunde darf die Plattform nur für eigene geschäftliche Zwecke nutzen.',
    ],
  },
  {
    id: 'obligations',
    title: '5. Pflichten des Kunden',
    icon: AlertCircle,
    content: [
      'Der Kunde ist verpflichtet, die Plattform nur vertragsgemäß und im Rahmen der geltenden Gesetze zu nutzen.',
      'Der Kunde stellt sicher, dass alle hochgeladenen Daten frei von Rechten Dritter sind oder die erforderlichen Rechte vorliegen.',
      'Der Kunde ist für die Sicherheit seiner Zugangsdaten selbst verantwortlich.',
      'Bei Verdacht auf Missbrauch ist VOAI unverzüglich zu informieren.',
    ],
  },
  {
    id: 'payment',
    title: '6. Preise und Zahlung',
    icon: Scale,
    content: [
      'Die Preise ergeben sich aus der aktuellen Preisliste bzw. dem individuellen Angebot.',
      'Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.',
      'Die Abrechnung erfolgt monatlich im Voraus.',
      'Zahlungen sind innerhalb von 14 Tagen nach Rechnungsstellung fällig.',
      'Bei Zahlungsverzug ist VOAI berechtigt, den Zugang zur Plattform zu sperren.',
    ],
  },
  {
    id: 'liability',
    title: '7. Haftung',
    icon: Shield,
    content: [
      'VOAI haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.',
      'Bei leichter Fahrlässigkeit haftet VOAI nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und begrenzt auf den vertragstypischen, vorhersehbaren Schaden.',
      'Die Haftung für Datenverlust ist auf den typischen Wiederherstellungsaufwand beschränkt.',
      'Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.',
    ],
  },
  {
    id: 'data-protection',
    title: '8. Datenschutz',
    icon: Shield,
    content: [
      'VOAI verarbeitet personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Bestimmungen.',
      'Einzelheiten zur Datenverarbeitung sind in der Datenschutzerklärung geregelt.',
      'VOAI verpflichtet sich, angemessene technische und organisatorische Maßnahmen zum Schutz der Kundendaten zu treffen.',
      'Ein Auftragsverarbeitungsvertrag wird auf Anfrage zur Verfügung gestellt.',
    ],
  },
  {
    id: 'termination',
    title: '9. Laufzeit und Kündigung',
    icon: Calendar,
    content: [
      'Die Mindestvertragslaufzeit beträgt einen Monat.',
      'Der Vertrag verlängert sich automatisch um jeweils einen weiteren Monat, sofern er nicht mit einer Frist von 7 Tagen zum Monatsende gekündigt wird.',
      'Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.',
      'Kündigungen bedürfen der Textform (E-Mail genügt).',
    ],
  },
  {
    id: 'final',
    title: '10. Schlussbestimmungen',
    icon: FileText,
    content: [
      'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.',
      'Gerichtsstand für alle Streitigkeiten ist Berlin, sofern der Kunde Kaufmann ist.',
      'Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
      'Änderungen dieser AGB werden dem Kunden mindestens 4 Wochen vor Inkrafttreten mitgeteilt.',
    ],
  },
]

export default function TermsPage() {
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
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Gültig ab: 1. Januar 2024
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              Letzte Aktualisierung: 15. Dezember 2023
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section, index) => (
              <motion.a
                key={index}
                href={`#${section.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {section.title.split('.')[1].trim()}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={index}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="ml-14 space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Kontakt bei Fragen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bei Fragen zu diesen AGB oder zur Nutzung unserer Plattform stehen wir Ihnen gerne zur
              Verfügung:
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-purple-600" />
                <a href="mailto:legal@voai.de" className="hover:text-purple-600 transition-colors">
                  legal@voai.de
                </a>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FileText className="w-5 h-5 mr-3 text-purple-600" />
                <span>VOAI GmbH, Friedrichstraße 123, 10117 Berlin</span>
              </div>
            </div>
          </motion.div>

          {/* Download Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <FileText className="mr-2 w-5 h-5" />
              AGB als PDF herunterladen
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Mail className="mr-2 w-5 h-5" />
              Rechtliche Fragen?
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Diese AGB wurden zuletzt am 15. Dezember 2023 aktualisiert. Wir empfehlen, diese Seite
            regelmäßig auf Änderungen zu überprüfen.
          </p>
        </div>
      </section>
    </div>
  )
}
