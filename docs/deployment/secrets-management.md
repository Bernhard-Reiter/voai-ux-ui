# Secrets Management Guide

## Overview

This guide covers secure management of secrets and environment variables across development, CI/CD, and production environments for the VOAI platform.

## Secret Categories

### 1. Authentication Secrets
- **Supabase**: Service role keys, JWT secrets
- **OAuth Providers**: Client IDs and secrets
- **API Keys**: Third-party service credentials

### 2. Infrastructure Secrets
- **Vercel**: Deployment tokens, project IDs
- **GitHub**: Personal access tokens, webhook secrets
- **Database**: Connection strings, migration passwords

### 3. Application Secrets
- **Encryption Keys**: For data at rest
- **Signing Keys**: For tokens and cookies
- **Feature Flags**: Service credentials

## Environment-Specific Management

### Development Environment

#### Local Setup (.env.local)

```bash
# Create .env.local (never commit this file)
cp .env.example .env.local

# Required variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
```

#### Git Configuration

```bash
# Ensure .env files are ignored
echo ".env.local" >> .gitignore
echo ".env*.local" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore for env files"
```

### CI/CD Environment (GitHub Actions)

#### Setting GitHub Secrets

1. Navigate to Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each required secret:

```yaml
# Required CI/CD Secrets
VERCEL_TOKEN              # For deployments
VERCEL_ORG_ID             # Vercel organization
CHROMATIC_PROJECT_TOKEN   # For Storybook
TURBO_TOKEN               # For remote caching (optional)
SUPABASE_SERVICE_ROLE_KEY # For migrations
```

#### Using Secrets in Workflows

```yaml
# .github/workflows/deploy.yml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

steps:
  - name: Deploy to Vercel
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    run: vercel deploy --prod
```

### Production Environment (Vercel)

#### Setting Environment Variables

```bash
# Using Vercel CLI
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add DATABASE_URL production

# Or via vercel.json
{
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_API_URL": "@api-url"
    }
  }
}
```

#### Environment Variable Types

1. **Plain Text**: For non-sensitive configuration
2. **Encrypted**: For sensitive values (automatic in Vercel)
3. **Runtime**: Available during execution
4. **Build-time**: Only during build process

## Secret Rotation

### Automated Rotation Script

```typescript
// scripts/rotate-secrets.ts
import { createClient } from '@supabase/supabase-js'
import { Vercel } from '@vercel/sdk'

async function rotateSupabaseKey() {
  // 1. Generate new service role key
  const newKey = await generateNewServiceRoleKey()
  
  // 2. Update in Vercel
  await vercel.env.update('SUPABASE_SERVICE_ROLE_KEY', newKey)
  
  // 3. Update in GitHub
  await github.secrets.update('SUPABASE_SERVICE_ROLE_KEY', newKey)
  
  // 4. Verify new key works
  const client = createClient(url, newKey)
  await client.from('health_check').select().single()
  
  // 5. Log rotation
  await logRotation('SUPABASE_SERVICE_ROLE_KEY', new Date())
}
```

### Rotation Schedule

| Secret Type | Rotation Frequency | Last Rotated |
|------------|-------------------|--------------|
| API Keys | 90 days | Track in 1Password |
| Database Passwords | 180 days | Track in 1Password |
| OAuth Secrets | 365 days | Track in provider |
| Signing Keys | Never (unless compromised) | N/A |

## Security Best Practices

### 1. Never Hardcode Secrets

```typescript
// ❌ Bad
const apiKey = "sk_live_abcd1234"

// ✅ Good
const apiKey = process.env.API_KEY
if (!apiKey) {
  throw new Error('API_KEY environment variable is required')
}
```

### 2. Use Secret Scanning

```yaml
# .github/workflows/security.yml
name: Secret Scanning
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3. Implement Least Privilege

```typescript
// Use read-only keys where possible
const publicClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Read-only
)

// Only use service role when necessary
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Full access
)
```

### 4. Validate Environment on Startup

```typescript
// lib/env-check.ts
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const

export function validateEnv() {
  const missing = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  )
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

// Call in app initialization
validateEnv()
```

## Secret Storage Solutions

### 1Password Integration

```bash
# Install 1Password CLI
brew install 1password-cli

# Login
op signin

# Create secret
op item create --category=password \
  --title="VOAI Production Secrets" \
  --vault="Engineering" \
  password="your-secret-value"

# Retrieve secret
export SUPABASE_KEY=$(op item get "VOAI Production Secrets" --fields password)
```

### Vault by HashiCorp

```bash
# Store secret
vault kv put secret/voai/production \
  supabase_key="your-key" \
  vercel_token="your-token"

# Retrieve secret
vault kv get -field=supabase_key secret/voai/production
```

### AWS Secrets Manager

```typescript
import { SecretsManager } from '@aws-sdk/client-secrets-manager'

const client = new SecretsManager({ region: 'us-east-1' })

async function getSecret(secretName: string) {
  const response = await client.getSecretValue({
    SecretId: secretName
  })
  
  return JSON.parse(response.SecretString!)
}

// Usage
const secrets = await getSecret('voai/production')
process.env.SUPABASE_KEY = secrets.supabase_key
```

## Emergency Procedures

### Compromised Secret Response

1. **Immediate Actions**
   ```bash
   # Revoke compromised key
   vercel env rm COMPROMISED_KEY --yes
   
   # Generate new key
   NEW_KEY=$(openssl rand -base64 32)
   
   # Update everywhere
   vercel env add NEW_KEY=$NEW_KEY
   gh secret set NEW_KEY --body "$NEW_KEY"
   ```

2. **Audit Usage**
   ```sql
   -- Check for unauthorized access
   SELECT * FROM audit_logs
   WHERE api_key_used = 'compromised-key'
   AND timestamp > NOW() - INTERVAL '7 days'
   ORDER BY timestamp DESC;
   ```

3. **Notify Team**
   - Send incident report
   - Update rotation schedule
   - Review access logs

### Backup Access

```yaml
# Store encrypted backup
- name: Backup Secrets
  run: |
    echo "${{ secrets.BACKUP_ENCRYPTION_KEY }}" | gpg --decrypt > secrets.json
    aws s3 cp secrets.json s3://voai-backups/secrets/$(date +%Y%m%d).json
    rm secrets.json
```

## Monitoring & Auditing

### Secret Usage Tracking

```typescript
// middleware/secret-usage.ts
export async function trackSecretUsage(
  secretName: string,
  context: RequestContext
) {
  await db.from('secret_usage_logs').insert({
    secret_name: secretName,
    used_at: new Date(),
    used_by: context.userId,
    ip_address: context.ip,
    user_agent: context.userAgent,
  })
}
```

### Alerts

```yaml
# .github/workflows/secret-alerts.yml
name: Secret Expiry Alert

on:
  schedule:
    - cron: '0 9 * * 1' # Weekly on Monday

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check Secret Age
        run: |
          # Check when secrets were last rotated
          # Send alerts for secrets older than threshold
```

## Development Tools

### Secret Template Generator

```bash
#!/bin/bash
# scripts/generate-env-template.sh

cat > .env.example << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Vercel
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false

# Third Party
CHROMATIC_PROJECT_TOKEN=
TURBO_TOKEN=
EOF

echo "✅ Generated .env.example"
```

### Secret Validation

```typescript
// scripts/validate-secrets.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  VERCEL_TOKEN: z.string().regex(/^[A-Za-z0-9_-]+$/),
})

export function validateSecrets() {
  try {
    envSchema.parse(process.env)
    console.log('✅ All secrets are valid')
  } catch (error) {
    console.error('❌ Invalid secrets:', error)
    process.exit(1)
  }
}
```

## Compliance

### GDPR Requirements
- Encrypt sensitive data at rest
- Log all access to personal data
- Implement right to erasure

### SOC 2 Requirements
- Document all secret access
- Implement secret rotation
- Maintain audit trails

### Implementation

```typescript
// lib/compliance.ts
export class ComplianceManager {
  async logSecretAccess(secret: string, purpose: string) {
    await this.auditLog.create({
      type: 'SECRET_ACCESS',
      secret: this.hashSecretName(secret),
      purpose,
      timestamp: new Date(),
      user: this.getCurrentUser(),
    })
  }
  
  async encryptSensitiveData(data: any) {
    const key = await this.getEncryptionKey()
    return encrypt(data, key)
  }
}
```

---

For more information, see the [main deployment documentation](./README.md).