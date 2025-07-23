# Storybook & Chromatic Setup

## 🎨 Übersicht

Storybook dient als interaktive Dokumentation und Entwicklungsumgebung für unsere UI-Komponenten. Chromatic ermöglicht automatische visuelle Regressionstests.

## 🚀 Lokale Entwicklung

### Storybook starten

```bash
# Im UI-Package
cd packages/ui
pnpm storybook

# Oder vom Root
pnpm --filter @voai/ui storybook
```

Storybook läuft dann unter: http://localhost:6006

### Story erstellen

1. Erstellen Sie eine `.stories.tsx` Datei neben der Komponente:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Control-Definitionen
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### Best Practices

1. **Naming**: `ComponentName.stories.tsx`
2. **Organisation**: Nach Atomic Design (Atoms/Molecules/Organisms)
3. **Dokumentation**: Nutzen Sie JSDoc und `parameters.docs`
4. **Varianten**: Zeigen Sie alle wichtigen Zustände
5. **Interaktivität**: Nutzen Sie Actions für Events

## 📸 Chromatic

### Setup

1. Projekt auf [chromatic.com](https://www.chromatic.com) erstellen
2. Project Token erhalten
3. Als GitHub Secret hinzufügen: `CHROMATIC_PROJECT_TOKEN`

### Manueller Upload

```bash
# Build und Upload
pnpm --filter @voai/ui chromatic
```

### Automatische Builds

Bei jedem PR werden automatisch:
- Storybook gebaut
- Screenshots erstellt
- Visuelle Änderungen erkannt
- PR mit Links kommentiert

### Visual Review Process

1. **Änderungen machen**: Komponente updaten
2. **PR erstellen**: Automatischer Chromatic Build
3. **Review**: Visuelle Änderungen in Chromatic prüfen
4. **Approve/Reject**: Änderungen akzeptieren oder ablehnen
5. **Merge**: Nach Approval mergen

## 🛠️ Konfiguration

### Storybook Config

- `.storybook/main.ts`: Hauptkonfiguration
- `.storybook/preview.tsx`: Globale Decorators und Parameter
- `.storybook/manager.ts`: UI-Theming

### Chromatic Config

- `chromatic.config.json`: Build-Optionen
- `.github/workflows/chromatic.yml`: CI/CD Integration

## 📚 Addons

Installierte Addons:

- **@storybook/addon-essentials**: Core Addons
- **@storybook/addon-a11y**: Accessibility Tests
- **@storybook/addon-interactions**: Interaction Tests
- **@chromatic-com/storybook**: Chromatic Integration

## 🎯 Tipps

### Performance

```tsx
// Lazy Loading für große Stories
export const HeavyComponent: Story = {
  render: () => {
    const Component = React.lazy(() => import('./HeavyComponent'));
    return (
      <React.Suspense fallback="Loading...">
        <Component />
      </React.Suspense>
    );
  },
};
```

### Dark Mode

```tsx
// Global Type für Theme Toggle
export default {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
  },
};
```

### Responsive Preview

```tsx
// Viewport Addon nutzen
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

## 🐛 Troubleshooting

### Build Fehler

```bash
# Cache löschen
rm -rf node_modules/.cache
pnpm build-storybook
```

### Chromatic Timeouts

```json
// chromatic.config.json
{
  "buildScriptName": "build-storybook",
  "exitOnceUploaded": true,
  "onlyChanged": true
}
```

### Story nicht sichtbar

- Prüfen Sie den Export (`export default meta`)
- Prüfen Sie den Dateipfad in `stories` Array
- Storybook neu starten

## 📖 Weiterführende Links

- [Storybook Docs](https://storybook.js.org/docs)
- [Chromatic Docs](https://www.chromatic.com/docs)
- [Addon Gallery](https://storybook.js.org/addons)