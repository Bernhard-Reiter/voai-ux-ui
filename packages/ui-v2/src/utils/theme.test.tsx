import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme, ThemeToggle } from './theme';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Reset document attributes
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
  });

  it('provides theme context to children', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: system')).toBeInTheDocument();
  });

  it('loads theme from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Theme: {theme}</div>;
    };

    render(
      <ThemeProvider storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-theme');
    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });

  it('applies theme to document', async () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return (
        <button onClick={() => setTheme('dark')}>Set Dark</button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(document.documentElement.style.colorScheme).toBe('dark');
    });
  });

  it('persists theme to localStorage', async () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return (
        <button onClick={() => setTheme('light')}>Set Light</button>
      );
    };

    render(
      <ThemeProvider storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Light'));

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-theme', 'light');
    });
  });

  it('resolves system theme based on media query', () => {
    // Mock matchMedia for dark mode
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const TestComponent = () => {
      const { resolvedTheme } = useTheme();
      return <div>Resolved: {resolvedTheme}</div>;
    };

    render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Resolved: dark')).toBeInTheDocument();
  });
});

describe('useTheme', () => {
  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const TestComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    consoleSpy.mockRestore();
  });

  it('provides complete theme context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('resolvedTheme');
    expect(result.current).toHaveProperty('setTheme');
    expect(typeof result.current.setTheme).toBe('function');
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders with current theme icon', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('cycles through themes on click', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return (
        <>
          <ThemeToggle />
          <div data-testid="theme-display">Theme: {theme}</div>
        </>
      );
    };

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    const display = screen.getByTestId('theme-display');
    
    // Initial: light
    expect(display).toHaveTextContent('Theme: light');
    
    // Click 1: light -> dark
    fireEvent.click(button);
    expect(display).toHaveTextContent('Theme: dark');
    
    // Click 2: dark -> system
    fireEvent.click(button);
    expect(display).toHaveTextContent('Theme: system');
    
    // Click 3: system -> light
    fireEvent.click(button);
    expect(display).toHaveTextContent('Theme: light');
  });

  it('has correct accessibility attributes', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme');
    expect(button).toHaveAttribute('title', 'Current: dark theme');
  });

  it('applies custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-toggle" />
      </ThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveClass('custom-toggle');
  });

  it('shows correct icon for system theme', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    // System theme shows a different icon than light/dark
    expect(button.querySelector('svg')).toBeInTheDocument();
    // The system icon has specific elements
    const svg = button.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});