# Brand Violation Audit Report - voai-ux-ui Repository

## Executive Summary
This audit identified multiple brand violations across the voai-ux-ui repository, including:
- 25 instances of non-compliant color usage
- 7 gradient violations
- 5 instances of wrong shadow classes
- Multiple non-standard hex colors
- Component duplications across packages
- 1 deprecated directory

## 1. Wrong Color Classes

### Red Colors (9 violations)
- `/apps/showcase/src/app/page.tsx:100` - `bg-red-500`
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-red-500`
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:230` - `text-red-600`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-red-500`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:230` - `text-red-600`
- `/packages/ui-v2/src/atoms/CometForm/CometForm.stories.tsx:36` - `bg-red-50`
- `/packages/ui-v2/src/atoms/CometForm/CometForm.stories.tsx:38` - `text-red-600`
- `/packages/ui/src/atoms/CometForm/CometForm.stories.tsx:36` - `bg-red-50`
- `/packages/ui/src/atoms/CometForm/CometForm.stories.tsx:38` - `text-red-600`

### Green Colors (7 violations)
- `/apps/showcase/src/app/page.tsx:104` - `bg-green-500`
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:72` - `text-green-600 bg-green-50`
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-green-500`
- `/packages/ui-v2/src/organisms/CommandPalette.stories.tsx:111` - `text-green-600`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:72` - `text-green-600 bg-green-50`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-green-500`
- `/packages/ui/src/organisms/CommandPalette.stories.tsx:111` - `text-green-600`
- `/packages/ui-v2/src/molecules/StarCard/StarCard.stories.tsx:88` - `text-green-600`
- `/packages/ui/src/molecules/StarCard/StarCard.stories.tsx:88` - `text-green-600`

### Amber Colors (4 violations)
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:74` - `text-amber-600 bg-amber-50`
- `/packages/ui-v2/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-amber-500`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:74` - `text-amber-600 bg-amber-50`
- `/packages/ui/src/organisms/NebulaGrid/NebulaGrid.stories.tsx:229` - `bg-amber-500`

### Purple/Indigo Colors (6 violations)
- `/packages/ui-v2/src/organisms/CommandPalette.stories.tsx:295` - `from-purple-500 to-indigo-600`, `hover:from-purple-600 hover:to-indigo-700`
- `/packages/ui-v2/src/organisms/CommandPalette.stories.tsx:310` - `from-purple-50 to-indigo-50 border-purple-200`
- `/packages/ui-v2/src/organisms/OrbitNav/OrbitNav.stories.tsx:159` - `from-purple-50 to-indigo-50`
- `/packages/ui/src/organisms/CommandPalette.stories.tsx:295` - `from-purple-500 to-indigo-600`, `hover:from-purple-600 hover:to-indigo-700`
- `/packages/ui/src/organisms/CommandPalette.stories.tsx:310` - `from-purple-50 to-indigo-50 border-purple-200`
- `/packages/ui/src/organisms/OrbitNav/OrbitNav.stories.tsx:159` - `from-purple-50 to-indigo-50`

## 2. Gradient Violations (7 instances)
- `/packages/ui-v2/src/organisms/CommandPalette.stories.tsx:295` - `bg-gradient-to-r`
- `/packages/ui-v2/src/organisms/CommandPalette.stories.tsx:310` - `bg-gradient-to-br`
- `/packages/ui-v2/src/organisms/OrbitNav/OrbitNav.stories.tsx:159` - `bg-gradient-to-r`
- `/packages/ui-v2/src/styles/globals.css:51` - `bg-gradient-to-r` (from-fg to-g4)
- `/packages/ui/src/organisms/CommandPalette.stories.tsx:295` - `bg-gradient-to-r`
- `/packages/ui/src/organisms/CommandPalette.stories.tsx:310` - `bg-gradient-to-br`
- `/packages/ui/src/organisms/OrbitNav/OrbitNav.stories.tsx:159` - `bg-gradient-to-r`

## 3. Shadow Violations (5 instances)
- `/packages/ui-v2/src/organisms/OrbitNav/OrbitNav.stories.tsx:167` - `shadow-lg`
- `/packages/ui-v2/src/organisms/CommandPalette.tsx:111` - `shadow-2xl`
- `/packages/ui/src/organisms/OrbitNav/OrbitNav.stories.tsx:167` - `shadow-lg`
- `/packages/ui/src/organisms/CommandPalette.tsx:111` - `shadow-2xl`
- `/packages/ui-v2/src/molecules/StarCard/StarCard.tsx:18` - `hover:shadow-lg`
- `/packages/ui/src/molecules/StarCard/StarCard.tsx:18` - `hover:shadow-lg`

Note: The Circula shadow tokens (`--circula-shadow-md`, `--circula-shadow-lg`, `--circula-shadow-xl`) found in `/packages/ui-v2/src/styles/circula-tokens.css` appear to be valid custom properties.

## 4. Non-Standard Hex Colors

### In Cosmic Tokens (violations)
- `/packages/ui-v2/_archive/cosmic/cosmic-tokens.css` and `/packages/ui/src/styles/cosmic-tokens.css`:
  - `#4F46E5` (purple accent)
  - `#22C55E` (green success)
  - `#FACC15` (yellow warning)
  - `#EF4444` (red error)
  - `#3B82F6` (blue info)
  - `#64748B` (neutral)
  - `#A855F7` (purple highlight)
  - `#6366F1` (purple accent dark)
  - `#16A34A` (green success dark - compliant)
  - `#CA8A04` (amber warning dark)
  - `#DC2626` (red error dark)
  - `#2563EB` (blue info dark)
  - `#94A3B8` (neutral dark)
  - `#9333EA` (purple highlight dark)
  - `#6B7280` (text secondary)
  - `#9CA3AF` (text secondary dark)
  - `#E5E7EB` (border)
  - `#2D2D2D` (border dark)
  - `#F6F6F7` (surface)
  - `#1A1A1A` (surface dark)
  - `#0E0E11` (text primary)
  - `#0F0F0F` (bg dark)

### In Tailwind Preset (violations)
- `/packages/ui-v2/tailwind.preset.js`:
  - `#41a344` (success - Apple green, compliant)
  - `#e2f6e2` (success light)
  - `#2e7a32` (success dark)
  - `#111111` (g1)
  - `#222222` (g2)
  - `#444444` (g3)
  - `#666666` (g4)
  - `#2d2d2d` (border)
  - `#1a1a1a` (muted)
  - `#9aa0a6` (muted-foreground)
  - `#8b0000` (destructive)

### In Circula Tokens (compliant grayscale)
- `/packages/ui-v2/src/styles/circula-tokens.css`:
  - `#0F172A` (near-black)
  - `#41a344` (Apple green - compliant)
  - `#328734` (Apple green dark)
  - Gray scale colors are compliant (grayscale)

## 5. Component Duplications

### Button Components
- `/packages/ui-v2/src/atoms/Button.tsx`
- `/packages/ui/src/atoms/Button.tsx`
- `/packages/ui-v2/src/components/Button/CirculaButton.tsx` (additional variant)

### Card Components
- `/packages/ui-v2/src/molecules/Card.tsx`
- `/packages/ui/src/molecules/Card.tsx`
- `/packages/ui-v2/src/molecules/StarCard/StarCard.tsx`
- `/packages/ui/src/molecules/StarCard/StarCard.tsx`
- `/packages/ui-v2/src/components/Card/CirculaCard.tsx` (additional variant)

### Badge Components
- `/packages/ui-v2/src/atoms/Badge.tsx`
- `/packages/ui/src/atoms/Badge.tsx`

## 6. Deprecated Directories
- `/packages/ui-v2/_archive/` - Contains archived cosmic tokens

## 7. Design Token Inconsistencies
- Multiple color systems in use: Cosmic tokens, Circula tokens, and Tailwind colors
- Inconsistent token naming conventions between `--c-*` and `--circula-*`
- Duplicate token definitions across different files

## Recommendations

1. **Color Standardization**
   - Remove all color classes except grayscale and #16A34A (Apple green)
   - Replace red/blue/yellow/purple/pink classes with approved alternatives
   - Standardize on a single token system

2. **Component Consolidation**
   - Merge duplicate Button, Card, and Badge components
   - Create a single source of truth for each component type
   - Remove package duplication (ui vs ui-v2)

3. **Shadow Standardization**
   - Replace shadow-md/lg/xl/2xl with approved shadow tokens
   - Use only minimal shadows as defined in brand guidelines

4. **Directory Cleanup**
   - Remove the `_archive` directory
   - Consolidate packages to avoid duplication

5. **Token System**
   - Choose between Cosmic or Circula token system
   - Remove all non-compliant hex colors
   - Ensure all colors are either #000, #fff, grayscale, or #16A34A