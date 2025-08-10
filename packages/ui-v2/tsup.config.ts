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
  // Also copy styles to dist
  onSuccess: "cp -r src/styles dist/ && cp src/styles.css dist/",
});