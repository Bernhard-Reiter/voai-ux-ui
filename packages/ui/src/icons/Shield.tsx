import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const ShieldIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
)

ShieldIcon.displayName = 'ShieldIcon'