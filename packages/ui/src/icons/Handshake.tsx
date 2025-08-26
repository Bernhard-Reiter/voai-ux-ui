import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const HandshakeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <path d="M11 17a4 4 0 0 0 8 0v-1a4 4 0 0 0-8 0v1Z" />
      <path d="M9 11V7a4 4 0 1 1 8 0v4" />
      <line x1="13" y1="11" x2="13" y2="17" />
      <line x1="17" y1="11" x2="17" y2="17" />
      <path d="M3 11h2" />
      <path d="M19 11h2" />
      <path d="M12 3v2" />
      <path d="M20.5 7.5L19 9" />
      <path d="M3.5 7.5L5 9" />
    </svg>
  )
)

HandshakeIcon.displayName = 'HandshakeIcon'