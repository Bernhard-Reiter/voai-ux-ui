import crypto from 'crypto'

// CSRF Token generieren
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Input Sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Entfernt HTML-Tags
    .replace(/javascript:/gi, '') // Entfernt JavaScript-URLs
    .replace(/on\w+=/gi, '') // Entfernt Event-Handler
    .trim()
}

// Email Validierung
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// SQL Injection Prevention (für parametrisierte Queries)
export function escapeSQL(str: string): string {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0':
        return '\\0'
      case '\x08':
        return '\\b'
      case '\x09':
        return '\\t'
      case '\x1a':
        return '\\z'
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '"':
      case "'":
      case '\\':
      case '%':
        return '\\' + char
      default:
        return char
    }
  })
}

// Rate Limiting Helper
interface RateLimitOptions {
  windowMs: number
  maxRequests: number
}

export class RateLimiter {
  private store: Map<string, { count: number; resetTime: number }> = new Map()

  constructor(private options: RateLimitOptions) {}

  check(identifier: string): boolean {
    const now = Date.now()
    const record = this.store.get(identifier)

    if (!record || now > record.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.options.windowMs,
      })
      return true
    }

    if (record.count >= this.options.maxRequests) {
      return false
    }

    record.count++
    return true
  }

  reset(identifier: string): void {
    this.store.delete(identifier)
  }
}

// Encryption Helper
const algorithm = 'aes-256-gcm'

export function encrypt(
  text: string,
  secretKey: string
): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16)
  const salt = crypto.randomBytes(64)
  const key = crypto.pbkdf2Sync(secretKey, salt, 2145, 32, 'sha512')

  const cipher = crypto.createCipheriv(algorithm, key, iv)

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])

  const tag = cipher.getAuthTag()

  return {
    encrypted: Buffer.concat([salt, encrypted]).toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  }
}

export function decrypt(encryptedData: string, iv: string, tag: string, secretKey: string): string {
  const data = Buffer.from(encryptedData, 'hex')
  const salt = data.slice(0, 64)
  const encrypted = data.slice(64)

  const key = crypto.pbkdf2Sync(secretKey, salt, 2145, 32, 'sha512')

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])

  return decrypted.toString('utf8')
}

// Session Token Generation
export function generateSessionToken(): string {
  return crypto.randomBytes(48).toString('base64url')
}

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(key === derivedKey.toString('hex'))
    })
  })
}
