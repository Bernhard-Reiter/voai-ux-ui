'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VOAI
            </h3>
            <p className="text-sm text-gray-600">
              KI-gestützte Preisverhandlungen für maximale Ersparnisse.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Produkt</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Funktionen
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Preise
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  So funktioniert&apos;s
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Unternehmen</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Karriere
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link
                  href="/imprint"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600"
        >
          <p>&copy; {currentYear} VOAI. Alle Rechte vorbehalten.</p>
        </motion.div>
      </div>
    </footer>
  )
}
