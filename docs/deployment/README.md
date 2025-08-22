# VOAI Deployment Documentation

## Overview

This documentation covers the deployment infrastructure and processes for the VOAI platform, including CI/CD pipelines, multi-tenant architecture, and security configurations.

## Table of Contents

1. [Infrastructure Overview](#infrastructure-overview)
2. [CI/CD Pipeline](#cicd-pipeline)
3. [Multi-Tenant Architecture](#multi-tenant-architecture)
4. [Security & Compliance](#security--compliance)
5. [Deployment Procedures](#deployment-procedures)
6. [Monitoring & Maintenance](#monitoring--maintenance)

## Infrastructure Overview

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Deployment**: Vercel (with Prebuilt artifacts)
- **Package Manager**: pnpm v9 with Corepack
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics + Custom Telemetry

### Repository Structure
```
voai-ux-ui/          # Main monorepo
├── apps/
│   ├── showcase/    # Main application
│   └── storybook/   # Component documentation
├── packages/
│   ├── ui/          # UI component library
│   ├── ui-v2/       # Next-gen UI components
│   ├── auth/        # Authentication & tenant context
│   └── shared/      # Shared utilities
└── docs/
    └── deployment/  # This documentation
```

## CI/CD Pipeline

### Workflow Configuration

All workflows use **pnpm v9** with frozen lockfile for deterministic builds:

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v3
  with:
    version: 9

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

### Active Workflows

1. **Lockfile Management** (`lockfile-fix.yml`)
   - Automatically updates `pnpm-lock.yaml` on PRs with `lockfile-fix` label
   - Prevents dependency conflicts
   - Ensures reproducible builds

2. **Vercel Deployment** (`deploy-vercel.yml`)
   - Uses Vercel Prebuilt for deterministic deployments
   - Builds artifacts locally before deployment
   - Production deployments on main branch

3. **Code Quality** (`commitlint.yml`)
   - Enforces conventional commit messages
   - Runs on all PRs

### Required Secrets

Configure these in GitHub Settings → Secrets:

| Secret Name | Description | Required |
|------------|-------------|----------|
| `VERCEL_TOKEN` | Vercel authentication token | ✅ |
| `VERCEL_ORG_ID` | Vercel organization ID | ✅ |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic project token | ✅ |
| `TURBO_TOKEN` | Turborepo remote cache token | ⚠️ Optional |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |

## Multi-Tenant Architecture

### Row Level Security (RLS)

All database tables have RLS enabled with tenant isolation:

```sql
-- Example RLS policy
CREATE POLICY "Users can view their tenant data"
  ON public.resources FOR SELECT
  USING (tenant_id = auth.tenant_id());
```

### Tenant Context Management

The platform uses a sophisticated tenant context system:

1. **Edge Function** (`/supabase/functions/tenant-context`)
   - Establishes tenant context for each request
   - Validates user permissions
   - Logs all tenant activities

2. **Client Library** (`@voai/auth/tenant-context`)
   - TypeScript SDK for tenant operations
   - React hooks for frontend integration
   - Middleware for API routes

### Usage Example

```typescript
import { withTenantContext } from '@voai/auth/tenant-context'

export async function GET(req: NextRequest) {
  return withTenantContext(req, async (req, context) => {
    // Access tenant-isolated data
    const data = await db
      .from('resources')
      .select()
      .eq('tenant_id', context.tenantId)
    
    return NextResponse.json(data)
  })
}
```

## Security & Compliance

### Security Headers

All deployments include security headers via `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### GDPR Compliance

- All user data is tenant-isolated
- Audit logs track all data access
- Data retention policies enforced at database level
- User consent management built-in

### Secrets Management

1. **Development**: Use `.env.local` (never commit)
2. **Production**: Use Vercel environment variables
3. **CI/CD**: Use GitHub Secrets
4. **Runtime**: Access via `process.env`

## Deployment Procedures

### Production Deployment

1. **Merge to main branch**
   - Automated deployment via GitHub Actions
   - Vercel Prebuilt ensures deterministic builds
   - Zero-downtime deployment

2. **Manual deployment**
   ```bash
   # Install dependencies
   pnpm install --frozen-lockfile
   
   # Build locally
   vercel build --prod
   
   # Deploy prebuilt
   vercel deploy --prebuilt --prod
   ```

### Rollback Procedure

1. **Via Vercel Dashboard**
   - Navigate to deployment history
   - Click "Promote to Production" on previous deployment

2. **Via CLI**
   ```bash
   vercel rollback [deployment-url]
   ```

### Database Migrations

1. **Create migration**
   ```bash
   supabase migration new [migration_name]
   ```

2. **Test locally**
   ```bash
   supabase db reset
   supabase db push
   ```

3. **Deploy to production**
   ```bash
   supabase db push --db-url $PRODUCTION_DB_URL
   ```

## Monitoring & Maintenance

### Health Checks

- **API Health**: `/api/health`
- **Database Health**: `/api/health/db`
- **Tenant Health**: `/api/health/tenant`

### Performance Monitoring

1. **Vercel Analytics**
   - Real User Monitoring (RUM)
   - Web Vitals tracking
   - Error tracking

2. **Custom Telemetry**
   - Tenant activity logs
   - API performance metrics
   - Resource usage tracking

### Maintenance Windows

- **Scheduled**: Tuesdays 2-4 AM UTC
- **Emergency**: As needed with 15-minute notice
- **Database**: Coordinated with Supabase

### Backup & Recovery

1. **Database Backups**
   - Automated daily via Supabase
   - Point-in-time recovery available
   - Cross-region replication

2. **Code Backups**
   - Git repository (GitHub)
   - Tagged releases
   - Deployment artifacts in Vercel

## Troubleshooting

### Common Issues

1. **Lockfile conflicts**
   - Add `lockfile-fix` label to PR
   - Workflow will auto-update

2. **Deployment failures**
   - Check GitHub Actions logs
   - Verify all secrets are set
   - Ensure `pnpm-lock.yaml` is committed

3. **Tenant context errors**
   - Verify RLS policies are active
   - Check Edge Function logs
   - Validate JWT tokens

### Support

- **Documentation**: This guide
- **Issues**: GitHub Issues
- **Emergency**: On-call rotation

---

Last Updated: January 2025
Version: 1.0.0