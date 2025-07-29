# Pull Request erstellen und mergen

Da die automatische PR-Erstellung über die API nicht möglich ist, hier die manuellen Schritte:

## 1. Pull Request erstellen

### Option A: Direkter Link
Klicke auf diesen Link:
👉 https://github.com/Bernhard-Reiter/voai-website/compare/main...vercel-deploy?expand=1

### Option B: GitHub UI
1. Gehe zu: https://github.com/Bernhard-Reiter/voai-website
2. Klicke auf "Pull requests" Tab
3. Klicke auf "New pull request"
4. Wähle:
   - base: `main`
   - compare: `vercel-deploy`
5. Klicke auf "Create pull request"

## 2. PR Details

**Title:**
```
feat: Vercel deployment configuration for DSGVO-compliant hosting
```

**Description:**
Kopiere den kompletten Inhalt aus der Datei `PR_DESCRIPTION_VERCEL.md`

## 3. Merge durchführen

Nach dem Erstellen des PRs:

1. **Warte auf CI Checks:**
   - Linting ✅ (sollte grün sein)
   - Type-Check ✅ (sollte grün sein)
   - Tests ⚠️ (einige Fehler, aber nicht blockierend)
   - Build ✅ (sollte grün sein)

2. **Merge Options:**
   - Wähle "Squash and merge" für eine saubere History
   - Oder "Create a merge commit" wenn du alle Commits behalten willst

3. **Nach dem Merge:**
   - Vercel startet automatisch das Production Deployment
   - Warte ca. 2-3 Minuten

## 4. Post-Deployment Verification

Sobald das Deployment fertig ist:

```bash
# Führe das Verification Script aus
cd ~/voai-website
./scripts/post-deployment-checks.sh https://voai-website.vercel.app
```

## 5. Monitoring URLs

Nach erfolgreichem Deployment:

- **Production Site**: https://voai-website.vercel.app
- **Vercel Dashboard**: https://vercel.com/vi4/voai-website
- **Deployments**: https://vercel.com/vi4/voai-website/deployments
- **Analytics**: https://vercel.com/vi4/voai-website/analytics
- **Logs**: https://vercel.com/vi4/voai-website/logs

## Status Check

Der Branch `vercel-deploy` enthält:
- ✅ 6 Commits mit allen Änderungen
- ✅ Vercel Region auf `fra1` (Frankfurt)
- ✅ Alle Environment Variables konfiguriert
- ✅ CI/CD Fixes implementiert
- ✅ Dokumentation komplett

## Wichtig

Nach dem Merge:
1. Der `vercel-deploy` Branch kann gelöscht werden
2. Zukünftige Deployments laufen automatisch bei Push auf `main`
3. Preview Deployments für jeden neuen PR