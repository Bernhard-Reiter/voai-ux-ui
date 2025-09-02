# Module Setup Guide

## Quick Start

1. **Place Module Repositories**
   ```bash
   # From the voai-next directory:
   mkdir -p modules
   
   # Extract the provided ZIP files:
   unzip path/to/voai-core-main.zip -d modules/
   unzip path/to/voai-billing-main.zip -d modules/
   ```

2. **Verify Structure**
   ```
   voai-next/
   └── modules/
       ├── voai-core-main/
       │   ├── package.json
       │   └── src/
       └── voai-billing-main/
           ├── package.json
           └── src/
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   pnpm build:modules
   ```

## Module Integration Points

### Billing Module
- **Facade:** `lib/modules/billing.ts`
- **Webhook:** `app/api/webhooks/stripe/route.ts`
- **Actions:** `app/(app)/dashboard/actions.ts`

### Core Module
- **Bridge:** `lib/modules/core.ts`
- **Fallback API:** `app/api/core/ingest/route.ts`
- **Actions:** `app/(app)/dashboard/actions.ts`

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```env
# Existing Supabase config...

# Core Integration
CORE_MODE=http  # or 'module' for local dev
NEXT_PUBLIC_CORE_API_BASE=https://core.voai.me

# Stripe Billing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Testing

```bash
# Run unit tests
pnpm test

# Run specific test
pnpm test billing.facade
```

## Troubleshooting

1. **Module not found errors**
   - Ensure modules are in correct directories
   - Run `pnpm install` again
   - Check package.json workspaces configuration

2. **Build errors**
   - Run `pnpm build:modules` before main build
   - Check TypeScript versions match

3. **Webhook failures**
   - Verify STRIPE_WEBHOOK_SECRET is correct
   - Ensure runtime='nodejs' in webhook route