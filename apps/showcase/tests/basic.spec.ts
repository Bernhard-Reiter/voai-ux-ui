import { test, expect } from '@playwright/test';

test.describe('Basic Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VOAI|Circula/);
  });

  test('should have proper CSS loaded', async ({ page }) => {
    await page.goto('/');
    
    // Check if any CSS variables are loaded
    const hasCSS = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--background') !== '' || 
             styles.getPropertyValue('--circula-white') !== '';
    });
    
    expect(hasCSS).toBe(true);
  });

  test('should render without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
  });
});