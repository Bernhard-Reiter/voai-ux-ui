'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, TrendingUp, Users, Brain, Clock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Intelligente KI',
    description:
      'Fortschrittliche Algorithmen analysieren Marktdaten und optimieren Ihre Verhandlungsstrategie.',
  },
  {
    icon: TrendingUp,
    title: '23% Durchschnittliche Ersparnis',
    description:
      'Unsere Kunden sparen im Durchschnitt 23% bei ihren Einkäufen durch automatisierte Verhandlungen.',
  },
  {
    icon: Clock,
    title: 'Zeitersparnis',
    description:
      'Reduzieren Sie den Zeitaufwand für Verhandlungen um bis zu 90% durch Automatisierung.',
  },
  {
    icon: Shield,
    title: 'Sichere Transaktionen',
    description: 'Enterprise-Grade Sicherheit und Verschlüsselung für alle Ihre Verhandlungen.',
  },
  {
    icon: Users,
    title: 'Skalierbar',
    description:
      'Von Einzelverhandlungen bis zu Tausenden parallelen Prozessen - wir wachsen mit Ihnen.',
  },
  {
    icon: Zap,
    title: 'Echtzeit-Anpassung',
    description:
      'Die KI passt sich in Echtzeit an Verhandlungsverläufe an für optimale Ergebnisse.',
  },
]

export function FeaturesSection() {
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
            Warum VOAI?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modernste Technologie trifft auf bewährte Verhandlungsstrategien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
