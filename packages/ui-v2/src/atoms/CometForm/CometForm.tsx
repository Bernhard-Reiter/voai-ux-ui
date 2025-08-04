import * as React from 'react';
import { cn } from '../../utils';

export interface CometInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * CometInput - Cosmic form input
 * 2-state border transitions from neutral to accent on focus
 */
export const CometInput = React.forwardRef<HTMLInputElement, CometInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={inputId} 
            className="cosmic-meta block"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-[var(--space-2)] py-[var(--space-1)]',
            'border border-[var(--c-border)] rounded-[var(--radius-sm)]',
            'bg-[var(--c-bg)] text-[var(--c-text-primary)]',
            'transition-all duration-150',
            'hover:border-[var(--c-text-secondary)]',
            'focus:border-[var(--c-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-opacity-20',
            'placeholder:text-[var(--c-text-secondary)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

CometInput.displayName = 'CometInput';

export interface CometTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const CometTextarea = React.forwardRef<HTMLTextAreaElement, CometTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    
    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="cosmic-meta block"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-[var(--space-2)] py-[var(--space-1)]',
            'border border-[var(--c-border)] rounded-[var(--radius-sm)]',
            'bg-[var(--c-bg)] text-[var(--c-text-primary)]',
            'transition-all duration-150',
            'hover:border-[var(--c-text-secondary)]',
            'focus:border-[var(--c-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-opacity-20',
            'placeholder:text-[var(--c-text-secondary)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-y min-h-[80px]',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

CometTextarea.displayName = 'CometTextarea';