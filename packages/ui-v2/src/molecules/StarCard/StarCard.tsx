import * as React from 'react';
import { cn } from '../../utils';

export interface StarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

/**
 * StarCard - Cosmic content container
 * Groups related content in the cosmic interface
 */
export const StarCard = React.forwardRef<HTMLDivElement, StarCardProps>(
  ({ className, glow = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'cosmic-surface p-[var(--space-3)] transition-all duration-300',
        glow && 'cosmic-glow hover:shadow-lg',
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
    className={cn('cosmic-title', className)}
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
    className={cn('cosmic-meta mt-1', className)}
    {...props}
  />
));

StarCardDescription.displayName = 'StarCardDescription';

export const StarCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('cosmic-text', className)} {...props} />
));

StarCardContent.displayName = 'StarCardContent';