module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm dev',
      startServerReadyPattern: 'ready on',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/?variant=classic',
        'http://localhost:3000/?variant=cosmic',
        'http://localhost:3000/cosmic',
      ],
      numberOfRuns: 3,
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
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Performance budgets
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 4000 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      // Use filesystem for local testing
      outputDir: './lighthouse-results',
    },
  },
};