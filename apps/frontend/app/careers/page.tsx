'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Heart,
  Home,
  Coffee,
  GraduationCap,
  Target,
  ArrowRight,
  MapPin,
  Clock,
  Euro,
  Code,
  Brain,
  BarChart3,
  MessageSquare,
} from 'lucide-react'

const benefits = [
  {
    icon: Home,
    title: 'Remote-First',
    description: 'Arbeiten Sie von überall aus - Flexibilität ist uns wichtig',
  },
  {
    icon: Euro,
    title: 'Attraktive Vergütung',
    description: 'Wettbewerbsfähiges Gehalt plus Mitarbeiterbeteiligung',
  },
  {
    icon: GraduationCap,
    title: 'Weiterbildung',
    description: '2.000€ Jahresbudget für Ihre persönliche Entwicklung',
  },
  {
    icon: Coffee,
    title: 'Work-Life-Balance',
    description: '30 Tage Urlaub und flexible Arbeitszeiten',
  },
  {
    icon: Users,
    title: 'Team-Events',
    description: 'Regelmäßige Offsites und virtuelle Teambuildings',
  },
  {
    icon: Heart,
    title: 'Gesundheit',
    description: 'Zuschuss zur Krankenversicherung und Fitness-Budget',
  },
]

const values = [
  {
    title: 'Innovation',
    description: 'Wir hinterfragen den Status Quo und suchen immer nach besseren Lösungen.',
  },
  {
    title: 'Transparenz',
    description: 'Offene Kommunikation und ehrliches Feedback sind unsere Basis.',
  },
  {
    title: 'Wachstum',
    description: 'Persönliche und berufliche Entwicklung fördern wir aktiv.',
  },
  {
    title: 'Impact',
    description: 'Wir schaffen echten Mehrwert für unsere Kunden und die Gesellschaft.',
  },
]

const openPositions = [
  {
    category: 'Engineering',
    icon: Code,
    positions: [
      {
        title: 'Senior Backend Engineer',
        location: 'Remote / Berlin',
        type: 'Vollzeit',
        level: 'Senior',
        description:
          'Entwickeln Sie skalierbare KI-Systeme und APIs für unsere Verhandlungsplattform.',
      },
      {
        title: 'Frontend Developer React',
        location: 'Remote / Berlin',
        type: 'Vollzeit',
        level: 'Mid-Level',
        description:
          'Gestalten Sie moderne, reaktive Benutzeroberflächen mit React und TypeScript.',
      },
      {
        title: 'DevOps Engineer',
        location: 'Remote',
        type: 'Vollzeit',
        level: 'Senior',
        description: 'Optimieren Sie unsere Cloud-Infrastruktur und CI/CD-Pipelines.',
      },
    ],
  },
  {
    category: 'AI & Data',
    icon: Brain,
    positions: [
      {
        title: 'Machine Learning Engineer',
        location: 'Berlin',
        type: 'Vollzeit',
        level: 'Senior',
        description: 'Entwickeln Sie innovative ML-Modelle für automatisierte Verhandlungen.',
      },
      {
        title: 'Data Scientist',
        location: 'Remote / Berlin',
        type: 'Vollzeit',
        level: 'Mid-Level',
        description: 'Analysieren Sie Verhandlungsdaten und entwickeln Sie prädiktive Modelle.',
      },
    ],
  },
  {
    category: 'Business',
    icon: BarChart3,
    positions: [
      {
        title: 'Sales Manager B2B',
        location: 'Berlin / München',
        type: 'Vollzeit',
        level: 'Senior',
        description: 'Bauen Sie unser Enterprise-Geschäft auf und gewinnen Sie Großkunden.',
      },
      {
        title: 'Customer Success Manager',
        location: 'Remote / Berlin',
        type: 'Vollzeit',
        level: 'Mid-Level',
        description: 'Begleiten Sie unsere Kunden zum Erfolg und maximieren Sie deren ROI.',
      },
      {
        title: 'Product Manager',
        location: 'Berlin',
        type: 'Vollzeit',
        level: 'Senior',
        description: 'Gestalten Sie die Produktvision und Roadmap unserer Plattform.',
      },
    ],
  },
]

const hiringProcess = [
  {
    step: 1,
    title: 'Bewerbung',
    description: 'Senden Sie uns Ihre Unterlagen - wir melden uns innerhalb von 48h',
  },
  {
    step: 2,
    title: 'Erstgespräch',
    description: '30-minütiges Video-Call zum gegenseitigen Kennenlernen',
  },
  {
    step: 3,
    title: 'Fachgespräch',
    description: 'Technisches Interview oder Case Study mit dem Team',
  },
  {
    step: 4,
    title: 'Team-Fit',
    description: 'Treffen Sie Ihre zukünftigen Kollegen',
  },
  {
    step: 5,
    title: 'Angebot',
    description: 'Wir machen Ihnen ein faires Angebot',
  },
]

export default function CareersPage() {
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
              Gestalten Sie die Zukunft mit uns
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Werden Sie Teil eines Teams, das KI-gestützte Verhandlungen revolutioniert und echten
              Impact für Unternehmen weltweit schafft.
            </p>
            <a
              href="#positions"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Offene Stellen ansehen
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Warum VOAI?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Bei VOAI arbeiten Sie an der Spitze der KI-Innovation. Wir kombinieren modernste
                Technologie mit einem tiefen Verständnis für Geschäftsprozesse, um Unternehmen zu
                helfen, bessere Ergebnisse zu erzielen.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Als Teil unseres Teams haben Sie die Möglichkeit, echten Impact zu schaffen, sich
                kontinuierlich weiterzuentwickeln und in einem unterstützenden Umfeld zu wachsen.
              </p>
              <div className="flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-gray-600 dark:text-gray-400">Mitarbeiter</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <div className="text-gray-600 dark:text-gray-400">Nationalitäten</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">4.8</div>
                  <div className="text-gray-600 dark:text-gray-400">Kununu Score</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </motion.div>
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
              Unsere Benefits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Wir sorgen dafür, dass Sie sich bei uns wohlfühlen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Offene Stellen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Finden Sie Ihre nächste Herausforderung bei VOAI
            </p>
          </motion.div>

          <div className="space-y-12">
            {openPositions.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <Icon className="w-8 h-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    {category.positions.map((position, positionIndex) => (
                      <motion.div
                        key={positionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: positionIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {position.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {position.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center text-gray-500 dark:text-gray-500">
                                <MapPin className="w-4 h-4 mr-1" />
                                {position.location}
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {position.type}
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-500">
                                <Target className="w-4 h-4 mr-1" />
                                {position.level}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 lg:mt-0 lg:ml-6">
                            <a
                              href={`mailto:karriere@voai.de?subject=Bewerbung: ${position.title}`}
                              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                              Jetzt bewerben
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
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
              Unser Bewerbungsprozess
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Transparent, fair und auf Augenhöhe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {hiringProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {process.step}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonial */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <MessageSquare className="absolute top-4 right-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <p className="text-xl mb-6 italic">
                &quot;Bei VOAI habe ich die Möglichkeit, an cutting-edge KI-Technologie zu arbeiten
                und gleichzeitig echten Business-Impact zu schaffen. Das Team ist unglaublich
                talentiert und unterstützend, und die Kultur fördert Innovation und persönliches
                Wachstum.&quot;
              </p>
              <div>
                <p className="font-semibold">Anna Schmidt</p>
                <p className="text-white/80">Senior Machine Learning Engineer</p>
              </div>
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
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Keine passende Stelle dabei?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Wir sind immer auf der Suche nach talentierten Menschen. Senden Sie uns gerne eine
            Initiativbewerbung!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:karriere@voai.de"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Initiativbewerbung senden
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Mehr über VOAI erfahren
              <Users className="ml-2 w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
