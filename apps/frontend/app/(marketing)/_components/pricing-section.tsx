'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@voai/ui'
import { Check, X } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '99',
    description: 'Perfekt für kleine Unternehmen',
    features: [
      { text: 'Bis zu 100 Verhandlungen/Monat', included: true },
      { text: 'Basis KI-Modell', included: true },
      { text: 'E-Mail Support', included: true },
      { text: 'Standard Reports', included: true },
      { text: 'API Zugang', included: false },
      { text: 'Dedizierter Account Manager', included: false },
    ],
  },
  {
    name: 'Professional',
    price: '299',
    description: 'Für wachsende Unternehmen',
    popular: true,
    features: [
      { text: 'Bis zu 1.000 Verhandlungen/Monat', included: true },
      { text: 'Advanced KI-Modell', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Detaillierte Analytics', included: true },
      { text: 'API Zugang', included: true },
      { text: 'Dedizierter Account Manager', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Maßgeschneiderte Lösungen',
    features: [
      { text: 'Unbegrenzte Verhandlungen', included: true },
      { text: 'Custom KI-Training', included: true },
      { text: '24/7 Support', included: true },
      { text: 'Custom Reports & Analytics', included: true },
      { text: 'Vollständiger API Zugang', included: true },
      { text: 'Dedizierter Account Manager', included: true },
    ],
  },
]

export function PricingSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Transparente Preise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Wählen Sie den Plan, der zu Ihrem Unternehmen passt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-purple-600 text-white shadow-2xl scale-105'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-blue-400 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Beliebteste Wahl
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  {plan.price === 'Custom' ? (
                    <span
                      className={`text-4xl font-bold ${
                        plan.popular ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      Individuell
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-4xl font-bold ${
                          plan.popular ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        €{plan.price}
                      </span>
                      <span
                        className={`ml-2 ${
                          plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        /Monat
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-white' : 'text-green-500'
                        }`}
                      />
                    ) : (
                      <X
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-purple-200' : 'text-gray-400'
                        }`}
                      />
                    )}
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? feature.included
                            ? 'text-white'
                            : 'text-purple-200'
                          : feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="block">
                <Button className="w-full" variant={plan.popular ? 'secondary' : 'default'}>
                  {plan.price === 'Custom' ? 'Kontakt aufnehmen' : 'Jetzt starten'}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
