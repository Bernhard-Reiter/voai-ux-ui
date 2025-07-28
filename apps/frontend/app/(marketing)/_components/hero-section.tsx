'use client'

import Link from 'next/link'
import { Button } from '@voai/ui'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-900" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Durchschnittlich 23% Ersparnis
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            KI-gestützte{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Preisverhandlungen
            </span>
            <br />
            für Ihr Unternehmen
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-gray-600 dark:text-gray-400">
            Automatisieren Sie Ihre Verhandlungen mit fortschrittlicher KI und sparen Sie Zeit und
            Geld.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="group">
                Kostenlos starten
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Mehr erfahren
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vertraut von führenden Unternehmen
            </p>
            <div className="flex flex-wrap gap-8 justify-center items-center opacity-60">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
    </section>
  )
}
