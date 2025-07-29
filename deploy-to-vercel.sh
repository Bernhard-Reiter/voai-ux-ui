#!/bin/bash

# VOAI Website - Complete Vercel Deployment Script
# This script handles the complete deployment process

set -e  # Exit on error

echo "🚀 VOAI Website - Vercel Deployment Script"
echo "=========================================="
echo ""

# Change to project directory
cd /Users/bernhard/voai-website

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    pnpm add -g vercel
fi

# Check Vercel login status
echo "📋 Checking Vercel login status..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login:"
    vercel login
fi

echo ""
echo "✅ Logged in as: $(vercel whoami)"
echo ""

# Set environment variables
echo "🔑 Setting environment variables..."
echo ""
echo "Please enter the values for the following environment variables:"
echo ""

# Function to set env var for all environments
set_env_var() {
    local var_name=$1
    local var_value=$2
    
    echo "Setting $var_name..."
    echo "$var_value" | vercel env add "$var_name" production --force || true
    echo "$var_value" | vercel env add "$var_name" preview --force || true
    echo "$var_value" | vercel env add "$var_name" development --force || true
}

# Required variables
echo "1. NEXT_PUBLIC_SUPABASE_URL"
echo "   (Your Supabase project URL, e.g., https://xxxxx.supabase.co)"
read -p "   Enter value: " SUPABASE_URL
set_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"

echo ""
echo "2. NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   (Your Supabase anon/public key)"
read -p "   Enter value: " SUPABASE_ANON_KEY
set_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"

echo ""
echo "3. SUPABASE_SERVICE_ROLE_KEY"
echo "   (Your Supabase service role key - keep this secret!)"
read -s -p "   Enter value (hidden): " SUPABASE_SERVICE_KEY
echo ""
set_env_var "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_KEY"

echo ""
echo "4. NEXT_PUBLIC_APP_URL"
echo "   (Your app URL, use https://voai.app for production)"
read -p "   Enter value [https://voai.app]: " APP_URL
APP_URL=${APP_URL:-https://voai.app}
set_env_var "NEXT_PUBLIC_APP_URL" "$APP_URL"

echo ""
echo "✅ Environment variables set successfully!"
echo ""

# Optional: Set optional variables
read -p "Do you want to set optional variables (Analytics, Sentry)? (y/N): " SET_OPTIONAL
if [[ $SET_OPTIONAL =~ ^[Yy]$ ]]; then
    echo ""
    echo "Optional: NEXT_PUBLIC_GA_MEASUREMENT_ID (Google Analytics)"
    read -p "Enter value (or press Enter to skip): " GA_ID
    if [ ! -z "$GA_ID" ]; then
        set_env_var "NEXT_PUBLIC_GA_MEASUREMENT_ID" "$GA_ID"
    fi
    
    echo ""
    echo "Optional: NEXT_PUBLIC_SENTRY_DSN (Sentry Error Tracking)"
    read -p "Enter value (or press Enter to skip): " SENTRY_DSN
    if [ ! -z "$SENTRY_DSN" ]; then
        set_env_var "NEXT_PUBLIC_SENTRY_DSN" "$SENTRY_DSN"
    fi
fi

echo ""
echo "🔧 Ensuring project is linked to Vercel..."
vercel link --yes

echo ""
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo ""
echo "🏗️  Building project locally to verify..."
pnpm build

echo ""
echo "🚀 Deploying to Vercel Production..."
echo ""
vercel --prod --force

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "1. Go to https://vercel.com/vi4/voai-website/settings/domains"
echo "2. Re-enable 'Auto-assign Custom Domains' if needed"
echo "3. Check these URLs:"
echo "   - https://voai.app"
echo "   - https://voai.app/features"
echo "   - https://voai-website.vercel.app"
echo ""
echo "🎉 Done!"