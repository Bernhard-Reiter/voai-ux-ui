/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react';
import { TwinButton, IconButton, GradientButton } from './TwinButton';
import { Heart, Settings, Share2 } from 'lucide-react';
import tw from 'twin.macro';

const meta = {
  title: 'Atoms/TwinButton',
  component: TwinButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button-Komponente mit Twin.macro für pixel-perfekte Styles und Emotion für dynamische Styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TwinButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div css={tw`flex items-center gap-4`}>
      <TwinButton size="sm">Small</TwinButton>
      <TwinButton size="md">Medium</TwinButton>
      <TwinButton size="lg">Large</TwinButton>
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  args: {
    children: 'Saving...',
    isLoading: true,
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div css={tw`w-full max-w-md`}>
        <Story />
      </div>
    ),
  ],
};

// Icon Buttons
export const IconButtons: Story = {
  render: () => (
    <div css={tw`flex items-center gap-4`}>
      <IconButton size="sm">
        <Heart tw="w-4 h-4" />
      </IconButton>
      <IconButton size="md">
        <Settings tw="w-5 h-5" />
      </IconButton>
      <IconButton size="lg">
        <Share2 tw="w-6 h-6" />
      </IconButton>
    </div>
  ),
};

// Gradient Buttons
export const GradientButtons: Story = {
  render: () => (
    <div css={tw`flex flex-col gap-4`}>
      <GradientButton gradient="sunset">Sunset Gradient</GradientButton>
      <GradientButton gradient="ocean">Ocean Gradient</GradientButton>
      <GradientButton gradient="forest">Forest Gradient</GradientButton>
    </div>
  ),
};

// Complex Layout with Twin
export const ButtonGroup: Story = {
  render: () => (
    <div css={tw`flex flex-col gap-6`}>
      {/* Primary Actions */}
      <div css={tw`flex gap-3`}>
        <TwinButton variant="primary">Save Changes</TwinButton>
        <TwinButton variant="secondary">Cancel</TwinButton>
      </div>
      
      {/* Icon Actions */}
      <div css={tw`flex items-center gap-2 p-4 bg-gray-50 rounded-lg`}>
        <span tw="text-sm text-gray-600 mr-4">Quick Actions:</span>
        <IconButton size="sm">
          <Heart tw="w-4 h-4" />
        </IconButton>
        <IconButton size="sm">
          <Share2 tw="w-4 h-4" />
        </IconButton>
        <IconButton size="sm">
          <Settings tw="w-4 h-4" />
        </IconButton>
      </div>
      
      {/* Feature Buttons */}
      <div css={tw`grid grid-cols-3 gap-4`}>
        <GradientButton gradient="sunset">Premium</GradientButton>
        <GradientButton gradient="ocean">Enterprise</GradientButton>
        <GradientButton gradient="forest">Starter</GradientButton>
      </div>
    </div>
  ),
};

// Responsive Example
export const Responsive: Story = {
  render: () => (
    <div
      css={[
        tw`flex flex-col gap-4`,
        tw`sm:flex-row sm:items-center`,
      ]}
    >
      <TwinButton
        css={[
          tw`w-full`,
          tw`sm:w-auto`,
        ]}
      >
        Mobile First
      </TwinButton>
      <TwinButton
        variant="secondary"
        css={[
          tw`w-full`,
          tw`sm:w-auto`,
        ]}
      >
        Responsive Design
      </TwinButton>
    </div>
  ),
  decorators: [
    (Story) => (
      <div css={tw`w-full max-w-2xl p-4`}>
        <Story />
      </div>
    ),
  ],
};