# Testing Guide for @voai/ui

## Overview

This package uses Jest and React Testing Library for unit testing React components.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are colocated with their components:
- `Component.tsx` - Component implementation
- `Component.test.tsx` - Component tests
- `Component.stories.tsx` - Storybook stories

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Hello</MyComponent>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

it('handles click events', async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Testing Guidelines

1. **Test behavior, not implementation**: Focus on what users see and do
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`, `getByText`
3. **Test accessibility**: Ensure components work with screen readers
4. **Test edge cases**: Empty states, error states, loading states
5. **Keep tests simple**: One concept per test

## Current Coverage

We maintain a baseline test coverage of:
- Statements: 20%
- Branches: 15%
- Functions: 20%
- Lines: 20%

As we add more tests, we'll gradually increase these thresholds.

## Mocking

### Mocking CSS Modules
CSS imports are automatically mocked by Jest using `identity-obj-proxy`.

### Mocking Browser APIs
Common browser APIs are mocked in `jest.setup.ts`:
- `window.matchMedia`
- `IntersectionObserver`
- `ResizeObserver`

## Next Steps

1. Add tests for remaining components (WaypointBtn, OrbitNav, etc.)
2. Add integration tests for complex interactions
3. Add visual regression tests with Chromatic
4. Increase coverage thresholds to 70%+