#!/bin/bash

# VOAI Website - Fixed Deployment Script
# This script handles deployment with correct configuration

set -e  # Exit on error

echo "🚀 VOAI Website - Deployment to Vercel"
echo "======================================"
echo ""

# Change to project directory
cd /Users/bernhard/voai-website

# Check if we're logged in
echo "✅ Logged in as: $(vercel whoami)"
echo ""

# First, let's update the project settings to use the correct configuration
echo "🔧 Updating project settings..."
vercel --cwd . --yes --force

# Now deploy with production flag
echo ""
echo "🚀 Deploying to production..."
vercel --prod --yes

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Post-deployment notes:"
echo "- Check deployment status at: https://vercel.com/vi4/voai-website"
echo "- Production URL: https://voai.app"
echo "- Vercel URL: https://voai-website.vercel.app"
echo ""
echo "If deployment fails, check:"
echo "1. Build logs in Vercel dashboard"
echo "2. Ensure all environment variables are set"
echo "3. Verify the build command and output directory"