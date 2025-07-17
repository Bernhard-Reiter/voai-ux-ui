# @voai/ui - Cosmic Guide Design System

> **Purpose**: Unify marketing site, web-app & docs under a single, narrative-driven UX/UI framework that fuses x.ai's cosmic minimalism with Attio's enterprise usability.

## 🚀 Quick Start

```bash
# Install the package
pnpm add @voai/ui

# Import components
import { WaypointBtn, NebulaGrid, OrbitNav } from '@voai/ui';
```

## 🌌 Design Principles

1. **Storytelling · Cosmic Guide** – every surface whispers exploration & clarity
2. **Monochrome ＋ 1 Accent** – zero chrome-noise, pure focus
3. **Benchmarking · x.ai × Attio** – visual fascination *and* business efficiency
4. **Accessibility & Performance First** – WCAG 2.2 AA / LCP < 1.5s

## 📚 Component Glossary

| Component | Cosmic Alias | Purpose |
|-----------|--------------|---------|
| Navigation | OrbitNav | Primary navigation system |
| Button | WaypointBtn | Call-to-action & quick actions |
| DataGrid | NebulaGrid | Data-dense tables |
| Card | StarCard | Content containers |
| Modal | PortalGate | Overlays & dialogs |
| Form | CometForm | Input collections |
| Workflow | CosmicFlow | Visual workflow builder |

## 🎨 Color Tokens

```css
/* Core Palette */
--c-bg: #FFFFFF;
--c-surface: #F6F6F7;
--c-border: #E5E7EB;
--c-text-primary: #0E0E11;
--c-text-secondary: #6B7280;
--c-accent: #4F46E5; /* Single accent color */
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