import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@voai/ui", "@voai/ui-v2", "@voai/branding", "@voai/shared"],
  experimental: {
    optimizePackageImports: ["@voai/ui", "@voai/ui-v2"],
    typedRoutes: true,
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'res.cloudinary.com',
      'cdn.yourdomain.com'
    ],
  },
  output: 'standalone',
  // Lint/Typecheck nicht im Build verstecken:
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
