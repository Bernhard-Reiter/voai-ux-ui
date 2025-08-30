# CometForm - Cosmic Form Components

## Overview

CometForm provides a complete form solution with built-in validation using React Hook Form and Zod.

## Components

### CometInput & CometTextarea
Basic form inputs with cosmic styling:

```tsx
<CometInput 
  label="Email" 
  type="email" 
  placeholder="cosmic@example.com" 
/>

<CometTextarea 
  label="Message" 
  placeholder="Share your thoughts..." 
/>
```

### CometFormProvider
Form context provider with schema validation:

```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

<CometFormProvider 
  schema={schema} 
  onSubmit={(data) => console.log(data)}
>
  {/* Form fields */}
</CometFormProvider>
```

### CometFormField
Integrated form field with automatic error handling:

```tsx
<CometFormField
  name="email"
  label="Email"
  type="email"
  placeholder="Enter email"
  required
/>
```

## Features

- **TypeScript Support**: Full type inference from Zod schemas
- **Validation**: Built-in Zod schema validation
- **Error Handling**: Automatic error display
- **Accessibility**: ARIA attributes for screen readers
- **Styling**: Consistent cosmic design tokens

## Usage Example

```tsx
import { z } from 'zod';
import { 
  CometFormProvider, 
  CometFormField,
  WaypointBtn 
} from '@voai/ui';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
});

function LoginForm() {
  const handleSubmit = (data) => {
    // Handle login
  };

  return (
    <CometFormProvider
      schema={loginSchema}
      onSubmit={handleSubmit}
    >
      <CometFormField
        name="email"
        label="Email"
        type="email"
      />
      
      <CometFormField
        name="password"
        label="Password"
        type="password"
      />
      
      <WaypointBtn type="submit">
        Sign In
      </WaypointBtn>
    </CometFormProvider>
  );
}
```

## Validation Modes

- **onChange**: Validate on every change
- **onBlur**: Validate when field loses focus
- **onSubmit**: Validate only on form submission
- **all**: Validate on all events

```tsx
<CometFormProvider
  schema={schema}
  options={{ mode: 'onChange' }}
>
  {/* Fields validate as user types */}
</CometFormProvider>
```

## Custom Validation

Beyond Zod schemas, you can add custom validation:

```tsx
<CometFormField
  name="username"
  label="Username"
  rules={{
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username too short',
    },
    validate: async (value) => {
      const isAvailable = await checkUsername(value);
      return isAvailable || 'Username taken';
    },
  }}
/>
```