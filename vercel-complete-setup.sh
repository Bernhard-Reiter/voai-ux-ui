#!/bin/bash

echo "🚀 Komplette Vercel-Konfiguration wird eingerichtet..."

# 1. Framework Settings
echo "📦 Framework-Einstellungen konfigurieren..."
npx vercel env rm VERCEL_FORCE_NO_BUILD_CACHE --yes 2>/dev/null || true
npx vercel env add VERCEL_FORCE_NO_BUILD_CACHE production <<< "1"

# 2. Build Settings über vercel.json
echo "🔧 Build-Einstellungen aktualisieren..."
cat > vercel.json << 'EOF'
{
  "buildCommand": "pnpm turbo run build --filter=@voai/frontend",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": "apps/frontend/.next",
  "framework": "nextjs",
  "rootDirectory": "apps/frontend",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet .",
  "regions": ["iad1"],
  "functions": {
    "apps/frontend/app/api/*": {
      "maxDuration": 10
    }
  }
}
EOF

# 3. Environment Variables
echo "🔐 Environment Variables setzen..."

# Supabase
npx vercel env rm NEXT_PUBLIC_SUPABASE_URL --yes 2>/dev/null || true
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development <<< "https://aqvnasuputatphvqrqam.supabase.co"

npx vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY --yes 2>/dev/null || true
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDUyMDksImV4cCI6MjA0ODM4MTIwOX0.eiNf3Fq-9MH5cusrH3LKcm5VvM6SBZ6Ax7HLbWDkT2Y"

# App URL
npx vercel env rm NEXT_PUBLIC_APP_URL --yes 2>/dev/null || true
npx vercel env add NEXT_PUBLIC_APP_URL production <<< "https://voai-website.vercel.app"
npx vercel env add NEXT_PUBLIC_APP_URL preview <<< "https://voai-website-*.vercel.app"
npx vercel env add NEXT_PUBLIC_APP_URL development <<< "http://localhost:3000"

# Node Version
npx vercel env rm NODE_VERSION --yes 2>/dev/null || true
npx vercel env add NODE_VERSION production preview development <<< "20.x"

echo "✅ Alle Einstellungen konfiguriert!"
echo "📋 Aktuelle Environment Variables:"
npx vercel env ls

echo ""
echo "🚀 Deployment wird gestartet..."
npx vercel --prod --force