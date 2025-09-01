# VOAI Website - Next.js

## 🚀 Quick Deployment - WICHTIG!

**⚠️ VOR JEDEM DEPLOYMENT DIESE SCHRITTE BEFOLGEN:**

```bash
cd voai-next
./scripts/deploy-safe.sh  # Führt ALLE notwendigen Checks durch
git push origin main      # NUR wenn alle Checks grün sind!
```

## 📖 Deployment Dokumentation - BITTE LESEN!

- **[DEPLOYMENT_GUIDE.md](voai-next/DEPLOYMENT_GUIDE.md)** ⭐ - **PFLICHTLEKTÜRE vor dem ersten Deployment**
- **[VERCEL_DEPLOYMENT_ANALYSIS.md](voai-next/VERCEL_DEPLOYMENT_ANALYSIS.md)** - Erklärt warum Deployments fehlschlagen
- **[deploy-safe.sh](voai-next/scripts/deploy-safe.sh)** - Automatisches Check-Script

## ⚡ Deployment Checkliste - JEDEN PUNKT PRÜFEN!

```bash
# 1. IMMER im richtigen Verzeichnis:
cd voai-next

# 2. DIESE BEFEHLE MÜSSEN ERFOLGREICH SEIN:
npm run lint        # ❌ Bei Fehlern: npm run lint -- --fix
npm run typecheck   # ❌ Bei Fehlern: TypeScript Fehler beheben
npm run build       # ❌ Bei Fehlern: NICHT deployen!

# 3. NUR bei Erfolg:
git push origin main
```

## 🚨 Häufige Fehler die Deployments verhindern

1. **ESLint Fehler** - `any` types, unused variables
2. **TypeScript Fehler** - Falsche types, fehlende imports
3. **Build Fehler** - Syntax errors, fehlende dependencies
4. **Package Manager Konflikte** - Kein pnpm verwenden!

## 🛠️ Projekt Setup

```bash
# Repository klonen
git clone https://github.com/Bernhard-Reiter/voai-website-NEW.git
cd voai-website-NEW/voai-next

# Dependencies installieren (NUR npm!)
npm install

# Entwicklungsserver starten
npm run dev
```

## 📋 Scripts Übersicht

```bash
npm run dev         # Entwicklungsserver
npm run build       # Production Build (MUSS vor Deployment funktionieren!)
npm run lint        # ESLint Check (MUSS fehlerfrei sein!)
npm run typecheck   # TypeScript Check (MUSS fehlerfrei sein!)
./scripts/deploy-safe.sh  # Alle Checks automatisch
```

## 🔐 Environment Variables

**In Vercel Dashboard setzen:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CORE_API_BASE`
- `VERCEL_FORCE_NO_BUILD_CACHE` (bei Cache-Problemen auf `1`)

**Lokal in `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CORE_API_BASE=your_api_base
```

## 📁 Wichtige Dateien

```
voai-next/
├── vercel.json       # Deployment Config - NICHT mit pnpm commands!
├── package.json      # KEIN packageManager field!
├── scripts/
│   └── deploy-safe.sh  # Deployment Checker - IMMER verwenden!
└── DEPLOYMENT_GUIDE.md # Anleitung - LESEN!
```

## ❌ Was NIEMALS tun

1. **NIEMALS** deployen ohne lokale Tests
2. **NIEMALS** `packageManager` in package.json
3. **NIEMALS** `pnpm` commands in vercel.json
4. **NIEMALS** `any` types im Code
5. **NIEMALS** git commands in vercel.json

## ✅ Was IMMER tun

1. **IMMER** `./scripts/deploy-safe.sh` vor Deployment
2. **IMMER** lokalen Build testen
3. **IMMER** ESLint Fehler beheben
4. **IMMER** TypeScript Fehler beheben
5. **IMMER** npm statt pnpm verwenden

## 🆘 Wenn Deployment fehlschlägt

1. **Vercel Dashboard** öffnen: https://vercel.com/vi4/voai-website-new
2. **Build Logs** genau lesen
3. **Fehler lokal reproduzieren**: `npm run build`
4. **Problem beheben**
5. **Erneut mit `./scripts/deploy-safe.sh` prüfen**

## 📞 Support & Debugging

```bash
# Bei ESLint Fehlern:
npm run lint -- --fix

# Bei Build Fehlern:
rm -rf .next node_modules
npm install
npm run build

# Bei Vercel Cache Problemen:
# In Vercel Dashboard: VERCEL_FORCE_NO_BUILD_CACHE = 1
```

---

**⚡ GOLDENE REGEL**: Wenn `npm run build` lokal nicht funktioniert, wird es auch auf Vercel nicht funktionieren!

**📌 Live Site**: https://voai-website-new.vercel.app

**🔗 Vercel Dashboard**: https://vercel.com/vi4/voai-website-new