# VOAI Website - Manuelle Deployment-Schritte

## ⚠️ Aktueller Status

Es gibt einen Build-Fehler, der behoben werden muss:
- Next.js meldet einen Fehler beim Import von `<Html>` außerhalb von `_document`

## 🛠️ Sofort-Lösung

### 1. Vercel Dashboard Konfiguration

1. Gehen Sie zu: https://vercel.com/vi4/voai-website/settings
2. **WICHTIG**: Ändern Sie "Root Directory" auf `.` (Punkt) oder lassen Sie es leer
3. Speichern Sie die Änderungen

### 2. Environment-Variablen setzen

Gehen Sie zu: https://vercel.com/vi4/voai-website/settings/environment-variables

Fügen Sie folgende Variablen hinzu (für alle Environments: Production, Preview, Development):

```
NEXT_PUBLIC_SUPABASE_URL=<Ihre Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Ihr Supabase Anon Key>
SUPABASE_SERVICE_ROLE_KEY=<Ihr Supabase Service Key>
NEXT_PUBLIC_APP_URL=https://voai.app
```

### 3. Deployment auslösen

Option A: Über GitHub
1. Machen Sie einen kleinen Commit:
   ```bash
   cd /Users/bernhard/voai-website
   git add .
   git commit -m "Trigger deployment"
   git push origin main
   ```

Option B: Über Vercel Dashboard
1. Gehen Sie zu: https://vercel.com/vi4/voai-website
2. Klicken Sie auf "Redeploy"
3. Wählen Sie den neuesten Commit

### 4. Custom Domain aktivieren

1. Gehen Sie zu: https://vercel.com/vi4/voai-website/settings/domains
2. Aktivieren Sie "Auto-assign Custom Domains"

## 📋 Checkliste

- [ ] Root Directory auf `.` geändert
- [ ] Environment-Variablen gesetzt
- [ ] Deployment ausgelöst
- [ ] Custom Domain Auto-Assignment aktiviert
- [ ] https://voai.app funktioniert
- [ ] https://voai.app/features funktioniert

## 🚨 Falls weiterhin Fehler

1. Überprüfen Sie die Build-Logs in Vercel
2. Stellen Sie sicher, dass Node.js 20.x verwendet wird
3. Kontaktieren Sie den Vercel Support bei anhaltenden Problemen