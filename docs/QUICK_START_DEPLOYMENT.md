# Quick Start: Vercel Deployment Setup

## 🚀 5-Minuten Setup

### 1. GitHub Secrets einrichten

Gehe zu: https://github.com/[DEIN-USERNAME]/voai-ux-ui/settings/secrets/actions

Füge folgende Secrets hinzu:

| Secret Name | Wert | Beschreibung |
|------------|------|--------------|
| `VERCEL_TOKEN` | `dein-vercel-token` | Von https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `team_xxxxx` | Aus Vercel Dashboard → Settings → General |
| `VERCEL_PROJECT_ID` | `prj_xxxxx` | Aus Vercel Dashboard → Project Settings |

### 2. Vercel Projekt konfigurieren

```bash
# Vercel CLI installieren (falls noch nicht vorhanden)
npm i -g vercel

# Zum Projekt navigieren
cd apps/showcase

# Mit Vercel verlinken
vercel link

# Wähle:
# - Set up and deploy
# - Dein Vercel Account
# - Link to existing project
# - Projektname: voai-website
```

### 3. Deployment testen

```bash
# Auf main branch wechseln
git checkout main

# Leeren Commit erstellen
git commit --allow-empty -m "chore: test deployment pipeline"

# Pushen (triggert automatisches Deployment)
git push
```

### 4. Deployment überwachen

```bash
# GitHub Actions Status
gh run list -w "Deploy (Prebuilt) to Vercel" -L 5

# Oder im Browser:
# https://github.com/[DEIN-USERNAME]/voai-ux-ui/actions
```

## ✅ Erfolgs-Checkliste

- [ ] GitHub Secrets sind gesetzt
- [ ] Vercel Projekt ist verlinkt
- [ ] GitHub Action läuft grün
- [ ] Website ist erreichbar

## 🆘 Häufige Probleme

### "Project not found" Fehler

```bash
# Projekt manuell erstellen
cd apps/showcase
vercel --prod --yes --token=$VERCEL_TOKEN
```

### 404 Fehler auf der Website

1. Prüfe Vercel Dashboard → Project Settings
2. Root Directory muss `apps/showcase` sein
3. Build & Development Settings müssen leer sein

### GitHub Action fehlgeschlagen

1. Prüfe die Logs: `gh run view [RUN-ID] --log-failed`
2. Stelle sicher, dass alle Secrets korrekt sind
3. Vercel Token könnte abgelaufen sein

## 📚 Weiterführende Dokumentation

- [Vollständige Deployment-Anleitung](./DEPLOYMENT.md)
- [Deployment Checklist](../.github/DEPLOYMENT_CHECKLIST.md)
- [Vercel CLI Docs](https://vercel.com/docs/cli)

---

Bei Fragen: Erstelle ein Issue auf GitHub oder kontaktiere das DevOps Team.