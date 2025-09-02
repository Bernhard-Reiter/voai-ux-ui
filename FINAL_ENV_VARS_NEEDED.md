# 🎯 Finale Environment Variables für voai-website-NEW

## ✅ Bereinigung abgeschlossen!

Ich habe alle nicht genutzten Environment Variables aus Vercel gelöscht:
- ❌ SUPABASE_SERVICE_ROLE_KEY (wird nicht genutzt - keine Server-Auth)
- ❌ STRIPE_SECRET_KEY (wird nicht genutzt - kein Stripe)
- ❌ STRIPE_WEBHOOK_SECRET (wird nicht genutzt - keine Webhooks)
- ❌ SENTRY_DSN (wird nicht genutzt - kein Sentry)

## 📋 Diese 5 Variables werden TATSÄCHLICH benötigt:

### 1. **NEXT_PUBLIC_SUPABASE_URL** ⚠️ MUSS NOCH GESETZT WERDEN
- **Verwendung**: `lib/auth/supabase-server.ts`
- **Wert**: Deine Supabase Project URL (z.B. `https://xxxxx.supabase.co`)

### 2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** ⚠️ MUSS NOCH GESETZT WERDEN
- **Verwendung**: `lib/auth/supabase-server.ts`
- **Wert**: Dein Supabase Anon/Public Key

### 3. **NEXT_PUBLIC_CORE_API_BASE** ✅ Bereits gesetzt
- **Verwendung**: `lib/api/client.ts`
- **Wert**: `https://core.voai.me`

### 4. **NEXT_PUBLIC_SITE_URL** ✅ Bereits gesetzt
- **Verwendung**: `lib/modules/core.ts`
- **Wert**: `https://voai-website-new.vercel.app`

### 5. **CORE_MODE** ✅ Bereits gesetzt
- **Verwendung**: `lib/modules/core.ts`
- **Wert**: `http`

## 🚀 Was du noch tun musst:

1. **Gehe zu Vercel**: https://vercel.com/dashboard → voai-website-new → Settings → Environment Variables

2. **Setze die Supabase Werte**:
   - Öffne https://supabase.com/dashboard
   - Wähle dein Projekt
   - Gehe zu Settings → API
   - Kopiere:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Trigger Deployment**: 
   - Entweder "Redeploy" klicken
   - Oder einen neuen Commit pushen

## 💡 Warum so wenige Variables?

Das aktuelle Projekt ist eine **reine Landing Page** ohne:
- Dashboard (kein SUPABASE_SERVICE_ROLE_KEY nötig)
- Payments (kein STRIPE nötig)
- Error Tracking (kein SENTRY nötig)

Die Landing Page nutzt nur minimale Supabase-Features für Basic Auth.

---
🎯 **TL;DR**: Du musst nur noch 2 Supabase Keys setzen, dann läuft alles!