/** @jsxImportSource @emotion/react */
import tw, { styled, css, theme } from 'twin.macro'
import * as React from 'react'

export interface TwinCardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  default: css`
    ${tw`bg-white dark:bg-gray-800`}
    ${tw`border border-gray-200 dark:border-gray-700`}
  `,
  bordered: css`
    ${tw`bg-transparent`}
    ${tw`border-2 border-gray-300 dark:border-gray-600`}
  `,
  elevated: css`
    ${tw`bg-white dark:bg-gray-800`}
    ${tw`shadow-lg hover:shadow-xl transition-shadow duration-300`}
    border: none;
  `,
  glass: css`
    ${tw`backdrop-blur-lg bg-white/70 dark:bg-gray-800/70`}
    ${tw`border border-white/20 dark:border-gray-700/20`}
    ${tw`shadow-xl`}
  `,
}

const paddingStyles = {
  none: tw`p-0`,
  sm: tw`p-4`,
  md: tw`p-6`,
  lg: tw`p-8`,
}

const StyledCard = styled.div<TwinCardProps>`
  ${tw`rounded-xl overflow-hidden transition-all duration-300`}
  
  ${({ variant = 'default' }) => variantStyles[variant]}
  ${({ padding = 'md' }) => paddingStyles[padding]}
  
  ${({ interactive }) =>
    interactive &&
    css`
      ${tw`cursor-pointer`}
      ${tw`hover:scale-[1.02] active:scale-[0.98]`}
      ${tw`transform transition-transform duration-200`}
    `}
`

export const TwinCard: React.FC<TwinCardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>
}

// Card Header with precise spacing
export const TwinCardHeader = styled.div<{ noPadding?: boolean }>`
  ${tw`flex items-center justify-between`}
  ${({ noPadding }) => !noPadding && tw`pb-4 mb-4 border-b border-gray-200 dark:border-gray-700`}
`

// Card Title with design system typography
export const TwinCardTitle = styled.h3`
  ${tw`text-xl font-semibold text-gray-900 dark:text-gray-100`}
  line-height: 1.2;
  letter-spacing: -0.02em;
`

// Card Description
export const TwinCardDescription = styled.p`
  ${tw`text-sm text-gray-600 dark:text-gray-400 mt-1`}
`

// Card Content
export const TwinCardContent = styled.div`
  ${tw`text-gray-700 dark:text-gray-300`}
`

// Card Footer
export const TwinCardFooter = styled.div<{ noPadding?: boolean }>`
  ${tw`flex items-center justify-between`}
  ${({ noPadding }) => !noPadding && tw`pt-4 mt-4 border-t border-gray-200 dark:border-gray-700`}
`

// Special feature card with gradient border
export const GradientBorderCard = styled.div<{ gradient?: string }>`
  ${tw`relative rounded-xl p-[2px] overflow-hidden`}
  
  background: ${({ gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }) => gradient};
  
  &::before {
    content: '';
    ${tw`absolute inset-[2px] bg-white dark:bg-gray-800 rounded-xl z-0`}
  }
  
  & > * {
    ${tw`relative z-10`}
  }
`

// Glassmorphism card variant
export const GlassCard = styled.div<{ blur?: 'sm' | 'md' | 'lg' }>`
  ${tw`relative rounded-2xl p-6 overflow-hidden`}
  
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(${({ blur = 'md' }) => {
    const blurValues = { sm: '8px', md: '16px', lg: '24px' }
    return blurValues[blur]
  }});
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  
  &::before {
    content: '';
    ${tw`absolute inset-0 opacity-10`}
    background: linear-gradient(135deg, #ffffff 0%, transparent 100%);
  }
`

// Neumorphism card variant
export const NeumorphicCard = styled.div<{ pressed?: boolean }>`
  ${tw`rounded-2xl p-6`}
  background: #e0e5ec;
  
  ${({ pressed }) =>
    pressed
      ? css`
          box-shadow: inset 6px 6px 10px #b8b9be,
                      inset -6px -6px 10px #ffffff;
        `
      : css`
          box-shadow: 9px 9px 16px #b8b9be,
                      -9px -9px 16px #ffffff;
        `}
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    ${({ pressed }) =>
      !pressed &&
      css`
        box-shadow: 12px 12px 20px #b8b9be,
                    -12px -12px 20px #ffffff;
      `}
  }
`