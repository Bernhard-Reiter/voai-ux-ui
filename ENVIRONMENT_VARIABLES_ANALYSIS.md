# 📋 VOAI Website - Environment Variables Analyse

## ✅ BENÖTIGTE Variablen (REQUIRED)

Diese Variablen werden im Code tatsächlich verwendet und sind erforderlich:

### 1. **Supabase** (Pflicht)
```
NEXT_PUBLIC_SUPABASE_URL        # Ihre Supabase Projekt-URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Ihr öffentlicher Supabase Key
SUPABASE_SERVICE_ROLE_KEY       # Server-seitiger Key (optional, aber empfohlen)
```

### 2. **App URL** (Pflicht)
```
NEXT_PUBLIC_SITE_URL            # Default: http://localhost:3000
                                # Production: https://voai.app
```

### 3. **n8n Workflow Integration** (Pflicht laut Schema)
```
N8N_API_URL                     # n8n API URL
N8N_API_KEY                     # n8n API Schlüssel
N8N_WEBHOOK_URL                 # n8n Webhook URL
```

## ⚡ OPTIONALE Variablen

Diese können gesetzt werden, sind aber nicht zwingend erforderlich:

### 1. **Analytics** (Optional)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID   # Google Analytics ID
NEXT_PUBLIC_POSTHOG_KEY         # PostHog Analytics Key
NEXT_PUBLIC_POSTHOG_HOST        # PostHog Host URL
NEXT_PUBLIC_ENABLE_ANALYTICS    # "true" oder "false" (default: "false")
```

### 2. **Error Tracking** (Optional)
```
NEXT_PUBLIC_SENTRY_DSN          # Sentry DSN für Error Tracking
SENTRY_AUTH_TOKEN               # Für Source Maps Upload
SENTRY_ORG                      # Sentry Organisation
SENTRY_PROJECT                  # Sentry Projekt
NEXT_PUBLIC_ENABLE_SENTRY       # "true" oder "false" (default: "false")
```

### 3. **Features** (Optional)
```
NEXT_PUBLIC_ENABLE_VECTOR_SEARCH # "true" oder "false" (default: "false")
```

### 4. **Vercel** (Automatisch gesetzt)
```
VERCEL_URL                      # Wird von Vercel automatisch gesetzt
VERCEL_ENV                      # Wird von Vercel automatisch gesetzt
NODE_ENV                        # Wird von Vercel automatisch gesetzt
```

## ❌ NICHT BENÖTIGTE Variablen

Falls diese in Vercel gesetzt sind, können sie entfernt werden:

```
NEXT_PUBLIC_API_URL             # Wird im Code nicht verwendet
NEXT_PUBLIC_APP_URL             # Verwenden Sie stattdessen NEXT_PUBLIC_SITE_URL
TURBO_TEAM                      # Nur für Build-Optimierung
FORCE_COLOR                     # Nur für Build-Output
NEXT_TELEMETRY_DISABLED         # Nur für Build
```

## 🔧 Minimale Konfiguration für Production

```bash
# Pflicht
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=https://voai.app

# n8n Integration (falls verwendet)
N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxx
```

## 📝 Empfehlung

1. **Entfernen Sie** alle nicht benötigten Variablen aus Vercel
2. **Behalten Sie** nur die unter "BENÖTIGTE" aufgeführten Variablen
3. **Optional**: Fügen Sie Analytics/Sentry hinzu, wenn Sie diese Services nutzen
4. **Wichtig**: `NEXT_PUBLIC_SITE_URL` sollte für Production `https://voai.app` sein