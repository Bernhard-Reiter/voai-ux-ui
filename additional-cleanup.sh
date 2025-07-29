#!/bin/bash

# VOAI Website - Additional Environment Variables Cleanup

echo "🔍 Analyzing additional variables that might not be needed..."
echo "==========================================================="
echo ""

cd /Users/bernhard/voai-website

# Variables that are likely NOT needed for the frontend app
echo "❓ These variables seem unnecessary for a Next.js frontend:"
echo ""
echo "1. VERCEL_FORCE_NO_BUILD_CACHE - Vercel internal"
echo "2. SUPABASE_JWT_SECRET - Not used in frontend code"
echo "3. ENABLE_EMAIL_NOTIFICATIONS - Not found in code"
echo "4. ENABLE_REAL_AI - Not found in code"
echo "5. PLATFORM_SECRET - Not found in code"
echo "6. CSRF_SECRET - Not found in code"
echo "7. NEXTAUTH_SECRET - Not using NextAuth in this project"
echo "8. JWT_SECRET - Not directly used in frontend"
echo "9. APP_ENCRYPTION_KEY - Not found in code"
echo "10. DATABASE_URL - Frontend uses Supabase client, not direct DB"
echo "11. NODE_ENV - Vercel sets this automatically"
echo ""

echo "📋 To remove these additional variables, run:"
echo "============================================"
echo ""

cat << 'EOF'
# Remove additional unnecessary variables
for env in production preview development; do
  vercel env rm VERCEL_FORCE_NO_BUILD_CACHE $env --yes 2>/dev/null || true
  vercel env rm SUPABASE_JWT_SECRET $env --yes 2>/dev/null || true
  vercel env rm ENABLE_EMAIL_NOTIFICATIONS $env --yes 2>/dev/null || true
  vercel env rm ENABLE_REAL_AI $env --yes 2>/dev/null || true
  vercel env rm PLATFORM_SECRET $env --yes 2>/dev/null || true
  vercel env rm CSRF_SECRET $env --yes 2>/dev/null || true
  vercel env rm NEXTAUTH_SECRET $env --yes 2>/dev/null || true
  vercel env rm JWT_SECRET $env --yes 2>/dev/null || true
  vercel env rm APP_ENCRYPTION_KEY $env --yes 2>/dev/null || true
  vercel env rm DATABASE_URL $env --yes 2>/dev/null || true
  vercel env rm NODE_ENV $env --yes 2>/dev/null || true
done
EOF

echo ""
echo "✅ After cleanup, you should only have:"
echo "======================================="
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- SUPABASE_SERVICE_ROLE_KEY"
echo "- NEXT_PUBLIC_SITE_URL"
echo "- N8N_API_URL, N8N_API_KEY, N8N_WEBHOOK_URL (if using n8n)"
echo "- NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT (if using Sentry)"
echo ""
echo "⚠️  Only run this if you're sure these variables aren't needed!"