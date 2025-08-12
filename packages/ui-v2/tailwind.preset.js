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
        // Circula: monochrom + Grün NUR für Success
        bg: '#000000',
        fg: '#ffffff',
        g1: '#111111',
        g2: '#222222',
        g3: '#444444',
        g4: '#666666',
        success: { DEFAULT: '#41a344', light: '#e2f6e2', dark: '#2e7a32', fg: '#ffffff' }
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' }
    },
  },
  plugins: [],
}