# Deployment Guide

## GitHub Actions Secrets

Die folgenden Secrets müssen in den GitHub Repository Settings konfiguriert werden:

### Required Secrets

1. **VERCEL_TOKEN**
   - Zu finden unter: https://vercel.com/account/tokens
   - Erstelle einen neuen Token mit vollem Scope
   - Füge ihn als Repository Secret hinzu: Settings → Secrets and variables → Actions

### Vercel Project Setup

1. Vercel Projekt erstellen:
   ```bash
   cd voai-next
   npx vercel link
   ```

2. Environment Variables in Vercel setzen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CORE_API_BASE`

### CI/CD Workflow

Der GitHub Actions Workflow läuft automatisch bei:
- Push zu `main` → Production Deploy
- Pull Requests → Preview Deploy

### Local Deploy

```bash
npm run build
npm run deploy:prod
```