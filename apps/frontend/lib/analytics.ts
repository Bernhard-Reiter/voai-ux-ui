import { canUseAnalytics } from './gdpr'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID && canUseAnalytics()) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag && canUseAnalytics()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for VOAI
export const trackNegotiationStart = () => {
  event({
    action: 'negotiation_start',
    category: 'engagement',
  })
}

export const trackFileUpload = (fileType: string, fileSize: number) => {
  event({
    action: 'file_upload',
    category: 'engagement',
    label: fileType,
    value: Math.round(fileSize / 1024), // KB
  })
}

export const trackNegotiationComplete = (savings: number) => {
  event({
    action: 'negotiation_complete',
    category: 'conversion',
    value: Math.round(savings),
  })
}

export const trackError = (error: string, fatal: boolean = false) => {
  event({
    action: 'error',
    category: fatal ? 'fatal_error' : 'error',
    label: error,
  })
}
