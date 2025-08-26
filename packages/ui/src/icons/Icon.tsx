import * as React from 'react'
import { cn } from '../utils/cn'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

export const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', color = 'currentColor', className, ...props }, ref) => {
    return {
      ref,
      className: cn(iconSizes[size], className),
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg',
      ...props
    }
  }
) as any