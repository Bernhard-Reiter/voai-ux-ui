'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@voai/ui'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Bereit, Ihre Kosten zu senken?
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Starten Sie noch heute und erleben Sie die Zukunft der automatisierten Preisverhandlung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="group">
                Kostenlos testen
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              >
                Demo anfragen
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-purple-100">
            Keine Kreditkarte erforderlich • 14 Tage kostenlos testen • Jederzeit kündbar
          </p>
        </motion.div>
      </div>
    </section>
  )
}
