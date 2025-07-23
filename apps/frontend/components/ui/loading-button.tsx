import * as React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, children, loading, loadingText, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn('relative', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-[inherit]">
            <Spinner size="sm" className="text-current" />
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </div>
        )}
        <span className={cn(loading && 'invisible')}>{children}</span>
      </Button>
    )
  }
)
LoadingButton.displayName = 'LoadingButton'

export { LoadingButton }
