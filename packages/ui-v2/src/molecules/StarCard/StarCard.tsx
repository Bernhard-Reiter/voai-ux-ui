import * as React from 'react';
import { cn } from '../../utils';

export interface StarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

/**
 * StarCard - Content container (Circula)
 * Groups related content
 */
export const StarCard = React.forwardRef<HTMLDivElement, StarCardProps>(
  ({ className, glow = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-[var(--c-surface)] border border-[var(--c-border)] rounded-[var(--radius-md)] p-[var(--space-3)] transition-all duration-300',
        glow && 'shadow-[0_0_20px_rgba(79,70,229,0.1)] hover:shadow-lg',
        className
      )}
      {...props}
    />
  )
);

StarCard.displayName = 'StarCard';

export const StarCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-[var(--space-2)]', className)}
    {...props}
  />
));

StarCardHeader.displayName = 'StarCardHeader';

export const StarCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-[var(--c-text-primary)] font-semibold', className)}
    {...props}
  />
));

StarCardTitle.displayName = 'StarCardTitle';

export const StarCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-[var(--c-text-secondary)] text-xs mt-1', className)}
    {...props}
  />
));

StarCardDescription.displayName = 'StarCardDescription';

export const StarCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-[var(--c-text-primary)] text-sm', className)} {...props} />
));

StarCardContent.displayName = 'StarCardContent';