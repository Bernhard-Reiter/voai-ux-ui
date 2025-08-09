# 🚀 Vercel Deployment Anleitung

## Option 1: Direktes GitHub Import (EMPFOHLEN)

1. **Gehen Sie zu**: https://vercel.com/new

2. **Import Git Repository**:
   - URL eingeben: `https://github.com/Bernhard-Reiter/voai-ux-ui`
   - Klicken Sie auf "Import"

3. **Configure Project**:
   - **Project Name**: `voai-circula-showcase`
   - **Framework Preset**: Next.js (sollte automatisch erkannt werden)
   - **Root Directory**: `apps/showcase` ⚠️ WICHTIG!
   - **Build Settings**:
     - Build Command: `pnpm build`
     - Output Directory: `.next`
     - Install Command: `pnpm install --frozen-lockfile`

4. **Environment Variables**:
   ```
   UI_VARIANT = A
   NEXT_PUBLIC_VARIANT_TEST = true
   ENABLE_ANALYTICS = true
   ```

5. **Deploy** klicken

## Option 2: GitHub Actions Deployment

1. **GitHub Secrets hinzufügen**:
   - Gehen Sie zu: https://github.com/Bernhard-Reiter/voai-ux-ui/settings/secrets/actions
   - Fügen Sie hinzu:
     - `VERCEL_TOKEN`: Ihr Vercel Token
     - `VERCEL_ORG_ID`: Ihre Vercel Org ID
     - `VERCEL_PROJECT_ID`: Die Projekt ID

2. **Deployment triggern**:
   ```bash
   git add .github/workflows/deploy-vercel.yml
   git commit -m "feat: add vercel deployment workflow"
   git push origin main
   ```

## Option 3: Lokales Build & Manueller Upload

1. **Lokal bauen**:
   ```bash
   cd apps/showcase
   pnpm build
   ```

2. **Static Export erstellen**:
   ```bash
   pnpm next export
   ```

3. **Zu Vercel hochladen**:
   - Gehen Sie zu https://vercel.com/new
   - Wählen Sie "Upload" statt Git Import
   - Laden Sie den `out` Ordner hoch

## Fehlerbehebung

### "No Next.js version detected"
- Stellen Sie sicher, dass `Root Directory` auf `apps/showcase` gesetzt ist
- Vercel muss die `package.json` mit `next` Dependency finden können

### Build Fehler
- Überprüfen Sie die Environment Variables
- Stellen Sie sicher, dass alle Dependencies installiert sind

### Monorepo Probleme
- Verwenden Sie immer `pnpm` statt `npm`
- Der Root Directory Pfad ist entscheidend