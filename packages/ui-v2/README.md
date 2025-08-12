# @voai/ui-v2 – Circula Design System (Cosmic archiviert)

> Standard-Theme: Circula (Schwarz/Weiß; Grün nur für Success). Das frühere „Cosmic“-Theme wurde nach `_archive/cosmic/` verschoben und ist nicht mehr Bestandteil des Buildpfads.

## 🚀 Quick Start

```ts
// Styles laden (Circula)
import '@voai/ui-v2/styles/index.css';
```

## Design-Prinzipien (Circula)

1. Monochrom + Grün als Success
2. Fokus auf Lesbarkeit und Geschwindigkeit
3. WCAG 2.2 AA

## Komponenten

Kernkomponenten bleiben erhalten; visuelle Tokens richten sich ausschließlich nach Circula.

## Color Tokens (Auszug)

```css
/* Core Palette */
--c-bg: #FFFFFF;
--c-surface: #F6F6F7;
--c-border: #E5E7EB;
--c-text-primary: #0E0E11;
--c-text-secondary: #6B7280;
--circula-success: #22c55e; /* Success-Gruen */
```

## 📦 Development

```bash
# Install dependencies
pnpm install

# Build tokens (runs automatically on install)
pnpm build:tokens

# Build components
pnpm build

# Watch mode
pnpm dev

# Run Storybook
pnpm storybook
```

## 🔧 Token Management

This package uses Style Dictionary for design token management. Tokens are automatically generated from `tokens/` during the build process.

```bash
# Rebuild tokens manually
pnpm build:tokens
```

## 🤝 Contributing

See the main repository README for contribution guidelines.