#!/bin/bash

# MCP-basiertes Deployment Script für VOAI Website

echo "🚀 Starting MCP-based Vercel Deployment..."
echo "=========================================="
echo ""

cd /Users/bernhard/voai-website

# Check current status
echo "📊 Current Git Status:"
git status --short

echo ""
echo "📦 Running production deployment..."
echo "This will:"
echo "1. Use the latest commit from GitHub"
echo "2. Build with pnpm in monorepo structure"
echo "3. Deploy to https://voai.app"
echo ""

# Deploy using vercel CLI
vercel --prod --yes --no-clipboard

echo ""
echo "✅ Deployment command executed!"
echo ""
echo "📋 Next steps:"
echo "1. Check build logs at: https://vercel.com/vi4/voai-website"
echo "2. Once built, test at: https://voai.app"
echo "3. Verify /features page works: https://voai.app/features"