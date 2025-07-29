import type { Config } from 'tailwindcss'
// @ts-ignore - Preset is a valid JavaScript module
import tailwindPreset from '@voai/config/tailwind.preset'

const config: Config = {
  presets: [tailwindPreset as any],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}
export default config
