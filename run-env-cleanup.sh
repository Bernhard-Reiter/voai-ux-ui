#!/bin/bash

# VOAI Website - Environment Variables Cleanup Execution Script

set -e

echo "🧹 Starting Environment Variables Cleanup..."
echo "=========================================="
echo ""

cd /Users/bernhard/voai-website

# Function to remove env var from all environments
remove_env_var() {
    local var_name=$1
    echo "Removing $var_name..."
    
    for env in production preview development; do
        vercel env rm "$var_name" "$env" --yes 2>/dev/null || true
    done
    
    echo "✅ $var_name removed"
    echo ""
}

# List of variables to remove
echo "📋 Variables to remove:"
echo "- NEXT_PUBLIC_API_URL"
echo "- NEXT_PUBLIC_APP_URL"
echo "- TURBO_TEAM"
echo "- FORCE_COLOR"
echo "- NEXT_TELEMETRY_DISABLED"
echo "- TURBO_TOKEN"
echo "- TURBO_REMOTE_ONLY"
echo ""

# Remove each variable
remove_env_var "NEXT_PUBLIC_API_URL"
remove_env_var "NEXT_PUBLIC_APP_URL"
remove_env_var "TURBO_TEAM"
remove_env_var "FORCE_COLOR"
remove_env_var "NEXT_TELEMETRY_DISABLED"
remove_env_var "TURBO_TOKEN"
remove_env_var "TURBO_REMOTE_ONLY"

echo "✅ Cleanup completed!"
echo ""
echo "📋 Listing remaining environment variables:"
vercel env ls

echo ""
echo "🚀 Ready to redeploy with cleaned environment!"
echo "Run: vercel --prod"