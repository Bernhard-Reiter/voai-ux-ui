import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '../app/auth/login/page'
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

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}))

describe('Authentication', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockSupabase = {
    auth: {
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
    it('should render login page with Google button', () => {
      render(<LoginPage />)

      expect(screen.getByText('Willkommen zurück')).toBeInTheDocument()
      expect(
        screen.getByText('Melden Sie sich an, um auf Ihr Dashboard zuzugreifen')
      ).toBeInTheDocument()
      expect(screen.getByText('Mit Google fortfahren')).toBeInTheDocument()
    })

    it('should handle OAuth login', async () => {
      mockSupabase.auth.signInWithOAuth.mockResolvedValueOnce({ error: null })

      render(<LoginPage />)

      const googleButton = screen.getByText('Mit Google fortfahren')
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

    it('should show error on OAuth failure', async () => {
      const toast = jest.requireMock('sonner').toast
      mockSupabase.auth.signInWithOAuth.mockResolvedValueOnce({
        error: { message: 'OAuth error' },
      })

      render(<LoginPage />)

      const googleButton = screen.getByText('Mit Google fortfahren')
      fireEvent.click(googleButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'Login fehlgeschlagen. Bitte versuchen Sie es erneut.'
        )
      })
    })
  })
})
