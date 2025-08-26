import * as React from 'react'
import { cn } from '../utils/cn'

export interface HeadingDotProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  dotColor?: 'accent' | 'muted'
  children: React.ReactNode
}

const HeadingDot = React.forwardRef<HTMLHeadingElement, HeadingDotProps>(
  ({ className, as: Component = 'h2', dotColor = 'accent', children, ...props }, ref) => {
    const dotColors = {
      accent: 'bg-accent',
      muted: 'bg-text-mute'
    }
    
    const headingSizes = {
      h1: 'text-5xl',
      h2: 'text-4xl',
      h3: 'text-3xl',
      h4: 'text-2xl',
      h5: 'text-xl',
      h6: 'text-lg'
    }
    
    const dotSizes = {
      h1: 'w-3 h-3',
      h2: 'w-2.5 h-2.5',
      h3: 'w-2 h-2',
      h4: 'w-2 h-2',
      h5: 'w-1.5 h-1.5',
      h6: 'w-1.5 h-1.5'
    }
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          'flex items-center gap-3 font-semibold text-text-base',
          headingSizes[Component],
          className
        )}
        {...props}
      >
        <span className={cn('rounded-full flex-shrink-0', dotColors[dotColor], dotSizes[Component])} />
        {children}
      </Component>
    )
  }
)

HeadingDot.displayName = 'HeadingDot'

export { HeadingDot }