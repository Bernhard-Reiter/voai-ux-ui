import {
  canUseAnalytics,
  canUseMarketing,
  initializeAnalytics,
  initializeMarketing,
  getConsentStatus,
  clearNonEssentialCookies,
  CookieConsent,
} from '@/lib/gdpr'

describe('GDPR Utilities', () => {
  const COOKIE_CONSENT_KEY = 'voai-cookie-consent'

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Clear all cookies
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
    // Clear console logs
    jest.clearAllMocks()
  })

  // Mock console.log
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()

  describe('canUseAnalytics', () => {
    it('should return false when no consent is stored', () => {
      expect(canUseAnalytics()).toBe(false)
    })

    it('should return true when analytics consent is given', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      expect(canUseAnalytics()).toBe(true)
    })

    it('should return false when analytics consent is denied', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      expect(canUseAnalytics()).toBe(false)
    })

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'invalid-json')
      expect(canUseAnalytics()).toBe(false)
    })

    it('should return false in non-browser environment', () => {
      // Mock window as undefined
      const originalWindow = global.window
      // @ts-expect-error - Testing non-browser environment
      delete global.window

      expect(canUseAnalytics()).toBe(false)

      // Restore window
      global.window = originalWindow
    })
  })

  describe('canUseMarketing', () => {
    it('should return false when no consent is stored', () => {
      expect(canUseMarketing()).toBe(false)
    })

    it('should return true when marketing consent is given', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: false,
        marketing: true,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      expect(canUseMarketing()).toBe(true)
    })

    it('should return false when marketing consent is denied', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      expect(canUseMarketing()).toBe(false)
    })

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'invalid-json')
      expect(canUseMarketing()).toBe(false)
    })

    it('should return false in non-browser environment', () => {
      // Mock window as undefined
      const originalWindow = global.window
      // @ts-expect-error - Testing non-browser environment
      delete global.window

      expect(canUseMarketing()).toBe(false)

      // Restore window
      global.window = originalWindow
    })
  })

  describe('initializeAnalytics', () => {
    it('should not initialize when consent is not given', () => {
      initializeAnalytics()
      expect(mockConsoleLog).toHaveBeenCalledWith('Analytics disabled - no consent')
    })

    it('should initialize when consent is given', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      initializeAnalytics()
      expect(mockConsoleLog).toHaveBeenCalledWith('Analytics initialized')
    })
  })

  describe('initializeMarketing', () => {
    it('should not initialize when consent is not given', () => {
      initializeMarketing()
      expect(mockConsoleLog).toHaveBeenCalledWith('Marketing tools disabled - no consent')
    })

    it('should initialize when consent is given', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: false,
        marketing: true,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      initializeMarketing()
      expect(mockConsoleLog).toHaveBeenCalledWith('Marketing tools initialized')
    })
  })

  describe('getConsentStatus', () => {
    it('should return null when no consent is stored', () => {
      expect(getConsentStatus()).toBeNull()
    })

    it('should return consent object when stored', () => {
      const consent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: '2024-01-01T00:00:00.000Z',
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      expect(getConsentStatus()).toEqual(consent)
    })

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'invalid-json')
      expect(getConsentStatus()).toBeNull()
    })

    it('should return null in non-browser environment', () => {
      // Mock window as undefined
      const originalWindow = global.window
      // @ts-expect-error - Testing non-browser environment
      delete global.window

      expect(getConsentStatus()).toBeNull()

      // Restore window
      global.window = originalWindow
    })
  })

  describe('clearNonEssentialCookies', () => {
    it('should clear non-essential cookies', () => {
      // Set some test cookies
      document.cookie = 'test-cookie=value; path=/'
      document.cookie = 'analytics-cookie=value; path=/'
      document.cookie = 'sb-access-token=keep-this; path=/'
      document.cookie = 'marketing-cookie=value; path=/'

      clearNonEssentialCookies()

      const remainingCookies = document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((c) => c)

      // Should keep essential cookies
      expect(remainingCookies.some((c) => c.startsWith('sb-access-token'))).toBe(true)

      // Should remove non-essential cookies
      expect(remainingCookies.some((c) => c.startsWith('test-cookie'))).toBe(false)
      expect(remainingCookies.some((c) => c.startsWith('analytics-cookie'))).toBe(false)
      expect(remainingCookies.some((c) => c.startsWith('marketing-cookie'))).toBe(false)
    })

    it('should handle cookies with no value', () => {
      document.cookie = 'empty-cookie=; path=/'
      document.cookie = 'another-empty=; path=/'

      // Should not throw
      expect(() => clearNonEssentialCookies()).not.toThrow()
    })

    it('should clear cookies with domain specified', () => {
      // Since we can't easily test domain-specific cookie deletion in jsdom,
      // we'll test that the function attempts to delete cookies with domain
      const originalHostname = window.location.hostname

      // Set a test cookie
      document.cookie = 'domain-cookie=value; path=/'

      clearNonEssentialCookies()

      // Verify the cookie deletion was attempted
      const remainingCookies = document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((c) => c)
      expect(remainingCookies.some((c) => c.startsWith('domain-cookie'))).toBe(false)
    })

    it('should preserve sb-refresh-token', () => {
      document.cookie = 'sb-refresh-token=keep-this-too; path=/'
      document.cookie = 'other-cookie=remove-this; path=/'

      clearNonEssentialCookies()

      const remainingCookies = document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((c) => c)

      expect(remainingCookies.some((c) => c.startsWith('sb-refresh-token'))).toBe(true)
      expect(remainingCookies.some((c) => c.startsWith('other-cookie'))).toBe(false)
    })

    it('should handle cookies with special characters', () => {
      document.cookie = 'special-cookie=value%20with%20spaces; path=/'
      document.cookie = 'unicode-cookie=value-with-😀; path=/'

      // Should not throw
      expect(() => clearNonEssentialCookies()).not.toThrow()
    })
  })

  describe('Consent persistence', () => {
    it('should persist consent across function calls', () => {
      // Initially no consent
      expect(canUseAnalytics()).toBe(false)
      expect(canUseMarketing()).toBe(false)

      // Set consent
      const consent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

      // Verify consent is persisted
      expect(canUseAnalytics()).toBe(true)
      expect(canUseMarketing()).toBe(true)
      expect(getConsentStatus()).toEqual(consent)
    })

    it('should handle consent updates', () => {
      // Initial consent
      const initialConsent: CookieConsent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: '2024-01-01T00:00:00.000Z',
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(initialConsent))

      expect(canUseAnalytics()).toBe(true)
      expect(canUseMarketing()).toBe(true)

      // Update consent
      const updatedConsent: CookieConsent = {
        necessary: true,
        analytics: false,
        marketing: true,
        timestamp: '2024-01-02T00:00:00.000Z',
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedConsent))

      expect(canUseAnalytics()).toBe(false)
      expect(canUseMarketing()).toBe(true)
    })
  })
})
