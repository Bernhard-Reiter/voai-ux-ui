import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Card, CardHeader, CardTitle, CardContent, Spinner } from '@voai/ui'

describe('UI Components', () => {
  describe('Button', () => {
    test('renders with default variant', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-primary')
    })

    test('applies variant classes correctly', () => {
      const { rerender } = render(<Button variant="outline">Test</Button>)
      expect(screen.getByRole('button')).toHaveClass('border')

      rerender(<Button variant="destructive">Test</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-destructive')
    })

    test('handles click events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('can be disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    })

    test('supports different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-9')

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-11')
    })
  })

  describe('Card', () => {
    test('renders card with all sections', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>Card content here</CardContent>
        </Card>
      )

      expect(screen.getByText('Test Card')).toBeInTheDocument()
      expect(screen.getByText('Card content here')).toBeInTheDocument()
    })

    test('applies custom className', () => {
      render(<Card className="custom-class">Content</Card>)
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveClass('custom-class')
      expect(card).toHaveClass('rounded-xl')
    })
  })

  describe('Spinner', () => {
    test('renders with default size', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('h-6', 'w-6')
    })

    test('renders with different sizes', () => {
      const { rerender } = render(<Spinner size="sm" />)
      expect(screen.getByRole('status')).toHaveClass('h-4', 'w-4')

      rerender(<Spinner size="lg" />)
      expect(screen.getByRole('status')).toHaveClass('h-8', 'w-8')
    })

    test('has accessible label', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'loading')
      expect(screen.getByText('Loading...')).toHaveClass('sr-only')
    })
  })
})
