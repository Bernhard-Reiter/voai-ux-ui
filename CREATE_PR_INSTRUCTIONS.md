# Pull Request erstellen - Anleitung

## 1. Pull Request erstellen

Öffne diesen Link in deinem Browser:
👉 https://github.com/Bernhard-Reiter/voai-website/pull/new/vercel-deploy

Falls der Link nicht funktioniert:
1. Gehe zu https://github.com/Bernhard-Reiter/voai-website
2. Klicke auf "Pull requests"
3. Klicke auf "New pull request"
4. Wähle `vercel-deploy` als "compare" Branch

## 2. PR Details ausfüllen

**Title:**
```
feat: Vercel deployment configuration for DSGVO-compliant hosting
```

**Description:**
Kopiere den kompletten Inhalt aus `PR_DESCRIPTION_VERCEL.md`

## 3. Nach dem Merge

Sobald der PR gemerged ist:

### Automatische Actions:
- ✅ Production Deployment startet automatisch
- ✅ CI/CD Pipeline läuft durch
- ✅ Vercel deployed auf Production

### Manuelle Überprüfungen:

#### Security Headers Test
```bash
# Teste die Production URL
curl -I https://voai-website.vercel.app
```

Dann prüfe auf: https://securityheaders.com

#### DSGVO Compliance
- [ ] Cookie Banner funktioniert
- [ ] Datenschutzerklärung erreichbar
- [ ] Impressum erreichbar
- [ ] Keine externen Tracker ohne Consent

#### Monitoring Setup
1. Vercel Dashboard: https://vercel.com/vi4/voai-website
2. Analytics aktivieren
3. Error Tracking überprüfen

## 4. Wichtige URLs nach Deployment

- **Production**: https://voai-website.vercel.app
- **Vercel Dashboard**: https://vercel.com/vi4/voai-website
- **GitHub Actions**: https://github.com/Bernhard-Reiter/voai-website/actions
- **Environment Variables**: https://vercel.com/vi4/voai-website/settings/environment-variables

## Status
- Branch: `vercel-deploy`
- Commits: 5 (inkl. CI fixes)
- Preview Deployment: ✅ Erfolgreich
- CI Checks: ✅ Lint & Type-Check grün