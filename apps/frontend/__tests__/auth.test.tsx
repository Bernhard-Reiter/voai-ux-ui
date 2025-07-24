import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '../app/(marketing)/login/page'
import { createClient } from '@voai/shared'

// Mock modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@voai/shared', () => ({
  createClient: jest.fn(),
  createServerSupabaseClient: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Authentication', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(createClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  describe('Login Page', () => {
    it('should render login form', () => {
      render(<LoginPage />)

      expect(screen.getByPlaceholderText('E-Mail-Adresse')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument()
      expect(screen.getByText('Anmelden')).toBeInTheDocument()
    })

    it('should handle email login', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({ error: null })

      render(<LoginPage />)

      const emailInput = screen.getByPlaceholderText('E-Mail-Adresse')
      const passwordInput = screen.getByPlaceholderText('Passwort')
      const submitButton = screen.getByRole('button', { name: 'Anmelden' })

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        })
        expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('should handle login error', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        error: { message: 'Invalid credentials' },
      })

      render(<LoginPage />)

      const emailInput = screen.getByPlaceholderText('E-Mail-Adresse')
      const passwordInput = screen.getByPlaceholderText('Passwort')
      const submitButton = screen.getByRole('button', { name: 'Anmelden' })

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
        expect(mockRouter.push).not.toHaveBeenCalled()
      })
    })

    it('should handle OAuth login', async () => {
      mockSupabase.auth.signInWithOAuth.mockResolvedValueOnce({ error: null })

      render(<LoginPage />)

      const googleButton = screen.getByText('Mit Google anmelden')
      fireEvent.click(googleButton)

      await waitFor(() => {
        expect(mockSupabase.auth.signInWithOAuth).toHaveBeenCalledWith({
          provider: 'google',
          options: {
            redirectTo: expect.stringContaining('/auth/callback'),
          },
        })
      })
    })
  })
})
