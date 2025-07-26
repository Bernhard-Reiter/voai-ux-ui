# Merge Strategy - Phase 4 Integration

## 🎯 Ziel
Integration der Phase 4 Features (Supabase Auth, SSR, Realtime) mit den UI/UX Verbesserungen auf main.

## 📊 Aktueller Status

### Main Branch
- ✅ Alle fehlenden Seiten erstellt (features, pricing, etc.)
- ✅ basePath Konfiguration entfernt
- ✅ Loading States implementiert
- ✅ Error Boundaries verbessert
- ✅ Environment Variables dokumentiert

### Phase 4 Branch (feat/phase-4-supabase)
- ✅ Supabase Authentication implementiert
- ✅ Google OAuth Login
- ✅ SSR Auth Guards
- ✅ Realtime Workflow Status
- ✅ GDPR User Deletion
- ⚠️ CI/CD Tests teilweise fehlschlagend

## 🔄 Merge-Strategie

### 1. Vorbereitung
```bash
# Lokale Branches aktualisieren
git checkout main
git pull origin main
git checkout feat/phase-4-supabase
git pull origin feat/phase-4-supabase
```

### 2. Konflikte identifizieren
```bash
# Test-Merge durchführen
git checkout feat/phase-4-supabase
git merge main --no-commit --no-ff
```

**Erwartete Konflikte:**
- `next.config.ts` - basePath wurde in main entfernt, output:export in Phase 4
- `package.json` - Build-Skript Änderungen
- Neue Seiten in main vs. Auth-Seiten in Phase 4

### 3. Konfliktlösung

#### next.config.ts
```typescript
// Finale Version sollte sein:
const nextConfig: NextConfig = {
  // Kein output: 'export' - SSR benötigt
  // Kein basePath - App läuft auf Root
  reactStrictMode: true,
  // ... rest der Konfiguration
}
```

#### package.json
```json
{
  "scripts": {
    "build": "next build", // Ohne touch out/.nojekyll
  }
}
```

### 4. Test-Plan nach Merge

1. **Lokale Tests**
   ```bash
   pnpm install
   pnpm build
   pnpm test
   ```

2. **Manuelle Tests**
   - [ ] Auth Flow (Login/Logout)
   - [ ] Alle neuen Seiten erreichbar
   - [ ] Dark Mode funktioniert
   - [ ] Loading States sichtbar
   - [ ] Error Handling funktioniert

3. **CI/CD Fixes**
   - Environment Variables in GitHub Secrets
   - Test-Datenbank für CI einrichten

## 📋 Merge Checklist

### Pre-Merge
- [ ] Backup der aktuellen Branches
- [ ] Alle lokalen Änderungen committed
- [ ] CI auf main ist grün
- [ ] Dokumentation aktualisiert

### During Merge
- [ ] Konflikte sorgfältig lösen
- [ ] Keine Features verloren gehen
- [ ] Code-Review durchführen

### Post-Merge
- [ ] Alle Tests laufen durch
- [ ] Deployment auf Vercel erfolgreich
- [ ] Environment Variables gesetzt
- [ ] Supabase Projekt konfiguriert
- [ ] Monitoring aktiviert

## 🚀 Deployment nach Merge

1. **Vercel Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Supabase Setup**
   - Google OAuth aktivieren
   - Redirect URLs konfigurieren
   - Migrations ausführen

3. **Monitoring**
   - Sentry Alerts prüfen
   - Vercel Functions Logs
   - Supabase Logs

## ⚠️ Rollback-Plan

Falls kritische Fehler auftreten:

```bash
# Zum letzten stabilen Commit zurück
git revert -m 1 <merge-commit-hash>
git push origin main

# Vercel Deployment zurückrollen
# Im Vercel Dashboard -> Deployments -> Redeploy previous
```

## 📅 Timeline

1. **Tag 1**: Merge Vorbereitung & Konfliktlösung
2. **Tag 2**: Testing & CI/CD Fixes
3. **Tag 3**: Production Deployment
4. **Tag 4**: Monitoring & Optimierung

---

Erstellt am: 2025-07-26
Status: Ready for Review