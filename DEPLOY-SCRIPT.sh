#!/bin/bash

# Vercel Deployment Script für voai-showcase
# Dieses Script bereitet alles für ein manuelles Deployment vor

echo "🚀 Preparing voai-showcase for Vercel deployment..."

# Clean up old configurations
rm -rf apps/showcase/.vercel
rm -f vercel.json

# Create optimized vercel.json
cat > apps/showcase/vercel.json << 'EOF'
{
  "framework": "nextjs",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "buildCommand": "cd ../.. && pnpm build --filter=showcase",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_VARIANT_TEST": "true",
    "ENABLE_ANALYTICS": "true",
    "UI_VARIANT": "A"
  }
}
EOF

echo "✅ Configuration created"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import: https://github.com/Bernhard-Reiter/voai-ux-ui"
echo "3. Set Root Directory to: apps/showcase"
echo "4. Vercel will auto-detect the settings from vercel.json"
echo ""
echo "Or use Vercel CLI:"
echo "$ cd apps/showcase"
echo "$ vercel login"
echo "$ vercel --prod"
echo ""
echo "✨ Done!"