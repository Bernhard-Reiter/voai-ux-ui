# GitHub Secrets Setup

This guide explains how to set up GitHub Secrets for the voai monorepo.

## Required Secrets

### Supabase Secrets (Required)

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://your-project-id.supabase.co`
   - Get from: Supabase Dashboard → Settings → API → Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Get from: Supabase Dashboard → Settings → API → Project API keys → anon/public

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Your Supabase service role key (keep this secret!)
   - Get from: Supabase Dashboard → Settings → API → Project API keys → service_role
   - ⚠️ Never expose this in client-side code

### Deployment Secrets (Optional - for Vercel)

4. **VERCEL_TOKEN**
   - Your Vercel API token
   - Get from: https://vercel.com/account/tokens

5. **VERCEL_ORG_ID**
   - Your Vercel organization ID
   - Get from: Project Settings → General → Project ID

6. **VERCEL_PROJECT_ID**
   - Your Vercel project ID for each app
   - Get from: Project Settings → General → Project ID

### Application URLs (Optional)

7. **FRONTEND_URL**
   - Production URL for frontend app
   - Default: `https://voai.vercel.app`

8. **CRM_URL**
   - Production URL for CRM app
   - Default: `https://voai-crm.vercel.app`

## How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Navigate to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with its name and value

## Local Development

For local development, create a `.env.local` file in the root and in each app directory:

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your values
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key-here
```

## Security Notes

- Never commit `.env.local` files
- Keep `SUPABASE_SERVICE_ROLE_KEY` secure
- Use different Supabase projects for development and production
- Rotate keys regularly
- Limit service role key usage to server-side only

## Verifying Setup

After adding secrets, you can verify they're working by:

1. Triggering a GitHub Action workflow
2. Checking the workflow logs (secrets will be masked)
3. Deploying to staging/preview environment first