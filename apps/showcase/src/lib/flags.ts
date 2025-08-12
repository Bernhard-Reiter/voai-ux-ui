export type Variant = 'A' | 'B';
export type UILibrary = 'circula';

// Server-side variant detection
export function getVariantServer(): Variant {
  // Check environment variable first
  const envVariant = process.env.UI_VARIANT as Variant | undefined;
  if (envVariant === 'A' || envVariant === 'B') {
    return envVariant;
  }
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
  
  return 'A';
}

// Map variant to UI library
export function getUILibrary(_variant: Variant): UILibrary { return 'circula'; }

// Feature flags based on variant
export function getFeatureFlags(variant: Variant) {
  const uiLibrary = getUILibrary(variant);
  
  return {
    variant,
    uiLibrary,
    // Feature-specific flags
    useCosmicAnimations: false,
    useGradientBackgrounds: false,
    useNebulaEffects: false,
    useClassicMinimalism: true,
    // Component availability
    hasPortalGate: false,
    hasNebulaGrid: false,
    hasThemeToggle: false,
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
    ...flags,
  };
}