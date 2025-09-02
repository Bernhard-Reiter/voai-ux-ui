'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReveal } from '@/components/useReveal'
import Link from 'next/link'

export default function SavingsCalculator() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  const [offer, setOffer] = useState<number>(10000)
  const [rate, setRate] = useState<number>(15) // erwartete Ersparnis in %

  const content = {
    de: {
      title: 'Interaktiver Ersparnis‑Rechner',
      subtitle: 'Schau selbst, wie viel du sparen kannst.',
      inputLabel: 'Dein Angebotspreis',
      rateLabel: 'Erwartete Ersparnis',
      result: 'Deine voraussichtliche Ersparnis',
      fee: 'Dein Anteil an voai (10%)',
      net: 'Dein Netto‑Gewinn',
      cta: 'Angebot hochladen & sparen',
    },
    en: {
      title: 'Interactive savings calculator',
      subtitle: 'See how much you can save.',
      inputLabel: 'Your quote price',
      rateLabel: 'Expected savings',
      result: 'Your estimated savings',
      fee: 'Your share to voai (10%)',
      net: 'Your net gain',
      cta: 'Upload quote & save',
    }
  }

  const t = content[currentLang as keyof typeof content]
  useReveal()

  const estimatedSavings = Math.round((offer * rate) / 100)
  const voaiFee = Math.round(estimatedSavings * 0.1)
  const netGain = estimatedSavings - voaiFee

  return (
    <section id="rechner" className="py-16 md:py-24 bg-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto" data-reveal>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.inputLabel}</label>
                <div className="flex gap-3">
                  <span className="inline-flex items-center px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-600">€</span>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={offer}
                    onChange={(e) => setOffer(Number(e.target.value))}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.rateLabel}: {rate}%</label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.result}</h3>
                <p className="text-3xl font-bold text-green-700">€{estimatedSavings.toLocaleString('de-DE')}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.fee}</h3>
                <p className="text-2xl font-bold text-gray-900">€{voaiFee.toLocaleString('de-DE')}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.net}</h3>
                <p className="text-2xl font-bold text-gray-900">€{netGain.toLocaleString('de-DE')}</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/#upload" className="btn-primary text-lg px-8 py-4">{t.cta}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}