/** @jsxImportSource @emotion/react */
import tw, { styled, css } from 'twin.macro'
import * as React from 'react'

export interface TwinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
}

const baseStyles = tw`
  inline-flex items-center justify-center
  font-medium transition-all duration-200
  rounded-lg
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`

const variantStyles = {
  primary: tw`
    bg-primary-500 text-white
    hover:bg-primary-600 active:bg-primary-700
    focus:ring-primary-500
  `,
  secondary: tw`
    bg-secondary-100 text-secondary-900
    hover:bg-secondary-200 active:bg-secondary-300
    focus:ring-secondary-500
  `,
  ghost: tw`
    bg-transparent text-gray-700
    hover:bg-gray-100 active:bg-gray-200
    focus:ring-gray-500
  `,
  danger: tw`
    bg-red-500 text-white
    hover:bg-red-600 active:bg-red-700
    focus:ring-red-500
  `,
}

const sizeStyles = {
  sm: tw`
    px-3 py-1.5 text-sm
    h-8
  `,
  md: tw`
    px-4 py-2 text-base
    h-10
  `,
  lg: tw`
    px-6 py-3 text-lg
    h-12
  `,
}

const StyledButton = styled.button<TwinButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth }) => [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && tw`w-full`,
  ]
)

const LoadingSpinner = styled.span`
  ${tw`inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin`}
`

export const TwinButton = React.forwardRef<HTMLButtonElement, TwinButtonProps>(
  ({ children, isLoading, disabled, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </StyledButton>
    )
  }
)

TwinButton.displayName = 'TwinButton'

// Pixel-perfect compound variants
export const IconButton = styled.button<{ size?: 'sm' | 'md' | 'lg' }>`
  ${tw`
    inline-flex items-center justify-center
    rounded-full
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    hover:bg-gray-100 active:bg-gray-200
  `}
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return tw`w-8 h-8`
      case 'lg':
        return tw`w-12 h-12`
      default:
        return tw`w-10 h-10`
    }
  }}
`

// Complex styled component with dynamic styles
export const GradientButton = styled.button<{ gradient?: 'sunset' | 'ocean' | 'forest' }>`
  ${baseStyles}
  ${tw`text-white font-semibold px-6 py-3`}
  
  background: ${({ gradient = 'sunset' }) => {
    const gradients = {
      sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      forest: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)',
    }
    return gradients[gradient]
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`