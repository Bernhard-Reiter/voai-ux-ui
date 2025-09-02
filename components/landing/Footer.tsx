'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Footer() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      product: 'Inhalt',
      how: 'Wie es funktioniert',
      benefits: 'Vorteile',
      prices: 'Preise',
      about: 'Über uns',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'AGB',
      imprint: 'Impressum',
      lang: 'Sprache',
      de: 'Deutsch',
      en: 'Englisch',
      copyright: '© 2024 voai – einfach gespart.',
    },
    en: {
      product: 'Content',
      how: 'How it works',
      benefits: 'Benefits',
      prices: 'Pricing',
      about: 'About',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      imprint: 'Imprint',
      lang: 'Language',
      de: 'German',
      en: 'English',
      copyright: '© 2024 voai – simply saved.',
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-width py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.product}</h3>
            <ul className="space-y-2">
              <li><Link href="/#wie-es-funktioniert" className="text-gray-600 hover:text-gray-900">{t.how}</Link></li>
              <li><Link href="/#vorteile" className="text-gray-600 hover:text-gray-900">{t.benefits}</Link></li>
              <li><Link href="/#preise" className="text-gray-600 hover:text-gray-900">{t.prices}</Link></li>
              <li><Link href="/#ueber-uns" className="text-gray-600 hover:text-gray-900">{t.about}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">{t.privacy}</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">{t.terms}</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">{t.imprint}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.lang}</h3>
            <ul className="space-y-2">
              <li><Link href="/?lang=de" className="text-gray-600 hover:text-gray-900">{t.de}</Link></li>
              <li><Link href="/?lang=en" className="text-gray-600 hover:text-gray-900">{t.en}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}