import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const CompassIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
)

CompassIcon.displayName = 'CompassIcon'