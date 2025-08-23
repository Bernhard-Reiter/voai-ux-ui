# Vercel Deployment Guide - Golden Path Standard

## Übersicht

Diese Anleitung beschreibt den standardisierten Deployment-Prozess für das voai-ux-ui Projekt auf Vercel. Der "Golden Path" Ansatz gewährleistet stabile, reproduzierbare und vorhersagbare Deployments.

## Voraussetzungen

### 1. GitHub Secrets

Folgende Secrets müssen in den GitHub Repository Settings unter `Settings > Secrets and actions > Actions` konfiguriert sein:

- **`VERCEL_TOKEN`**: Ihr Vercel Access Token
- **`VERCEL_ORG_ID`**: Die Vercel Organisation/Team ID
- **`VERCEL_PROJECT_ID`**: Die Vercel Projekt ID

### 2. Projektstruktur

```
voai-ux-ui/
├── apps/
│   └── showcase/          # Hauptanwendung
├── packages/
│   ├── ui/               # UI-Komponenten v1
│   └── ui-v2/            # UI-Komponenten v2
└── vercel.json           # Minimale Vercel-Konfiguration
```

## Golden Path Konfiguration

### 1. vercel.json (Minimal)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

**Wichtig**: Keine Build-Commands, Output-Directory oder andere Einstellungen hier definieren!

### 2. GitHub Actions Workflow

Die Datei `.github/workflows/deploy-vercel.yml` implementiert den standardisierten Deployment-Prozess:

```yaml
name: Deploy (Prebuilt) to Vercel
on:
  push:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Use Node 22
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies (npm workspaces)
        run: npm ci --workspaces --include-workspace-root=false

      - name: Build Project  
        run: |
          cd apps/showcase
          npm run build
          cd ../..

      - name: Deploy to Vercel
        run: |
          cd apps/showcase
          npx vercel deploy . \
            --token=${{ secrets.VERCEL_TOKEN }} \
            --prod \
            --yes \
            --name=voai-website \
            --scope=${{ secrets.VERCEL_ORG_ID }}
```

## Deployment-Prozess

### Automatisches Deployment (Empfohlen)

1. Code-Änderungen auf Feature-Branch entwickeln
2. Pull Request erstellen und Review durchführen
3. Nach Merge in `main` wird automatisch deployed

### Manuelles Deployment (Notfall)

```bash
# Vom Repository-Root aus
cd apps/showcase
npm run build
npx vercel deploy . --prod --token=$VERCEL_TOKEN
```

## Best Practices

### ✅ DO's

1. **Immer über Pull Requests arbeiten**
   - Ermöglicht Code-Review
   - Führt automatische Tests aus
   - Dokumentiert Änderungen

2. **Minimale vercel.json**
   - Nur Framework-Spezifikation
   - Keine Build-Commands
   - Keine Environment-Variablen

3. **Build lokal oder in CI**
   - Vorhersagbare Build-Umgebung
   - Bessere Fehlerbehandlung
   - Schnellere Deployments

4. **Verwende npm workspaces**
   - Konsistente Dependencies
   - Einfacheres Monorepo-Management

### ❌ DON'Ts

1. **Keine direkten Pushes auf main**
   - Umgeht Quality Gates
   - Keine Dokumentation der Änderungen

2. **Keine Build-Commands in Vercel**
   - Unvorhersagbare Umgebung
   - Schwieriges Debugging

3. **Keine pnpm im CI**
   - npm ist Standard in GitHub Actions
   - Vermeidet Kompatibilitätsprobleme

4. **Kein SSO Protection für Custom Domains**
   - Verursacht 404-Fehler
   - Inkompatibel mit öffentlichen Domains

## Troubleshooting

### Problem: 404 Fehler nach Deployment

**Ursachen:**
1. SSO Protection aktiviert
2. Falsche Root-Directory Einstellung
3. App-Directory Konflikt (app/ vs src/app/)

**Lösung:**
```bash
# SSO Protection deaktivieren
curl -X PATCH https://api.vercel.com/v9/projects/$PROJECT_ID \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ssoProtection": null}'
```

### Problem: Build fehlschlägt in GitHub Actions

**Lösung:**
1. Logs in GitHub Actions prüfen
2. Lokal mit `npm run build` testen
3. Node-Version prüfen (sollte 22 sein)

### Problem: Deployment schlägt fehl

**Prüfen:**
1. GitHub Secrets korrekt gesetzt?
2. Vercel Token noch gültig?
3. Projekt-Berechtigungen korrekt?

## Monitoring

### GitHub Actions Status

```bash
# Letzte Deployments anzeigen
gh run list -w "Deploy (Prebuilt) to Vercel"

# Spezifisches Deployment prüfen
gh run view <RUN_ID>
```

### Vercel Dashboard

1. Besuche https://vercel.com/dashboard
2. Wähle das Projekt "voai-website"
3. Prüfe Deployment-Status und Logs

## Wartung

### Token-Rotation

1. Neues Vercel Token generieren: https://vercel.com/account/tokens
2. GitHub Secret aktualisieren:
   ```bash
   gh secret set VERCEL_TOKEN --body="neues-token"
   ```

### Projekt-Migration

Bei Änderungen der Projekt-ID oder Organisation:
1. Neue IDs in GitHub Secrets aktualisieren
2. Workflow-Datei anpassen falls nötig

## Referenzen

- [Vercel CLI Dokumentation](https://vercel.com/docs/cli)
- [GitHub Actions Dokumentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

**Letzte Aktualisierung**: August 2025
**Maintainer**: voai DevOps Team