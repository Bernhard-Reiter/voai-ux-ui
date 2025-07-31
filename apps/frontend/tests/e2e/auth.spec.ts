import { test, expect } from '@chromatic-com/playwright'

test.describe('Authentication Flow', () => {
  // Tag critical tests with @critical for CI optimization
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display login page when accessing protected route @critical', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL('/login')
    await expect(page.locator('h1')).toContainText('Welcome back')
  })

  test('should show login options', async ({ page }) => {
    await page.goto('/login')

    // Check for Google OAuth button
    await expect(page.getByRole('button', { name: /sign in with google/i })).toBeVisible()
  })

  test('should navigate between login and signup', async ({ page }) => {
    await page.goto('/login')

    // Click on signup link
    await page.click('text=Create an account')
    await expect(page).toHaveURL('/signup')

    // Navigate back to login
    await page.click('text=Sign in to your account')
    await expect(page).toHaveURL('/login')
  })

  test('should display error page for auth errors', async ({ page }) => {
    await page.goto('/auth/auth-code-error')

    await expect(page.locator('h1')).toContainText('Authentication Error')
    await expect(page.getByRole('link', { name: /try again/i })).toBeVisible()
  })

  test('should protect dashboard route @critical', async ({ page }) => {
    // Direct navigation to dashboard should redirect
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('should have proper security headers', async ({ page }) => {
    const response = await page.goto('/')
    const headers = response?.headers() || {}

    expect(headers['x-frame-options']).toBe('DENY')
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['x-xss-protection']).toBe('1; mode=block')
    expect(headers['referrer-policy']).toBe('origin-when-cross-origin')
  })
})
