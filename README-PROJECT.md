# VOAI Website NEW

Moderne Landingpage und Frontend für voai.me mit Circula-Design-System.

## Quick Start

```bash
cd voai-next
npm install
npm run dev
```

## Wichtige Hinweise

### Sharp Grotesk Fonts
Die Sharp Grotesk Fonts müssen aus Brandox exportiert und in `public/fonts/sharp-grotesk/` abgelegt werden.
Siehe `FONT-NOTE.md` für Details.

### Environment Variables
Kopiere `.env.example` zu `.env.local` und füge die Supabase-Credentials ein:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Design System

- **Farben:** Monochrom mit Akzent-Grün (#16A34A)
- **Typografie:** Sharp Grotesk (Headlines), Epilogue (Body)
- **Komponenten:** Button, Card mit konsistenten Styles
- **Guardrails:** ESLint/Stylelint enforced Design-Tokens

## Tech Stack

- Next.js 15 mit App Router
- TypeScript
- Tailwind CSS
- Supabase Auth (SSR)
- Edge Rate Limiting
- CSP Security Headers

## Scripts

- `npm run dev` - Entwicklungsserver
- `npm run build` - Production Build
- `npm run lint` - ESLint Check
- `npm run typecheck` - TypeScript Check
- `npm run deploy:prod` - Vercel Deploy

## Projektstruktur

```
voai-next/
├── app/
│   ├── (marketing)/     # Marketing-Seiten (Landing)
│   ├── (app)/          # App-Bereich (Dashboard)
│   ├── fonts.ts        # Font-Konfiguration
│   └── globals.css     # Design-Tokens
├── components/ui/      # UI-Komponenten
├── lib/               # Utilities & Auth
├── middleware.ts      # Rate Limiting
└── next.config.ts     # CSP & Security
```

## Deployment

GitHub Actions sind für automatisches Vercel Prebuilt-Deploy konfiguriert.
Push zu `main` triggert automatisches Deployment.