import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@voai/ui", "@voai/ui-v2"],
  experimental: {
    optimizePackageImports: ["@voai/ui", "@voai/ui-v2"],
  },
};

export default nextConfig;
