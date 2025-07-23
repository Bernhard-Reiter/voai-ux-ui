import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: 'purple' | 'blue' | 'green' | 'rainbow'
}

export function GradientText({ children, className = '', gradient = 'purple' }: GradientTextProps) {
  const gradients = {
    purple: 'from-purple-600 via-pink-600 to-blue-600',
    blue: 'from-blue-600 via-cyan-600 to-teal-600',
    green: 'from-green-600 via-emerald-600 to-teal-600',
    rainbow: 'from-red-600 via-yellow-600 to-blue-600',
  }

  return (
    <span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[gradient],
        className
      )}
    >
      {children}
    </span>
  )
}
