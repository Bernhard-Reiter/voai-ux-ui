import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-primary-100', 'text-primary-700');

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-100', 'text-gray-700');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-success-50', 'text-success-700');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-warning-50', 'text-warning-700');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-error-50', 'text-error-700');

    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass('border', 'border-gray-200', 'text-gray-700');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('renders with custom HTML attributes', () => {
    render(<Badge data-testid="badge-test" id="test-badge">Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge).toHaveAttribute('data-testid', 'badge-test');
    expect(badge).toHaveAttribute('id', 'test-badge');
  });

  it('maintains default classes with custom className', () => {
    render(<Badge className="mt-4">Spaced Badge</Badge>);
    const badge = screen.getByText('Spaced Badge');
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'mt-4');
  });
});