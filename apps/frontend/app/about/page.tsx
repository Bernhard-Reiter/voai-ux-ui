'use client'

import { motion } from 'framer-motion'
import {
  Target,
  Heart,
  Lightbulb,
  Award,
  Users,
  Globe,
  TrendingUp,
  Building2,
  Sparkles,
  CheckCircle,
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Kundenorientierung',
    description:
      'Der Erfolg unserer Kunden steht im Mittelpunkt unseres Handelns. Wir hören zu und entwickeln Lösungen, die echten Mehrwert schaffen.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Wir nutzen modernste KI-Technologie, um kontinuierlich bessere Ergebnisse für unsere Kunden zu erzielen.',
  },
  {
    icon: Users,
    title: 'Partnerschaft',
    description: 'Wir sehen uns als Partner unserer Kunden und arbeiten gemeinsam an ihrem Erfolg.',
  },
  {
    icon: Award,
    title: 'Exzellenz',
    description:
      'Wir streben in allem was wir tun nach Perfektion und geben uns nie mit dem Status Quo zufrieden.',
  },
]

const milestones = [
  {
    year: '2021',
    title: 'Gründung',
    description: 'VOAI wird mit der Vision gegründet, Preisverhandlungen zu revolutionieren.',
  },
  {
    year: '2022',
    title: 'MVP Launch',
    description: 'Erste erfolgreiche Pilotprojekte mit ausgewählten Partnern.',
  },
  {
    year: '2023',
    title: 'Markteinführung',
    description: 'Offizieller Launch und über 100 zufriedene Kunden im ersten Jahr.',
  },
  {
    year: '2024',
    title: 'Expansion',
    description: 'Internationale Expansion und Einführung neuer KI-Features.',
  },
]

const team = [
  {
    name: 'Dr. Sarah Schmidt',
    role: 'CEO & Co-Founder',
    description:
      'KI-Expertin mit über 15 Jahren Erfahrung in Machine Learning und Verhandlungsstrategien.',
  },
  {
    name: 'Michael Weber',
    role: 'CTO & Co-Founder',
    description: 'Tech-Visionär mit Expertise in Cloud-Infrastruktur und skalierbaren KI-Systemen.',
  },
  {
    name: 'Lisa Müller',
    role: 'Head of AI',
    description: 'Führende Forscherin im Bereich Natural Language Processing und Verhandlungs-KI.',
  },
  {
    name: 'Thomas Klein',
    role: 'Head of Customer Success',
    description: 'Experte für Kundenbeziehungen mit Fokus auf maximalen ROI für unsere Partner.',
  },
]

const stats = [
  { value: '500+', label: 'Zufriedene Kunden' },
  { value: '€50M+', label: 'Eingespart für Kunden' },
  { value: '10K+', label: 'Erfolgreiche Verhandlungen' },
  { value: '23%', label: 'Durchschnittliche Ersparnis' },
]

export default function AboutPage() {
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
              Wir revolutionieren Preisverhandlungen
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              VOAI kombiniert künstliche Intelligenz mit jahrzehntelanger Verhandlungserfahrung, um
              Unternehmen zu helfen, bessere Konditionen zu erzielen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-purple-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Unsere Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Wir glauben, dass jedes Unternehmen das Recht auf faire Preise hat. Unsere Mission
                ist es, durch innovative KI-Technologie Verhandlungen zu demokratisieren und allen
                Unternehmen – unabhängig von ihrer Größe – Zugang zu professionellen
                Verhandlungsstrategien zu ermöglichen.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Mit VOAI schaffen wir eine Welt, in der Verhandlungen fair, transparent und für alle
                zugänglich sind. Wir setzen uns dafür ein, dass unsere Kunden sich auf ihr
                Kerngeschäft konzentrieren können, während wir für optimale Konditionen sorgen.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Unsere Werte</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Diese Prinzipien leiten unser tägliches Handeln
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Unsere Geschichte
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Von der Idee zur führenden KI-Verhandlungsplattform
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1" />
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 p-6">
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${
                        index % 2 === 0 ? 'ml-8' : 'mr-8'
                      }`}
                    >
                      <div className="text-purple-600 font-bold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Unser Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Die Menschen hinter VOAI</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
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
              Unsere Partner & Auszeichnungen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Vertraut von führenden Unternehmen und Organisationen
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Building2, label: 'Tech Partner 2024' },
              { icon: Award, label: 'AI Innovation Award' },
              { icon: Globe, label: 'ISO 27001 Certified' },
              { icon: Sparkles, label: 'Best SaaS 2023' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <item.icon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
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
          <h2 className="text-3xl font-bold mb-4">Werden Sie Teil unserer Erfolgsgeschichte</h2>
          <p className="text-xl mb-8 opacity-90">
            Lassen Sie uns gemeinsam Ihre Verhandlungen revolutionieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
            >
              Kontakt aufnehmen
              <CheckCircle className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/careers"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Karriere bei VOAI
              <TrendingUp className="ml-2 w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
