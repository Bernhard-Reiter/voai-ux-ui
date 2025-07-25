import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import DashboardPage from '@/app/(dashboard)/dashboard/page'
import { createClient } from '@voai/shared/lib/supabase-client'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@voai/shared/lib/supabase-client', () => ({
  createClient: jest.fn(),
}))

// Mock the Card component from local components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}))

describe('Dashboard Page', () => {
  const mockPush = jest.fn()
  const mockSupabaseClient = {
    auth: {
      getUser: jest.fn(),
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    ;(createClient as jest.Mock).mockReturnValue(mockSupabaseClient)
  })

  it('should redirect to login if user is not authenticated', async () => {
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should display loading state initially', () => {
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: { email: 'test@example.com' } },
      error: null,
    })

    render(<DashboardPage />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display dashboard content when user is authenticated', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      created_at: '2024-01-01',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Willkommen zurück, test@example.com')).toBeInTheDocument()
    })
  })

  it('should display the main workflow panel placeholder', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('Main Workflow Panel')).toBeInTheDocument()
      expect(
        screen.getByText('Placeholder für Phase 5: Upload → n8n → Status Panel')
      ).toBeInTheDocument()
      expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    })
  })

  it('should display quick stats cards', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('Total Workflows')).toBeInTheDocument()
      expect(screen.getByText('Active Processes')).toBeInTheDocument()
      expect(screen.getByText('Completed Today')).toBeInTheDocument()

      // Check for the '0' values
      const zeroElements = screen.getAllByText('0')
      expect(zeroElements).toHaveLength(3)
    })
  })

  it('should handle authentication errors gracefully', async () => {
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: new Error('Authentication failed'),
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should render the workflow icon SVG', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
    })
  })

  it('should use correct CSS classes for layout', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    let container: HTMLElement
    await act(async () => {
      const result = render(<DashboardPage />)
      container = result.container
    })

    await waitFor(() => {
      expect(container.querySelector('.space-y-6')).toBeInTheDocument()
      expect(container.querySelector('.grid.gap-4.md\\:grid-cols-3')).toBeInTheDocument()
      expect(container.querySelector('.p-8')).toBeInTheDocument()
    })
  })

  it('should handle user without email gracefully', async () => {
    const mockUser = {
      id: '123',
      email: null,
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    await act(async () => {
      render(<DashboardPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Willkommen zurück,')).toBeInTheDocument()
    })
  })

  it('should only check authentication once on mount', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    let rerender: any
    await act(async () => {
      const result = render(<DashboardPage />)
      rerender = result.rerender
    })

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    // Rerender the component
    await act(async () => {
      rerender(<DashboardPage />)
    })

    // Should still only have been called once
    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalledTimes(1)
  })
})
