// Google Analytics gtag event parameters
interface GtagEventParameters {
  page_path?: string;
  ui_variant?: string;
  ui_library?: string;
  timestamp?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  conversion_type?: string;
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  [key: string]: unknown;
}

// Google Analytics gtag config parameters
interface GtagConfigParameters {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  [key: string]: unknown;
}

// Google Analytics gtag function overloads
declare global {
  interface Window {
    gtag?: {
      (command: 'event', eventName: string, parameters?: GtagEventParameters): void;
      (command: 'config', targetId: string, parameters?: GtagConfigParameters): void;
      (command: 'set', parameters: Record<string, unknown>): void;
    };
  }
}

export {};