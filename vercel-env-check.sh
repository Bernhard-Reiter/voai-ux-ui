#!/bin/bash

# VOAI Website - Vercel Environment Variables Setup
# This script helps to set up required environment variables in Vercel

echo "📋 Checking Vercel Environment Variables for VOAI Website..."
echo "=================================================="

# Required environment variables
REQUIRED_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_APP_URL"
)

# Optional environment variables
OPTIONAL_VARS=(
  "NEXT_PUBLIC_GA_MEASUREMENT_ID"
  "NEXT_PUBLIC_SENTRY_DSN"
  "SENTRY_AUTH_TOKEN"
  "SENTRY_ORG"
  "SENTRY_PROJECT"
)

echo ""
echo "🔑 Required Environment Variables:"
echo "----------------------------------"
for var in "${REQUIRED_VARS[@]}"; do
  echo "- $var"
done

echo ""
echo "📝 Optional Environment Variables:"
echo "----------------------------------"
for var in "${OPTIONAL_VARS[@]}"; do
  echo "- $var"
done

echo ""
echo "⚙️ Vercel CLI Commands to Set Environment Variables:"
echo "------------------------------------------------"
echo ""
echo "# Production environment:"
for var in "${REQUIRED_VARS[@]}"; do
  echo "vercel env add $var production"
done

echo ""
echo "# Preview environment:"
for var in "${REQUIRED_VARS[@]}"; do
  echo "vercel env add $var preview"
done

echo ""
echo "# Development environment:"
for var in "${REQUIRED_VARS[@]}"; do
  echo "vercel env add $var development"
done

echo ""
echo "📌 Important Notes:"
echo "-------------------"
echo "1. SUPABASE_SERVICE_ROLE_KEY should ONLY be set in Vercel, never committed to git"
echo "2. NEXT_PUBLIC_APP_URL should be set to your production URL for production environment"
echo "3. For local development, copy .env.example to .env.local and fill in your values"
echo ""
echo "✅ After setting the environment variables, redeploy your project:"
echo "   vercel --prod"