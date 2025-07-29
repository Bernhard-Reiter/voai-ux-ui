import type { Config } from 'tailwindcss'

const tailwindPreset = require('@voai/config/tailwind.preset')

const config: Config = {
  presets: [tailwindPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}
export default config
