import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@voai/ui", "@voai/ui-v2", "@voai/branding", "@voai/shared"],
  experimental: {
    optimizePackageImports: ["@voai/ui", "@voai/ui-v2"],
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
  },
  // Force dynamic rendering to work with middleware
  output: 'standalone',
};

export default nextConfig;
