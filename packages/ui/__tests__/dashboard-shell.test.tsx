import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardShell } from '../src/templates/dashboard-shell'

/**
 * Unit tests for DashboardShell component
 */
describe('DashboardShell', () => {
  it('renders children content', () => {
    render(
      <DashboardShell>
        <div data-testid="test-content">Test Content</div>
      </DashboardShell>
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('renders sidebar navigation items', () => {
    render(
      <DashboardShell>
        <div>Content</div>
      </DashboardShell>
    )

    // Check for sidebar header
    expect(screen.getByText('VOAI Enterprise')).toBeInTheDocument()

    // Check for navigation items
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Workflows')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders header with search and actions', () => {
    render(
      <DashboardShell>
        <div>Content</div>
      </DashboardShell>
    )

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
    expect(screen.getByLabelText('User menu')).toBeInTheDocument()
  })

  it('toggles mobile sidebar when menu button is clicked', () => {
    render(
      <DashboardShell>
        <div>Content</div>
      </DashboardShell>
    )

    const menuButton = screen.getByLabelText('Toggle sidebar')

    // Sidebar should be hidden initially on mobile
    const sidebar = screen.getByText('Dashboard').closest('aside')
    expect(sidebar).toHaveClass('-translate-x-full')

    // Click menu button to open
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('translate-x-0')

    // Click menu button again to close
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('-translate-x-full')
  })

  it('renders bottom navigation items', () => {
    render(
      <DashboardShell>
        <div>Content</div>
      </DashboardShell>
    )

    expect(screen.getByText('Help & Support')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <DashboardShell className="custom-class">
        <div>Content</div>
      </DashboardShell>
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
