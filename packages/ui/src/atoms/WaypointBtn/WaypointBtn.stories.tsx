import type { Meta, StoryObj } from '@storybook/react';
import { WaypointBtn } from './WaypointBtn';

const meta = {
  title: 'Cosmic Guide/Atoms/WaypointBtn',
  component: WaypointBtn,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cosmic Guide button component for CTAs and quick actions throughout the universe',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
  },
} satisfies Meta<typeof WaypointBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Launch CRM',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Reports',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Learn More',
    variant: 'ghost',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-4 items-center">
        <WaypointBtn size="sm">Small</WaypointBtn>
        <WaypointBtn size="md">Medium</WaypointBtn>
        <WaypointBtn size="lg">Large</WaypointBtn>
      </div>
    </div>
  ),
};

export const CosmicActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Cosmic Quick Actions</h3>
      <div className="flex gap-3">
        <WaypointBtn variant="primary">Launch CRM</WaypointBtn>
        <WaypointBtn variant="secondary">Add Contact</WaypointBtn>
        <WaypointBtn variant="ghost">Settings</WaypointBtn>
      </div>
    </div>
  ),
};