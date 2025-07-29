/// <reference types="@sentry/nextjs" />

declare global {
  interface Window {
    Sentry?: typeof import('@sentry/nextjs')
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        page_path?: string
        event_category?: string
        event_label?: string
        value?: number
        [key: string]: any
      }
    ) => void
    dataLayer?: any[]
  }
}

export {}
