'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Hero() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  
  const content = {
    de: {
      headline: 'Lass für dich verhandeln – spare bei deinem Kauf ohne Risiko.',
      subheadline: 'Du lädst dein Angebot hoch. Wir verhandeln. Du zahlst nur, wenn du wirklich sparst.',
      cta: 'Angebot hochladen & sparen',
      ctaSecondary: 'So funktioniert es',
      trust1: '0 Risiko – Geld-zurück-Garantie',
      trust2: '100 % unabhängig vom Händler',
    },
    en: {
      headline: 'Let us negotiate for you – save without risk.',
      subheadline: 'Upload your quote. We negotiate. You only pay if you really save.',
      cta: 'Upload quote & save',
      ctaSecondary: 'How it works',
      trust1: 'Zero risk – money-back guarantee',
      trust2: '100% independent from the seller',
    }
  }

  const t = content[currentLang as keyof typeof content]

  const [heroSrc, setHeroSrc] = useState<string>('/hero-mock.svg')

  useEffect(() => {
    // Prüfe, ob ein echtes Bild vorhanden ist
    fetch('/hero.jpg', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHeroSrc('/hero.jpg')
      })
      .catch(() => {})
  }, [])

  return (
    <section id="upload" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-width">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {t.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mb-8">
              <Link href="/#upload" className="btn-primary text-lg px-8 py-4">{t.cta}</Link>
              <Link href="/#wie-es-funktioniert" className="btn-secondary text-lg px-8 py-4">{t.ctaSecondary}</Link>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-start justify-center items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2"><span className="text-green-600">✓</span> {t.trust1}</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="inline-flex items-center gap-2"><span className="text-green-600">✓</span> {t.trust2}</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src={heroSrc}
              alt="Angebots‑Upload Mockup"
              width={1200}
              height={900}
              className="w-full h-auto rounded-xl shadow-lg"
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop stop-color='%23f2f4f7'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='24' fill='url(%23g)'/%3E%3C/svg%3E"
            />
          </div>
        </div>
      </div>
    </section>
  )
}