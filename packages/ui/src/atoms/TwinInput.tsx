/** @jsxImportSource @emotion/react */
import tw, { styled, css } from 'twin.macro'
import * as React from 'react'

export interface TwinInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'ghost'
  error?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const baseStyles = tw`
  w-full px-4 py-2
  text-gray-900 placeholder-gray-500
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`

const variantStyles = {
  default: css`
    ${tw`border border-gray-300 rounded-lg bg-white`}
    ${tw`focus:border-primary-500 focus:ring-primary-500`}
    ${tw`hover:border-gray-400`}
  `,
  filled: css`
    ${tw`bg-gray-100 border-transparent rounded-lg`}
    ${tw`focus:bg-white focus:border-primary-500 focus:ring-primary-500`}
    ${tw`hover:bg-gray-200`}
  `,
  ghost: css`
    ${tw`bg-transparent border-b border-gray-300 rounded-none px-0`}
    ${tw`focus:border-primary-500 focus:ring-0`}
    ${tw`hover:border-gray-400`}
  `,
}

const InputWrapper = styled.div`
  ${tw`relative`}
`

const StyledInput = styled.input<TwinInputProps>`
  ${baseStyles}
  ${({ variant = 'default' }) => variantStyles[variant]}
  ${({ error }) => error && tw`border-red-500 focus:border-red-500 focus:ring-red-500`}
  ${({ icon, iconPosition = 'left' }) => icon && (
    iconPosition === 'left' ? tw`pl-10` : tw`pr-10`
  )}
`

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  ${tw`absolute top-1/2 transform -translate-y-1/2 text-gray-400`}
  ${({ position }) => position === 'left' ? tw`left-3` : tw`right-3`}
`

export const TwinInput = React.forwardRef<HTMLInputElement, TwinInputProps>(
  ({ icon, iconPosition = 'left', className, ...props }, ref) => {
    if (!icon) {
      return <StyledInput ref={ref} className={className} {...props} />
    }

    return (
      <InputWrapper className={className}>
        <StyledInput 
          ref={ref} 
          icon={icon} 
          iconPosition={iconPosition} 
          {...props} 
        />
        <IconWrapper position={iconPosition}>
          {icon}
        </IconWrapper>
      </InputWrapper>
    )
  }
)

TwinInput.displayName = 'TwinInput'

// Advanced floating label input
export const FloatingLabelInput = styled.div`
  ${tw`relative`}
  
  input {
    ${baseStyles}
    ${tw`pt-6 pb-2 border border-gray-300 rounded-lg`}
    
    &:focus,
    &:not(:placeholder-shown) {
      ${tw`border-primary-500`}
      
      & + label {
        ${tw`text-xs top-2 text-primary-600`}
      }
    }
  }
  
  label {
    ${tw`absolute left-4 top-1/2 transform -translate-y-1/2`}
    ${tw`text-gray-500 transition-all duration-200 pointer-events-none`}
  }
`