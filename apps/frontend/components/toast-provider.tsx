'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      theme={theme as 'light' | 'dark'}
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 5000,
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        },
      }}
    />
  )
}
