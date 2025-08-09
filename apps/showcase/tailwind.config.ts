import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@voai/ui/tailwind.preset")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui-v2/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/styles/*.css",
    "../../packages/ui-v2/src/styles/*.css",
  ],
};

export default config;