# Twin.macro UI Patterns

Dieses Dokument zeigt Best Practices und Patterns für die Verwendung von Twin.macro in der VOAI UI-Bibliothek.

## Grundlagen

### JSX Pragma
Alle Twin.macro Komponenten müssen mit dem Emotion JSX Pragma beginnen:

```tsx
/** @jsxImportSource @emotion/react */
```

### Imports
```tsx
import tw, { styled, css, theme } from 'twin.macro'
import * as React from 'react'
```

## Styling Patterns

### Base Styles mit Twin
```tsx
const baseStyles = tw`
  inline-flex items-center justify-center
  font-medium transition-all duration-200
  rounded-lg
  focus:outline-none focus:ring-2 focus:ring-offset-2
`
```

### Varianten mit CSS
```tsx
const variantStyles = {
  primary: css`
    ${tw`bg-primary-500 text-white`}
    ${tw`hover:bg-primary-600 active:bg-primary-700`}
    
    &:focus {
      ${tw`ring-primary-500`}
    }
  `,
}
```

### Styled Components
```tsx
const StyledButton = styled.button<ButtonProps>`
  ${baseStyles}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ fullWidth }) => fullWidth && tw`w-full`}
`
```

## Responsive Design

### Responsive Utilities
```tsx
// Mobile-first approach
css={[
  tw`w-full`,
  tw`sm:w-auto`,
  tw`lg:w-1/2`,
]}
```

### Breakpoint-basierte Styles
```tsx
const ResponsiveCard = styled.div`
  ${tw`p-4 sm:p-6 lg:p-8`}
  ${tw`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}
`
```

## Dynamische Styles

### Props-basierte Styles
```tsx
const DynamicBox = styled.div<{ color?: string }>`
  ${tw`p-4 rounded`}
  background-color: ${({ color = '#fff' }) => color};
`
```

### Conditional Styling
```tsx
const ConditionalButton = styled.button<{ isActive?: boolean }>`
  ${tw`px-4 py-2`}
  ${({ isActive }) => isActive 
    ? tw`bg-blue-500 text-white` 
    : tw`bg-gray-200 text-gray-700`
  }
`
```

## Animations

### Twin Animations
```tsx
const AnimatedCard = styled.div`
  ${tw`transform transition-all duration-300`}
  ${tw`hover:scale-105 hover:shadow-xl`}
  ${tw`active:scale-95`}
`
```

### Keyframe Animations
```tsx
const spinAnimation = css`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  animation: spin 1s linear infinite;
`

const Spinner = styled.div`
  ${tw`w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full`}
  ${spinAnimation}
`
```

## Complex Components

### Compound Components
```tsx
export const Card = styled.div`
  ${tw`bg-white rounded-lg shadow-md`}
`

export const CardHeader = styled.div`
  ${tw`px-6 py-4 border-b border-gray-200`}
`

export const CardBody = styled.div`
  ${tw`px-6 py-4`}
`
```

### Komposition
```tsx
<Card>
  <CardHeader>
    <h3 tw="text-lg font-semibold">Title</h3>
  </CardHeader>
  <CardBody>
    <p tw="text-gray-600">Content</p>
  </CardBody>
</Card>
```

## Best Practices

1. **Verwende tw für statische Styles**
   ```tsx
   tw`text-gray-900 font-medium`
   ```

2. **Verwende css für komplexe oder dynamische Styles**
   ```tsx
   css`
     ${tw`base-styles`}
     custom-property: ${props => props.value};
   `
   ```

3. **Inline tw für kleine Anpassungen**
   ```tsx
   <div tw="mt-4 text-center">Content</div>
   ```

4. **Theme-Zugriff**
   ```tsx
   css`
     color: ${theme`colors.primary.500`};
     padding: ${theme`spacing.4`};
   `
   ```

## TypeScript Integration

### Props Typisierung
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const Button = styled.button<ButtonProps>`
  // styles
`
```

### CSS Prop Typisierung
```tsx
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation
    tw?: string
  }
}
```