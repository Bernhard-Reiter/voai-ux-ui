import * as React from 'react';
import {
  useFormContext,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { cn } from '../../utils';
import { CometInput, CometTextarea } from './CometForm';

interface CometFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  className?: string;
  required?: boolean;
  helperText?: string;
}

/**
 * CometFormField - Integrated form field with validation
 * Automatically connects to react-hook-form context
 */
export function CometFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  type = 'text',
  placeholder,
  className,
  required,
  rules,
  defaultValue,
  helperText,
  ...props
}: CometFormFieldProps<TFieldValues, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      {...props}
      render={({ field }) => (
        <div className="space-y-1">
          {type === 'textarea' ? (
            <CometTextarea
              {...field}
              label={label}
              placeholder={placeholder}
              className={cn(
                error && 'border-[var(--c-error)] focus:border-[var(--c-error)] focus:ring-[var(--c-error)]',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />
          ) : (
            <CometInput
              {...field}
              type={type}
              label={label}
              placeholder={placeholder}
              className={cn(
                error && 'border-[var(--c-error)] focus:border-[var(--c-error)] focus:ring-[var(--c-error)]',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />
          )}
          
          {error && (
            <p id={`${name}-error`} className="cosmic-meta text-[var(--c-error)]">
              {error.message || 'This field is invalid'}
            </p>
          )}
          
          {helperText && !error && (
            <p id={`${name}-helper`} className="cosmic-meta text-[var(--c-text-secondary)]">
              {helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}