#!/bin/bash

# VOAI Website - Deploy and Test Script

set -e

echo "🚀 Starting Vercel Deployment..."
echo "================================"
echo ""

cd /Users/bernhard/voai-website

# Deploy to Vercel
echo "📦 Deploying to production..."
vercel --prod --yes

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Check deployment status at: https://vercel.com/vi4/voai-website"
echo "2. View live site at: https://voai.app"
echo "3. Test features page at: https://voai.app/features"