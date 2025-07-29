#!/bin/bash

echo "🚀 Deploying VOAI Website to Vercel..."
echo "====================================="
echo ""

cd /Users/bernhard/voai-website

# Deploy to production
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔗 Check your deployment at:"
echo "- https://vercel.com/vi4/voai-website"
echo "- https://voai.app"
echo "- https://voai.app/features"