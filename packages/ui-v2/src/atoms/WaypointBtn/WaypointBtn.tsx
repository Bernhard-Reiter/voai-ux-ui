import * as React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const waypointBtnVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[4px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--c-accent)] text-white hover:opacity-90 active:scale-[0.98]',
        secondary: 'border border-[var(--c-border)] bg-transparent text-[var(--c-text-primary)] hover:bg-[var(--c-surface)]',
        ghost: 'text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)] hover:bg-[var(--c-surface)]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface WaypointBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof waypointBtnVariants> {
  asChild?: boolean;
}

/**
 * WaypointBtn - Cosmic Guide button component
 * Used for CTAs and quick actions throughout the universe
 */
export const WaypointBtn = React.forwardRef<HTMLButtonElement, WaypointBtnProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(waypointBtnVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

WaypointBtn.displayName = 'WaypointBtn';