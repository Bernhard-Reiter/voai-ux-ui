declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    Sentry?: {
      captureException: (error: Error) => void;
      captureMessage: (message: string) => void;
      setContext: (name: string, context: any) => void;
    };
  }
}

export {};