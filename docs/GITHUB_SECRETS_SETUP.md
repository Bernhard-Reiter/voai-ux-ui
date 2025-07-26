# GitHub Secrets Setup Guide

## Required Secrets for Phase 4

### 1. Supabase Secrets (Required)

Add these secrets to your GitHub repository settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. How to Add Secrets

1. Go to your repository on GitHub
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact name as shown above

### 3. Getting Your Supabase Keys

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### 4. Additional Secrets (Already Set)

These should already be configured from previous phases:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 5. Security Best Practices

- **Never commit** these values to your repository
- The `service_role` key has admin privileges - guard it carefully
- Rotate keys periodically
- Use different keys for development and production

### 6. Verifying Secrets

After adding secrets, verify they work by:
1. Pushing a commit to trigger CI/CD
2. Checking the GitHub Actions logs
3. Ensuring no "undefined" or missing key errors

## Troubleshooting

If you see errors like:
- `Invalid API key` - Check that keys are copied correctly
- `Project not found` - Verify the SUPABASE_URL matches your project
- `Permission denied` - Ensure RLS policies are correctly set up