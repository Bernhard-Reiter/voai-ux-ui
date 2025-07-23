# VOAI UI Komponenten-Suite

## 📚 Übersicht

Die VOAI UI-Bibliothek bietet eine umfassende Sammlung von React-Komponenten, die nach dem Atomic Design Pattern organisiert sind.

## 🎨 Komponenten-Struktur

### Atoms (Grundbausteine)

#### Button
```tsx
import { Button } from '@voai/ui'

<Button variant="default">Click me</Button>
```
- Varianten: default, destructive, outline, secondary, ghost, link, gradient
- Größen: default, sm, lg, icon
- Vollständig keyboard-accessible

#### Badge
```tsx
import { Badge } from '@voai/ui'

<Badge variant="success">Aktiv</Badge>
```
- Varianten: default, secondary, destructive, outline, success, warning, info
- Perfekt für Status-Anzeigen

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@voai/ui'

<Card>
  <CardHeader>
    <CardTitle>Titel</CardTitle>
  </CardHeader>
  <CardContent>Inhalt</CardContent>
</Card>
```
- Flexible Container-Komponente
- Mit Header, Content und Footer

#### Spinner
```tsx
import { Spinner } from '@voai/ui'

<Spinner size="md" />
```
- Größen: sm, md, lg
- Animierte Lade-Anzeige

#### Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@voai/ui'

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Hilfetext</TooltipContent>
</Tooltip>
```
- Positionierung: top, right, bottom, left
- Mit Verzögerung konfigurierbar

### Molecules (Zusammengesetzte Komponenten)

#### Modal/Dialog
```tsx
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@voai/ui'

<Modal>
  <ModalTrigger>Öffnen</ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Titel</ModalTitle>
    </ModalHeader>
    {/* Inhalt */}
  </ModalContent>
</Modal>
```
- Vollständig accessible
- Mit Backdrop und ESC-Unterstützung

#### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@voai/ui'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Inhalt 1</TabsContent>
  <TabsContent value="tab2">Inhalt 2</TabsContent>
</Tabs>
```
- Kontrolliert oder unkontrolliert nutzbar
- Keyboard-Navigation

### Organisms (Komplexe Komponenten)

#### Sidebar
```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from '@voai/ui'

<Sidebar collapsible>
  <SidebarHeader>Logo</SidebarHeader>
  <SidebarContent>
    <SidebarItem icon={<Home />} active>
      Dashboard
    </SidebarItem>
  </SidebarContent>
</Sidebar>
```
- Kollabierbar
- Mobile-responsive
- Mit Gruppen und Footer

#### DataTable
```tsx
import { DataTable } from '@voai/ui'

<DataTable
  columns={columns}
  data={data}
  pageSize={10}
/>
```
- Sortierung und Filterung
- Pagination
- Row Selection
- Voll typisiert mit TypeScript

## 🎯 Design Tokens

Alle Komponenten nutzen die zentralen Design Tokens:

- **Farben**: Primär, Sekundär, Semantisch
- **Abstände**: xs, sm, md, lg, xl
- **Schatten**: sm, md, lg
- **Border Radius**: sm, md, lg, full

## 💡 Best Practices

### 1. Komposition
```tsx
// Gut: Komponenten komponieren
<Card>
  <CardHeader>
    <CardTitle>Titel</CardTitle>
    <Badge>Neu</Badge>
  </CardHeader>
  <CardContent>
    <Button>Aktion</Button>
  </CardContent>
</Card>
```

### 2. Varianten nutzen
```tsx
// Nutzen Sie semantische Varianten
<Badge variant="success">Erfolgreich</Badge>
<Badge variant="warning">Warnung</Badge>
<Badge variant="destructive">Fehler</Badge>
```

### 3. Accessibility
```tsx
// Immer Labels und ARIA-Attribute verwenden
<Tooltip>
  <TooltipTrigger asChild>
    <button aria-label="Weitere Informationen">
      <Info />
    </button>
  </TooltipTrigger>
  <TooltipContent>Hilfetext</TooltipContent>
</Tooltip>
```

## 🚀 TypeScript Support

Alle Komponenten sind vollständig typisiert:

```tsx
import type { ButtonProps } from '@voai/ui'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 📖 Weiterführende Ressourcen

- [Storybook](http://localhost:6006) - Interaktive Komponenten-Dokumentation
- [Design Tokens](../external/voai-ui/packages/tokens/README.md) - Token-Dokumentation
- [Contributing](../../CONTRIBUTING.md) - Beitragen zur Bibliothek