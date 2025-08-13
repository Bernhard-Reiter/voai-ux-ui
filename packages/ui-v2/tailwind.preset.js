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
        // Circula: Monochrom + Grün nur für Success - using CSS variables
        bg: 'var(--c-bg, #000000)',
        fg: 'var(--c-foreground, #ffffff)',
        g1: 'var(--c-surface, #111111)',
        g2: '#222222',
        g3: '#444444',
        g4: '#666666',
        success: { DEFAULT: 'var(--c-success, #41a344)', light: '#e2f6e2', dark: '#2e7a32', fg: '#ffffff' },

        // Aliasse für shadcn-Kompatibilität (bricht keine Bestands-Components)
        background: 'var(--c-bg, #000000)',
        foreground: 'var(--c-foreground, #ffffff)',
        border: '#2d2d2d',
        muted: '#1a1a1a',
        'muted-foreground': 'var(--c-text-secondary, #9aa0a6)',
        primary: 'var(--c-accent, #ffffff)',
        'primary-foreground': '#000000',
        secondary: 'var(--c-surface, #111111)',
        'secondary-foreground': '#ffffff',
        accent: 'var(--c-accent, #111111)',
        'accent-foreground': '#ffffff',
        destructive: 'var(--c-error, #8b0000)',
        'destructive-foreground': '#ffffff',
        ring: 'var(--c-success, #41a344)'
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
  plugins: [],
}