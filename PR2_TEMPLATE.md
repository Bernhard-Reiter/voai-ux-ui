# PR #2: Core Flows + Module Integration

## 🚀 Übersicht

Implementiert die Core Flows (Upload → Ingest → Offer → Checkout) mit nahtloser Integration von `voai-core` und `voai-billing` als Workspace-Module.

## ✅ Implementiert:

### Module Integration
- **Workspace Setup:** pnpm workspaces für lokale Module
- **Billing Facade:** Stripe-Integration via `@voai/billing`
- **Core Bridge:** HTTP/Module-Mode für Ingest-Processing
- **Type Safety:** Durchgängige TypeScript-Integration

### API Routes
- **Stripe Webhook:** `/api/webhooks/stripe` mit Signatur-Verifikation
- **Core Ingest:** `/api/core/ingest` Fallback für Module-Mode
- **Server Actions:** Billing & Core über sichere Server-Only Facades

### Features
- Success Fee Invoice Generation
- Billing Portal Access
- Document Ingest Queueing
- Upload → Offer Creation Flow

### Testing & CI
- Unit Tests für Billing Facade
- Unit Tests für Core Bridge
- CI/CD mit `pnpm build:modules`
- Vitest Integration

## 📋 Definition of Done:
- [x] Module Integration: voai-core & voai-billing als Workspaces
- [x] Stripe Webhook: Verifiziert Events, runtime='nodejs'
- [x] Core Bridge: HTTP/Module-Mode schaltbar via ENV
- [x] Server Actions: createOfferFromUpload, issueSuccessFeeInvoice
- [x] Tests: Billing & Core Facades mit Mocks
- [x] CI: pnpm build:modules läuft vor Build
- [x] Security: server-only, keine Secrets im Client

## 🔧 Setup:

```bash
# Module-Repos ablegen
mkdir -p modules
cp -R path/to/voai-core-main modules/
cp -R path/to/voai-billing-main modules/

# Install & Build
cd voai-next
pnpm install
pnpm build:modules

# Entwicklung
pnpm dev
```

## 🔑 Environment Variables:

```env
# Core
CORE_MODE=http
NEXT_PUBLIC_CORE_API_BASE=https://core.voai.me
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Billing (Stripe)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📝 Nächste Schritte:
- Module-Repos als Git Submodules oder GitHub Packages
- Enhanced Stripe Webhook Handler mit Event Emitter
- Production Queue für Core Ingest (Supabase Edge Function)
- Customer Mapping & Subscription Management

---

### Branch: `feature/core-flows`

**Acceptance Tests:**
1. Upload Document → Offer created with ingest job
2. Issue Success Fee → Stripe invoice generated
3. Open Billing Portal → Redirect to Stripe
4. Webhook receives payment → Status updated