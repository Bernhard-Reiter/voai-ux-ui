import * as React from 'react';
import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface CometFormProviderProps<TFieldValues extends FieldValues = FieldValues> {
  children: React.ReactNode;
  form?: UseFormReturn<TFieldValues>;
  options?: UseFormProps<TFieldValues>;
  schema?: z.ZodType<TFieldValues>;
  onSubmit?: SubmitHandler<TFieldValues>;
  className?: string;
}

/**
 * CometFormProvider - Form context provider with Zod schema validation
 * Wraps react-hook-form with cosmic styling
 */
export function CometFormProvider<TFieldValues extends FieldValues = FieldValues>({
  children,
  form: externalForm,
  options,
  schema,
  onSubmit,
  className,
}: CometFormProviderProps<TFieldValues>) {
  const internalForm = useForm<TFieldValues>({
    ...options,
    resolver: schema ? zodResolver(schema as any) : options?.resolver,
  });

  const form = externalForm || internalForm;

  const handleSubmit = onSubmit
    ? form.handleSubmit(onSubmit as any)
    : (e: React.FormEvent) => e.preventDefault();

  return (
    <FormProvider {...(form as any)}>
      <form onSubmit={handleSubmit} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * Hook to access form context
 */
export { useFormContext as useCometForm } from 'react-hook-form';