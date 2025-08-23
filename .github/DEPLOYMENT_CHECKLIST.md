# Deployment Checklist

## Pre-Deployment

- [ ] Code auf Feature-Branch entwickelt
- [ ] Alle Tests bestehen (`npm test`)
- [ ] Build lokal erfolgreich (`npm run build`)
- [ ] Keine Linting-Fehler (`npm run lint`)
- [ ] Pull Request erstellt und beschrieben

## GitHub Secrets Konfiguration

- [ ] `VERCEL_TOKEN` gesetzt
- [ ] `VERCEL_ORG_ID` gesetzt  
- [ ] `VERCEL_PROJECT_ID` gesetzt
- [ ] `CHROMATIC_PROJECT_TOKEN` gesetzt (für Storybook)
- [ ] Supabase Secrets gesetzt (falls verwendet)

## Vercel Projekt-Einstellungen

- [ ] Root Directory: `apps/showcase`
- [ ] Build Command: leer (wird in GitHub Actions gemacht)
- [ ] Output Directory: leer
- [ ] Install Command: leer
- [ ] Node Version: 22.x
- [ ] SSO Protection: deaktiviert

## Pull Request Checks

- [ ] Commitlint passed
- [ ] Basic Checks passed
- [ ] Chromatic UI Tests passed
- [ ] Code Review approved
- [ ] Keine Merge-Konflikte

## Post-Deployment

- [ ] Deployment in GitHub Actions erfolgreich
- [ ] Website erreichbar unter:
  - [ ] https://voai-website.vercel.app
  - [ ] https://voai.me
  - [ ] https://www.voai.me
- [ ] Keine 404-Fehler
- [ ] Keine Console-Errors im Browser
- [ ] Performance akzeptabel (Lighthouse Score > 90)

## Rollback-Plan

Falls das Deployment fehlschlägt:

1. **Sofortmaßnahmen**:
   ```bash
   # Letztes funktionierendes Deployment wiederherstellen
   vercel rollback [deployment-url] --token=$VERCEL_TOKEN
   ```

2. **Fehleranalyse**:
   - GitHub Actions Logs prüfen
   - Vercel Deployment Logs prüfen
   - Browser Console auf Fehler prüfen

3. **Fix und Redeploy**:
   - Fehler auf Feature-Branch beheben
   - Neuen Pull Request erstellen
   - Deployment-Prozess wiederholen

## Kontakte

- **DevOps Lead**: [Email/Slack]
- **Vercel Support**: support@vercel.com
- **GitHub Issues**: https://github.com/Bernhard-Reiter/voai-ux-ui/issues

---

Version: 1.0
Letzte Aktualisierung: August 2025