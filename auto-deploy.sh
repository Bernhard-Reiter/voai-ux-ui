#!/bin/bash

# Auto-deployment script for VOAI Website

echo "🚀 Initiating VOAI Website Deployment..."
echo "========================================"
echo ""

cd /Users/bernhard/voai-website

# Ensure we're on the latest
git pull origin main --quiet

# Show current status
echo "📊 Repository Status:"
git log -1 --oneline
echo ""

# Run the deployment
echo "🔄 Starting Vercel deployment..."
vercel --prod --yes --token $VERCEL_TOKEN 2>&1 || {
    echo "❌ Direct deployment failed. Trying alternative method..."
    
    # Alternative: Use npx
    npx vercel --prod --yes 2>&1 || {
        echo "❌ npx deployment also failed."
        echo ""
        echo "📋 Manual steps required:"
        echo "1. Run: vercel --prod --yes"
        echo "2. Or visit: https://vercel.com/vi4/voai-website"
        echo "3. Click 'Redeploy' on the latest commit"
        exit 1
    }
}

echo ""
echo "✅ Deployment initiated successfully!"