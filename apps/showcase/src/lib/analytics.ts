import { getVariant, getUILibrary, type Variant } from './flags';

// Analytics event types
export type AnalyticsEvent = {
  event: string;
  properties?: Record<string, any>;
  variant?: Variant;
  uiLibrary?: string;
};

// Track page views with variant info
export function trackPageView(path: string) {
  const variant = typeof window !== 'undefined' ? getVariant() : 'A';
  const uiLibrary = getUILibrary(variant);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      ui_variant: variant,
      ui_library: uiLibrary,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Also send to custom analytics endpoint if available
  sendAnalyticsEvent({
    event: 'page_view',
    properties: {
      path,
      variant,
      uiLibrary,
    },
  });
}

// Track user interactions
export function trackInteraction(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  const variant = typeof window !== 'undefined' ? getVariant() : 'A';
  const uiLibrary = getUILibrary(variant);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ui_variant: variant,
      ui_library: uiLibrary,
    });
  }
  
  sendAnalyticsEvent({
    event: 'interaction',
    properties: {
      action,
      category,
      label,
      value,
      variant,
      uiLibrary,
    },
  });
}

// Track conversions (e.g., contact created)
export function trackConversion(conversionType: string, metadata?: Record<string, any>) {
  const variant = typeof window !== 'undefined' ? getVariant() : 'A';
  const uiLibrary = getUILibrary(variant);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      conversion_type: conversionType,
      ui_variant: variant,
      ui_library: uiLibrary,
      ...metadata,
    });
  }
  
  sendAnalyticsEvent({
    event: 'conversion',
    properties: {
      type: conversionType,
      variant,
      uiLibrary,
      ...metadata,
    },
  });
}

// Track performance metrics
export function trackPerformance(metrics: {
  metric: string;
  value: number;
  unit?: string;
}) {
  const variant = typeof window !== 'undefined' ? getVariant() : 'A';
  const uiLibrary = getUILibrary(variant);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance', {
      metric_name: metrics.metric,
      metric_value: metrics.value,
      metric_unit: metrics.unit,
      ui_variant: variant,
      ui_library: uiLibrary,
    });
  }
  
  sendAnalyticsEvent({
    event: 'performance',
    properties: {
      ...metrics,
      variant,
      uiLibrary,
    },
  });
}

// Send events to custom analytics endpoint
async function sendAnalyticsEvent(event: AnalyticsEvent) {
  // Skip if not in browser or in development
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
    return;
  }
  
  try {
    // Send to your analytics endpoint
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }),
    });
    
    if (!response.ok) {
      console.error('[Analytics] Failed to send event:', response.statusText);
    }
  } catch (error) {
    console.error('[Analytics] Error sending event:', error);
  }
}

// Get or create session ID
function getSessionId(): string {
  const SESSION_KEY = 'voai_session_id';
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

// Analytics hook for React components
export function useAnalytics() {
  return {
    trackPageView,
    trackInteraction,
    trackConversion,
    trackPerformance,
    variant: typeof window !== 'undefined' ? getVariant() : 'A',
    uiLibrary: typeof window !== 'undefined' ? getUILibrary(getVariant()) : 'classic',
  };
}

// Re-export the classic analytics hook if it exists
export { useAnalytics as useAnalyticsClassic } from '@voai/ui/hooks/useAnalytics';