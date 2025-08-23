'use client';

import { useEffect, useState } from 'react';
import { getUILibrary } from '@/lib/flags';

interface UIProviderProps {
  children: React.ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [UIComponents, setUIComponents] = useState<typeof import('@voai/ui-v2') | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uiLibrary = getUILibrary();
    
    // Dynamically import the appropriate UI library
    const loadUI = async () => {
      try {
        const ui = await import('@voai/ui-v2');
        setUIComponents(ui);
      } catch (error) {
        console.error('Failed to load UI library:', error);
        console.error('UI Library:', uiLibrary);
      } finally {
        setIsLoading(false);
      }
    };

    loadUI();
  }, []);

  // Show loading state while UI library loads
  if (isLoading || !UIComponents) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading experience...</div>
      </div>
    );
  }

  // Create a context provider if the UI library has one
  const ThemeProvider = UIComponents && 'ThemeProvider' in UIComponents 
    ? (UIComponents as { ThemeProvider?: React.ComponentType<{ defaultTheme?: string; children: React.ReactNode }> }).ThemeProvider
    : undefined;
  
  if (ThemeProvider) {
    return (
      <ThemeProvider defaultTheme="system">
        <div data-ui-library={getUILibrary()}>
          {children}
        </div>
      </ThemeProvider>
    );
  }

  // If no ThemeProvider, just wrap with library data
  return (
    <div data-ui-library={getUILibrary()}>
      {children}
    </div>
  );
}

// Export a hook to access UI components in child components
export function useUIComponents() {
  const [components, setComponents] = useState<typeof import('@voai/ui-v2') | null>(null);
  const uiLibrary = getUILibrary();

  useEffect(() => {
    const loadComponents = async () => {
      const ui = await import('@voai/ui-v2');
      setComponents(ui);
    };

    loadComponents();
  }, [uiLibrary]);

  return components;
}