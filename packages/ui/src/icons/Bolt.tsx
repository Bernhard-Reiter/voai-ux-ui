import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const BoltIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
)

BoltIcon.displayName = 'BoltIcon'