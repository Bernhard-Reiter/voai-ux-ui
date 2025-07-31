#!/bin/bash

# Setup Supabase for VOAI Website
# This script helps configure Supabase for the project

echo "🚀 Setting up Supabase for VOAI Website"
echo "======================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it first with your Supabase credentials."
    exit 1
fi

# Load environment variables
export $(cat .env.local | xargs)

echo "✅ Environment variables loaded"
echo ""

echo "📋 Next Steps:"
echo "1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/${NEXT_PUBLIC_SUPABASE_URL#https://}"
echo ""

echo "2. Configure Authentication:"
echo "   - Go to Authentication → Providers"
echo "   - Enable Google provider"
echo "   - Add your Google OAuth credentials"
echo "   - Set Site URL to: https://voai-website-frontend.vercel.app"
echo "   - Add Redirect URLs:"
echo "     • https://voai-website-frontend.vercel.app/auth/callback"
echo "     • http://localhost:3000/auth/callback"
echo ""

echo "3. Run Database Migrations:"
echo "   - Go to SQL Editor"
echo "   - Run migrations from supabase/migrations/ folder in order:"
echo "     • 001_workflow_status.sql"
echo "     • 002_auth_profiles.sql"
echo ""

echo "4. Verify RLS Policies:"
echo "   - Go to Database → Tables"
echo "   - Check that RLS is enabled on:"
echo "     • profiles table"
echo "     • workflow_status table"
echo ""

echo "5. Test Authentication:"
echo "   - Visit https://voai-website-frontend.vercel.app"
echo "   - Click Login"
echo "   - Try Google OAuth"
echo ""

echo "📝 Documentation:"
echo "   - Supabase Setup Guide: docs/SUPABASE_SETUP_GUIDE.md"
echo "   - Environment Variables: docs/VERCEL_ENV_SETUP.md"
echo ""

echo "✨ Setup instructions complete!"