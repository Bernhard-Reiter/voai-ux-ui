/**
 * GDPR compliance utilities
 */

const COOKIE_CONSENT_KEY = 'voai-cookie-consent'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

/**
 * Check if user has given consent for analytics
 */
export function canUseAnalytics(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) return false

    const parsed: CookieConsent = JSON.parse(consent)
    return parsed.analytics === true
  } catch {
    return false
  }
}

/**
 * Check if user has given consent for marketing
 */
export function canUseMarketing(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) return false

    const parsed: CookieConsent = JSON.parse(consent)
    return parsed.marketing === true
  } catch {
    return false
  }
}

/**
 * Initialize analytics based on consent
 */
export function initializeAnalytics() {
  if (!canUseAnalytics()) {
    console.log('Analytics disabled - no consent')
    return
  }

  // Initialize your analytics service here
  // Example: Google Analytics, Plausible, etc.
  console.log('Analytics initialized')
}

/**
 * Initialize marketing tools based on consent
 */
export function initializeMarketing() {
  if (!canUseMarketing()) {
    console.log('Marketing tools disabled - no consent')
    return
  }

  // Initialize your marketing tools here
  // Example: Facebook Pixel, Google Ads, etc.
  console.log('Marketing tools initialized')
}

/**
 * Get user consent status
 */
export function getConsentStatus(): CookieConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) return null

    return JSON.parse(consent)
  } catch {
    return null
  }
}

/**
 * Clear all non-essential cookies
 */
export function clearNonEssentialCookies() {
  // Get all cookies
  const cookies = document.cookie.split(';')

  // List of essential cookies that should not be deleted
  const essentialCookies = [
    'sb-access-token',
    'sb-refresh-token',
    // Add other essential cookies here
  ]

  // Delete non-essential cookies
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()

    if (!essentialCookies.some((essential) => name.includes(essential))) {
      // Delete cookie
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
    }
  })
}
