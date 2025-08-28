import { test, expect } from '@playwright/test'

test.describe('CSS & UI smoke tests', () => {
  test('CSS variables and UI rendering', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', m => m.type() === 'error' && consoleErrors.push(m.text()))
    
    // Navigate to the app
    await page.goto(process.env.BASE_URL || 'http://localhost:3002')
    
    // Check if CSS custom properties are loaded
    const bgColor = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--circula-white')
    )
    expect(bgColor.trim().length).toBeGreaterThan(0)
    
    // Check if primary elements are visible
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible({ timeout: 10000 })
    
    // Check button styling (Circula design should have black buttons)
    const button = page.getByRole('button').first()
    if (await button.count() > 0) {
      await expect(button).toBeVisible()
      const buttonBg = await button.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      )
      expect(buttonBg).toBeTruthy()
    }
    
    // Verify no console errors
    expect(consoleErrors).toEqual([])
  })

  test('Circula design system loads correctly', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3002')
    
    // Check for Circula-specific CSS variables
    const circulaVars = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement)
      return {
        black: style.getPropertyValue('--circula-black'),
        white: style.getPropertyValue('--circula-white'),
        green: style.getPropertyValue('--circula-success'),
      }
    })
    
    // All Circula variables should be defined
    expect(circulaVars.black.trim()).toBeTruthy()
    expect(circulaVars.white.trim()).toBeTruthy()
    expect(circulaVars.green.trim()).toBeTruthy()
    
    // Check that green is used for success states
    const successElement = page.locator('[class*="success"], [class*="check"]').first()
    if (await successElement.count() > 0) {
      const color = await successElement.evaluate(el => 
        window.getComputedStyle(el).color
      )
      // Green color should be present in success elements
      expect(color).toContain('65, 163, 68') // RGB values for #41a344
    }
  })
})