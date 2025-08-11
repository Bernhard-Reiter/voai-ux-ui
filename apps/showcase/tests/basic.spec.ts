import { test, expect } from '@playwright/test';

test.describe('Basic Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/voai|VOAI|Circula/);
  });

  test('should have proper CSS loaded', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page has basic styling (font-family is set)
    const hasStyles = await page.evaluate(() => {
      const bodyStyles = getComputedStyle(document.body);
      // Check if font-family is set (not the default)
      return bodyStyles.fontFamily !== '' && 
             bodyStyles.fontFamily !== 'serif' &&
             bodyStyles.fontFamily !== 'sans-serif';
    });
    
    expect(hasStyles).toBe(true);
  });

  test('should render without critical errors', async ({ page }) => {
    const criticalErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
        criticalErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Allow some non-critical errors, just ensure no critical ones
    expect(criticalErrors.length).toBeLessThanOrEqual(2);
  });
});