import {
  sanitizeInput,
  validateEmail,
  escapeSQL,
  RateLimiter,
  generateCSRFToken,
  encrypt,
  decrypt,
  hashPassword,
  verifyPassword,
} from '@/lib/security'

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
      expect(sanitizeInput('<div>Hello</div>')).toBe('divHello/div')
    })

    it('should remove javascript: URLs', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")')
    })

    it('should remove event handlers', () => {
      expect(sanitizeInput('onclick=alert("xss")')).toBe('alert("xss")')
    })

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('user@@example.com')).toBe(false)
    })
  })

  describe('escapeSQL', () => {
    it('should escape SQL special characters', () => {
      expect(escapeSQL("'; DROP TABLE users; --")).toBe("\\'; DROP TABLE users; --")
      expect(escapeSQL('test"value')).toBe('test\\"value')
      expect(escapeSQL('test\\value')).toBe('test\\\\value')
    })
  })

  describe('RateLimiter', () => {
    it('should allow requests within limit', () => {
      const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 3 })

      expect(limiter.check('user1')).toBe(true)
      expect(limiter.check('user1')).toBe(true)
      expect(limiter.check('user1')).toBe(true)
    })

    it('should block requests exceeding limit', () => {
      const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 })

      expect(limiter.check('user2')).toBe(true)
      expect(limiter.check('user2')).toBe(true)
      expect(limiter.check('user2')).toBe(false)
    })

    it('should reset after time window', (done) => {
      const limiter = new RateLimiter({ windowMs: 100, maxRequests: 1 })

      expect(limiter.check('user3')).toBe(true)
      expect(limiter.check('user3')).toBe(false)

      setTimeout(() => {
        expect(limiter.check('user3')).toBe(true)
        done()
      }, 150)
    })
  })

  describe('CSRF Token', () => {
    it('should generate unique tokens', () => {
      const token1 = generateCSRFToken()
      const token2 = generateCSRFToken()

      expect(token1).not.toBe(token2)
      expect(token1.length).toBe(64)
      expect(token2.length).toBe(64)
    })
  })

  describe('Encryption/Decryption', () => {
    it('should encrypt and decrypt text correctly', () => {
      const text = 'Secret message'
      const secretKey = 'test-secret-key-123'

      const { encrypted, iv, tag } = encrypt(text, secretKey)
      const decrypted = decrypt(encrypted, iv, tag, secretKey)

      expect(decrypted).toBe(text)
    })

    it('should produce different ciphertexts for same plaintext', () => {
      const text = 'Same message'
      const secretKey = 'test-secret-key-123'

      const result1 = encrypt(text, secretKey)
      const result2 = encrypt(text, secretKey)

      expect(result1.encrypted).not.toBe(result2.encrypted)
      expect(result1.iv).not.toBe(result2.iv)
    })
  })

  describe('Password Hashing', () => {
    it('should hash and verify passwords', async () => {
      const password = 'SecurePassword123!'
      const hash = await hashPassword(password)

      expect(hash).toContain(':')
      expect(hash.length).toBeGreaterThan(100)

      const isValid = await verifyPassword(password, hash)
      expect(isValid).toBe(true)
    })

    it('should reject incorrect passwords', async () => {
      const password = 'SecurePassword123!'
      const hash = await hashPassword(password)

      const isValid = await verifyPassword('WrongPassword', hash)
      expect(isValid).toBe(false)
    })

    it('should generate different hashes for same password', async () => {
      const password = 'SamePassword123!'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      expect(hash1).not.toBe(hash2)
    })
  })
})
