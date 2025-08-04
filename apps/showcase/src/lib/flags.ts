export type Variant = 'A' | 'B';
export type UILibrary = 'classic' | 'cosmic';

// Server-side variant detection
export function getVariantServer(): Variant {
  // This function should only be called in server components
  // For now, return default variant
  return 'A';
}

// Client-side variant detection
export function getVariantClient(): Variant {
  if (typeof window === 'undefined') {
    console.warn('getVariantClient called on server side');
    return 'A';
  }
  
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('ui-variant='));
  
  const variant = cookie?.split('=')?.[1] as Variant | undefined;
  return variant ?? 'A';
}

// Universal variant detection
export function getVariant(reqHeaders?: Headers): Variant {
  if (typeof window !== 'undefined') {
    return getVariantClient();
  }
  
  if (reqHeaders) {
    const variant = reqHeaders.get('x-ui-variant') as Variant | null;
    return variant ?? 'A';
  }
  
  // Default to A for server-side
  return 'A';
}

// Map variant to UI library
export function getUILibrary(variant: Variant): UILibrary {
  return variant === 'B' ? 'cosmic' : 'classic';
}

// Feature flags based on variant
export function getFeatureFlags(variant: Variant) {
  const uiLibrary = getUILibrary(variant);
  
  return {
    variant,
    uiLibrary,
    // Feature-specific flags
    useCosmicAnimations: variant === 'B',
    useGradientBackgrounds: variant === 'B',
    useNebulaEffects: variant === 'B',
    useClassicMinimalism: variant === 'A',
    // Component availability
    hasPortalGate: variant === 'B',
    hasNebulaGrid: variant === 'B',
    hasThemeToggle: variant === 'B',
    // Analytics flags
    trackInteractions: true,
    trackPerformance: true,
  };
}

// Hook for client components
export function useVariant() {
  if (typeof window === 'undefined') {
    throw new Error('useVariant can only be used in client components');
  }
  
  const variant = getVariantClient();
  const flags = getFeatureFlags(variant);
  
  return {
    variant,
    ...flags,
  };
}