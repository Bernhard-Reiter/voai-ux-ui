#!/bin/bash

# VOAI Website - Deployment Status Check

echo "🔍 Checking Vercel Deployment Status..."
echo "======================================"
echo ""

cd /Users/bernhard/voai-website

# Get latest deployment info
echo "📋 Latest deployments:"
vercel ls --limit 5

echo ""
echo "📊 Checking build logs of latest deployment:"
echo "Run: vercel logs [deployment-url]"

echo ""
echo "🧪 Test URLs to check:"
echo "- https://voai.app (Main site)"
echo "- https://voai.app/features (Features page)"
echo "- https://voai.app/pricing (Pricing page)"
echo "- https://voai.app/about (About page)"

echo ""
echo "📝 Common issues to check:"
echo "1. 500 Error: Missing environment variables"
echo "2. 404 Error: Routing issues"
echo "3. Blank page: Build errors"
echo "4. Style issues: CSS not loading"