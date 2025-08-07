'use client';

import { useEffect, useState } from 'react';
import { getVariantClient, getUILibrary } from '@/lib/flags';

interface UIProviderProps {
  children: React.ReactNode;
  variant?: 'A' | 'B';
}

export function UIProvider({ children, variant: serverVariant }: UIProviderProps) {
  const [UIComponents, setUIComponents] = useState<typeof import('@voai/ui') | typeof import('@voai/ui-v2') | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVariant, setCurrentVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Get client-side variant
    const clientVariant = getVariantClient();
    const variantToUse = clientVariant;
    setCurrentVariant(variantToUse);
    
    const uiLibrary = getUILibrary(variantToUse);
    
    // Dynamically import the appropriate UI library
    const loadUI = async () => {
      try {
        let ui;
        if (uiLibrary === 'cosmic') {
          // Import Cosmic Guide (ui-v2)
          ui = await import('@voai/ui-v2');
        } else {
          // Import Classic (ui)
          ui = await import('@voai/ui');
        }
        
        setUIComponents(ui);
        
        // Log variant for analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'ab_test_variant_assigned', {
            variant: variantToUse,
            ui_library: uiLibrary,
            page_path: window.location.pathname,
          });
        }
      } catch (error) {
        console.error('Failed to load UI library:', error);
        // Fallback to classic UI
        const fallbackUI = await import('@voai/ui');
        setUIComponents(fallbackUI);
      } finally {
        setIsLoading(false);
      }
    };

    loadUI();
  }, [serverVariant]);

  // Show loading state while UI library loads
  if (isLoading || !UIComponents) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading experience...</div>
      </div>
    );
  }

  // Create a context provider if the UI library has one
  const { ThemeProvider } = UIComponents;
  
  if (ThemeProvider) {
    return (
      <ThemeProvider defaultTheme="system" variant={currentVariant}>
        <div data-ui-variant={currentVariant} data-ui-library={getUILibrary(currentVariant)}>
          {children}
        </div>
      </ThemeProvider>
    );
  }

  // If no ThemeProvider, just wrap with variant data
  return (
    <div data-ui-variant={currentVariant} data-ui-library={getUILibrary(currentVariant)}>
      {children}
    </div>
  );
}

// Export a hook to access UI components in child components
export function useUIComponents() {
  const [components, setComponents] = useState<typeof import('@voai/ui') | typeof import('@voai/ui-v2') | null>(null);
  const variant = getVariantClient();
  const uiLibrary = getUILibrary(variant);

  useEffect(() => {
    const loadComponents = async () => {
      if (uiLibrary === 'cosmic') {
        const ui = await import('@voai/ui-v2');
        setComponents(ui);
      } else {
        const ui = await import('@voai/ui');
        setComponents(ui);
      }
    };

    loadComponents();
  }, [uiLibrary]);

  return components;
}