import * as React from 'react'
import { cn } from '../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full'
    
    const variants = {
      default: 'bg-surface-soft text-text-mute border border-border-subtle',
      success: 'bg-accent/10 text-accent border border-accent/20',
      warning: 'bg-status-warning/10 text-status-warning border border-status-warning/20',
      error: 'bg-status-error/10 text-status-error border border-status-error/20',
      info: 'bg-status-info/10 text-status-info border border-status-info/20'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm'
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }