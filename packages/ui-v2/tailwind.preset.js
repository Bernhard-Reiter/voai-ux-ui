/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Circula: Monochrom + Grün nur für Success
        bg: '#000000',
        fg: '#ffffff',
        g1: '#111111',
        g2: '#222222',
        g3: '#444444',
        g4: '#666666',
        success: { DEFAULT: '#41a344', light: '#e2f6e2', dark: '#2e7a32', fg: '#ffffff' },

        // Aliasse für shadcn-Kompatibilität (bricht keine Bestands-Components)
        background: '#000000',
        foreground: '#ffffff',
        border: '#2d2d2d',
        muted: '#1a1a1a',
        'muted-foreground': '#9aa0a6',
        primary: '#ffffff',
        'primary-foreground': '#000000',
        secondary: '#111111',
        'secondary-foreground': '#ffffff',
        accent: '#111111',
        'accent-foreground': '#ffffff',
        destructive: '#8b0000',
        'destructive-foreground': '#ffffff',
        ring: '#41a344'
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
  plugins: [],
}