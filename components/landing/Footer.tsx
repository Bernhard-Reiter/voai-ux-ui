'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Footer() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      company: 'Unternehmen',
      about: 'Über uns',
      careers: 'Karriere',
      press: 'Presse',
      contact: 'Kontakt',
      product: 'Produkt',
      features: 'Funktionen',
      pricing: 'Preise',
      integrations: 'Integrationen',
      security: 'Sicherheit',
      resources: 'Ressourcen',
      blog: 'Blog',
      help: 'Hilfe-Center',
      api: 'API Dokumentation',
      status: 'System Status',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'AGB',
      imprint: 'Impressum',
      gdpr: 'DSGVO',
      copyright: '© 2024 voai GmbH. Alle Rechte vorbehalten.',
    },
    en: {
      company: 'Company',
      about: 'About us',
      careers: 'Careers',
      press: 'Press',
      contact: 'Contact',
      product: 'Product',
      features: 'Features',
      pricing: 'Pricing',
      integrations: 'Integrations',
      security: 'Security',
      resources: 'Resources',
      blog: 'Blog',
      help: 'Help Center',
      api: 'API Documentation',
      status: 'System Status',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      imprint: 'Imprint',
      gdpr: 'GDPR',
      copyright: '© 2024 voai GmbH. All rights reserved.',
    }
  }

  const t = content[currentLang as keyof typeof content]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-width py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.company}</h3>
            <ul className="space-y-2">
              <li><Link href={`/about?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.about}</Link></li>
              <li><Link href={`/careers?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.careers}</Link></li>
              <li><Link href={`/press?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.press}</Link></li>
              <li><Link href={`/contact?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.contact}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.product}</h3>
            <ul className="space-y-2">
              <li><Link href={`/features?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.features}</Link></li>
              <li><Link href={`/pricing?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.pricing}</Link></li>
              <li><Link href={`/integrations?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.integrations}</Link></li>
              <li><Link href={`/security?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.security}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.resources}</h3>
            <ul className="space-y-2">
              <li><Link href={`/blog?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.blog}</Link></li>
              <li><Link href={`/help?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.help}</Link></li>
              <li><Link href={`/api?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.api}</Link></li>
              <li><Link href={`/status?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.status}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li><Link href={`/privacy?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.privacy}</Link></li>
              <li><Link href={`/terms?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.terms}</Link></li>
              <li><Link href={`/imprint?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.imprint}</Link></li>
              <li><Link href={`/gdpr?lang=${currentLang}`} className="text-gray-600 hover:text-gray-900">{t.gdpr}</Link></li>
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