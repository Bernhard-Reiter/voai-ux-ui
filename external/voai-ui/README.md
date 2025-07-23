# VOAI UI Design System Integration

This directory contains the integrated design tokens from the VOAI UI Design System.

## Integration Pattern

The integration follows a **direct copy with local build** pattern:

1. Design tokens are copied from the [voai-ux-ui](https://github.com/Bernhard-Reiter/voai-ux-ui) repository
2. Tokens are built locally using Style Dictionary
3. The built tokens are consumed by Tailwind CSS via a custom plugin
4. Components are implemented independently using the design tokens

## Structure

```
external/voai-ui/
├── packages/
│   ├── tokens/          # Design token definitions
│   │   ├── color.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── elevation.json
│   │   ├── motion.json
│   │   └── build/       # Generated token outputs
│   └── ui/
│       └── tailwind/    # Tailwind integration
│           └── voai-tokens-plugin.js
└── README.md
```

## Building Tokens

To build the design tokens:

```bash
pnpm build:tokens
```

This will generate:
- `build/tokens.json` - Nested token structure
- `build/variables.css` - CSS custom properties
- `build/tokens.js` - JavaScript exports
- `build/tailwind-tokens.js` - Tailwind-specific tokens

## Usage in Components

The design tokens are automatically available through Tailwind classes:

```tsx
// Colors
<div className="text-primary-500 bg-secondary-100">

// Spacing
<div className="p-spacing-md">

// Typography
<div className="font-sans text-size-lg">

// Elevation
<div className="shadow-elevation-md">
```

## Updating Tokens

To update the design tokens:

1. Update the JSON files in `packages/tokens/`
2. Run `pnpm build:tokens`
3. The changes will be automatically picked up by Tailwind

## CI/CD

The `.github/workflows/designsystem.yml` workflow automatically builds and validates tokens when changes are made to this directory.

## Differences from voai-enterprise-crm

This implementation follows the same pattern as voai-enterprise-crm but with some improvements:

- Cleaner token structure
- Better TypeScript support
- Automated CI/CD workflow
- Documented integration pattern

## Synchronization

This is a manual copy of the design system. To sync with upstream:

1. Clone the latest voai-ux-ui repository
2. Copy the relevant token files
3. Run `pnpm build:tokens`
4. Test the integration
5. Commit the changes