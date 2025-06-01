declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    Sentry?: {
      captureException: (error: Error, context?: any) => void
    }
  }
}

export {}
