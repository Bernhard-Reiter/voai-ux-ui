import type { Config } from 'tailwindcss'
import tailwindPreset from '@voai/config/tailwind.preset.mjs'

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
