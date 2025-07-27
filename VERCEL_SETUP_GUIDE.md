# Vercel Setup Guide

## 🚀 Schnellstart

### 1. Vercel CLI Installation
```bash
npm i -g vercel@latest
```

### 2. Projekt mit Vercel verknüpfen
```bash
vercel link
```
Folgen Sie den Anweisungen:
- Wählen Sie Ihren Vercel Account
- Wählen Sie "Link to existing project" 
- Geben Sie den Projektnamen ein

### 3. Umgebungsvariablen setzen

#### Option A: Über Vercel Dashboard
1. Gehen Sie zu https://vercel.com/dashboard
2. Wählen Sie Ihr Projekt
3. Settings → Environment Variables
4. Fügen Sie folgende Variablen hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### Option B: Über CLI
```bash
# Anon Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Service Role Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Supabase URL
echo "https://aqvnasuputatphvqrqam.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

### 4. Deployment

#### Manuelles Deployment
```bash
vercel --prod
```

#### Automatisches Deployment
- Jeder Push zu `main` Branch triggert automatisch ein Production Deployment
- Pull Requests erhalten automatisch Preview Deployments

## 📋 Vercel Projekt Einstellungen

### Build & Development Settings
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build` oder leer lassen (auto-detected)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm dev`

### Node.js Version
- Setzen Sie Node.js 20.x in den Projekt-Einstellungen

### Root Directory
- Lassen Sie dies leer für Monorepo-Setup

## 🔗 GitHub Integration

1. Verbinden Sie Ihr GitHub Repository in Vercel Dashboard
2. Aktivieren Sie automatische Deployments für:
   - Production Branch: `main`
   - Preview Deployments: Alle Pull Requests

## 🛠️ Troubleshooting

### Build Fehler
- Überprüfen Sie alle Umgebungsvariablen
- Stellen Sie sicher, dass `pnpm-lock.yaml` committed ist
- Überprüfen Sie Node.js Version (>= 20.0.0)

### Deployment URLs
- Production: `https://[projekt-name].vercel.app`
- Preview: `https://[projekt-name]-[branch-name]-[account].vercel.app`

## 📝 Nächste Schritte
1. Domain konfigurieren (optional)
2. Analytics aktivieren (optional)
3. Speed Insights aktivieren (optional)