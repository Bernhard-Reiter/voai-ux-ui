import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".vercel/**",
      "next-env.d.ts",
      "voai-next/next-env.d.ts",
      // Deployment scripts
      "check-duplicate-env.js",
      "cleanup-vercel-env.js",
      "consolidate-env-vars.js",
      "deploy-api.js",
      "deploy-fixed-install.js",
      "deploy-now.js",
      "deploy-vercel-api.js",
      "deploy.js",
      "fix-deployment.js",
      "force-no-cache-deploy.js",
      "setup-supabase-env.js",
      "setup-vercel-env.js",
      "trigger-vercel-deploy.js",
      // Test files that need fixing separately
      "tests/unit/core.bridge.test.ts",
      // Build output in subdirectory
      "voai-next/.next/**"
    ],
  },
];

export default eslintConfig;
