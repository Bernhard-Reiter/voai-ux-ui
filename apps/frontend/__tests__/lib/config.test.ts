import { config, getConfig } from '@/lib/config'

describe('Config Module', () => {
  // Store original env vars
  const originalEnv = process.env

  beforeEach(() => {
    // Reset modules to ensure fresh config
    jest.resetModules()
    // Reset process.env
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original env
    process.env = originalEnv
  })

  describe('Environment Variable Handling', () => {
    it('should use default values in development mode', () => {
      process.env.NODE_ENV = 'development'

      // Re-import config after setting env
      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.security.csrfSecret).toBe('dev-csrf-secret')
        expect(config.security.encryptionKey).toBe('dev-encryption-key')
      })
    })

    it('should throw error for missing required env vars in production', () => {
      process.env.NODE_ENV = 'production'
      delete process.env.CSRF_SECRET

      // Should throw when importing config
      expect(() => {
        jest.isolateModules(() => {
          require('@/lib/config')
        })
      }).toThrow('Missing required environment variable: CSRF_SECRET')
    })

    it('should not throw for missing required env vars in test mode', () => {
      process.env.NODE_ENV = 'test'
      delete process.env.CSRF_SECRET

      // Should not throw
      expect(() => {
        jest.isolateModules(() => {
          require('@/lib/config')
        })
      }).not.toThrow()
    })

    it('should use provided environment variables', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
      process.env.CSRF_SECRET = 'test-csrf-secret'
      process.env.ENCRYPTION_KEY = 'test-encryption-key'
      process.env.DATABASE_URL = 'postgresql://test'
      process.env.AI_API_KEY = 'test-ai-key'
      process.env.AI_API_URL = 'https://ai.example.com'
      process.env.EMAIL_HOST = 'smtp.example.com'
      process.env.EMAIL_PORT = '465'
      process.env.EMAIL_USER = 'test@example.com'
      process.env.EMAIL_PASSWORD = 'test-password'
      process.env.MAX_FILE_SIZE = '20971520'
      process.env.UPLOAD_DIR = 'custom-uploads'
      process.env.RATE_LIMIT_WINDOW_MS = '120000'
      process.env.RATE_LIMIT_MAX_REQUESTS = '20'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.api.url).toBe('https://api.example.com')
        expect(config.api.siteUrl).toBe('https://example.com')
        expect(config.security.csrfSecret).toBe('test-csrf-secret')
        expect(config.security.encryptionKey).toBe('test-encryption-key')
        expect(config.database.url).toBe('postgresql://test')
        expect(config.ai.apiKey).toBe('test-ai-key')
        expect(config.ai.apiUrl).toBe('https://ai.example.com')
        expect(config.email.host).toBe('smtp.example.com')
        expect(config.email.port).toBe(465)
        expect(config.email.user).toBe('test@example.com')
        expect(config.email.password).toBe('test-password')
        expect(config.upload.maxFileSize).toBe(20971520)
        expect(config.upload.uploadDir).toBe('custom-uploads')
        expect(config.rateLimit.windowMs).toBe(120000)
        expect(config.rateLimit.maxRequests).toBe(20)
      })
    })
  })

  describe('Config Structure', () => {
    it('should have correct API configuration', () => {
      expect(config.api).toHaveProperty('url')
      expect(config.api).toHaveProperty('siteUrl')
      expect(typeof config.api.url).toBe('string')
      expect(typeof config.api.siteUrl).toBe('string')
    })

    it('should have correct security configuration', () => {
      expect(config.security).toHaveProperty('csrfSecret')
      expect(config.security).toHaveProperty('encryptionKey')
      expect(typeof config.security.csrfSecret).toBe('string')
      expect(typeof config.security.encryptionKey).toBe('string')
    })

    it('should have correct database configuration', () => {
      expect(config.database).toHaveProperty('url')
      expect(typeof config.database.url).toBe('string')
    })

    it('should have correct AI configuration', () => {
      expect(config.ai).toHaveProperty('apiKey')
      expect(config.ai).toHaveProperty('apiUrl')
      expect(typeof config.ai.apiKey).toBe('string')
      expect(typeof config.ai.apiUrl).toBe('string')
    })

    it('should have correct email configuration', () => {
      expect(config.email).toHaveProperty('host')
      expect(config.email).toHaveProperty('port')
      expect(config.email).toHaveProperty('user')
      expect(config.email).toHaveProperty('password')
      expect(typeof config.email.host).toBe('string')
      expect(typeof config.email.port).toBe('number')
      expect(typeof config.email.user).toBe('string')
      expect(typeof config.email.password).toBe('string')
    })

    it('should have correct upload configuration', () => {
      expect(config.upload).toHaveProperty('maxFileSize')
      expect(config.upload).toHaveProperty('uploadDir')
      expect(config.upload).toHaveProperty('allowedTypes')
      expect(typeof config.upload.maxFileSize).toBe('number')
      expect(typeof config.upload.uploadDir).toBe('string')
      expect(typeof config.upload.allowedTypes).toBe('object')
    })

    it('should have correct rate limit configuration', () => {
      expect(config.rateLimit).toHaveProperty('windowMs')
      expect(config.rateLimit).toHaveProperty('maxRequests')
      expect(typeof config.rateLimit.windowMs).toBe('number')
      expect(typeof config.rateLimit.maxRequests).toBe('number')
    })

    it('should have correct environment flags', () => {
      expect(config.env).toHaveProperty('isDevelopment')
      expect(config.env).toHaveProperty('isProduction')
      expect(config.env).toHaveProperty('isTest')
      expect(typeof config.env.isDevelopment).toBe('boolean')
      expect(typeof config.env.isProduction).toBe('boolean')
      expect(typeof config.env.isTest).toBe('boolean')
    })
  })

  describe('Allowed File Types', () => {
    it('should have correct MIME type mappings', () => {
      const allowedTypes = config.upload.allowedTypes

      expect(allowedTypes['application/pdf']).toBe('.pdf')
      expect(allowedTypes['application/msword']).toBe('.doc')
      expect(
        allowedTypes['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      ).toBe('.docx')
      expect(allowedTypes['image/jpeg']).toBe('.jpg')
      expect(allowedTypes['image/png']).toBe('.png')
    })

    it('should have exactly 5 allowed file types', () => {
      const allowedTypes = Object.keys(config.upload.allowedTypes)
      expect(allowedTypes).toHaveLength(5)
    })
  })

  describe('Default Values', () => {
    it('should use correct default values for optional env vars', () => {
      // Clear optional env vars
      delete process.env.NEXT_PUBLIC_API_URL
      delete process.env.NEXT_PUBLIC_SITE_URL
      delete process.env.EMAIL_PORT
      delete process.env.MAX_FILE_SIZE
      delete process.env.UPLOAD_DIR
      delete process.env.RATE_LIMIT_WINDOW_MS
      delete process.env.RATE_LIMIT_MAX_REQUESTS

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.api.url).toBe('http://localhost:3000/api')
        expect(config.api.siteUrl).toBe('http://localhost:3000')
        expect(config.email.port).toBe(587)
        expect(config.upload.maxFileSize).toBe(10485760) // 10MB
        expect(config.upload.uploadDir).toBe('uploads')
        expect(config.rateLimit.windowMs).toBe(60000) // 1 minute
        expect(config.rateLimit.maxRequests).toBe(10)
      })
    })

    it('should parse numeric env vars correctly', () => {
      process.env.EMAIL_PORT = '25'
      process.env.MAX_FILE_SIZE = '5242880'
      process.env.RATE_LIMIT_WINDOW_MS = '30000'
      process.env.RATE_LIMIT_MAX_REQUESTS = '5'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.email.port).toBe(25)
        expect(config.upload.maxFileSize).toBe(5242880)
        expect(config.rateLimit.windowMs).toBe(30000)
        expect(config.rateLimit.maxRequests).toBe(5)
      })
    })
  })

  describe('getConfig Function', () => {
    it('should return correct config sections', () => {
      expect(getConfig('api')).toBe(config.api)
      expect(getConfig('security')).toBe(config.security)
      expect(getConfig('database')).toBe(config.database)
      expect(getConfig('ai')).toBe(config.ai)
      expect(getConfig('email')).toBe(config.email)
      expect(getConfig('upload')).toBe(config.upload)
      expect(getConfig('rateLimit')).toBe(config.rateLimit)
      expect(getConfig('env')).toBe(config.env)
    })

    it('should have type safety', () => {
      const apiConfig = getConfig('api')
      expect(apiConfig).toHaveProperty('url')
      expect(apiConfig).toHaveProperty('siteUrl')

      const securityConfig = getConfig('security')
      expect(securityConfig).toHaveProperty('csrfSecret')
      expect(securityConfig).toHaveProperty('encryptionKey')
    })
  })

  describe('Environment Detection', () => {
    it('should correctly detect development environment', () => {
      process.env.NODE_ENV = 'development'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.env.isDevelopment).toBe(true)
        expect(config.env.isProduction).toBe(false)
        expect(config.env.isTest).toBe(false)
      })
    })

    it('should correctly detect production environment', () => {
      process.env.NODE_ENV = 'production'

      // Set required env vars for production
      process.env.CSRF_SECRET = 'prod-secret'
      process.env.ENCRYPTION_KEY = 'prod-key'
      process.env.DATABASE_URL = 'postgresql://prod'
      process.env.AI_API_KEY = 'prod-ai-key'
      process.env.AI_API_URL = 'https://ai.prod.com'
      process.env.EMAIL_HOST = 'smtp.prod.com'
      process.env.EMAIL_USER = 'prod@example.com'
      process.env.EMAIL_PASSWORD = 'prod-password'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.env.isDevelopment).toBe(false)
        expect(config.env.isProduction).toBe(true)
        expect(config.env.isTest).toBe(false)
      })
    })

    it('should correctly detect test environment', () => {
      process.env.NODE_ENV = 'test'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.env.isDevelopment).toBe(false)
        expect(config.env.isProduction).toBe(false)
        expect(config.env.isTest).toBe(true)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string env vars', () => {
      process.env.NEXT_PUBLIC_API_URL = ''
      process.env.UPLOAD_DIR = ''

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        // Should use default values when env var is empty string
        expect(config.api.url).toBe('http://localhost:3000/api')
        expect(config.upload.uploadDir).toBe('uploads')
      })
    })

    it('should handle non-numeric values for numeric env vars', () => {
      process.env.EMAIL_PORT = 'not-a-number'
      process.env.MAX_FILE_SIZE = 'invalid'

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        // parseInt should return NaN for invalid values
        expect(isNaN(config.email.port)).toBe(true)
        expect(isNaN(config.upload.maxFileSize)).toBe(true)
      })
    })

    it('should handle very large numeric values', () => {
      process.env.MAX_FILE_SIZE = '9007199254740991' // Number.MAX_SAFE_INTEGER
      process.env.RATE_LIMIT_WINDOW_MS = '2147483647' // 32-bit max

      jest.isolateModules(() => {
        const { config } = require('@/lib/config')

        expect(config.upload.maxFileSize).toBe(9007199254740991)
        expect(config.rateLimit.windowMs).toBe(2147483647)
      })
    })
  })
})
