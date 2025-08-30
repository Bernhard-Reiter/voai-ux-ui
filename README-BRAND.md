# voai Brand Guidelines & UI-Kit

## 🎨 Brand Principles

### Core Design System
- **Monochrome**: Black/White + Grayscale only
- **Accent**: Green (#16A34A) exclusively for success/checkmarks/positive values
- **Background**: Always white
- **Borders**: 1px subtle borders for separation
- **Typography**: Space Grotesk (headlines), Inter (body)
- **Corners**: Rounded (12-16px)
- **Shadows**: Minimal (only shadow-sm allowed)
- **Motion**: 150-200ms, subtle transitions

## ✅ Definition of Done

### Colors
- [ ] White background throughout
- [ ] Separation via `border-border-subtle` (1px)
- [ ] Green (#16A34A) NEVER as surface/CTA, only ✔︎/positive numbers
- [ ] Primary buttons: black/white, `rounded-xl` (16px)
- [ ] Cards: white, 1px border, `rounded-xl`, no permanent shadow

### Typography
- [ ] Headlines: Space Grotesk, `tracking-tight`
- [ ] Body: Inter
- [ ] Font loading via `next/font`

### Components
- [ ] Icons: Outline 20-24px, neutral color, green only for success
- [ ] Motion: 150-200ms, subtle (opacity/2px translate)
- [ ] Accessibility: AA compliant, visible focus rings
- [ ] Images: Fixed width/height attributes

## 🚫 Forbidden Patterns

The following are automatically blocked by our brand-guard:
- `bg-{red|blue|yellow|purple|pink|amber|lime|emerald|teal|cyan|indigo|rose}`
- `text-{red|blue|yellow|purple|pink|amber|lime|emerald|teal|cyan|indigo|rose}`
- `shadow-{md|lg|xl|2xl|inner|black}`
- `backdrop-*`, `glow`, `neon`, `glassmorphism`
- `rounded-{2xl|3xl|full}` (except for specific use cases)
- Hex colors not in our palette
- Green backgrounds/CTAs

## 🛠️ Usage

### Import UI Components
```tsx
import { Button, Card } from '@voai/ui-v2/ui';
```

### Button Variants
```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="ghost">Secondary Action</Button>
<Button variant="link">Tertiary Action</Button>
```

### Card Component
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

## 🔧 Development

### Run Brand Guard
```bash
pnpm brand:guard
```

### Tailwind Configuration
All projects must use the shared preset:
```ts
import preset from "./tailwind.preset.circula";
export default {
  presets: [preset],
  // ...
}
```