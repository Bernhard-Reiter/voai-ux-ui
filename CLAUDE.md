# VOAI Website - Development Guide

## Important Commands

### Linting & Type Checking
```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Fix linting issues
pnpm turbo run lint:fix
```

### Testing
```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm turbo run test:integration

# Run tests with coverage
pnpm test:coverage
```

### Build & Development
```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm turbo run start --filter=@voai/frontend
```

## Required Environment Variables

These environment variables must be set in Vercel/GitHub Secrets:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `TURBO_TOKEN` - Turbo cache token (optional for CI)
- `TURBO_TEAM` - Turbo team ID (optional for CI)
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

## Architecture Notes

- Monorepo structure with Turborepo
- Apps in `/apps` directory
- Shared packages in `/packages` directory
- React version: 18.3.1 (standardized across all packages)
- ESLint v9 with flat config (`eslint.config.mjs`)

## Common Issues

1. **Edge Runtime Incompatibility**: Supabase client doesn't work in Edge Runtime. Auth logic should be in page components, not middleware.

2. **React Version Mismatch**: Ensure all packages use React 18.3.1. Check `pnpm-lock.yaml` if issues persist.

3. **ESLint Errors**: Run `pnpm lint` before committing. The project uses ESLint v9 flat config.