import { test, expect } from '@chromatic-com/playwright'

test.describe('Showcase App', () => {
  test('should display homepage @critical', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('voai - AI-Powered Negotiation Platform')
    
    // Visual snapshot für Chromatic
    await expect(page).toHaveScreenshot('homepage.png')
  })

  test('should navigate to components page', async ({ page }) => {
    await page.goto('/')
    
    // Finde und klicke auf Components Link
    const componentsLink = page.locator('text=Components').first()
    if (await componentsLink.isVisible()) {
      await componentsLink.click()
      await expect(page).toHaveURL(/.*components/)
    }
  })

  test('should display proper styling', async ({ page }) => {
    await page.goto('/')
    
    // Prüfe ob Tailwind CSS geladen ist
    const body = page.locator('body')
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    )
    
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
  })
})