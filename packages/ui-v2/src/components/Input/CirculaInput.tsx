import * as React from 'react';
import { cn } from '../../utils';

export interface CirculaInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * CirculaInput - Minimal form input with subtle styling
 * Clean borders and focus states following Circula design
 */
export const CirculaInput = React.forwardRef<HTMLInputElement, CirculaInputProps>(
  ({ className, label, helper, error, errorMessage, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[var(--circula-text-sm)] font-[var(--circula-font-medium)] text-[var(--circula-gray-700)] mb-[var(--circula-space-2)]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3',
            'border rounded-[var(--circula-radius-sm)]',
            'bg-[var(--circula-white)] text-[var(--circula-gray-900)]',
            'text-[var(--circula-text-base)]',
            'transition-all duration-[var(--circula-transition-fast)]',
            'placeholder:text-[var(--circula-gray-500)]',
            // Normal state
            'border-[var(--circula-gray-300)]',
            'hover:border-[var(--circula-gray-400)]',
            // Focus state
            'focus:border-[var(--circula-black)] focus:outline-none',
            'focus:ring-2 focus:ring-[var(--circula-black)] focus:ring-opacity-10',
            // Error state
            error && [
              'border-[var(--circula-error)]',
              'focus:border-[var(--circula-error)] focus:ring-[var(--circula-error)]',
            ],
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--circula-gray-50)]',
            className
          )}
          {...props}
        />
        {(helper || errorMessage) && (
          <p
            className={cn(
              'text-[var(--circula-text-xs)] mt-[var(--circula-space-1)]',
              error ? 'text-[var(--circula-error)]' : 'text-[var(--circula-gray-500)]'
            )}
          >
            {error ? errorMessage : helper}
          </p>
        )}
      </div>
    );
  }
);

CirculaInput.displayName = 'CirculaInput';

export interface CirculaTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * CirculaTextarea - Minimal textarea component
 */
export const CirculaTextarea = React.forwardRef<HTMLTextAreaElement, CirculaTextareaProps>(
  ({ className, label, helper, error, errorMessage, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[var(--circula-text-sm)] font-[var(--circula-font-medium)] text-[var(--circula-gray-700)] mb-[var(--circula-space-2)]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3',
            'border rounded-[var(--circula-radius-sm)]',
            'bg-[var(--circula-white)] text-[var(--circula-gray-900)]',
            'text-[var(--circula-text-base)]',
            'transition-all duration-[var(--circula-transition-fast)]',
            'placeholder:text-[var(--circula-gray-500)]',
            'resize-y min-h-[100px]',
            // Normal state
            'border-[var(--circula-gray-300)]',
            'hover:border-[var(--circula-gray-400)]',
            // Focus state
            'focus:border-[var(--circula-black)] focus:outline-none',
            'focus:ring-2 focus:ring-[var(--circula-black)] focus:ring-opacity-10',
            // Error state
            error && [
              'border-[var(--circula-error)]',
              'focus:border-[var(--circula-error)] focus:ring-[var(--circula-error)]',
            ],
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--circula-gray-50)]',
            className
          )}
          {...props}
        />
        {(helper || errorMessage) && (
          <p
            className={cn(
              'text-[var(--circula-text-xs)] mt-[var(--circula-space-1)]',
              error ? 'text-[var(--circula-error)]' : 'text-[var(--circula-gray-500)]'
            )}
          >
            {error ? errorMessage : helper}
          </p>
        )}
      </div>
    );
  }
);

CirculaTextarea.displayName = 'CirculaTextarea';

export interface CirculaSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * CirculaSelect - Minimal select component
 */
export const CirculaSelect = React.forwardRef<HTMLSelectElement, CirculaSelectProps>(
  ({ className, label, helper, error, errorMessage, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    
    const chevronSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 4.5 3 3 3-3'/%3E%3C/svg%3E`;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[var(--circula-text-sm)] font-[var(--circula-font-medium)] text-[var(--circula-gray-700)] mb-[var(--circula-space-2)]"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 pr-12',
            'border rounded-[var(--circula-radius-sm)]',
            'bg-[var(--circula-white)] text-[var(--circula-gray-900)]',
            'text-[var(--circula-text-base)]',
            'transition-all duration-[var(--circula-transition-fast)]',
            'appearance-none cursor-pointer',
            `bg-[url("${chevronSvg}")] bg-[right_16px_center] bg-no-repeat`,
            // Normal state
            'border-[var(--circula-gray-300)]',
            'hover:border-[var(--circula-gray-400)]',
            // Focus state
            'focus:border-[var(--circula-black)] focus:outline-none',
            'focus:ring-2 focus:ring-[var(--circula-black)] focus:ring-opacity-10',
            // Error state
            error && [
              'border-[var(--circula-error)]',
              'focus:border-[var(--circula-error)] focus:ring-[var(--circula-error)]',
            ],
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--circula-gray-50)]',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {(helper || errorMessage) && (
          <p
            className={cn(
              'text-[var(--circula-text-xs)] mt-[var(--circula-space-1)]',
              error ? 'text-[var(--circula-error)]' : 'text-[var(--circula-gray-500)]'
            )}
          >
            {error ? errorMessage : helper}
          </p>
        )}
      </div>
    );
  }
);

CirculaSelect.displayName = 'CirculaSelect';