# Deployment Status - voai-website

## 🚀 Production Deployment to Vercel

**Status**: DEPLOYED ✅
**Time**: 2025-08-31 17:19 UTC
**Project**: voai-website (team: vi4)
**Region**: fra1 (Frankfurt)

## Configuration

### Build Settings
- **Framework**: Next.js 15
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install`
- **Output Directory**: `.next`

### Environment Variables
- `NEXT_PUBLIC_SITE_URL`: https://voai.me
- `NEXT_PUBLIC_CORE_API_BASE`: https://core.voai.me
- `CORE_MODE`: http
- `NEXT_PUBLIC_SUPABASE_URL`: [Configured in Vercel]
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: [Configured in Vercel]
- `STRIPE_SECRET_KEY`: [Configured in Vercel]
- `STRIPE_WEBHOOK_SECRET`: [Configured in Vercel]

## Deployment Steps

1. ✅ Vercel configuration created
2. ✅ Project linked to Vercel
3. ✅ Environment variables configured
4. ✅ Application built successfully
5. ✅ Deployed to production

## Deployment Results

- **Build Time**: ~2 minutes
- **Deployment Status**: Success
- **Live URL**: https://voai.me
- **Preview URL**: https://voai-website-vi4.vercel.app

## Monitoring

The deployment is being monitored with GPT-5 enhanced monitoring for:
- Build progress
- Error detection
- Performance metrics
- Health checks

## URLs

- **Production**: https://voai.me
- **Vercel Dashboard**: https://vercel.com/vi4/voai-website

## Notes

- Using pnpm workspaces for module integration
- Modules temporarily mocked until voai-core and voai-billing are added
- CI/CD pipeline configured for automatic deployments