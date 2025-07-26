'use client'

import { motion } from 'framer-motion'
import {
  Check,
  X,
  Zap,
  Building2,
  Rocket,
  ArrowRight,
  Shield,
  Users,
  HeadphonesIcon,
  BarChart3,
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '299',
    description: 'Ideal für kleine Unternehmen und Einzelhändler',
    icon: Zap,
    features: [
      'Bis zu 50 Verhandlungen/Monat',
      'KI-Basismodell',
      'E-Mail Support',
      'Standard-Integrationen',
      'Basis-Analytics',
      'SSL-Verschlüsselung',
    ],
    notIncluded: [
      'Erweiterte KI-Modelle',
      'Telefon-Support',
      'Custom Integrationen',
      'API-Zugang',
      'Dedizierter Account Manager',
    ],
    cta: 'Jetzt starten',
    popular: false,
  },
  {
    name: 'Professional',
    price: '899',
    description: 'Für wachsende Unternehmen mit höheren Anforderungen',
    icon: Building2,
    features: [
      'Bis zu 500 Verhandlungen/Monat',
      'Erweiterte KI-Modelle',
      'Prioritäts-Support',
      'Alle Standard-Integrationen',
      'Erweiterte Analytics & Reports',
      'API-Zugang',
      'Multi-User Support',
      'Custom Workflows',
    ],
    notIncluded: [
      'Unbegrenzte Verhandlungen',
      'Dedizierter Account Manager',
      'On-Premise Installation',
    ],
    cta: 'Kostenlos testen',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Maßgeschneiderte Lösungen für Großunternehmen',
    icon: Rocket,
    features: [
      'Unbegrenzte Verhandlungen',
      'Premium KI-Modelle',
      '24/7 Dedicated Support',
      'Custom Integrationen',
      'Enterprise Analytics',
      'Vollständiger API-Zugang',
      'SSO & Advanced Security',
      'Dedizierter Account Manager',
      'Custom Training & Onboarding',
      'SLA Garantie',
      'On-Premise Option',
    ],
    notIncluded: [],
    cta: 'Kontakt aufnehmen',
    popular: false,
  },
]

const faqs = [
  {
    question: 'Gibt es eine kostenlose Testversion?',
    answer:
      'Ja, wir bieten eine 14-tägige kostenlose Testversion für alle Pläne an. Keine Kreditkarte erforderlich.',
  },
  {
    question: 'Kann ich jederzeit kündigen?',
    answer: 'Absolut! Alle Pläne sind monatlich kündbar. Es gibt keine Mindestvertragslaufzeit.',
  },
  {
    question: 'Was passiert, wenn ich mein Limit überschreite?',
    answer:
      'Wir informieren Sie rechtzeitig und bieten flexible Upgrade-Optionen. Ihre Verhandlungen werden nie unterbrochen.',
  },
  {
    question: 'Sind die Preise inklusive Mehrwertsteuer?',
    answer: 'Die angezeigten Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.',
  },
  {
    question: 'Bieten Sie Rabatte für Non-Profits an?',
    answer:
      'Ja, wir bieten spezielle Konditionen für gemeinnützige Organisationen. Kontaktieren Sie uns für Details.',
  },
]

export default function PricingPage() {
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
              Transparente Preise, maximaler Wert
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Wählen Sie den perfekten Plan für Ihre Bedürfnisse. Sparen Sie ab dem ersten Tag.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                14 Tage kostenlos testen
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Keine Kreditkarte erforderlich
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Jederzeit kündbar
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                    plan.popular ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Beliebt
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      {plan.price === 'Custom' ? (
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          Individuell
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            €{plan.price}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">/Monat</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Inklusive:</h4>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-500 dark:text-gray-500 mb-3">
                            Nicht enthalten:
                          </h4>
                        </div>
                        {plan.notIncluded.map((feature, idx) => (
                          <div key={idx} className="flex items-start opacity-50">
                            <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 dark:text-gray-500 line-through">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <a
                    href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
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
              Alle Pläne beinhalten
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Grundlegende Features, die in jedem Plan enthalten sind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Datensicherheit</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ende-zu-Ende-Verschlüsselung und DSGVO-Konformität
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Team-Kollaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Arbeiten Sie gemeinsam an Verhandlungen
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <HeadphonesIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Deutscher Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Unterstützung in Ihrer Sprache</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Performance-Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Detaillierte Berichte und Analysen</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Haben Sie noch Fragen? Wir haben die Antworten.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Bereit, mit VOAI zu sparen?</h2>
          <p className="text-xl mb-8 opacity-90">
            Starten Sie Ihre 14-tägige kostenlose Testversion noch heute.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Kostenlos testen
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm opacity-80">
            Keine Kreditkarte erforderlich • Jederzeit kündbar
          </p>
        </motion.div>
      </section>
    </div>
  )
}
