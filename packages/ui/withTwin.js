const path = require('path')

// The folders containing your components
const componentsFolder = path.resolve(__dirname, 'src')

module.exports = function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options
      
      config.module = config.module || {}
      config.module.rules = config.module.rules || []
      
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: [componentsFolder],
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: dev,
              presets: [
                ['@babel/preset-react', {
                  runtime: 'automatic',
                  importSource: '@emotion/react',
                }],
                '@babel/preset-typescript',
              ],
              plugins: [
                require.resolve('babel-plugin-macros'),
                require.resolve('@emotion/babel-plugin'),
              ],
            },
          },
        ],
      })

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      } else {
        return config
      }
    },
  }
}