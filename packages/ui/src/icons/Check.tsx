import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
)

CheckIcon.displayName = 'CheckIcon'