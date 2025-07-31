#!/bin/bash

# Script to set up Vercel environment variables
# Usage: ./scripts/setup-vercel-env.sh

echo "Setting up Vercel environment variables..."

# Function to add env variable to Vercel
add_env() {
  local key=$1
  local value=$2
  local env=${3:-"production preview development"}
  
  echo "Adding $key..."
  vercel env add "$key" "$env" <<< "$value"
}

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
  echo "Error: Please run this script from the project root directory"
  exit 1
fi

echo ""
echo "IMPORTANT: This script will help you set up environment variables in Vercel."
echo "You'll need to provide the actual values for your Supabase project."
echo ""
echo "Please have the following information ready:"
echo "1. Supabase Project URL (from https://supabase.com/dashboard)"
echo "2. Supabase Anon Key"
echo "3. Supabase Service Role Key"
echo ""
read -p "Press Enter to continue..."

# Supabase Configuration
echo ""
echo "=== Supabase Configuration ==="
read -p "Enter NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
read -p "Enter NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
read -s -p "Enter SUPABASE_SERVICE_ROLE_KEY (hidden): " SUPABASE_SERVICE_ROLE_KEY
echo ""

# Generate security keys
echo ""
echo "=== Generating Security Keys ==="
CSRF_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
echo "Generated CSRF_SECRET and ENCRYPTION_KEY"

# Set production URL
echo ""
read -p "Enter your Vercel production URL (e.g., https://voai-website.vercel.app): " PROD_URL

# Add all environment variables
echo ""
echo "=== Adding Environment Variables to Vercel ==="

# Public variables (all environments)
add_env "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
add_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"
add_env "NEXT_PUBLIC_APP_URL" "$PROD_URL"
add_env "NEXT_PUBLIC_SITE_URL" "$PROD_URL"

# Private variables (all environments)
add_env "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"
add_env "CSRF_SECRET" "$CSRF_SECRET"
add_env "ENCRYPTION_KEY" "$ENCRYPTION_KEY"

# Optional services
echo ""
echo "=== Optional Services (press Enter to skip) ==="
read -p "Enter NEXT_PUBLIC_GA_MEASUREMENT_ID (optional): " GA_ID
if [ ! -z "$GA_ID" ]; then
  add_env "NEXT_PUBLIC_GA_MEASUREMENT_ID" "$GA_ID"
fi

read -p "Enter NEXT_PUBLIC_SENTRY_DSN (optional): " SENTRY_DSN
if [ ! -z "$SENTRY_DSN" ]; then
  add_env "NEXT_PUBLIC_SENTRY_DSN" "$SENTRY_DSN"
  read -p "Enter SENTRY_AUTH_TOKEN: " SENTRY_AUTH_TOKEN
  read -p "Enter SENTRY_ORG: " SENTRY_ORG
  read -p "Enter SENTRY_PROJECT: " SENTRY_PROJECT
  
  add_env "SENTRY_AUTH_TOKEN" "$SENTRY_AUTH_TOKEN"
  add_env "SENTRY_ORG" "$SENTRY_ORG"
  add_env "SENTRY_PROJECT" "$SENTRY_PROJECT"
fi

echo ""
echo "=== Environment Variables Setup Complete ==="
echo ""
echo "You can verify the variables in Vercel Dashboard:"
echo "https://vercel.com/vi4/voai-website/settings/environment-variables"
echo ""
echo "Next steps:"
echo "1. Push your branch to GitHub"
echo "2. Vercel will automatically create a preview deployment"
echo "3. Test the preview deployment"
echo "4. Merge to main for production deployment"