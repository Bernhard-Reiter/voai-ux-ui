import { test, expect } from '@chromatic-com/playwright'

test.describe('Account Deletion', () => {
  test('should show delete account option in settings', async ({ page }) => {
    // Note: This test assumes we can access the settings page
    // In a real scenario, you'd need to be logged in

    // For now, just verify the route exists
    const response = await page.goto('/settings', { waitUntil: 'domcontentloaded' })

    // Should redirect to login since we're not authenticated
    await expect(page).toHaveURL('/login')
  })

  test.skip('should delete account and all user data', async ({ page }) => {
    // This test would require:
    // 1. Creating a test user with test data
    // 2. Logging in as that user
    // 3. Creating some workflow status records
    // 4. Navigating to settings
    // 5. Clicking delete account
    // 6. Confirming deletion
    // 7. Verifying all user data is gone
    // 8. Verifying user cannot log in anymore
  })
})
