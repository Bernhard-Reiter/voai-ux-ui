# Vercel Deployment Guide für voai-ux-ui

## Voraussetzungen
- Vercel Account (https://vercel.com)
- Vercel CLI installiert (`npm i -g vercel`)

## Deployment-Schritte

### 1. Vercel Login
```bash
vercel login
```

### 2. Projekt initialisieren
```bash
cd apps/showcase
vercel
```

Bei der ersten Ausführung werden Sie gefragt:
- Set up and deploy? **Y**
- Which scope? **Wählen Sie Ihren Account**
- Link to existing project? **N** (beim ersten Mal)
- Project name? **voai-showcase**
- Directory? **./apps/showcase**
- Override settings? **N**

### 3. Production Deployment
```bash
vercel --prod
```

### 4. Environment Variables (falls benötigt)
```bash
vercel env add NEXT_PUBLIC_API_URL
```

## Automatisches Deployment

### GitHub Integration
1. Gehen Sie zu https://vercel.com/dashboard
2. Importieren Sie das GitHub Repository
3. Konfigurieren Sie:
   - Root Directory: `apps/showcase`
   - Build Command: `pnpm run build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

### Build Settings
```json
{
  "buildCommand": "cd ../.. && pnpm run build:showcase",
  "outputDirectory": "apps/showcase/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

## Wichtige URLs
Nach dem Deployment erhalten Sie:
- Preview URL: `https://voai-showcase-[hash].vercel.app`
- Production URL: `https://voai-showcase.vercel.app`

## Features
Das Deployment beinhaltet:
- ✅ Circula-inspiriertes Design System
- ✅ A/B Testing (Classic vs Cosmic)
- ✅ Responsive Design
- ✅ Performance-optimiert
- ✅ SEO-ready

## Troubleshooting

### Build Fehler
```bash
# Lokaler Build-Test
cd apps/showcase
pnpm run build
```

### Environment Variables
Stellen Sie sicher, dass alle benötigten Umgebungsvariablen in Vercel konfiguriert sind.

## Next Steps
1. Domain konfigurieren (optional)
2. Analytics einrichten
3. Performance monitoring aktivieren