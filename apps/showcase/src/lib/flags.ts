export type UILibrary = 'circula';

// Get UI library - always returns circula now
export function getUILibrary(): UILibrary { 
  return 'circula'; 
}

// Feature flags - simplified without A/B testing
export function getFeatureFlags() {
  const uiLibrary = getUILibrary();
  
  return {
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
  
  const flags = getFeatureFlags();
  
  return {
    ...flags,
  };
}