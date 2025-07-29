# 🧹 Vercel Environment Variables - Cleanup Guide

## Option 1: Über Vercel Dashboard (Empfohlen)

### Schritt 1: Environment Variables Seite öffnen
1. Gehen Sie zu: https://vercel.com/vi4/voai-website/settings/environment-variables
2. Sie sehen alle gesetzten Environment-Variablen

### Schritt 2: Diese Variablen LÖSCHEN ❌

Klicken Sie bei jeder dieser Variablen auf die drei Punkte (...) und wählen Sie "Delete":

- **NEXT_PUBLIC_API_URL** ❌
- **NEXT_PUBLIC_APP_URL** ❌ 
- **TURBO_TEAM** ❌
- **FORCE_COLOR** ❌
- **NEXT_TELEMETRY_DISABLED** ❌
- **TURBO_TOKEN** ❌ (falls vorhanden)
- **TURBO_REMOTE_ONLY** ❌ (falls vorhanden)

### Schritt 3: Diese Variablen BEHALTEN ✅

Diese sollten gesetzt bleiben:

- **NEXT_PUBLIC_SUPABASE_URL** ✅
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** ✅
- **SUPABASE_SERVICE_ROLE_KEY** ✅
- **NEXT_PUBLIC_SITE_URL** ✅ (sollte `https://voai.app` sein)

### Schritt 4: Optionale Variablen (je nach Bedarf)

Falls Sie diese Services nutzen, behalten Sie sie:

- **N8N_API_URL** 🟡
- **N8N_API_KEY** 🟡
- **N8N_WEBHOOK_URL** 🟡
- **NEXT_PUBLIC_GA_MEASUREMENT_ID** 🟡
- **NEXT_PUBLIC_SENTRY_DSN** 🟡

## Option 2: Terminal Befehle

Falls Sie lieber das Terminal nutzen möchten:

```bash
cd /Users/bernhard/voai-website

# Einloggen falls nötig
vercel login

# Variablen löschen
vercel env rm NEXT_PUBLIC_API_URL production --yes
vercel env rm NEXT_PUBLIC_API_URL preview --yes
vercel env rm NEXT_PUBLIC_API_URL development --yes

vercel env rm NEXT_PUBLIC_APP_URL production --yes
vercel env rm NEXT_PUBLIC_APP_URL preview --yes
vercel env rm NEXT_PUBLIC_APP_URL development --yes

vercel env rm TURBO_TEAM production --yes
vercel env rm TURBO_TEAM preview --yes
vercel env rm TURBO_TEAM development --yes

vercel env rm FORCE_COLOR production --yes
vercel env rm FORCE_COLOR preview --yes
vercel env rm FORCE_COLOR development --yes

vercel env rm NEXT_TELEMETRY_DISABLED production --yes
vercel env rm NEXT_TELEMETRY_DISABLED preview --yes
vercel env rm NEXT_TELEMETRY_DISABLED development --yes
```

## Nach dem Cleanup

1. **Neu deployen**: 
   - Klicken Sie auf "Redeploy" im Vercel Dashboard
   - Oder führen Sie `vercel --prod` im Terminal aus

2. **Überprüfen**:
   - Die Seite sollte ohne die gelöschten Variablen funktionieren
   - Testen Sie https://voai.app/features

## ⚠️ Wichtiger Hinweis

Falls nach dem Löschen Fehler auftreten, überprüfen Sie:
- Ist `NEXT_PUBLIC_SITE_URL` auf `https://voai.app` gesetzt?
- Sind alle Supabase-Variablen korrekt gesetzt?
- Fehlen die n8n-Variablen? (Falls Sie n8n nutzen)