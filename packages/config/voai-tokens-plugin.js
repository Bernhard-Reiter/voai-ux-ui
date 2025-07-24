const plugin = require('tailwindcss/plugin')

// Simple plugin to add VOAI brand utilities
module.exports = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.voai-gradient': {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-foreground) 100%)',
    },
    '.voai-shadow': {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
  }

  addUtilities(newUtilities)
})
