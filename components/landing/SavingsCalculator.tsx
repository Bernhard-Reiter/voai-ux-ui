'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SavingsCalculator() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  const [employees, setEmployees] = useState(50)
  const [receiptsPerMonth, setReceiptsPerMonth] = useState(20)
  
  const content = {
    de: {
      title: 'Berechnen Sie Ihr Einsparpotenzial',
      subtitle: 'Sehen Sie, wie viel Zeit und Geld Sie mit voai sparen können',
      employees: 'Anzahl Mitarbeiter',
      receipts: 'Belege pro Mitarbeiter/Monat',
      currentCost: 'Ihre aktuellen Kosten',
      withVoai: 'Ihre Kosten mit voai',
      savings: 'Ihre Ersparnis',
      perYear: 'pro Jahr',
      timeSpent: 'Zeitaufwand:',
      hours: 'Stunden',
      costs: 'Kosten:',
      cta: 'Jetzt voai testen und sparen',
    },
    en: {
      title: 'Calculate your savings potential',
      subtitle: 'See how much time and money you can save with voai',
      employees: 'Number of employees',
      receipts: 'Receipts per employee/month',
      currentCost: 'Your current costs',
      withVoai: 'Your costs with voai',
      savings: 'Your savings',
      perYear: 'per year',
      timeSpent: 'Time spent:',
      hours: 'hours',
      costs: 'Costs:',
      cta: 'Try voai now and save',
    }
  }

  const t = content[currentLang as keyof typeof content]

  // Calculate savings
  const totalReceipts = employees * receiptsPerMonth * 12
  const currentHours = totalReceipts * 0.1 // 6 minutes per receipt
  const voaiHours = totalReceipts * 0.017 // 1 minute per receipt
  const hourlyRate = 50 // EUR per hour
  const currentCosts = currentHours * hourlyRate
  const voaiCosts = voaiHours * hourlyRate + (employees * 8 * 12) // 8 EUR per user per month
  const savings = currentCosts - voaiCosts

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.employees}: {employees}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.receipts}: {receiptsPerMonth}
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={receiptsPerMonth}
                  onChange={(e) => setReceiptsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.currentCost}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {t.timeSpent} {Math.round(currentHours)} {t.hours}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  €{currentCosts.toLocaleString('de-DE')}
                </p>
                <p className="text-sm text-gray-500">{t.perYear}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.withVoai}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {t.timeSpent} {Math.round(voaiHours)} {t.hours}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  €{voaiCosts.toLocaleString('de-DE')}
                </p>
                <p className="text-sm text-gray-500">{t.perYear}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.savings}</h3>
                <p className="text-sm text-green-600 mb-1">
                  {Math.round(((currentHours - voaiHours) / currentHours) * 100)}% {currentLang === 'de' ? 'weniger Zeit' : 'less time'}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  €{savings.toLocaleString('de-DE')}
                </p>
                <p className="text-sm text-gray-500">{t.perYear}</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/" className="btn-primary text-lg px-8 py-4">
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}