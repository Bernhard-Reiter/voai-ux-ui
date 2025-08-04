import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const variants = ['classic', 'cosmic'] as const;

test.describe('A/B Test Variants', () => {
  variants.forEach((variant) => {
    test.describe(`${variant} variant`, () => {
      test.beforeEach(async ({ page, context }) => {
        // Set variant cookie
        await context.addCookies([
          {
            name: 'ui-variant',
            value: variant === 'classic' ? 'A' : 'B',
            domain: 'localhost',
            path: '/',
          },
        ]);
      });

      test('should load correct UI library', async ({ page }) => {
        await page.goto('/');
        
        // Check data attributes
        const uiProvider = page.locator('[data-ui-variant]');
        await expect(uiProvider).toHaveAttribute('data-ui-variant', variant === 'classic' ? 'A' : 'B');
        await expect(uiProvider).toHaveAttribute('data-ui-library', variant);
        
        // Check for variant-specific elements
        if (variant === 'cosmic') {
          // Look for Cosmic-specific components
          const cosmicElements = page.locator('.cosmic-gradient, .nebula-effect, .portal-gate');
          await expect(cosmicElements.first()).toBeVisible({ timeout: 10000 });
        }
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
        expect(pageViewEvent.variant).toBe(variant === 'classic' ? 'A' : 'B');
        expect(pageViewEvent.properties.uiLibrary).toBe(variant);
      });

      test('should maintain variant across navigation', async ({ page }) => {
        await page.goto('/');
        
        // Navigate to another page
        await page.click('a[href="/cosmic"]');
        await page.waitForURL('**/cosmic');
        
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

  test('should split traffic 50/50', async ({ context }) => {
    const results = { A: 0, B: 0 };
    const iterations = 100;
    
    for (let i = 0; i < iterations; i++) {
      // Clear cookies for fresh assignment
      await context.clearCookies();
      
      const page = await context.newPage();
      await page.goto('/');
      
      // Get assigned variant
      const cookies = await context.cookies();
      const variantCookie = cookies.find(c => c.name === 'ui-variant');
      
      if (variantCookie?.value === 'A') {
        results.A++;
      } else if (variantCookie?.value === 'B') {
        results.B++;
      }
      
      await page.close();
    }
    
    // Check distribution is roughly 50/50 (allowing 20% deviation)
    const expectedCount = iterations / 2;
    expect(results.A).toBeGreaterThan(expectedCount * 0.3);
    expect(results.A).toBeLessThan(expectedCount * 1.7);
    expect(results.B).toBeGreaterThan(expectedCount * 0.3);
    expect(results.B).toBeLessThan(expectedCount * 1.7);
  });
});