'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  TrendingUp,
  Clock,
  Brain,
  Users,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  Smartphone,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'KI-gestützte Verhandlung',
    description:
      'Fortschrittliche Algorithmen analysieren Marktdaten und optimieren Ihre Verhandlungsstrategie in Echtzeit.',
    highlights: ['Maschinelles Lernen', 'Predictive Analytics', 'Natürliche Sprachverarbeitung'],
  },
  {
    icon: Shield,
    title: 'Maximale Sicherheit',
    description:
      'Ende-zu-Ende-Verschlüsselung und DSGVO-konforme Datenverarbeitung schützen Ihre sensiblen Informationen.',
    highlights: ['SSL-Verschlüsselung', 'DSGVO-konform', '2-Faktor-Authentifizierung'],
  },
  {
    icon: TrendingUp,
    title: 'Durchschnittlich 23% Ersparnis',
    description: 'Unsere KI erzielt nachweislich bessere Ergebnisse als manuelle Verhandlungen.',
    highlights: ['Garantierte Mindestersparnisse', 'Performance-Tracking', 'ROI-Berichte'],
  },
  {
    icon: Clock,
    title: 'Zeitersparnis',
    description:
      'Automatisieren Sie zeitaufwändige Verhandlungsprozesse und konzentrieren Sie sich auf Ihr Kerngeschäft.',
    highlights: ['24/7 Verfügbarkeit', 'Automatische Workflows', 'Instant-Verhandlungen'],
  },
  {
    icon: Users,
    title: 'Multi-Lieferanten-Management',
    description:
      'Verhandeln Sie gleichzeitig mit mehreren Lieferanten und vergleichen Sie Angebote in Echtzeit.',
    highlights: ['Parallele Verhandlungen', 'Angebotsverwaltung', 'Lieferanten-Dashboard'],
  },
  {
    icon: FileText,
    title: 'Intelligente Dokumentenanalyse',
    description:
      'Automatische Extraktion und Analyse von Vertragsbedingungen, Preisen und Konditionen.',
    highlights: ['OCR-Technologie', 'PDF-Verarbeitung', 'Vertragsanalyse'],
  },
  {
    icon: BarChart3,
    title: 'Detaillierte Analytics',
    description:
      'Umfassende Berichte und Einblicke in Ihre Verhandlungsergebnisse und Einsparpotenziale.',
    highlights: ['Real-time Dashboards', 'Exportfunktionen', 'Trend-Analysen'],
  },
  {
    icon: Sparkles,
    title: 'Nahtlose Integration',
    description: 'Einfache Integration in bestehende Systeme über moderne APIs und Webhooks.',
    highlights: ['REST API', 'Webhook-Support', 'ERP-Integration'],
  },
]

const benefits = [
  {
    icon: CheckCircle,
    text: 'Keine versteckten Kosten',
  },
  {
    icon: CheckCircle,
    text: 'Kostenlose Testphase',
  },
  {
    icon: CheckCircle,
    text: 'Keine Mindestlaufzeit',
  },
  {
    icon: CheckCircle,
    text: 'Deutscher Support',
  },
]

export default function FeaturesPage() {
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
              Funktionen, die begeistern
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Entdecken Sie die leistungsstarken Features von VOAI, die Ihre Verhandlungen
              revolutionieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-500 dark:text-gray-500"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Sicherheit hat oberste Priorität
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Ihre Daten sind bei uns in besten Händen. Wir setzen auf modernste
                Sicherheitsstandards und sind vollständig DSGVO-konform.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Lock className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Ende-zu-Ende-Verschlüsselung
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Alle Daten werden verschlüsselt übertragen und gespeichert.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      ISO 27001 zertifiziert
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Höchste Standards im Informationssicherheitsmanagement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Deutsche Server</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ihre Daten bleiben in Deutschland.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gray-900 dark:bg-black rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    SOC 2 Type II Compliance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Regelmäßige Penetrationstests
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    24/7 Security Monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Audit-Logs & Compliance Reports
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Nahtlose Integration in Ihre Systeme
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              VOAI lässt sich problemlos in Ihre bestehende IT-Infrastruktur integrieren. Nutzen Sie
              unsere modernen APIs und Webhooks für maximale Flexibilität.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {['SAP', 'Microsoft', 'Salesforce', 'Oracle'].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl font-bold text-gray-400 dark:text-gray-600 mb-2">
                    {partner}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Integration verfügbar</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Bereit, Ihre Verhandlungen zu revolutionieren?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Starten Sie noch heute mit VOAI und sparen Sie durchschnittlich 23% bei Ihren
              Einkäufen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
              >
                Kostenlos testen
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Demo anfordern
                <Smartphone className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <benefit.icon className="w-5 h-5 mr-2" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
