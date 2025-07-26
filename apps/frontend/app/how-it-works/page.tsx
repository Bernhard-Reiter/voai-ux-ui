'use client'

import { motion } from 'framer-motion'
import {
  Upload,
  Brain,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  FileText,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Dokumente hochladen',
    description:
      'Laden Sie Ihre Angebote, Rechnungen oder Verträge hoch. VOAI extrahiert automatisch alle relevanten Informationen.',
    icon: Upload,
    details: [
      'PDF, Excel, Word und mehr',
      'Automatische Texterkennung (OCR)',
      'Sichere Verschlüsselung',
      'Batch-Upload möglich',
    ],
  },
  {
    number: '02',
    title: 'KI-Analyse',
    description:
      'Unsere KI analysiert Marktdaten, historische Preise und identifiziert Einsparpotenziale.',
    icon: Brain,
    details: [
      'Marktpreis-Benchmarking',
      'Historische Datenanalyse',
      'Risikobewertung',
      'Optimierungsvorschläge',
    ],
  },
  {
    number: '03',
    title: 'Automatische Verhandlung',
    description:
      'VOAI führt die Verhandlungen für Sie – professionell, datenbasiert und erfolgreich.',
    icon: TrendingUp,
    details: [
      '24/7 Verhandlungsbereitschaft',
      'Multi-Channel-Kommunikation',
      'Adaptive Strategien',
      'Echtzeit-Anpassungen',
    ],
  },
  {
    number: '04',
    title: 'Ergebnisse erhalten',
    description:
      'Prüfen Sie die Ergebnisse und profitieren Sie von durchschnittlich 23% besseren Konditionen.',
    icon: CheckCircle2,
    details: [
      'Detaillierte Reports',
      'Vertragsvorschläge',
      'Einsparungsübersicht',
      'Nächste Schritte',
    ],
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'Zeitersparnis',
    value: '85%',
    description: 'weniger Zeit für Verhandlungen',
  },
  {
    icon: TrendingUp,
    title: 'Kosteneinsparung',
    value: '23%',
    description: 'durchschnittliche Ersparnis',
  },
  {
    icon: Shield,
    title: 'Erfolgsquote',
    value: '94%',
    description: 'erfolgreiche Verhandlungen',
  },
  {
    icon: Users,
    title: 'Zufriedenheit',
    value: '4.8/5',
    description: 'Kundenbewertung',
  },
]

const useCases = [
  {
    title: 'E-Commerce',
    description:
      'Optimieren Sie Ihre Einkaufskonditionen bei Lieferanten und reduzieren Sie Ihre Wareneinkaufskosten.',
    savings: 'Bis zu 30% Ersparnis',
  },
  {
    title: 'Produktion',
    description: 'Verhandeln Sie bessere Preise für Rohstoffe, Komponenten und Produktionsmittel.',
    savings: 'Bis zu 25% Ersparnis',
  },
  {
    title: 'Dienstleistungen',
    description: 'Senken Sie Kosten für Software-Lizenzen, Beratung und externe Dienstleister.',
    savings: 'Bis zu 35% Ersparnis',
  },
  {
    title: 'Logistik',
    description: 'Optimieren Sie Versandkosten, Lagergebühren und Transportdienstleistungen.',
    savings: 'Bis zu 20% Ersparnis',
  },
]

export default function HowItWorksPage() {
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
              So einfach funktioniert VOAI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              In nur 4 Schritten zu besseren Konditionen. Vollautomatisch, KI-gestützt und
              erfolgreich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Jetzt starten
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Demo ansehen
                <BarChart3 className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <span className="text-6xl font-bold text-gray-200 dark:text-gray-800 mr-4">
                        {step.number}
                      </span>
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                          <Icon className="w-24 h-24 text-gray-400 dark:text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ihre Vorteile auf einen Blick
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              VOAI liefert messbare Ergebnisse für Ihr Unternehmen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.value}
                  </h3>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    {benefit.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Für jede Branche die richtige Lösung
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              VOAI passt sich an Ihre spezifischen Anforderungen an
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{useCase.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {useCase.savings}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Sehen Sie VOAI in Aktion
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Überzeugen Sie sich selbst von der Leistungsfähigkeit unserer KI
              </p>
            </div>

            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-8">
              <div className="text-center">
                <Zap className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-500">Demo-Video wird hier angezeigt</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Kostenlos testen
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Persönliche Demo anfordern
                <Users className="ml-2 w-5 h-5" />
              </a>
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
          <h2 className="text-3xl font-bold mb-4">Bereit für bessere Konditionen?</h2>
          <p className="text-xl mb-8 opacity-90">
            Starten Sie noch heute und sparen Sie ab der ersten Verhandlung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
            >
              14 Tage kostenlos testen
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Preise ansehen
              <FileText className="ml-2 w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
