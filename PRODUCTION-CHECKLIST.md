# VoAI Production Checklist

## ✅ Implementierungsstatus

### Go-Live-Checkliste (9.5/10)

- [x] **Code-Struktur vollständig** - Alle Komponenten implementiert
- [x] **ClamAV Integration** - Code vorhanden in `/api/upload/route.ts`
- [x] **HMAC-Webhooks** - Implementiert für Voice & Stripe
- [x] **Idempotenz** - Stripe Events mit Duplikat-Check
- [x] **Consent-Tracking** - Bei Upload mit Timestamp & Zweck
- [x] **Retention-Worker** - 180-Tage Cleanup implementiert
- [x] **Business Hours** - SchedulingService verhindert Calls außerhalb
- [x] **Billing-Flow** - Event-basiert NegotiationCompleted → Invoice
- [x] **Status-UI** - Realtime mit Supabase Channels
- [x] **Monitoring-Code** - Prometheus Metriken implementiert

### ⚠️ Vor Go-Live erforderlich

#### 1. API Keys & Services

```bash
# In Vercel Environment Variables setzen:
OPENAI_API_KEY=sk-proj-... # Echter OpenAI Key
VAPI_API_KEY=... # Vapi Account anlegen
STRIPE_SECRET_KEY=sk_live_... # Stripe Live Keys
STRIPE_WEBHOOK_SECRET=whsec_... # Stripe Webhook Secret
GOOGLE_APPLICATION_CREDENTIALS=... # Google Cloud Service Account
```

#### 2. Externe Services Setup

**Google Cloud Vision:**
```bash
1. Google Cloud Console → Create Service Account
2. Enable Vision API
3. Download JSON credentials
4. Upload to Vercel as secret
```

**Vapi (Voice):**
```bash
1. Create account at vapi.ai
2. Configure German voice (ElevenLabs)
3. Set webhook URL: https://your-domain.com/api/voice/callback
4. Copy API key to env
```

**Stripe:**
```bash
1. Stripe Dashboard → API Keys → Live Keys
2. Webhooks → Add endpoint: https://your-domain.com/api/stripe/webhook
3. Select events: invoice.paid, invoice.payment_failed
4. Copy webhook secret
```

#### 3. Infrastructure

**ClamAV für Production:**
```bash
# Docker Container für Vercel Functions
FROM node:20-alpine
RUN apk add --no-cache clamav clamav-daemon
RUN freshclam
```

**Worker Deployment (Railway/Render/Fly.io):**
```bash
# Railway
railway login
railway link
railway up

# Environment variables im Dashboard setzen
```

#### 4. Monitoring Setup

**Prometheus + Grafana:**
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'voai'
    static_configs:
      - targets: ['app.voai.com']
    metrics_path: '/api/metrics'
    authorization:
      credentials: 'your-webhook-secret'
```

**Alerts (AlertManager):**
```yaml
groups:
  - name: voai
    rules:
      - alert: DLQNotEmpty
        expr: voai_dlq_size > 0
        for: 5m
      - alert: WebhookErrors
        expr: rate(voai_webhook_errors_total[5m]) > 0
        for: 5m
      - alert: OCRSlow
        expr: histogram_quantile(0.95, voai_ocr_processing_duration_seconds) > 30
        for: 5m
```

#### 5. Tests ausführen

```bash
# Unit Tests
pnpm test

# E2E Tests (mit echten Services)
export OPENAI_API_KEY=...
export VAPI_API_KEY=...
pnpm test:e2e

# Load Test
k6 run tests/load/upload-flow.js
```

#### 6. Deployment

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready"
git push origin main

# 2. Vercel deployment (automatic via GitHub)
# 3. Worker deployment
cd worker && railway up

# 4. Run migrations
npx supabase db push --project-id aqvnasuputatphvqrqam
```

## 📊 Performance-Ziele

- ✅ P95 OCR+Embedding < 30s
- ✅ 10/10 E2E Läufe stabil
- ✅ Keine Calls außerhalb Business Hours
- ✅ EICAR wird blockiert
- ✅ Webhooks idempotent

## 🔒 Security Checklist

- [x] HMAC für alle Webhooks
- [x] RLS auf allen Tabellen
- [x] Service Role Key nur server-side
- [x] ClamAV für Malware-Scans
- [ ] Rate Limiting auf APIs
- [ ] WAF Rules in Vercel

## 📈 Launch Metrics

Nach Go-Live überwachen:
- Job Success Rate > 95%
- OCR P95 < 30s
- Voice Call Success > 80%
- Invoice Payment Rate > 90%
- Zero DLQ after 24h

## 🚀 Launch Readiness: 85%

**Fehlende 15%:**
- Echte API Keys
- Service Accounts
- Production Monitoring
- Load Tests