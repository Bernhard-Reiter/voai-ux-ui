# Vercel Configuration Fix für voai-website

## Problem
Die /features Seite gibt 404-Fehler auf https://voai-website.vercel.app/features

## Ursache
1. Falsche outputDirectory in vercel.json (war: ".next", sollte: "apps/frontend/.next")
2. Möglicherweise fehlende Environment Variables auf Vercel

## Behobene Probleme

### 1. vercel.json korrigiert
```json
{
  "buildCommand": "pnpm turbo run build --filter=@voai/frontend",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": "apps/frontend/.next",  // ✅ Korrigiert
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### 2. Linting-Fehler behoben
- Apostrophe in JSX escaped (`'` → `&apos;`) in how-it-works-section.tsx

### 3. Environment Variables vorbereitet
Erstellt .env.local mit allen benötigten Variablen:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- N8N_API_URL, N8N_API_KEY, N8N_WEBHOOK_URL
- Feature Flags

## Nächste Schritte auf Vercel

### 1. Environment Variables setzen
In Vercel Dashboard > Settings > Environment Variables:

```bash
# Pflicht - Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-key>

# Optional aber empfohlen
N8N_API_URL=https://n8n.voai.com
N8N_API_KEY=<your-n8n-key>
N8N_WEBHOOK_URL=https://n8n.voai.com/webhook/offer-ingest
```

### 2. Root Directory überprüfen
Vercel Dashboard > Settings > General:
- Root Directory: `.` (leer lassen oder Punkt)
- Framework Preset: Next.js

### 3. Redeployment
Nach den Änderungen ein Redeployment triggern:
- Entweder über Git Push
- Oder manuell über Vercel Dashboard > "Redeploy"

## Lokaler Test erfolgreich
- Build läuft durch: ✅
- /features Route generiert: ✅
- Keine kritischen Linting-Fehler: ✅

## Verifikation nach Deployment
```bash
curl -I https://voai-website.vercel.app/features
# Sollte HTTP 200 zurückgeben
```