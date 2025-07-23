import type { Config } from 'tailwindcss'

const config: Config = {
  presets: [require('@voai/config/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}'
  ],
}

export default config