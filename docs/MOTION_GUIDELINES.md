# Cosmic Motion Guidelines

## Principles

1. **Purpose over Polish**: Every animation must serve a function
2. **Fast & Fluid**: Prioritize perceived performance
3. **Consistent Timing**: Use the cosmic timing scale
4. **Respect Preferences**: Honor `prefers-reduced-motion`

## Timing Scale

```css
--duration-instant: 50ms;   /* Micro-interactions */
--duration-fast: 150ms;     /* Hover, focus states */
--duration-standard: 300ms; /* Most transitions */
--duration-slow: 500ms;     /* Complex animations */
--duration-glacial: 1000ms; /* Dramatic reveals */
```

## Easing Functions

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);     /* Default - decelerate */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Standard */
--ease-cosmic: cubic-bezier(0.34, 1.56, 0.64, 1); /* Cosmic bounce */
```

## Common Patterns

### Hover States
- **Duration**: 150ms (fast)
- **Properties**: transform, box-shadow, opacity
- **Scale**: 1.02 for interactive elements

### Page Transitions
- **Duration**: 300ms (standard)
- **Type**: Fade or slide
- **Stagger**: 100ms between elements

### Modals & Overlays
- **Backdrop**: Fade in 300ms
- **Content**: Scale + fade 150ms
- **Dismiss**: Reverse of entry

### Loading States
- **Skeleton**: Pulse animation 1.5s
- **Spinners**: Rotate 1s linear infinite
- **Progress**: Width transition 300ms

## Implementation

### React/Framer Motion
```tsx
import { motion } from 'framer-motion';
import { cosmicMotion, hoverScale } from '@voai/ui/motion';

<motion.div
  {...cosmicMotion.fadeIn}
  {...hoverScale}
>
  Content
</motion.div>
```

### CSS Classes
```css
.cosmic-fade-in {
  animation: cosmicFade var(--duration-standard) var(--ease-out);
}

.cosmic-hover-lift:hover {
  transform: translateY(-2px);
  transition: transform var(--duration-fast) var(--ease-out);
}
```

## Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators
- Always visible, never rely on motion alone
- 3px accent outline with 2px offset
- Instant appearance (no transition)

## Don'ts

- ❌ Parallax scrolling (performance, a11y)
- ❌ Auto-playing carousels
- ❌ Bounce on scroll
- ❌ Animations over 1s (except loading)
- ❌ Movement during user input