import { test, expect } from '@chromatic-com/playwright'

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Willkommen zurück' })).toBeVisible()
    await expect(page.getByPlaceholder('E-Mail-Adresse')).toBeVisible()
    await expect(page.getByPlaceholder('Passwort')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByPlaceholder('E-Mail-Adresse').fill('test@example.com')
    await page.getByPlaceholder('Passwort').fill('wrongpassword')
    await page.getByRole('button', { name: 'Anmelden' }).click()

    // Wait for error message (mocked in test environment)
    await expect(page.getByText(/Invalid/i)).toBeVisible()
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.getByText('Registrieren').click()
    await expect(page).toHaveURL('/signup')
    await expect(page.getByRole('heading', { name: 'Konto erstellen' })).toBeVisible()
  })

  test('should have OAuth buttons', async ({ page }) => {
    await expect(page.getByText('Mit Google anmelden')).toBeVisible()
    await expect(page.getByText('Mit GitHub anmelden')).toBeVisible()
  })

  test('protected route should redirect to login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Authenticated Flow', () => {
  test.use({
    storageState: 'tests/auth.json', // Pre-authenticated state
  })

  test('should access dashboard when authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('should show user email in dashboard', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByText(/test@example.com/)).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/dashboard')

    // Open user menu
    await page.getByRole('button', { name: 'User menu' }).click()

    // Click logout
    await page.getByText('Logout').click()

    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })
})
