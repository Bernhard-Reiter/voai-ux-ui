import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { LucideIconWrapper } from '../utils/lucide-wrapper';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein kompakter Badge-Component zur Anzeige von Status, Labels oder Kategorien.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'Die visuelle Variante des Badges',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const InfoVariant: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

// With Icons
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <LucideIconWrapper icon={CheckCircle} className="mr-1 h-3 w-3" />
        Aktiv
      </Badge>
      <Badge variant="destructive">
        <LucideIconWrapper icon={XCircle} className="mr-1 h-3 w-3" />
        Fehler
      </Badge>
      <Badge variant="warning">
        <LucideIconWrapper icon={AlertCircle} className="mr-1 h-3 w-3" />
        Warnung
      </Badge>
      <Badge variant="info">
        <LucideIconWrapper icon={Info} className="mr-1 h-3 w-3" />
        Info
      </Badge>
    </div>
  ),
};

// Status Badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Online</Badge>
      <Badge variant="destructive">Offline</Badge>
      <Badge variant="warning">Wartung</Badge>
      <Badge variant="secondary">Entwurf</Badge>
      <Badge>Veröffentlicht</Badge>
    </div>
  ),
};

// Category Badges
export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Entwicklung</Badge>
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">Marketing</Badge>
      <Badge variant="outline">Vertrieb</Badge>
      <Badge variant="outline">Support</Badge>
    </div>
  ),
};

// Priority Badges
export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">Kritisch</Badge>
      <Badge variant="warning">Hoch</Badge>
      <Badge variant="info">Mittel</Badge>
      <Badge variant="secondary">Niedrig</Badge>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};