# Environment Variables Configuration

## Required Environment Variables for Vercel Deployment

### 🔐 Supabase Configuration

These variables are **required** for authentication and database functionality:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]
```

**How to get these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL, anon public key, and service_role key

### 📊 Optional Services

#### n8n Workflow Automation
```bash
N8N_API_URL=https://your-n8n-instance.com/api
N8N_API_KEY=[YOUR_N8N_API_KEY]
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/[ID]
```

#### Sentry Error Tracking
```bash
NEXT_PUBLIC_SENTRY_DSN=https://[KEY]@[ORGANIZATION].ingest.sentry.io/[PROJECT_ID]
SENTRY_ORG=[YOUR_SENTRY_ORG]
SENTRY_PROJECT=[YOUR_SENTRY_PROJECT]
SENTRY_AUTH_TOKEN=[YOUR_AUTH_TOKEN]
```

### 🚀 Setting Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable for Production, Preview, and Development environments
4. Click "Save" for each variable

### 📝 Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Never commit `.env.local` to version control!

### ⚠️ Important Notes

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret - never expose it to the client
- The app will show errors if Supabase variables are missing

### 🔍 Verifying Configuration

After setting environment variables:

1. Redeploy your Vercel project
2. Check the Function logs for any errors
3. Test authentication functionality
4. Monitor Sentry for any configuration issues

## Current Status

As of the latest deployment, the following variables need to be set in Vercel:

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY

Without these, the application will show 500 errors when accessing pages that require authentication or database access.