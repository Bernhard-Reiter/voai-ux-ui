# Vercel Environment Variables Setup

## Required Environment Variables

### 1. Supabase Configuration
Get these from your Supabase project dashboard (https://supabase.com/dashboard):

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anonymous/Public key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (keep private!)

### 2. App URLs
- `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., https://voai-website.vercel.app)
- `NEXT_PUBLIC_SITE_URL`: Same as APP_URL

### 3. Security Keys
Generate these with the provided script or use:
```bash
openssl rand -base64 32
```

- `CSRF_SECRET`: CSRF protection secret (min 32 chars)
- `ENCRYPTION_KEY`: Encryption key (min 32 chars)

### 4. Optional Services

#### Google Analytics
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID

#### Sentry (Error Tracking)
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry project DSN
- `SENTRY_AUTH_TOKEN`: For source map uploads
- `SENTRY_ORG`: Your Sentry organization slug
- `SENTRY_PROJECT`: Your Sentry project slug

## Setup Instructions

### Option 1: Using the Setup Script
```bash
./scripts/setup-vercel-env.sh
```

### Option 2: Manual Setup via Vercel Dashboard
1. Go to https://vercel.com/vi4/voai-website/settings/environment-variables
2. Add each variable with the appropriate environment checkboxes:
   - Production ✓
   - Preview ✓
   - Development ✓

### Option 3: Using Vercel CLI
```bash
# Example for adding a variable
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
```

## Testing Your Configuration

After setting up environment variables:

1. Deploy to preview:
   ```bash
   git push origin vercel-deploy
   ```

2. Check the deployment logs in Vercel Dashboard

3. Test critical features:
   - Authentication flow
   - File upload
   - API routes

## Security Notes

- Never commit `.env.local` or any file containing real keys
- Use different service role keys for production/staging
- Rotate security keys periodically
- Enable Vercel's environment variable encryption