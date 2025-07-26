# Supabase Project Configuration Guide

## 1. Create or Configure Your Supabase Project

### New Project Setup
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New project**
3. Fill in:
   - **Name**: voai-production (or voai-dev for development)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

### Existing Project
If you already have a project, proceed to authentication setup.

## 2. Enable Google OAuth

### Steps:
1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Toggle it **ON**
4. You'll need to add:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### Getting Google OAuth Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add Authorized redirect URIs:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback (for development)
   https://your-production-domain.com/auth/callback
   ```
7. Copy Client ID and Client Secret to Supabase

## 3. Configure Redirect URLs

In Supabase Dashboard → **Authentication** → **URL Configuration**:

### Site URL
```
https://your-production-domain.com
```

### Redirect URLs (add all):
```
http://localhost:3000/**
http://localhost:3001/**
https://your-production-domain.com/**
https://*.vercel.app/** (for preview deployments)
```

## 4. Run Database Migrations

### Option A: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Run migrations
supabase db push
```

### Option B: Manual SQL Execution
1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the contents of `/supabase/migrations/001_workflow_status.sql`
3. Run the SQL

## 5. Verify RLS Policies

After migration, verify in **Table Editor**:
1. Select `workflow_status` table
2. Click **RLS** badge - should show "RLS enabled"
3. Check that all 4 policies are created:
   - Users can view own workflow status
   - Users can create own workflow status
   - Users can update own workflow status
   - Users can delete own workflow status

## 6. Enable Realtime

1. Go to **Database** → **Replication**
2. Under **supabase_realtime**, find `workflow_status`
3. Toggle all events: **Insert**, **Update**, **Delete**

## 7. Test Your Setup

### Quick Test:
1. Go to **Authentication** → **Users**
2. Click **Invite user** (for testing)
3. Try logging in with the test user
4. Check browser console for any errors

### Production Checklist:
- [ ] Google OAuth enabled and configured
- [ ] Redirect URLs include all environments
- [ ] Database migrations run successfully
- [ ] RLS policies active
- [ ] Realtime enabled for workflow_status
- [ ] Environment variables set in Vercel/hosting

## 8. Security Recommendations

1. **Enable Email Confirmations**: 
   - Authentication → Settings → Enable email confirmations

2. **Configure Rate Limits**:
   - Authentication → Settings → Rate limits

3. **Set Up Email Templates**:
   - Authentication → Email Templates

4. **Enable MFA** (optional but recommended):
   - Authentication → Settings → Multi-factor Authentication

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URL"**
   - Add the URL to Redirect URLs in Supabase
   - Ensure it includes the full path with protocol

2. **"User not found" after OAuth**
   - Check that email confirmations are disabled for testing
   - Verify OAuth provider is properly configured

3. **RLS blocking access**
   - Ensure user is authenticated
   - Check that policies use `auth.uid()` correctly

4. **Realtime not working**
   - Verify table is added to publication
   - Check browser console for WebSocket errors
   - Ensure anon key has correct permissions