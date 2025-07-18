import type { Meta, StoryObj } from "@storybook/react";
import { CometInput, CometTextarea } from "./CometForm";

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

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-96 p-6 bg-[var(--c-surface)] rounded-[var(--radius-md)]">
      <h2 className="cosmic-title mb-4">Contact Form</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <CometInput label="First Name" placeholder="John" required />
        <CometInput label="Last Name" placeholder="Doe" required />
      </div>
      
      <CometInput 
        label="Email" 
        type="email" 
        placeholder="john.doe@example.com" 
        required 
      />
      
      <CometInput 
        label="Phone" 
        type="tel" 
        placeholder="+1 (555) 000-0000" 
      />
      
      <CometTextarea 
        label="Message" 
        placeholder="Tell us about your cosmic journey..."
        rows={4}
        required
      />
      
      <div className="flex justify-end gap-3 pt-2">
        <button 
          type="button"
          className="px-4 py-2 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)] transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)] transition-colors"
        >
          Send Message
        </button>
      </div>
    </form>
  ),
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