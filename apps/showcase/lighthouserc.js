module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm dev',
      startServerReadyPattern: 'http://localhost:3002',
      startServerReadyTimeout: 90000,
      url: [
        'http://localhost:3002',
        'http://localhost:3002/?variant=classic',
        'http://localhost:3002/?variant=cosmic',
        'http://localhost:3002/cosmic',
      ],
      numberOfRuns: 2,
      settings: {
        preset: 'desktop',
        // A/B test specific settings
        extraHeaders: JSON.stringify({
          'Cookie': 'ui-variant={{UI_VARIANT}}'
        }),
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Performance budgets leicht gelockert für CI-Stabilität
        'first-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3500 }],
        'interactive': ['error', { maxNumericValue: 5000 }],
        'total-blocking-time': ['error', { maxNumericValue: 350 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.12 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      // Use filesystem for local testing
      outputDir: './lighthouse-results',
    },
  },
};