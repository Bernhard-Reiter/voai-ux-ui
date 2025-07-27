# 🚀 VOAI Website Deployment Guide

## 📋 Voraussetzungen

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- GitHub Account mit Zugriff auf das Repository
- Vercel Account
- Supabase Projekt

## 🔧 Lokale Entwicklung

### 1. Repository klonen
```bash
git clone https://github.com/Bernhard-Reiter/voai-website.git
cd voai-website
```

### 2. Dependencies installieren
```bash
pnpm install
```

### 3. Umgebungsvariablen einrichten
Erstellen Sie eine `.env.local` Datei:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://aqvnasuputatphvqrqam.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Entwicklungsserver starten
```bash
pnpm dev
```

Die Anwendung ist jetzt unter http://localhost:3000 verfügbar.

## 🌐 Production Deployment

### Option 1: Automatisches Deployment (Empfohlen)

1. **GitHub Integration in Vercel**
   - Loggen Sie sich bei Vercel ein
   - Importieren Sie das GitHub Repository
   - Vercel erkennt automatisch Next.js

2. **Umgebungsvariablen setzen**
   - In Vercel Dashboard → Settings → Environment Variables
   - Fügen Sie alle erforderlichen Variablen hinzu

3. **Automatische Deployments**
   - Main Branch → Production
   - Pull Requests → Preview Deployments

### Option 2: Manuelles Deployment

1. **Build erstellen**
```bash
pnpm build
```

2. **Mit Vercel CLI deployen**
```bash
vercel --prod
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Workflow** (`ci.yml`)
   - Läuft bei jedem Push und PR
   - Führt Tests, Linting und Builds aus
   - Security Scans

2. **Deploy Workflow** (`deploy.yml`)
   - Automatisches Deployment zu Vercel
   - Nur auf main Branch

3. **Security Workflow** (`security.yml`)
   - Tägliche Security Scans
   - Dependabot Updates

## 📊 Monitoring & Maintenance

### Health Checks
- Vercel Dashboard für Deployment Status
- GitHub Actions für CI/CD Status
- Supabase Dashboard für Datenbank

### Performance Monitoring
- Lighthouse CI in GitHub Actions
- Vercel Analytics (optional)
- Vercel Speed Insights (optional)

### Security Updates
- Dependabot für automatische PRs
- Wöchentliche Security Scans
- Regelmäßige Key Rotation (alle 90 Tage)

## 🆘 Troubleshooting

### Build Fehler
```bash
# Cache löschen
rm -rf .next node_modules
pnpm install
pnpm build
```

### Deployment Fehler
- Überprüfen Sie alle Umgebungsvariablen
- Überprüfen Sie GitHub Actions Logs
- Vercel Build Logs überprüfen

### Supabase Verbindungsprobleme
- API Keys überprüfen
- CORS Einstellungen in Supabase
- Rate Limits überprüfen

## 📝 Post-Deployment Checkliste

- [ ] Production URL testen
- [ ] Alle Features durchgehen
- [ ] Performance testen (Lighthouse)
- [ ] Security Headers überprüfen
- [ ] Monitoring einrichten
- [ ] Backup-Strategie implementieren

## 🔗 Wichtige Links

- **Production URL**: https://voai-website-frontend.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: https://github.com/Bernhard-Reiter/voai-website/actions
- **Supabase Dashboard**: https://app.supabase.com/project/aqvnasuputatphvqrqam

## 📞 Support

Bei Problemen:
1. GitHub Issues erstellen
2. Vercel Support kontaktieren
3. Supabase Support für Datenbank-Probleme