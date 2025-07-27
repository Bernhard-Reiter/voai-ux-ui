# 🔧 Vercel Environment Variables Setup

## Schritt-für-Schritt Anleitung

### 1. Vercel Dashboard öffnen
Gehen Sie zu: https://vercel.com/[your-team]/voai-website-frontend/settings/environment-variables

### 2. Environment Variables hinzufügen

Klicken Sie auf "Add New" und fügen Sie folgende Variables hinzu:

#### Production Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://aqvnasuputatphvqrqam.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://voai-website-frontend.vercel.app` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://[branch]-voai-website-frontend.vercel.app` | Preview |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Development |

### 3. Deployment neu starten

Nach dem Hinzufügen aller Variables:

1. Gehen Sie zu "Deployments"
2. Klicken Sie auf die drei Punkte (...) beim neuesten Deployment
3. Wählen Sie "Redeploy"
4. Bestätigen Sie mit "Redeploy"

### 4. Überprüfung

Nach dem Redeploy (ca. 2-3 Minuten):
- Öffnen Sie https://voai-website-frontend.vercel.app
- Die Seite sollte ohne 500 Error laden
- Prüfen Sie die Browser Console (F12) auf Fehler

## ⚠️ Wichtige Hinweise

1. **NEXT_PUBLIC_ Prefix**: Alle Client-seitigen Variables MÜSSEN mit `NEXT_PUBLIC_` beginnen
2. **Alle Umgebungen**: Setzen Sie die Variables für Production, Preview UND Development
3. **Redeploy erforderlich**: Nach dem Setzen der Variables ist ein Redeploy zwingend notwendig

## 🔍 Debugging

Falls weiterhin Probleme auftreten:

1. **Function Logs prüfen**: 
   - Vercel Dashboard → Functions → Logs
   - Suchen Sie nach "Supabase environment variables not configured"

2. **Build Logs prüfen**:
   - Vercel Dashboard → Deployments → [Latest] → Building
   - Prüfen Sie auf Build-Fehler

3. **Browser Console**:
   - Öffnen Sie die Website
   - F12 → Console
   - Suchen Sie nach Auth-bezogenen Fehlern