#!/bin/bash
# Vercel Deployment Script with proper monorepo setup

echo "🚀 Deploying voai-showcase to Vercel..."

# Clean old configs
rm -rf apps/showcase/.vercel

# Go to monorepo root
cd /Users/bernhard/voai-fresh

# Create temporary vercel.json in root with correct paths
cat > vercel.json << 'EOF'
{
  "buildCommand": "cd apps/showcase && cd ../.. && pnpm build --filter=showcase",
  "outputDirectory": "apps/showcase/.next",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs"
}
EOF

# Deploy from root
vercel --prod --yes --scope vi4 --token NEkBhWEGvC8wWkQLNtLaiP4O --name voai-showcase-final

# Clean up
rm -f vercel.json

echo "✅ Deployment initiated!"