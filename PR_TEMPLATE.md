# PR #1: Bootstrap & Design-Enforcement (Foundation)

## 🚀 Übersicht

Implementiert die komplette Foundation für das neue voai-next Frontend mit Circula Design System.

## ✅ Implementiert:

### Design System
- **Farben:** Monochrom mit Akzent-Grün (#16A34A)
- **Typografie:** San Francisco (Headlines), Epilogue (Body)
- **Design Tokens:** Vollständige Farbpalette, Radius, Shadows
- **Komponenten:** Button (Primary/Secondary), Card

### Tech Stack
- Next.js 15 mit App Router
- TypeScript & Tailwind CSS
- Supabase Auth (SSR)
- Edge Rate Limiting
- CSP Security Headers

### Features
- Landing Page mit Hero Section (ISR)
- Dashboard Stub
- API Client mit Retry-Logic
- Feature Flags & Telemetrie
- ESLint/Stylelint Guardrails

### CI/CD
- GitHub Actions Workflow
- Vercel Prebuilt Deploy
- npm für Dependency Management

## 📋 Definition of Done:
- [x] Fonts: SF Pro für Headlines, Epilogue für Body
- [x] Design: 0 Verstöße gegen Farb-/Font-Linter
- [x] Security: CSP aktiv, Headers gesetzt
- [x] CI: Build + Lint grün
- [x] Deployment Ready

## 🔧 Setup:
```bash
cd voai-next
npm install
npm run dev
```

## 📝 Nächste Schritte:
Nach Merge → PR #2 für Core Flows (Upload, Auth, Dashboard)

---

### Branch: `feature/circula-landingpage`

**GitHub PR erstellen:**
https://github.com/Bernhard-Reiter/voai-website-NEW/pull/new/feature/circula-landingpage