#!/bin/bash

# VOAI Website - Quick Deploy Script (wenn Environment-Variablen bereits gesetzt sind)

set -e

echo "🚀 VOAI Website - Quick Deploy"
echo "=============================="
echo ""

cd /Users/bernhard/voai-website

# Ensure we're on the latest code
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build locally to verify
echo "🏗️  Building project..."
pnpm build

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod --force

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Check your site at:"
echo "- https://voai.app"
echo "- https://voai.app/features"