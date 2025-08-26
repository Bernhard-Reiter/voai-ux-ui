import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const ClockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
)

ClockIcon.displayName = 'ClockIcon'