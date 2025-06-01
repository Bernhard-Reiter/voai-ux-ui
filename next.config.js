/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  headers: async () => {
    return []
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 