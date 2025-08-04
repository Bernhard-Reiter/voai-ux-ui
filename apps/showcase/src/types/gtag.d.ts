declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      ...args: any[]
    ) => void;
  }
}

export {};