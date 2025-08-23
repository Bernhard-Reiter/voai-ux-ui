# VOAI Enterprise Frontend

![Quality Gate](https://img.shields.io/badge/quality%20gate-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![License](https://img.shields.io/badge/license-proprietary-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/voai/frontend.git
cd voai-frontend

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm test` | Run unit tests |
| `pnpm test:turbo` | Run tests using Turbo |
| `pnpm lint` | Run ESLint on all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm clean` | Clean all build artifacts and node_modules |
| `pnpm sb:dev` | Start Storybook development server |
| `pnpm sb:build` | Build Storybook for production |
| `pnpm visual:test` | Run visual regression tests |
| `pnpm visual:update` | Update visual regression snapshots |

## 🏗️ Architecture Overview

VOAI Frontend is built as a modern monorepo using:

- **Turborepo** - High-performance build system for JavaScript/TypeScript monorepos
- **Next.js 14** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service for authentication and data
- **n8n** - Workflow automation integration

### Project Structure

```
voai-frontend/
├── apps/
│   └── frontend/          # Next.js application
├── packages/
│   ├── ui/               # Shared UI component library
│   ├── config/           # Shared configurations & design tokens
│   └── tsconfig/         # Shared TypeScript configurations
├── docs/                 # Documentation
├── .github/              # GitHub Actions workflows
├── turbo.json           # Turborepo configuration
└── pnpm-workspace.yaml  # PNPM workspace configuration
```

## 🔒 Quality Gates

Our CI/CD pipeline enforces strict quality standards:

### Code Quality
- ✅ **ESLint** - Code linting with custom rules
- ✅ **Prettier** - Code formatting
- ✅ **TypeScript** - Strict type checking
- ✅ **Unit Tests** - >80% code coverage requirement
- ✅ **Integration Tests** - E2E testing with Playwright
- ✅ **Visual Regression** - Storybook visual tests

### Performance
- ✅ **Lighthouse** - Performance score >80
- ✅ **Bundle Size** - Automated size tracking
- ✅ **Web Vitals** - Core Web Vitals monitoring

### Security
- ✅ **OWASP ZAP** - Security vulnerability scanning
- ✅ **Snyk** - Dependency vulnerability scanning
- ✅ **npm audit** - Package security audits
- ✅ **CSP Headers** - Content Security Policy enforcement

### Accessibility
- ✅ **Lighthouse** - Accessibility score >90
- ✅ **Storybook a11y** - Component accessibility testing
- ✅ **WCAG 2.1 AA** - Compliance standards

## 🔐 Required Environment Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# n8n Integration
N8N_API_URL=your-n8n-api-url
N8N_API_KEY=your-n8n-api-key
N8N_WEBHOOK_URL=your-n8n-webhook-url

# Security
APP_ENCRYPTION_KEY=your-encryption-key
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
CSRF_SECRET=your-csrf-secret

# Optional Services
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=your-posthog-host

# Deployment
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

## 📚 Documentation

- [Architecture Guide](./docs/architecture.md) - System design and technology choices
- [Security Guide](./docs/security.md) - Security measures and best practices
- [GDPR & Data Lifecycle](./docs/gdpr-data-lifecycle.md) - Data protection compliance
- [CI/CD Pipeline](./docs/ci-cd.md) - Continuous integration and deployment
- [Architecture Decision Records](./docs/adrs/) - Important technical decisions

### 🚀 Deployment Documentation

- [**Quick Start Deployment**](./docs/QUICK_START_DEPLOYMENT.md) - 5-Minuten Setup für Vercel
- [**Deployment Guide (Golden Path)**](./docs/DEPLOYMENT.md) - Vollständige Deployment-Anleitung
- [**Deployment Checklist**](./.github/DEPLOYMENT_CHECKLIST.md) - Pre/Post-Deployment Checkliste

## 🚧 Development Phases

### ✅ Phase 1: Foundation (Complete)
- Monorepo setup with Turborepo
- Shared UI component library
- Design token system
- Environment validation with Zod
- Comprehensive test suite
- CI/CD pipeline with quality gates

### Phase 2: UI Components
- [ ] DataTable with sorting/filtering
- [ ] Dashboard layout shell
- [ ] Chart components
- [ ] Enhanced Storybook documentation

### Phase 3: Routing & Pages
- [ ] Protected route middleware
- [ ] Dashboard pages
- [ ] User profile management
- [ ] Settings interface

### Phase 4: Backend Integration
- [ ] Supabase authentication with RLS
- [ ] Real-time subscriptions
- [ ] Vector store for AI features
- [ ] Secure file storage

### Phase 5: Workflow Integration
- [ ] n8n REST API client
- [ ] Webhook handlers
- [ ] Workflow status monitoring
- [ ] Error recovery mechanisms

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes and write tests
3. Ensure all quality gates pass
4. Open a pull request with a clear description
5. Request review from maintainers

## 🏢 Team

- **Product Owner**: [Name]
- **Tech Lead**: [Name]
- **Developers**: [Names]

## 📄 License

Proprietary - VOAI Enterprise. All rights reserved.
