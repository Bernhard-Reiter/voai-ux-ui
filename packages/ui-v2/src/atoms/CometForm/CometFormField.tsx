import * as React from 'react';
import {
  useFormContext,
  Controller as RHFController,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

const Controller = RHFController as any;
import { cn } from '../../utils';
import { CometInput, CometTextarea } from './CometForm';

interface CometFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  className?: string;
  required?: boolean;
  helperText?: string;
  rules?: ControllerProps<TFieldValues, TName>['rules'];
  defaultValue?: ControllerProps<TFieldValues, TName>['defaultValue'];
  disabled?: boolean;
  readOnly?: boolean;
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
  required: _required,
  rules,
  defaultValue,
  helperText,
  disabled,
  readOnly,
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
      render={({ field }: any) => (
        <div className="space-y-1">
          {type === 'textarea' ? (
            <CometTextarea
              {...field}
              label={label}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
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
              disabled={disabled}
              readOnly={readOnly}
              className={cn(
                error && 'border-[var(--c-error)] focus:border-[var(--c-error)] focus:ring-[var(--c-error)]',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            />
          )}
          
          {error && (
            <p id={`${name}-error`} className="text-[var(--c-error)] text-xs">
              {String(error.message || 'This field is invalid')}
            </p>
          )}
          
          {helperText && !error && (
            <p id={`${name}-helper`} className="text-[var(--c-text-secondary)] text-xs">
              {helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}