'use client'

import { motion } from 'framer-motion'
import { Upload, Bot, TrendingDown, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Daten hochladen',
    description: 'Laden Sie Ihre Produkt- und Lieferantendaten in unser System.',
  },
  {
    icon: Bot,
    title: 'KI-Analyse',
    description: 'Unsere KI analysiert Marktdaten und entwickelt optimale Verhandlungsstrategien.',
  },
  {
    icon: TrendingDown,
    title: 'Automatische Verhandlung',
    description: 'Die KI führt Verhandlungen automatisch durch und optimiert kontinuierlich.',
  },
  {
    icon: CheckCircle,
    title: 'Ergebnisse erhalten',
    description: 'Profitieren Sie von besseren Konditionen und detaillierten Reports.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            So funktioniert&apos;s
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            In vier einfachen Schritten zu besseren Preisen
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
