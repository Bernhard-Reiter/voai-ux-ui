import type { Config } from 'tailwindcss'
import voaiTokens from '../../external/voai-ui/packages/ui/tailwind/voai-tokens-plugin.js'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [voaiTokens],
}

export default config