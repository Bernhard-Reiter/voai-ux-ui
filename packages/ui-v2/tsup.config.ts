import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  // Bundle CSS with JS
  injectStyle: true,
  // Also copy styles to dist (cross-platform via Node)
  onSuccess: "node scripts/copy-styles.js",
});