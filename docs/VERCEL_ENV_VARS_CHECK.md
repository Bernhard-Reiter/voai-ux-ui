# 🔍 Vercel Environment Variables Checklist

## Kritische Prüfpunkte für 500 Error Behebung

### 1. Vercel Dashboard prüfen

Gehen Sie zu: https://vercel.com/[your-team]/voai-website-frontend/settings/environment-variables

### 2. Folgende Variables MÜSSEN gesetzt sein:

#### 🔴 KRITISCH (Ohne diese läuft die App nicht):
```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

⚠️ **WICHTIG**: Diese MÜSSEN mit `NEXT_PUBLIC_` beginnen, damit sie im Browser verfügbar sind!

#### 🟡 Server-seitig (für erweiterte Features):
```
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
```

### 3. Umgebungen prüfen

Stellen Sie sicher, dass die Variables für ALLE Umgebungen gesetzt sind:
- [ ] Production
- [ ] Preview  
- [ ] Development

### 4. Nach dem Setzen

1. **Redeploy triggern**:
   ```bash
   # Im Vercel Dashboard:
   # Deployments → ... → Redeploy
   
   # Oder via CLI:
   vercel --prod
   ```

2. **Build Logs prüfen**:
   - Suchen Sie nach "Supabase environment variables not configured"
   - Das sollte NICHT erscheinen wenn alles korrekt ist

### 5. Debug-Schritte

Falls immer noch 500 Error:

1. **Function Logs prüfen** (Vercel Dashboard → Functions):
   ```
   - Suchen Sie nach Error Messages
   - Prüfen Sie ob env vars undefined sind
   ```

2. **Browser Console** (F12):
   ```javascript
   // Prüfen ob Variables im Browser ankommen:
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

3. **Temporärer Workaround**:
   Wenn Supabase noch nicht eingerichtet ist, können Sie temporär dummy values setzen:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy-key
   ```

### 6. Erwartetes Verhalten

Nach korrekter Konfiguration:
- Homepage lädt ohne 500 Error
- Features, Pricing, etc. Seiten funktionieren
- Login-Button zeigt sich (funktioniert aber erst mit echtem Supabase)

## 🚨 Häufigster Fehler

**Vergessen des `NEXT_PUBLIC_` Prefix!**

❌ FALSCH:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

✅ RICHTIG:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

Letzte Aktualisierung: 2025-07-26