#!/bin/bash

# Direct execution script for VOAI deployment

echo "🚀 VOAI Website Deployment - Direct Execution"
echo "============================================"
echo ""

# Change to project directory
cd /Users/bernhard/voai-website || exit 1

# Check if vercel CLI is available
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found at: $(which vercel)"
else
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Execute deployment
echo ""
echo "📦 Executing production deployment..."
echo "Command: vercel --prod --yes"
echo ""

# Run the actual deployment
vercel --prod --yes

# Check exit status
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment command completed successfully!"
    echo ""
    echo "🔗 Check your deployment at:"
    echo "   - Build status: https://vercel.com/vi4/voai-website"
    echo "   - Live site: https://voai.app"
    echo "   - Features page: https://voai.app/features"
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "📋 Troubleshooting steps:"
    echo "1. Check if you're logged in: vercel whoami"
    echo "2. Login if needed: vercel login"
    echo "3. Link project: vercel link"
    echo "4. Try again: vercel --prod"
fi