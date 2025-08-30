import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "#16A34A",
        muted: "var(--muted)",
        border: {
          subtle: "var(--line)",
        },
        gray: {
          50: "var(--gray-50)", 
          100: "var(--gray-100)", 
          200: "var(--gray-200)",
          300: "var(--gray-300)", 
          400: "var(--gray-400)", 
          500: "var(--gray-500)",
          600: "var(--gray-600)", 
          700: "var(--gray-700)", 
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius-lg)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        none: "var(--shadow-none)",
        sm: "var(--shadow-sm)",
      },
      fontFamily: {
        display: "var(--font-display, 'Space Grotesk')",
        sans: "var(--font-sans, 'Inter')",
      },
      container: {
        center: true,
        screens: { "2xl": "var(--container-max)" },
      },
    },
  },
};

export default preset;