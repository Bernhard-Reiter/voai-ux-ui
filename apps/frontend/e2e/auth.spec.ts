import { test, expect } from '@playwright/test'

test.describe('Authentication Flows', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')

    // Check page title
    await expect(page.locator('h2')).toContainText('Anmelden bei VOAI')

    // Check Google login button
    const googleButton = page.locator('button:has-text("Mit Google anmelden")')
    await expect(googleButton).toBeVisible()
  })

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Try to access protected route
    await page.goto('/home')

    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })

  test('should handle OAuth callback', async ({ page }) => {
    // Mock OAuth callback
    await page.goto('/auth/callback?code=test-code')

    // Should redirect to home or show error
    await expect(page).toHaveURL(/\/(home|auth\/auth-code-error)/)
  })
})

test.describe('DSGVO Delete Flow', () => {
  test.skip('should delete user account', async ({ page }) => {
    // This test would require a logged-in user
    // In a real scenario, you would:
    // 1. Create a test user
    // 2. Log them in
    // 3. Navigate to settings
    // 4. Click delete account
    // 5. Confirm deletion
    // 6. Verify redirect to home
  })
})
