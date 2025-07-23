/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react';
import { TwinInput, FloatingLabelInput } from './TwinInput';
import { Search, Mail, Lock, Eye } from 'lucide-react';
import tw from 'twin.macro';
import * as React from 'react';

const meta = {
  title: 'Atoms/TwinInput',
  component: TwinInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input-Komponente mit Twin.macro für verschiedene Stile und Varianten.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={tw`min-w-[400px] p-8`}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Inputs
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Filled input',
    variant: 'filled',
  },
};

export const Ghost: Story = {
  args: {
    placeholder: 'Ghost input',
    variant: 'ghost',
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <Search tw="w-5 h-5" />,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Email address',
    type: 'email',
    icon: <Mail tw="w-5 h-5" />,
    iconPosition: 'right',
  },
};

// States
export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    error: true,
    value: 'Wrong value',
  },
};

export const DisabledState: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit',
  },
};

// Floating Label
export const FloatingLabel: Story = {
  render: () => (
    <FloatingLabelInput>
      <input placeholder=" " id="floating-demo" />
      <label htmlFor="floating-demo">Floating Label</label>
    </FloatingLabelInput>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    return (
      <form css={tw`space-y-4`}>
        <div>
          <label css={tw`block text-sm font-medium text-gray-700 mb-1`}>
            Email
          </label>
          <TwinInput
            type="email"
            placeholder="john@example.com"
            icon={<Mail tw="w-5 h-5" />}
          />
        </div>
        
        <div>
          <label css={tw`block text-sm font-medium text-gray-700 mb-1`}>
            Password
          </label>
          <TwinInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                css={tw`p-1 hover:bg-gray-100 rounded`}
              >
                <Eye tw="w-4 h-4" />
              </button>
            }
            iconPosition="right"
          />
        </div>
        
        <div>
          <label css={tw`block text-sm font-medium text-gray-700 mb-1`}>
            Search
          </label>
          <TwinInput
            placeholder="Search for anything..."
            icon={<Search tw="w-5 h-5" />}
            variant="filled"
          />
        </div>
      </form>
    );
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div css={tw`space-y-6`}>
      <div css={tw`space-y-4`}>
        <h3 css={tw`text-lg font-semibold`}>Default Variant</h3>
        <TwinInput placeholder="Default input" />
        <TwinInput placeholder="With icon" icon={<Search tw="w-5 h-5" />} />
        <TwinInput placeholder="Error state" error />
      </div>
      
      <div css={tw`space-y-4`}>
        <h3 css={tw`text-lg font-semibold`}>Filled Variant</h3>
        <TwinInput variant="filled" placeholder="Filled input" />
        <TwinInput variant="filled" placeholder="With icon" icon={<Mail tw="w-5 h-5" />} />
        <TwinInput variant="filled" placeholder="Error state" error />
      </div>
      
      <div css={tw`space-y-4`}>
        <h3 css={tw`text-lg font-semibold`}>Ghost Variant</h3>
        <TwinInput variant="ghost" placeholder="Ghost input" />
        <TwinInput variant="ghost" placeholder="With icon" icon={<Lock tw="w-5 h-5" />} />
        <TwinInput variant="ghost" placeholder="Error state" error />
      </div>
    </div>
  ),
};