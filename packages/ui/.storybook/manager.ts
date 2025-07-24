import { addons } from 'storybook/internal/manager-api'
import { create } from 'storybook/internal/theming'

const theme = create({
  base: 'light',
  brandTitle: 'VOAI Design System',
  brandUrl: 'https://voai.com',
  brandImage: '/logo.png',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#0ea5e9',
  colorSecondary: '#0284c7',

  // UI
  appBg: '#f9fafb',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 8,

  // Text colors
  textColor: '#111827',
  textInverseColor: '#ffffff',
  textMutedColor: '#6b7280',

  // Toolbar default and active colors
  barTextColor: '#6b7280',
  barSelectedColor: '#0ea5e9',
  barHoverColor: '#0ea5e9',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e7eb',
  inputTextColor: '#111827',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"JetBrains Mono", Monaco, Consolas, "Courier New", monospace',
})

addons.setConfig({
  theme,
})
