'use client'

import { useState, useEffect } from 'react'

const COOKIE_CONSENT_KEY = 'voai-cookie-consent'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (storedConsent) {
      try {
        setConsent(JSON.parse(storedConsent))
      } catch (error) {
        console.error('Failed to parse cookie consent:', error)
      }
    }
  }, [])

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent: CookieConsent = {
      necessary: true, // Always true
      analytics: newConsent.analytics || false,
      marketing: newConsent.marketing || false,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedConsent))
    setConsent(updatedConsent)

    // Here you would also update your analytics/marketing services based on consent
    if (updatedConsent.analytics) {
      // Enable analytics (e.g., Google Analytics, Plausible, etc.)
      console.log('Analytics enabled')
    } else {
      // Disable analytics
      console.log('Analytics disabled')
    }

    if (updatedConsent.marketing) {
      // Enable marketing cookies
      console.log('Marketing enabled')
    } else {
      // Disable marketing cookies
      console.log('Marketing disabled')
    }
  }

  const revokeConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setConsent(null)
    // Disable all non-necessary cookies
    console.log('All consents revoked')
  }

  return {
    consent,
    updateConsent,
    revokeConsent,
    hasConsent: !!consent,
    canUseAnalytics: consent?.analytics || false,
    canUseMarketing: consent?.marketing || false,
  }
}
