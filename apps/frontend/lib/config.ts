// Helper to get required environment variables
function getRequiredEnv(key: string, defaultValue?: string): string {
  const value = process.env[key]

  // In production, throw if critical env vars are missing
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  // In development/test, use default value if provided
  if (!value && defaultValue !== undefined && process.env.NODE_ENV !== 'production') {
    return defaultValue
  }

  return value || ''
}

// Helper to get optional environment variables
function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue
}

export const config = {
  // Public API Configuration
  api: {
    url: getOptionalEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
    siteUrl: getOptionalEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  },

  // Security Configuration
  security: {
    csrfSecret: getRequiredEnv(
      'CSRF_SECRET',
      process.env.NODE_ENV === 'development' ? 'dev-csrf-secret' : undefined
    ),
    encryptionKey: getRequiredEnv(
      'ENCRYPTION_KEY',
      process.env.NODE_ENV === 'development' ? 'dev-encryption-key' : undefined
    ),
  },

  // Database Configuration
  database: {
    url: getRequiredEnv('DATABASE_URL'),
  },

  // AI Service Configuration
  ai: {
    apiKey: getRequiredEnv('AI_API_KEY'),
    apiUrl: getRequiredEnv('AI_API_URL'),
  },

  // Email Configuration
  email: {
    host: getRequiredEnv('EMAIL_HOST'),
    port: parseInt(getOptionalEnv('EMAIL_PORT', '587')),
    user: getRequiredEnv('EMAIL_USER'),
    password: getRequiredEnv('EMAIL_PASSWORD'),
  },

  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(getOptionalEnv('MAX_FILE_SIZE', '10485760')), // 10MB default
    uploadDir: getOptionalEnv('UPLOAD_DIR', 'uploads'),
    allowedTypes: {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'image/jpeg': '.jpg',
      'image/png': '.png',
    },
  },

  // Rate Limiting Configuration
  rateLimit: {
    windowMs: parseInt(getOptionalEnv('RATE_LIMIT_WINDOW_MS', '60000')), // 1 minute default
    maxRequests: parseInt(getOptionalEnv('RATE_LIMIT_MAX_REQUESTS', '10')),
  },

  // Environment
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
}

// Type-safe config getter
export function getConfig<T extends keyof typeof config>(key: T): (typeof config)[T] {
  return config[key]
}
