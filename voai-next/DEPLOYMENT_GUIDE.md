# 🚀 Vercel Deployment Guide für VOAI Website

## ⚡ Quick Start - Deployment in 3 Minuten

```bash
# 1. Checks durchführen
./scripts/deploy-safe.sh

# 2. Bei Erfolg: Push zu GitHub
git push origin main

# 3. Vercel deployed automatisch
```

## 📋 Detaillierte Schritt-für-Schritt Anleitung

### 1. Vor jedem Deployment - PFLICHT-CHECKS

```bash
# a) Ins richtige Verzeichnis wechseln
cd voai-next

# b) Sicherstellen dass alle Änderungen committed sind
git status

# c) Lokale Tests durchführen (WICHTIG!)
npm run lint        # Muss ohne Fehler durchlaufen
npm run typecheck   # Muss ohne Fehler durchlaufen
npm run build       # Muss erfolgreich bauen
```

**⚠️ WICHTIG**: Wenn einer dieser Befehle fehlschlägt, NICHT deployen!

### 2. Häufige Fehler automatisch beheben

```bash
# ESLint Fehler automatisch fixen
npm run lint -- --fix

# Problematische Config-Einträge entfernen
# (Diese verursachen oft Deployment-Fehler)
sed -i '' '/"packageManager":/d' package.json
sed -i '' '/"preinstall":/d' package.json
```

### 3. Vercel-spezifische Konfiguration

Die `vercel.json` sollte so aussehen:
```json
{
  "regions": ["fra1"],
  "buildCommand": "npm run build",
  "installCommand": "npm ci --legacy-peer-deps",
  "framework": "nextjs"
}
```

**Niemals hinzufügen:**
- `commandForIgnoringBuildStep` mit git commands
- `pnpm store prune` commands
- Komplexe shell scripts

### 4. Environment Variables

Stelle sicher, dass folgende Variablen in Vercel gesetzt sind:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CORE_API_BASE`
- `CACHE_BUSTER` (optional, für Cache-Probleme)

### 5. Deployment auslösen

#### Option A: Automatisch via GitHub Push
```bash
git add -A
git commit -m "feat: Deine Änderung hier"
git push origin main
```

#### Option B: Manuell via Vercel CLI
```bash
vercel --prod
```

#### Option C: Via Vercel Dashboard
1. Gehe zu https://vercel.com/vi4/voai-website-new
2. Klicke auf "Redeploy"
3. Wähle "Redeploy with existing Build Cache" AB

### 6. Deployment überwachen

Nach dem Push:
1. Öffne https://vercel.com/vi4/voai-website-new
2. Klicke auf das neueste Deployment
3. Überwache die Build-Logs

**Erfolgs-Indikatoren:**
- ✅ "Running install command: npm ci --legacy-peer-deps"
- ✅ "Detected Next.js version: 15.x.x"
- ✅ "Compiled successfully"
- ✅ "Generating static pages"

**Fehler-Indikatoren:**
- ❌ "ERR_PNPM" - Package Manager Problem
- ❌ "ESLint errors" - Code-Qualität
- ❌ "Type error" - TypeScript Fehler

## 🛠️ Troubleshooting

### Problem: Build Cache Probleme
```bash
# In Vercel Dashboard: Environment Variables
VERCEL_FORCE_NO_BUILD_CACHE = 1
```

### Problem: Package Manager Fehler
```bash
# Wechsle zu npm (empfohlen)
rm -rf node_modules pnpm-lock.yaml
npm install
git add package-lock.json
git commit -m "fix: Switch to npm"
```

### Problem: ESLint/TypeScript Fehler
```bash
# Nie any-Types verwenden!
# Ersetze any mit konkreten Types:
- function getData(): any
+ function getData(): string | number

# Unused variables entfernen oder verwenden:
- const unused = "test"
+ // Variable entfernt oder verwendet
```

### Problem: Module nicht gefunden
```bash
# Dependencies prüfen
npm list
npm install fehlende-dependency
```

## 📊 Deployment Checkliste

Vor jedem Deployment diese Checkliste durchgehen:

- [ ] `git status` - Alle Änderungen committed?
- [ ] `npm run lint` - Keine ESLint Fehler?
- [ ] `npm run typecheck` - Keine TypeScript Fehler?
- [ ] `npm run build` - Build lokal erfolgreich?
- [ ] `package.json` - Kein packageManager/preinstall?
- [ ] `vercel.json` - Einfache Commands?
- [ ] Environment Variables in Vercel gesetzt?

## 🚨 Notfall-Prozedur

Falls ein Deployment fehlschlägt:

1. **Logs prüfen**: Exakte Fehlermeldung finden
2. **Lokal reproduzieren**: `npm run build`
3. **Fix lokal testen**: Problem beheben und erneut bauen
4. **Sauber commiten**: Klare Commit-Message
5. **Erneut deployen**: Mit den Fixes

## 💡 Best Practices

1. **Kleine, häufige Deployments** - Einfacher zu debuggen
2. **Feature Branches** - Teste in Preview-Deployments
3. **Lokale Tests** - Immer vor dem Push
4. **Klare Commits** - Hilft beim Debugging
5. **Monitoring** - Beobachte die Live-Site nach Deployment

## 📞 Support

Bei Problemen:
1. Check die Deployment-Logs in Vercel
2. Führe `./scripts/deploy-safe.sh` aus
3. Konsultiere `VERCEL_DEPLOYMENT_ANALYSIS.md`

---

⚡ **Pro-Tipp**: Speichere dir den Befehl `./scripts/deploy-safe.sh` als Alias!

```bash
echo "alias deploy-check='cd ~/voai-website-new/voai-next && ./scripts/deploy-safe.sh'" >> ~/.zshrc
```