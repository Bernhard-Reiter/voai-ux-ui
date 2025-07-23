# VOAI Enterprise Frontend

## 🚀 Phase 1 abgeschlossen!

Die Monorepo-Struktur ist vollständig implementiert mit:

- ✅ **Turborepo** für effizientes Build-Management
- ✅ **Shared UI Library** mit atomaren Komponenten
- ✅ **Style Dictionary** für Design Tokens
- ✅ **Zod-validierte Environment Variables**
- ✅ **Umfassende Test-Suite**
- ✅ **GitHub Actions CI/CD Pipeline**

## 📦 Projekt-Struktur

```
.
├── apps/
│   └── frontend/          # Next.js Frontend App
├── packages/
│   ├── ui/               # Shared UI Components
│   ├── config/           # Shared Configurations & Design Tokens
│   └── tsconfig/         # Shared TypeScript Configs
├── turbo.json            # Turborepo Configuration
└── pnpm-workspace.yaml   # PNPM Workspace Configuration
```

## 🛠 Setup

1. **Dependencies installieren:**
   ```bash
   pnpm install
   ```

2. **Environment Variables einrichten:**
   ```bash
   cp .env.example .env.local
   # Fülle die Werte in .env.local aus
   ```

3. **Design Tokens bauen:**
   ```bash
   pnpm --filter @voai/config build
   ```

## 🚀 Development

```bash
# Alle Apps im Dev-Modus starten
pnpm dev

# Nur Frontend starten
pnpm --filter @voai/frontend dev

# Tests ausführen
pnpm test

# Linting
pnpm lint

# Type Checking
pnpm type-check

# Build
pnpm build
```

## 📝 Nächste Schritte (Phase 2-5)

### Phase 2: UI-Komponenten vervollständigen
- [ ] DataTable Component
- [ ] Sidebar Shell Layout
- [ ] Chart Components
- [ ] Storybook Setup

### Phase 3: Routing & Seitenaufbau
- [ ] Protected Routes
- [ ] Dashboard Layout
- [ ] Profile Pages
- [ ] Settings Pages

### Phase 4: Supabase Integration
- [ ] Auth Setup mit RLS
- [ ] Realtime Subscriptions
- [ ] Vector Store
- [ ] File Storage

### Phase 5: n8n Workflow Integration
- [ ] REST Client
- [ ] Webhook Handlers
- [ ] Status Polling
- [ ] Error Recovery

## 🔐 Required Secrets

Folgende Secrets müssen in GitHub und/oder .env.local gesetzt werden:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# n8n
N8N_API_URL=
N8N_API_KEY=
N8N_WEBHOOK_URL=

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Vercel
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

## 📚 Dokumentation

- [Architekturbericht](./docs/architekturbericht.md)
- [Phase 1 Implementation](./docs/PHASE-1-IMPLEMENTATION.md)

## 🤝 Contributing

Bitte erstelle einen Feature Branch und öffne einen Pull Request für Änderungen.

## 📄 License

Proprietary - VOAI Enterprise