import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CometFormProvider, CometFormField } from './';

const testSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  message: z.string().optional(),
});

type TestFormData = z.infer<typeof testSchema>;

const defaultValues: TestFormData = {
  name: '',
  email: '',
  message: '',
};

describe('CometFormField', () => {
  it('renders with label', () => {
    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        options={{ defaultValues }}
      >
        <CometFormField name="name" label="Your Name" />
      </CometFormProvider>
    );

    render(<TestForm />);
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema} 
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        <CometFormField name="name" label="Name" />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    // Submit without filling the field
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Name too short')).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('clears errors on valid input', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        onSubmit={onSubmit}
        options={{ defaultValues, mode: 'all' }}
      >
        <CometFormField name="name" label="Name" />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    // Submit to trigger error
    await user.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Name too short')).toBeInTheDocument();
    });

    // Type valid input
    const input = screen.getByLabelText('Name');
    await user.clear(input);
    await user.type(input, 'John Doe');
    
    // The error should clear immediately on valid input
    await waitFor(() => {
      expect(screen.queryByText('Name too short')).not.toBeInTheDocument();
    });
  });

  it('renders textarea when type is textarea', () => {
    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        options={{ defaultValues }}
      >
        <CometFormField name="message" label="Message" type="textarea" />
      </CometFormProvider>
    );

    render(<TestForm />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('shows helper text', () => {
    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        options={{ defaultValues }}
      >
        <CometFormField 
          name="email" 
          label="Email" 
          helperText="We'll never share your email"
        />
      </CometFormProvider>
    );

    render(<TestForm />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('hides helper text when error is shown', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        <CometFormField 
          name="email" 
          label="Email" 
          helperText="We'll never share your email"
        />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    // Helper text visible initially
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();

    // Type invalid email
    await user.type(screen.getByLabelText('Email'), 'invalid');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.queryByText("We'll never share your email")).not.toBeInTheDocument();
    });
  });

  it('applies error styling to input', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema}
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        <CometFormField name="name" label="Name" />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      const input = screen.getByLabelText('Name');
      expect(input).toHaveClass('border-[var(--c-error)]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

describe('CometFormProvider', () => {
  it('handles form submission', async () => {
    const user = userEvent.setup();
    let submittedData: any = null;
    
    const onSubmit = (data: TestFormData) => {
      submittedData = data;
    };

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema} 
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        <CometFormField name="name" label="Name" />
        <CometFormField name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(submittedData).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      });
    });
  });

  it('prevents submission with validation errors', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const TestForm = () => (
      <CometFormProvider<TestFormData> 
        schema={testSchema} 
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        <CometFormField name="name" label="Name" />
        <CometFormField name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </CometFormProvider>
    );

    render(<TestForm />);
    
    // Only fill name, leave email empty
    await user.type(screen.getByLabelText('Name'), 'John');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('accepts external form instance', () => {
    const ExternalForm = () => {
      const form = useForm<TestFormData>({
        resolver: zodResolver(testSchema),
        defaultValues: {
          name: 'Default Name',
        },
      });

      return (
        <CometFormProvider form={form}>
          <CometFormField name="name" label="Name" />
        </CometFormProvider>
      );
    };

    render(<ExternalForm />);
    expect(screen.getByLabelText('Name')).toHaveValue('Default Name');
  });
});