import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        brand: {
          DEFAULT: 'var(--brand)',
          50:'var(--brand-50)',100:'var(--brand-100)',200:'var(--brand-200)',
          300:'var(--brand-300)',400:'var(--brand-400)',500:'var(--brand-500)',
          600:'var(--brand-600)',700:'var(--brand-700)',800:'var(--brand-800)',900:'var(--brand-900)',
        },
      },
      borderRadius: { md:'12px', lg:'16px', xl:'24px' },
      boxShadow: { card: '0 6px 18px rgba(0,0,0,.08)' }
    }
  },
  plugins: []
} satisfies Config