# VOAI Website - Deployment Fix Guide

## 🎯 Problem Summary

1. **Rollback Issue**: The deployment was rolled back and needs to be re-enabled
2. **404 Error on /features**: The features page is not accessible
3. **Environment Variables**: Need to be properly configured in Vercel

## 🛠️ Solution Steps

### 1. Fix Vercel Configuration ✅
The `vercel.json` has been updated with the correct output directory:
```json
{
  "outputDirectory": "apps/frontend/.next"
}
```

### 2. Set Environment Variables 🔑

Run the following commands to set up required environment variables:

```bash
# Navigate to project
cd /Users/bernhard/voai-website

# Set required environment variables for production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

# Set the same for preview environments
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
vercel env add NEXT_PUBLIC_APP_URL preview
```

**Important Values to Set:**
- `NEXT_PUBLIC_APP_URL`: Should be `https://voai.app` for production
- `SUPABASE_SERVICE_ROLE_KEY`: Keep this secret, never commit to git

### 3. Re-enable Custom Domain Auto-Assignment 🌐

1. Go to: https://vercel.com/vi4/voai-website/settings/domains
2. Find your custom domain settings
3. Re-enable "Auto-assign Custom Domains"
4. This will fix the rollback issue

### 4. Deploy to Production 🚀

After setting environment variables and re-enabling custom domains:

```bash
# Deploy to production
vercel --prod
```

### 5. Verify Deployment ✅

Check these URLs after deployment:
- https://voai.app (main site)
- https://voai.app/features (should not give 404)
- https://voai-website.vercel.app (Vercel subdomain)

## 📋 Checklist

- [x] Update vercel.json with correct outputDirectory
- [ ] Set all required environment variables in Vercel
- [ ] Re-enable auto-assign custom domains
- [ ] Deploy to production with `vercel --prod`
- [ ] Verify /features page is accessible
- [ ] Test all main routes

## 🔍 Troubleshooting

If deployment still fails:

1. **Check Build Logs**:
   ```bash
   vercel logs
   ```

2. **Verify Node Version**:
   The project uses Node 20+, ensure Vercel is using the correct version.

3. **Clear Cache**:
   ```bash
   vercel --prod --force
   ```

4. **Check Dependencies**:
   ```bash
   pnpm install
   pnpm build
   ```

## 📞 Support

If issues persist:
- Check Vercel Status: https://www.vercel-status.com/
- Vercel Support: https://vercel.com/support