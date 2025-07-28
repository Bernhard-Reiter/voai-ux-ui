#!/bin/bash

echo "🔧 Aktualisiere Vercel Projekt-Einstellungen..."

# Node Version setzen
echo "📦 Setze Node Version auf 20.x..."
npx vercel env rm NODE_VERSION --yes 2>/dev/null || true
npx vercel env add NODE_VERSION production preview development <<< "20.x"

# Zusätzliche Build-Umgebungsvariablen
npx vercel env rm TURBO_REMOTE_ONLY --yes 2>/dev/null || true
npx vercel env add TURBO_REMOTE_ONLY production preview development <<< "false"

npx vercel env rm NEXT_TELEMETRY_DISABLED --yes 2>/dev/null || true
npx vercel env add NEXT_TELEMETRY_DISABLED production preview development <<< "1"

# Framework Preset für Next.js
npx vercel env rm FRAMEWORK_PRESET --yes 2>/dev/null || true
npx vercel env add FRAMEWORK_PRESET production preview development <<< "nextjs"

echo "✅ Projekt-Einstellungen aktualisiert!"

# Status anzeigen
echo ""
echo "📋 Aktuelle Konfiguration:"
echo "- Node Version: 20.x"
echo "- Framework: Next.js"
echo "- Build Command: pnpm turbo run build --filter=@voai/frontend"
echo "- Output Directory: apps/frontend/.next"
echo ""
echo "⚠️  WICHTIG: Die Root Directory muss manuell im Vercel Dashboard gesetzt werden:"
echo "   1. Gehe zu: https://vercel.com/vi4/voai-website/settings/general"
echo "   2. Scrolle zu 'Root Directory'"
echo "   3. Setze den Wert auf: apps/frontend"
echo "   4. Klicke auf 'Save'"
echo ""
echo "🚀 Starte finales Deployment..."

# Trigger deployment mit allen Einstellungen
git add -A && git commit -m "chore: finalize Vercel configuration" && git push origin main