#!/bin/bash

# Verification script for VOAI Website Auth Setup
echo "🔍 Verifying VOAI Website Setup..."
echo "=================================="

# Check if environment variables are set locally
echo "📋 Checking local environment..."
if [ -f .env.local ]; then
    echo "✅ .env.local found"
    
    # Check for required variables
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL is missing"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
    fi
    
    if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo "✅ SUPABASE_SERVICE_ROLE_KEY is set"
    else
        echo "❌ SUPABASE_SERVICE_ROLE_KEY is missing"
    fi
else
    echo "❌ .env.local not found"
fi

echo ""
echo "🌐 Testing production site..."

# Test if the site is accessible
response=$(curl -s -o /dev/null -w "%{http_code}" https://voai-website-frontend.vercel.app)
if [ "$response" = "200" ]; then
    echo "✅ Site is accessible (HTTP 200)"
else
    echo "❌ Site returned HTTP $response"
fi

echo ""
echo "📝 Next steps:"
echo "1. Follow instructions in docs/IMMEDIATE_SETUP_STEPS.md"
echo "2. Set environment variables in Vercel Dashboard"
echo "3. Configure Supabase Auth settings"
echo "4. Redeploy the application"
echo ""
echo "📊 Quick Links:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Supabase Dashboard: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam"
echo "- Live Site: https://voai-website-frontend.vercel.app"
echo ""
echo "✨ Verification complete!"