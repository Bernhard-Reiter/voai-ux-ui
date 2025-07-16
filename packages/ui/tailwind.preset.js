/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Primary brand colors - Superhuman inspired cyan/teal
        primary: {
          50: '#e6ffff',
          100: '#b3ffff',
          200: '#80ffff',
          300: '#4dffff',
          400: '#1affff',
          500: '#00f0ff', // Main brand color
          600: '#00c0cc',
          700: '#009099',
          800: '#006066',
          900: '#003033',
        },
        // Neutral grays
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Background colors
        background: {
          DEFAULT: '#fdfdfd',
          secondary: '#f9fafb',
          tertiary: '#f3f4f6',
          inverse: '#030712',
        },
        // Success, warning, error states
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      spacing: {
        'xs': '0.25rem',  // 4px
        's': '0.5rem',    // 8px
        'm': '1rem',      // 16px
        'l': '1.5rem',    // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
        '4xl': '6rem',    // 96px
      },
      borderRadius: {
        'xs': '0.25rem',  // 4px
        'sm': '0.375rem', // 6px
        DEFAULT: '0.5rem', // 8px
        'md': '0.625rem', // 10px
        'lg': '0.75rem',  // 12px
        'xl': '1rem',     // 16px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
        'full': '9999px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.2' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],      // 60px
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'glow': '0 0 20px rgb(0 240 255 / 0.35)',
        'glow-lg': '0 0 40px rgb(0 240 255 / 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgb(0 240 255 / 0.35)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgb(0 240 255 / 0.35)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};