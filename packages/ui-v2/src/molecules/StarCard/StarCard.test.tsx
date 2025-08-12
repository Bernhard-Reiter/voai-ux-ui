import { render, screen } from '@testing-library/react';
import { 
  StarCard, 
  StarCardHeader, 
  StarCardTitle, 
  StarCardDescription, 
  StarCardContent 
} from './StarCard';

describe('StarCard', () => {
  it('renders basic card with content', () => {
    render(
      <StarCard>
        <div>Card Content</div>
      </StarCard>
    );
    
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders with composed components', () => {
    render(
      <StarCard>
        <StarCardHeader>
          <StarCardTitle>Test Title</StarCardTitle>
          <StarCardDescription>Test Description</StarCardDescription>
        </StarCardHeader>
        <StarCardContent>
          <div>Card Content</div>
        </StarCardContent>
      </StarCard>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies glow effect when glow prop is true', () => {
    const { container } = render(
      <StarCard glow>
        <div>Glowing Card</div>
      </StarCard>
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('does not apply glow effect by default', () => {
    const { container } = render(
      <StarCard>
        <div>Normal Card</div>
      </StarCard>
    );
    
    const card = container.firstChild;
    expect(card).not.toHaveClass('cosmic-glow');
  });

  it('applies custom className', () => {
    const { container } = render(
      <StarCard className="custom-class">
        <div>Custom Card</div>
      </StarCard>
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('maintains base styling classes', () => {
    const { container } = render(
      <StarCard>
        <div>Styled Card</div>
      </StarCard>
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass(
      'bg-[var(--c-surface)]',
      'p-[var(--space-3)]',
      'transition-all',
      'duration-300'
    );
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(
      <StarCard ref={ref}>
        <div>Ref Card</div>
      </StarCard>
    );
    expect(ref).toHaveBeenCalled();
  });
});

describe('StarCardHeader', () => {
  it('renders with children', () => {
    render(
      <StarCardHeader>
        <div>Header Content</div>
      </StarCardHeader>
    );
    
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('applies margin bottom class', () => {
    const { container } = render(
      <StarCardHeader>Header</StarCardHeader>
    );
    
    expect(container.firstChild).toHaveClass('mb-[var(--space-2)]');
  });
});

describe('StarCardTitle', () => {
  it('renders as h3 element', () => {
    render(<StarCardTitle>Card Title</StarCardTitle>);
    
    const title = screen.getByText('Card Title');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('font-semibold');
  });
});

describe('StarCardDescription', () => {
  it('renders as p element', () => {
    render(<StarCardDescription>Card Description</StarCardDescription>);
    
    const description = screen.getByText('Card Description');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-xs', 'mt-1');
  });
});

describe('StarCardContent', () => {
  it('renders Circula text class', () => {
    render(
      <StarCardContent>
        <div>Content Area</div>
      </StarCardContent>
    );
    
    const content = screen.getByText('Content Area').parentElement;
    expect(content).toHaveClass('text-sm');
  });
});