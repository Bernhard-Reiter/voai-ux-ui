import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@voai/ui-v2/tailwind.preset")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    // Scanne UI-V2 auch aus dist, damit Utility-Klassen der Lib generiert werden
    "../../packages/ui-v2/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui-v2/dist/**/*.{js,mjs,jsx,tsx}",
    "./node_modules/@voai/ui-v2/dist/**/*.{js,mjs}",
    "../../packages/ui/src/styles/*.css",
    "../../packages/ui-v2/src/styles/*.css",
  ],
};

export default config;