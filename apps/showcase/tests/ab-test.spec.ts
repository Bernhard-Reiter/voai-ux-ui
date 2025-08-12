import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const variants = ['circula'] as const;

test.describe('A/B Test Variants', () => {
  variants.forEach((variant) => {
    test.describe(`${variant} variant`, () => {
      test.beforeEach(async ({ page, context }) => {
        // Set variant cookie
        await context.addCookies([{ name: 'ui-variant', value: 'A', domain: 'localhost', path: '/' }] );
      });

      test('should load correct UI library', async ({ page }) => {
        await page.goto('/');
        
        // Check data attributes
        const uiProvider = page.locator('[data-ui-variant]');
        await expect(uiProvider).toHaveAttribute('data-ui-variant', 'A');
        await expect(uiProvider).toHaveAttribute('data-ui-library', 'circula');
        
        // Check for variant-specific elements
        // No Cosmic-specific assertions in Circula-only mode
      });

      test('should track analytics events with variant', async ({ page }) => {
        const analyticsRequests: any[] = [];
        
        // Intercept analytics requests
        page.on('request', (request) => {
          if (request.url().includes('/api/analytics')) {
            analyticsRequests.push(request.postDataJSON());
          }
        });
        
        await page.goto('/');
        await page.waitForTimeout(1000); // Wait for analytics to fire
        
        // Check that analytics includes variant info
        const pageViewEvent = analyticsRequests.find(r => r.event === 'page_view');
        expect(pageViewEvent).toBeDefined();
        expect(pageViewEvent.variant).toBe('A');
        expect(pageViewEvent.properties.uiLibrary).toBe('circula');
      });

      test('should maintain variant across navigation', async ({ page }) => {
        await page.goto('/');
        
        // Navigate to another page
        await page.click('a[href="/"]');
        await page.waitForURL('**/');
        
        // Check variant is maintained
        const uiProvider = page.locator('[data-ui-variant]');
        await expect(uiProvider).toHaveAttribute('data-ui-variant', variant === 'classic' ? 'A' : 'B');
      });

      test('should pass accessibility checks', async ({ page }) => {
        await page.goto('/');
        await injectAxe(page);
        
        // Check accessibility
        await checkA11y(page, undefined, {
          detailedReport: true,
          detailedReportOptions: {
            html: true,
          },
        });
      });

      test('should handle dynamic component loading', async ({ page }) => {
        await page.goto('/');
        
        // Wait for UI components to load
        await page.waitForSelector('[data-ui-variant]', { timeout: 10000 });
        
        // Test a button interaction
        const button = page.locator('button').first();
        await expect(button).toBeVisible();
        await button.click();
        
        // Verify no console errors
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        
        await page.waitForTimeout(500);
        expect(consoleErrors).toHaveLength(0);
      });

      test('should have correct performance metrics', async ({ page }) => {
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          };
        });
        
        // Performance thresholds
        expect(metrics.domContentLoaded).toBeLessThan(3000);
        expect(metrics.loadComplete).toBeLessThan(5000);
        if (metrics.firstContentfulPaint) {
          expect(metrics.firstContentfulPaint).toBeLessThan(2000);
        }
      });
    });
  });

  // Traffic split test removed in Circula-only mode
});