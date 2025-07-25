'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

const COOKIE_CONSENT_KEY = 'voai-cookie-consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    )
    setShowBanner(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    )
    setShowBanner(false)
  }

  const handleCustomize = () => {
    setShowDetails(!showDetails)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Cookie-Einstellungen</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige
                  Cookies sind für das Funktionieren der Website erforderlich, während andere uns
                  helfen, die Nutzung zu analysieren und zu verbessern.
                  <Link href="/privacy" className="ml-1 text-blue-600 hover:underline">
                    Mehr erfahren
                  </Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCustomize}
                  className="whitespace-nowrap"
                >
                  {showDetails ? 'Weniger anzeigen' : 'Anpassen'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptNecessary}
                  className="whitespace-nowrap"
                >
                  Nur notwendige
                </Button>
                <Button size="sm" onClick={handleAcceptAll} className="whitespace-nowrap">
                  Alle akzeptieren
                </Button>
              </div>
            </div>

            {showDetails && (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Notwendige Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Analyse-Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website
                          interagieren.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="analytics"
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Marketing-Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Diese Cookies werden verwendet, um Werbung relevanter zu gestalten.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="marketing"
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        const analytics =
                          (document.getElementById('analytics') as HTMLInputElement)?.checked ||
                          false
                        const marketing =
                          (document.getElementById('marketing') as HTMLInputElement)?.checked ||
                          false

                        localStorage.setItem(
                          COOKIE_CONSENT_KEY,
                          JSON.stringify({
                            necessary: true,
                            analytics,
                            marketing,
                            timestamp: new Date().toISOString(),
                          })
                        )
                        setShowBanner(false)
                      }}
                    >
                      Auswahl speichern
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
