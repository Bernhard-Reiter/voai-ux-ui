import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const EyeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
)

EyeIcon.displayName = 'EyeIcon'