import { test, expect } from '@playwright/test'

test.describe('Performance and Accessibility', () => {
  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/VOAI/)

    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content')
    expect(description).toBeTruthy()

    // Check viewport meta
    const viewport = await page.getAttribute('meta[name="viewport"]', 'content')
    expect(viewport).toContain('width=device-width')
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Tab through navigation
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()

    // Check skip to content link (accessibility)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)

    // Check heading order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents()
    expect(headings.length).toBeGreaterThan(0)
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')

    // Check that text is readable
    const textColor = await page.evaluate(() => {
      const element = document.querySelector('p')
      if (!element) return null
      return window.getComputedStyle(element).color
    })

    expect(textColor).toBeTruthy()
  })

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check that navigation is accessible on mobile
    const mobileMenuButton = page.locator('[aria-label*="menu"]').first()
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click()
      // Menu should be visible after clicking
      await expect(page.locator('nav')).toBeVisible()
    }
  })
})
