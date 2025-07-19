import type { Meta, StoryObj } from "@storybook/react";
import { CometInput, CometTextarea, CometFormProvider, CometFormField } from "./";
import { z } from "zod";
import { WaypointBtn } from "../WaypointBtn";

const meta = {
  title: "Atoms/CometForm",
  component: CometInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CometInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    placeholder: "Enter your name",
    label: "Name",
  },
};

export const InputStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <CometInput label="Default" placeholder="Default state" />
      <CometInput label="With Value" defaultValue="John Doe" />
      <CometInput label="Disabled" placeholder="Disabled input" disabled />
      <CometInput label="Read Only" defaultValue="Read only value" readOnly />
      <div className="p-4 bg-red-50 rounded">
        <CometInput label="Error State" placeholder="Invalid input" className="!border-red-500 focus:!border-red-500 focus:!ring-red-500" />
        <p className="mt-1 text-sm text-red-600">This field is required</p>
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <CometInput label="Email" type="email" placeholder="email@example.com" />
      <CometInput label="Password" type="password" placeholder="Enter password" />
      <CometInput label="Number" type="number" placeholder="0" min="0" max="100" />
      <CometInput label="Date" type="date" />
      <CometInput label="Time" type="time" />
      <CometInput label="Search" type="search" placeholder="Search..." />
      <CometInput label="Tel" type="tel" placeholder="+1 (555) 000-0000" />
      <CometInput label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

export const TextareaDefault: Story = {
  render: () => (
    <CometTextarea 
      label="Message" 
      placeholder="Enter your message here..."
      className="w-80"
    />
  ),
};

export const TextareaStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <CometTextarea label="Default" placeholder="Default state" />
      <CometTextarea 
        label="With Value" 
        defaultValue="This is a pre-filled message that spans multiple lines to show how the textarea handles longer content." 
      />
      <CometTextarea label="Disabled" placeholder="Disabled textarea" disabled />
      <CometTextarea 
        label="Read Only" 
        defaultValue="This textarea is read-only and cannot be edited." 
        readOnly 
      />
      <CometTextarea 
        label="With Max Length" 
        placeholder="Limited to 100 characters" 
        maxLength={100}
      />
    </div>
  ),
};

// Validation Schema Example
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const FormWithValidation: Story = {
  render: () => {
    const handleSubmit = (data: ContactFormData) => {
      console.log("Form submitted:", data);
      alert(`Form submitted!\n${JSON.stringify(data, null, 2)}`);
    };

    return (
      <CometFormProvider<ContactFormData>
        schema={contactSchema}
        onSubmit={handleSubmit}
        className="space-y-4 w-96 p-6 bg-[var(--c-surface)] rounded-[var(--radius-md)]"
      >
        <h2 className="cosmic-title mb-4">Contact Form</h2>
        
        <CometFormField<ContactFormData>
          name="name"
          label="Name"
          placeholder="John Doe"
          required
        />
        
        <CometFormField<ContactFormData>
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          required
        />
        
        <CometFormField<ContactFormData>
          name="phone"
          label="Phone (optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
        
        <CometFormField<ContactFormData>
          name="message"
          label="Message"
          type="textarea"
          placeholder="Tell us about your cosmic journey..."
          required
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <WaypointBtn variant="secondary" type="button">
            Cancel
          </WaypointBtn>
          <WaypointBtn type="submit">
            Send Message
          </WaypointBtn>
        </div>
      </CometFormProvider>
    );
  },
};

// Complex validation example
const registrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm: Story = {
  render: () => {
    const handleSubmit = (data: RegistrationFormData) => {
      console.log("Registration submitted:", data);
      alert("Registration successful!");
    };

    return (
      <CometFormProvider<RegistrationFormData>
        schema={registrationSchema}
        onSubmit={handleSubmit}
        options={{
          mode: "onChange",
        }}
        className="space-y-4 w-96 p-6 bg-[var(--c-surface)] rounded-[var(--radius-md)]"
      >
        <h2 className="cosmic-title mb-4">Create Account</h2>
        
        <CometFormField<RegistrationFormData>
          name="username"
          label="Username"
          placeholder="cosmic_explorer"
          helperText="Letters, numbers, and underscores only"
        />
        
        <CometFormField<RegistrationFormData>
          name="email"
          label="Email"
          type="email"
          placeholder="explorer@cosmos.space"
        />
        
        <CometFormField<RegistrationFormData>
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          helperText="At least 8 characters with uppercase, lowercase, and numbers"
        />
        
        <CometFormField<RegistrationFormData>
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
        />
        
        <div className="pt-2">
          <WaypointBtn type="submit" className="w-full">
            Create Account
          </WaypointBtn>
        </div>
      </CometFormProvider>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-gray-900 rounded">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-4 w-80">
      <CometInput label="Dark Mode Input" placeholder="Cosmic input in dark mode" />
      <CometTextarea label="Dark Mode Textarea" placeholder="Cosmic textarea in dark mode" />
    </div>
  ),
};