'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { formatNumber } from '@/lib/utils'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [totalSavings, setTotalSavings] = useState(1234567)
  const [language, setLanguage] = useState<'de' | 'en'>('de')
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSavings((prev) => prev + Math.floor(Math.random() * 100 + 50))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const t = {
    de: {
      nav: {
        home: 'Startseite',
        upload: 'Neue Verhandlung',
        dashboard: 'Dashboard',
        status: 'Status verfolgen',
        settings: 'Einstellungen',
      },
      saved: 'gespart',
    },
    en: {
      nav: {
        home: 'Home',
        upload: 'New Negotiation',
        dashboard: 'Dashboard',
        status: 'Track Status',
        settings: 'Settings',
      },
      saved: 'saved',
    },
  }[language]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Menü öffnen"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>

            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VOAI
              </h1>
            </Link>

            <div className="flex items-center gap-2 lg:gap-4">
              <div className="hidden sm:flex items-center space-x-2">
                <motion.div
                  key={totalSavings}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-purple-600 dark:text-purple-400 font-semibold"
                >
                  €{formatNumber(totalSavings)}
                </motion.div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{t.saved}</span>
              </div>

              <ThemeToggle />

              <button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={`Sprache wechseln zu ${language === 'de' ? 'Englisch' : 'Deutsch'}`}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              aria-label="Menü schließen"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50"
              aria-label="Hauptnavigation"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="mb-8 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  aria-label="Menü schließen"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
                <ul className="space-y-2">
                  {Object.entries(t.nav).map(([key, label]) => {
                    const href = key === 'home' ? '/' : `/${key}`
                    const isActive = pathname === href

                    return (
                      <li key={key}>
                        <Link
                          href={href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
