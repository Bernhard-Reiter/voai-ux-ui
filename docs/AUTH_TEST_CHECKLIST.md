# ✅ Auth Testing Checklist

## 1. Environment Variable Tests

### Browser Console Tests:
```javascript
// Öffnen Sie https://voai-website-frontend.vercel.app
// F12 → Console → Fügen Sie ein:

// Test 1: Check if env vars are loaded
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Expected: Should show the actual values, not undefined
```

### Network Tab Tests:
- [ ] Check for Supabase API calls to `aqvnasuputatphvqrqam.supabase.co`
- [ ] Verify no CORS errors
- [ ] Check for 401/403 auth errors

## 2. Page Load Tests

### Public Pages (sollten IMMER funktionieren):
- [ ] Homepage: https://voai-website-frontend.vercel.app
- [ ] Features: https://voai-website-frontend.vercel.app/features
- [ ] Pricing: https://voai-website-frontend.vercel.app/pricing
- [ ] About: https://voai-website-frontend.vercel.app/about
- [ ] Contact: https://voai-website-frontend.vercel.app/contact

### Auth Flow Tests:
- [ ] Login Button sichtbar
- [ ] Login Page lädt ohne Fehler
- [ ] Google OAuth Button vorhanden (funktioniert erst nach Supabase Setup)

## 3. Auth Component Tests

### AuthProvider Funktionalität:
- [ ] Keine Fehler in Browser Console
- [ ] Loading state wird korrekt angezeigt
- [ ] Auth state changes werden erkannt

### Error Handling:
- [ ] App stürzt nicht ab wenn Supabase nicht konfiguriert
- [ ] Graceful degradation ohne Auth

## 4. Supabase Dashboard Tests

Nach Supabase Konfiguration:
- [ ] Auth → Settings → Site URL gesetzt
- [ ] Auth → Settings → Redirect URLs konfiguriert
- [ ] Auth → Providers → Google aktiviert
- [ ] Database → Tables → profiles existiert
- [ ] Database → Tables → workflow_status existiert
- [ ] RLS Policies aktiv

## 5. Full Auth Flow Test

Nach vollständiger Konfiguration:
1. [ ] Login mit Google
2. [ ] Session wird erstellt
3. [ ] User Profile wird angelegt
4. [ ] Dashboard zugänglich
5. [ ] Logout funktioniert
6. [ ] Session wird gelöscht

## 6. Performance Tests

- [ ] Lighthouse Score ≥ 95
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.9s
- [ ] No blocking resources

## 7. Security Tests

- [ ] Service Role Key NICHT im Browser sichtbar
- [ ] Anon Key nur für public operations
- [ ] RLS verhindert unauthorized access
- [ ] HTTPS überall aktiv

## 🚨 Häufige Probleme & Lösungen

### Problem: 500 Error auf Production
**Lösung**: Environment Variables in Vercel setzen

### Problem: "Supabase environment variables not configured"
**Lösung**: NEXT_PUBLIC_ Prefix prüfen

### Problem: Auth funktioniert lokal aber nicht auf Vercel
**Lösung**: Redirect URLs in Supabase Dashboard anpassen

### Problem: Google OAuth Error
**Lösung**: Google Cloud Console OAuth2 Credentials prüfen