'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Brain, TrendingUp, Shield, ArrowRight, Sparkles, Zap, Globe2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatNumber } from '@/lib/utils'
// Removed unused imports for build

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false)
  const [language] = useState<'de' | 'en'>('de')
  const [totalSavings, setTotalSavings] = useState(50234567)
  const [isHovered, setIsHovered] = useState(false)

  // Animate savings counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSavings((prev) => prev + Math.floor(Math.random() * 1000 + 500))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Translations
  const t = {
    de: {
      hero: {
        title: 'KI-Verhandlungen die',
        highlight: 'wirklich sparen',
        subtitle:
          'Laden Sie Ihr Angebot hoch und unsere KI verhandelt automatisch den besten Preis für Sie.',
        dropOffer: 'Angebot hier ablegen',
        orClick: 'oder klicken zum Hochladen',
        saved: 'bereits gespart',
        cta: 'Jetzt starten',
        demo: 'Demo ansehen',
      },
      features: {
        title: 'Revolutionäre KI-Technologie',
        subtitle:
          'Unsere fortschrittliche KI nutzt Verhaltensökonomie, kulturelle Intelligenz und Echtzeit-Marktdaten',
        ai: {
          title: 'Fortschrittliche KI',
          desc: 'GPT-4 basierte Verhandlungs-KI mit kultureller Anpassung',
        },
        savings: {
          title: 'Ø 23% Ersparnis',
          desc: 'Über 10.000 erfolgreiche Verhandlungen mit nachgewiesenen Ersparnissen',
        },
        security: {
          title: 'Bank-Level Sicherheit',
          desc: 'Ende-zu-Ende Verschlüsselung und DSGVO-konform',
        },
      },
      stats: {
        totalSavings: 'Gesamtersparnis',
        negotiations: 'Verhandlungen',
        successRate: 'Erfolgsquote',
        rating: 'Kundenbewertung',
      },
      trust: {
        title: 'Vertraut von führenden Unternehmen',
        subtitle: 'Über 500 Unternehmen nutzen VOAI täglich',
      },
      cta: {
        title: 'Bereit, Geld zu sparen?',
        subtitle: 'Starten Sie jetzt und lassen Sie unsere KI den besten Preis für Sie verhandeln',
        button: 'Kostenlos starten',
        enterprise: 'Enterprise Lösung',
      },
    },
    en: {
      hero: {
        title: 'AI Negotiations that',
        highlight: 'actually save',
        subtitle: 'Upload your offer and our AI automatically negotiates the best price for you.',
        dropOffer: 'Drop your offer here',
        orClick: 'or click to upload',
        saved: 'already saved',
        cta: 'Start now',
        demo: 'Watch demo',
      },
      features: {
        title: 'Revolutionary AI Technology',
        subtitle:
          'Our advanced AI uses behavioral economics, cultural intelligence and real-time market data',
        ai: {
          title: 'Advanced AI',
          desc: 'GPT-4 based negotiation AI with cultural adaptation',
        },
        savings: {
          title: 'Avg 23% Savings',
          desc: 'Over 10,000 successful negotiations with proven savings',
        },
        security: {
          title: 'Bank-Level Security',
          desc: 'End-to-end encryption and GDPR compliant',
        },
      },
      stats: {
        totalSavings: 'Total Savings',
        negotiations: 'Negotiations',
        successRate: 'Success Rate',
        rating: 'Customer Rating',
      },
      trust: {
        title: 'Trusted by leading companies',
        subtitle: 'Over 500 companies use VOAI daily',
      },
      cta: {
        title: 'Ready to save money?',
        subtitle: 'Start now and let our AI negotiate the best price for you',
        button: 'Start for free',
        enterprise: 'Enterprise solution',
      },
    },
  }[language]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    window.location.href = '/upload'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50" />
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>Powered by GPT-4</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                {t.hero.title}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block mt-2">
                  {t.hero.highlight}
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg">{t.hero.subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/upload">
                  <Button size="xl" className="group">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="xl" variant="outline">
                  {t.hero.demo}
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
              >
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    €{formatNumber(totalSavings)}
                  </div>
                  <div className="text-sm text-gray-600">{t.hero.saved}</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                    +99
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Upload Circle */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-3xl opacity-20 scale-150" />

                {/* Upload Circle */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={cn(
                    'relative w-72 h-72 lg:w-96 lg:h-96 rounded-full cursor-pointer',
                    'bg-gradient-to-br from-purple-500 to-blue-500',
                    'shadow-2xl transition-all duration-300',
                    isDragging && 'scale-110 shadow-purple-500/50',
                    'flex items-center justify-center'
                  )}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"
                      />
                    )}
                  </AnimatePresence>

                  <div className="text-center p-8 relative z-10">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-16 h-16 text-white mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.hero.dropOffer}</h3>
                    <p className="text-white/90 text-sm">{t.hero.orClick}</p>
                  </div>

                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        window.location.href = '/upload'
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50/50">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              {t.features.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t.features.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, ...t.features.ai, color: 'purple' },
              { icon: TrendingUp, ...t.features.savings, color: 'green' },
              { icon: Shield, ...t.features.security, color: 'blue' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:scale-105 transition-transform duration-300 border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                        'bg-gradient-to-br shadow-lg',
                        feature.color === 'purple' && 'from-purple-500 to-purple-600',
                        feature.color === 'green' && 'from-green-500 to-green-600',
                        feature.color === 'blue' && 'from-blue-500 to-blue-600'
                      )}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: `€${formatNumber(totalSavings)}`,
                label: t.stats.totalSavings,
                icon: TrendingUp,
              },
              { value: '10,000+', label: t.stats.negotiations, icon: Users },
              { value: '87%', label: t.stats.successRate, icon: Zap },
              { value: '4.9/5', label: t.stats.rating, icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
                  <stat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.trust.title}</h3>
          <p className="text-gray-600 mb-12">{t.trust.subtitle}</p>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-32 h-12 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.cta.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="xl" className="group">
                {t.cta.button}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="xl" variant="outline">
              <Globe2 className="mr-2 w-5 h-5" />
              {t.cta.enterprise}
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
