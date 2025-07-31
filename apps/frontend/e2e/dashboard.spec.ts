import { test, expect } from '@chromatic-com/playwright'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication by setting localStorage
    await page.addInitScript(() => {
      localStorage.setItem('auth-token', 'mock-token')
    })
  })

  test('should navigate to dashboard and show placeholder', async ({ page }) => {
    await page.goto('/dashboard')

    // Check that we're on the dashboard page
    await expect(page).toHaveURL('/dashboard')

    // Check for dashboard title
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    // Check for the main workflow panel placeholder
    await expect(page.getByText('Main Workflow Panel')).toBeVisible()
    await expect(page.getByText('Placeholder for Phase 5')).toBeVisible()
    await expect(page.getByText('Coming Soon')).toBeVisible()

    // Check for stats cards
    await expect(page.getByText('Total Workflows')).toBeVisible()
    await expect(page.getByText('Active Processes')).toBeVisible()
    await expect(page.getByText('Completed Today')).toBeVisible()
  })

  test('should show sidebar navigation', async ({ page }) => {
    await page.goto('/dashboard')

    // Check for sidebar items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Workflows' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Team' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible()
  })

  test('should have working search and header actions', async ({ page }) => {
    await page.goto('/dashboard')

    // Check for search input
    const searchInput = page.getByPlaceholder('Search...')
    await expect(searchInput).toBeVisible()

    // Check for header action buttons
    await expect(page.getByLabel('Notifications')).toBeVisible()
    await expect(page.getByLabel('User menu')).toBeVisible()
  })

  test('should redirect to login when not authenticated', async ({ page }) => {
    // Clear the auth token
    await page.addInitScript(() => {
      localStorage.removeItem('auth-token')
    })

    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })

  test('mobile sidebar should toggle', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/dashboard')

    // Sidebar should be hidden initially
    const sidebar = page.locator('aside').first()
    await expect(sidebar).toHaveClass(/-translate-x-full/)

    // Click menu button to open
    await page.getByLabel('Toggle sidebar').click()
    await expect(sidebar).toHaveClass(/translate-x-0/)

    // Click backdrop to close
    await page.locator('.backdrop-blur-sm').click()
    await expect(sidebar).toHaveClass(/-translate-x-full/)
  })
})
