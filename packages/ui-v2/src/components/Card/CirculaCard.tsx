import * as React from 'react';
import { cn } from '../../utils';

export interface CirculaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'borderless' | 'highlight';
  hover?: boolean;
}

/**
 * CirculaCard - Ultra-minimal card component
 * Subtle borders and shadows following Circula design principles
 */
export const CirculaCard = React.forwardRef<HTMLDivElement, CirculaCardProps>(
  ({ className, variant = 'default', hover = true, ...props }, ref) => {
    const baseStyles = 'bg-[var(--circula-white)] rounded-[var(--circula-radius-lg)] p-[var(--circula-space-6)] transition-all duration-[var(--circula-transition-base)]';
    
    const variantStyles = {
      default: 'border border-[var(--circula-gray-100)]',
      borderless: 'shadow-[var(--circula-shadow-sm)]',
      highlight: 'border-2 border-[var(--circula-gray-900)]',
    };
    
    const hoverStyles = {
      default: hover ? 'hover:border-[var(--circula-gray-200)] hover:shadow-[var(--circula-shadow-sm)]' : '',
      borderless: hover ? 'hover:shadow-[var(--circula-shadow-md)]' : '',
      highlight: '',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

CirculaCard.displayName = 'CirculaCard';

export const CirculaCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-[var(--circula-space-4)]', className)}
    {...props}
  />
));

CirculaCardHeader.displayName = 'CirculaCardHeader';

export const CirculaCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-[var(--circula-text-xl)] font-[var(--circula-font-semibold)] text-[var(--circula-gray-900)]',
      className
    )}
    {...props}
  />
));

CirculaCardTitle.displayName = 'CirculaCardTitle';

export const CirculaCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-[var(--circula-text-sm)] text-[var(--circula-gray-600)] mt-[var(--circula-space-2)]',
      className
    )}
    {...props}
  />
));

CirculaCardDescription.displayName = 'CirculaCardDescription';

export const CirculaCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-[var(--circula-text-base)] text-[var(--circula-gray-700)]',
      className
    )}
    {...props}
  />
));

CirculaCardContent.displayName = 'CirculaCardContent';

/**
 * CirculaStatCard - Card for displaying statistics
 */
export interface CirculaStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
}

export const CirculaStatCard = React.forwardRef<HTMLDivElement, CirculaStatCardProps>(
  ({ className, label, value, change, ...props }, ref) => (
    <CirculaCard ref={ref} className={className} {...props}>
      <div className="text-[var(--circula-text-sm)] text-[var(--circula-gray-500)] font-[var(--circula-font-medium)]">
        {label}
      </div>
      <div className="text-[var(--circula-text-3xl)] font-[var(--circula-font-bold)] text-[var(--circula-gray-900)] mt-[var(--circula-space-2)]">
        {value}
      </div>
      {change && (
        <div
          className={cn(
            'text-[var(--circula-text-sm)] font-[var(--circula-font-medium)] mt-[var(--circula-space-2)] flex items-center gap-[var(--circula-space-1)]',
            change.positive ? 'text-[var(--circula-success)]' : 'text-[var(--circula-error)]'
          )}
        >
          <span>{change.positive ? '↑' : '↓'}</span>
          <span>{change.value}</span>
        </div>
      )}
    </CirculaCard>
  )
);

CirculaStatCard.displayName = 'CirculaStatCard';