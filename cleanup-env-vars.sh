#!/bin/bash

# VOAI Website - Environment Variables Cleanup Script
# Dieses Skript zeigt, welche Variablen gelöscht werden können

echo "🧹 VOAI Website - Environment Variables Cleanup"
echo "=============================================="
echo ""
echo "⚠️  WARNUNG: Dieses Skript zeigt Befehle zum Löschen nicht benötigter Variablen."
echo "Führen Sie diese Befehle manuell aus, nachdem Sie sie überprüft haben."
echo ""

# Variablen, die GELÖSCHT werden können
VARS_TO_DELETE=(
  "NEXT_PUBLIC_API_URL"
  "NEXT_PUBLIC_APP_URL"
  "TURBO_TEAM"
  "FORCE_COLOR"
  "NEXT_TELEMETRY_DISABLED"
  "TURBO_TOKEN"
  "TURBO_REMOTE_ONLY"
)

# Variablen, die BEHALTEN werden sollten
echo "✅ BENÖTIGTE Variablen (NICHT löschen):"
echo "----------------------------------------"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- SUPABASE_SERVICE_ROLE_KEY"
echo "- NEXT_PUBLIC_SITE_URL"
echo ""

echo "🟡 OPTIONALE Variablen (behalten falls verwendet):"
echo "---------------------------------------------------"
echo "- N8N_API_URL, N8N_API_KEY, N8N_WEBHOOK_URL (n8n Integration)"
echo "- NEXT_PUBLIC_GA_MEASUREMENT_ID (Google Analytics)"
echo "- NEXT_PUBLIC_SENTRY_DSN (Error Tracking)"
echo "- NEXT_PUBLIC_POSTHOG_KEY (Analytics)"
echo ""

echo "❌ ZU LÖSCHENDE Variablen:"
echo "--------------------------"
for var in "${VARS_TO_DELETE[@]}"; do
  echo "- $var"
done
echo ""

echo "📋 Befehle zum Löschen (manuell ausführen):"
echo "-------------------------------------------"
echo ""
echo "# Wechseln Sie zum Projekt-Verzeichnis"
echo "cd /Users/bernhard/voai-website"
echo ""

echo "# Löschen Sie die nicht benötigten Variablen aus allen Environments:"
for var in "${VARS_TO_DELETE[@]}"; do
  echo ""
  echo "# Löschen von $var"
  echo "vercel env rm $var production"
  echo "vercel env rm $var preview" 
  echo "vercel env rm $var development"
done

echo ""
echo "🔧 Alternative: Alle auf einmal löschen"
echo "---------------------------------------"
echo "# Kopieren Sie diesen Befehl und führen Sie ihn aus:"
echo ""
echo "for env in production preview development; do"
for var in "${VARS_TO_DELETE[@]}"; do
  echo "  vercel env rm $var \$env --yes 2>/dev/null || true"
done
echo "done"

echo ""
echo "📌 Nach dem Cleanup:"
echo "-------------------"
echo "1. Überprüfen Sie die verbleibenden Variablen mit: vercel env ls"
echo "2. Stellen Sie sicher, dass NEXT_PUBLIC_SITE_URL auf https://voai.app gesetzt ist"
echo "3. Deployen Sie neu mit: vercel --prod"
echo ""
echo "✅ Fertig!"