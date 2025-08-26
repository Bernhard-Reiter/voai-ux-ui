'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      features: 'Funktionen',
      pricing: 'Preise',
      about: 'Über uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      startFree: 'Kostenlos starten',
    },
    en: {
      features: 'Features',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      startFree: 'Start for free',
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container-width">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={`/?lang=${currentLang}`} className="text-2xl font-bold text-gray-900">
              voai
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`#features?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.features}
            </Link>
            <Link href={`#pricing?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.pricing}
            </Link>
            <Link href={`#about?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.about}
            </Link>
            <Link href={`#contact?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.contact}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-2 text-sm">
              <Link 
                href="/?lang=de" 
                className={`px-2 py-1 rounded ${currentLang === 'de' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                DE
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/?lang=en" 
                className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </Link>
            </div>
            
            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.login}
            </Link>
            <Link href="/register" className="btn-primary">
              {t.startFree}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href={`#features?lang=${currentLang}`} className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                {t.features}
              </Link>
              <Link href={`#pricing?lang=${currentLang}`} className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                {t.pricing}
              </Link>
              <Link href={`#about?lang=${currentLang}`} className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                {t.about}
              </Link>
              <Link href={`#contact?lang=${currentLang}`} className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                {t.contact}
              </Link>
              <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                {t.login}
              </Link>
              <Link href="/register" className="block px-3 py-2 mt-2">
                <span className="btn-primary w-full">{t.startFree}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}