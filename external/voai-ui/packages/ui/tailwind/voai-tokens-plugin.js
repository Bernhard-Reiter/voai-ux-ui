const plugin = require('tailwindcss/plugin')
const path = require('path')

// Load tokens from the build directory
const tokensPath = path.resolve(__dirname, '../../tokens/build/tokens.json')
const tokens = require(tokensPath)

// Convert token structure to Tailwind config
function tokensToTailwind(tokens) {
  const config = {
    colors: {},
    spacing: {},
    borderRadius: {},
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
    boxShadow: {},
    animation: {},
    keyframes: {},
  }

  // Process color tokens
  if (tokens.color) {
    Object.entries(tokens.color).forEach(([key, value]) => {
      if (typeof value === 'object' && value.value) {
        if (typeof value.value === 'object') {
          // Handle color scales
          config.colors[key] = {}
          Object.entries(value.value).forEach(([shade, colorValue]) => {
            if (colorValue && colorValue.value) {
              config.colors[key][shade] = colorValue.value
            }
          })
        } else {
          config.colors[key] = value.value
        }
      }
    })
  }

  // Process spacing tokens
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      if (value && value.value) {
        config.spacing[key] = value.value
      }
    })
  }

  // Process border radius tokens
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, value]) => {
      if (value && value.value) {
        config.borderRadius[key] = value.value
      }
    })
  }

  // Process typography tokens
  if (tokens.typography) {
    if (tokens.typography.fontFamily) {
      Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
        if (value && value.value) {
          config.fontFamily[key] = value.value.split(',').map(f => f.trim())
        }
      })
    }
    if (tokens.typography.fontSize) {
      Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
        if (value && value.value) {
          config.fontSize[key] = value.value
        }
      })
    }
    if (tokens.typography.fontWeight) {
      Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
        if (value && value.value) {
          config.fontWeight[key] = value.value
        }
      })
    }
    if (tokens.typography.lineHeight) {
      Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
        if (value && value.value) {
          config.lineHeight[key] = value.value
        }
      })
    }
  }

  // Process elevation tokens
  if (tokens.elevation) {
    Object.entries(tokens.elevation).forEach(([key, value]) => {
      if (value && value.value) {
        config.boxShadow[key] = value.value
      }
    })
  }

  // Process motion tokens
  if (tokens.motion) {
    if (tokens.motion.duration) {
      Object.entries(tokens.motion.duration).forEach(([key, value]) => {
        if (value && value.value) {
          const animationName = `voai-${key}`
          config.animation[animationName] = `${animationName} ${value.value} ease-in-out`
        }
      })
    }
  }

  return config
}

module.exports = plugin(function({ addBase, theme }) {
  // Add CSS custom properties
  addBase({
    ':root': {
      '--voai-primary': theme('colors.primary.500'),
      '--voai-secondary': theme('colors.secondary.500'),
      '--voai-success': theme('colors.success.500'),
      '--voai-warning': theme('colors.warning.500'),
      '--voai-error': theme('colors.error.500'),
    }
  })
}, {
  theme: {
    extend: tokensToTailwind(tokens)
  }
})