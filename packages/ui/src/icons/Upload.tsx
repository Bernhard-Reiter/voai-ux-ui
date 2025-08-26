import * as React from 'react'
import { Icon, IconProps } from './Icon'

export const UploadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <svg {...Icon(props, ref)}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 5 17 10" />
      <line x1="12" y1="5" x2="12" y2="15" />
    </svg>
  )
)

UploadIcon.displayName = 'UploadIcon'