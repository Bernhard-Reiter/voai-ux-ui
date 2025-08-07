# Circula Design System for voai

## Overview

This is a complete implementation of the Circula-inspired design system for voai. The design follows the principles of radical minimalism with a black and white color palette, using green (#41a344) exclusively for success states and checkmarks.

## Design Principles

1. **Radical Minimalism**: Black and white as the foundation, color only for meaning
2. **Professional Trust**: Banking-grade UI without playfulness
3. **Invisible Design**: The interface disappears, content takes focus
4. **Purposeful Color**: Color only when it carries information

## File Structure

```
packages/ui-v2/src/
├── styles/
│   ├── circula-tokens.css      # Design tokens (colors, spacing, typography)
│   └── circula-globals.css     # Global styles and utilities
├── components/
│   ├── Button/
│   │   └── CirculaButton.tsx   # Button components
│   ├── Card/
│   │   └── CirculaCard.tsx     # Card components
│   ├── Input/
│   │   └── CirculaInput.tsx    # Form input components
│   ├── Navigation/
│   │   └── CirculaNav.tsx      # Navigation components
│   ├── CheckList/
│   │   └── CirculaCheckList.tsx # Checklist with green checkmarks
│   └── index.ts                # Component exports
├── demo/
│   └── CirculaShowcase.tsx     # Complete demo page
└── CIRCULA-DESIGN-SYSTEM.md    # This file
```

## Color System

### Primary Colors
- **Black**: `#0F172A` - Primary interactions, text, CTAs
- **White**: `#FFFFFF` - Backgrounds

### Success Color (Green - ONLY for checkmarks)
- **Success**: `#41a344` - Apple green for checkmarks only
- **Success Light**: `#e2f6e2` - Subtle success backgrounds
- **Success Dark**: `#328734` - Success hover states

### Grayscale
```css
--circula-gray-900: #0F172A;  /* Near-black */
--circula-gray-800: #1E293B;
--circula-gray-700: #334155;
--circula-gray-600: #475569;
--circula-gray-500: #64748B;
--circula-gray-400: #94A3B8;
--circula-gray-300: #CBD5E1;  /* Borders */
--circula-gray-200: #E2E8F0;
--circula-gray-100: #F1F5F9;
--circula-gray-50:  #F8FAFC;
```

## Typography

- **Font**: Inter (400, 500, 600, 700)
- **Sizes**: 12px to 48px scale
- **Line Heights**: 1.25, 1.5, 1.75
- **Letter Spacing**: -0.02em for headings

## Components

### 1. Buttons
- **CirculaButton**: Base button with variants (primary, secondary, ghost, success)
- **CTAButton**: Black pill-shaped CTA button
- **TextButton**: Minimal text-only button

### 2. Cards
- **CirculaCard**: Minimal card with three variants
- **CirculaStatCard**: Card for displaying statistics

### 3. Inputs
- **CirculaInput**: Clean text input
- **CirculaTextarea**: Multi-line input
- **CirculaSelect**: Dropdown select

### 4. Navigation
- **CirculaNav**: Top navigation bar
- **CirculaSideNav**: Collapsible side navigation
- **CirculaLogo**: Minimal logo component
- **CirculaMobileNav**: Mobile navigation

### 5. CheckList
- **CirculaCheckList**: Feature list with green checkmarks
- **CirculaCheckListCompact**: Compact variant
- **CirculaCheckListCard**: CheckList in a card
- **CirculaSuccessMessage**: Success notification

## Usage

```tsx
import {
  CirculaButton,
  CirculaCard,
  CirculaCheckList,
} from '@voai/ui-v2/components';

// Import styles
import '@voai/ui-v2/styles/circula-globals.css';

// Use components
<CirculaButton>Click me</CirculaButton>

<CirculaCard>
  <CirculaCardTitle>Title</CirculaCardTitle>
  <CirculaCardContent>Content</CirculaCardContent>
</CirculaCard>

<CirculaCheckList items={[
  { id: '1', text: 'Feature 1' },
  { id: '2', text: 'Feature 2' },
]} />
```

## Responsive Design

- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Container max-width: 1280px
- Touch targets: minimum 44x44px

## Accessibility

- WCAG AA compliant contrast ratios
- Visible focus indicators
- Semantic HTML
- ARIA attributes where needed
- Reduced motion support

## Best Practices

1. **Use black for primary actions** - CTAs, active states
2. **Green only for success** - Checkmarks, success messages
3. **Minimal shadows** - Only on hover/interaction
4. **Subtle animations** - 150-300ms transitions
5. **Clear hierarchy** - Through size and weight, not color

## Demo

View the complete implementation in `CirculaShowcase.tsx` which demonstrates all components and their usage.