import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--circula-black)] text-[var(--circula-white)]',
          'hover:bg-[var(--circula-gray-800)] hover:scale-[1.02]',
          'active:scale-[0.98]',
          'focus-visible:ring-[var(--circula-black)]',
        ],
        secondary: [
          'bg-transparent text-[var(--circula-gray-700)]',
          'border border-[var(--circula-gray-300)]',
          'hover:border-[var(--circula-gray-900)] hover:text-[var(--circula-gray-900)]',
          'focus-visible:ring-[var(--circula-gray-900)]',
        ],
        ghost: [
          'bg-transparent text-[var(--circula-gray-600)]',
          'hover:text-[var(--circula-gray-900)] hover:bg-[var(--circula-gray-50)]',
          'focus-visible:ring-[var(--circula-gray-400)]',
        ],
        success: [
          'bg-[var(--circula-success)] text-white',
          'hover:bg-[var(--circula-success-dark)]',
          'focus-visible:ring-[var(--circula-success)]',
        ],
      },
      size: {
        sm: [
          'h-9 px-4',
          'text-[var(--circula-text-sm)]',
          'rounded-[20px]',
        ],
        md: [
          'h-11 px-6',
          'text-[var(--circula-text-sm)]',
          'rounded-[22px]',
        ],
        lg: [
          'h-12 px-7',
          'text-[var(--circula-text-base)]',
          'rounded-[24px]',
        ],
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface CirculaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * CirculaButton - Minimal button component following Circula design principles
 * Primary buttons are black, pill-shaped for important CTAs
 */
export const CirculaButton = React.forwardRef<HTMLButtonElement, CirculaButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    icon, 
    iconPosition = 'left', 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          'duration-[var(--circula-transition-fast)]',
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2 inline-flex">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2 inline-flex">{icon}</span>
        )}
      </button>
    );
  }
);

CirculaButton.displayName = 'CirculaButton';

/**
 * CTAButton - High-emphasis call-to-action button
 * Always black background with white text
 */
export const CTAButton = React.forwardRef<
  HTMLButtonElement,
  Omit<CirculaButtonProps, 'variant'>
>(({ className, ...props }, ref) => (
  <CirculaButton
    ref={ref}
    variant="primary"
    className={cn('shadow-[var(--circula-shadow-sm)]', className)}
    {...props}
  />
));

CTAButton.displayName = 'CTAButton';

/**
 * TextButton - Minimal text-only button
 */
export const TextButton = React.forwardRef<
  HTMLButtonElement,
  Omit<CirculaButtonProps, 'variant' | 'size'>
>(({ className, ...props }, ref) => (
  <CirculaButton
    ref={ref}
    variant="ghost"
    size="sm"
    className={cn('h-auto px-2 py-1', className)}
    {...props}
  />
));

TextButton.displayName = 'TextButton';