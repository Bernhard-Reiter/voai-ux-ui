import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@voai/ui-v2/tailwind.preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@voai/ui-v2/**/*.{js,ts,jsx,tsx,mjs}",
  ],
};

export default config;