import type { Meta, StoryObj } from '@storybook/react';
import { StarCard, StarCardHeader, StarCardTitle, StarCardDescription, StarCardContent } from './StarCard';
import { WaypointBtn } from '../../atoms/WaypointBtn/WaypointBtn';

const meta = {
  title: 'Cosmic Guide/Molecules/StarCard',
  component: StarCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cosmic content container that groups related content in the cosmic interface',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StarCard className="w-80">
      <StarCardHeader>
        <StarCardTitle>Explore Constellations</StarCardTitle>
        <StarCardDescription>
          Navigate through your data universe
        </StarCardDescription>
      </StarCardHeader>
      <StarCardContent>
        <p>Discover patterns and connections in your customer data constellation.</p>
      </StarCardContent>
    </StarCard>
  ),
};

export const WithGlow: Story = {
  render: () => (
    <StarCard className="w-80" glow>
      <StarCardHeader>
        <StarCardTitle>Premium Features</StarCardTitle>
        <StarCardDescription>
          Unlock the full cosmic experience
        </StarCardDescription>
      </StarCardHeader>
      <StarCardContent>
        <p className="mb-4">Access advanced analytics and AI-powered insights.</p>
        <WaypointBtn variant="primary" size="sm" className="w-full">
          Upgrade Now
        </WaypointBtn>
      </StarCardContent>
    </StarCard>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-4xl">
      <StarCard>
        <StarCardHeader>
          <StarCardTitle>Sales Constellation</StarCardTitle>
          <StarCardDescription>Track deals</StarCardDescription>
        </StarCardHeader>
        <StarCardContent>
          <div className="text-2xl font-bold">$2.4M</div>
          <p className="text-sm opacity-70">This quarter</p>
        </StarCardContent>
      </StarCard>
      
      <StarCard glow>
        <StarCardHeader>
          <StarCardTitle>Customer Nebula</StarCardTitle>
          <StarCardDescription>Active users</StarCardDescription>
        </StarCardHeader>
        <StarCardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-sm opacity-70">+12% growth</p>
        </StarCardContent>
      </StarCard>
      
      <StarCard>
        <StarCardHeader>
          <StarCardTitle>Data Orbit</StarCardTitle>
          <StarCardDescription>Sync status</StarCardDescription>
        </StarCardHeader>
        <StarCardContent>
          <div className="text-2xl font-bold text-green-600">Active</div>
          <p className="text-sm opacity-70">Last sync: 2m ago</p>
        </StarCardContent>
      </StarCard>
    </div>
  ),
};