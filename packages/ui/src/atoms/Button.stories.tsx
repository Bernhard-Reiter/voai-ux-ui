import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { ArrowRight, Download, Heart, Loader2 } from 'lucide-react'
import { LucideIconWrapper } from '../utils/lucide-wrapper'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein vielseitiger Button-Component mit verschiedenen Varianten und Größen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'gradient'],
      description: 'Die visuelle Variante des Buttons',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Die Größe des Buttons',
    },
    asChild: {
      control: 'boolean',
      description: 'Rendert den Button als Child-Component (für Composition)',
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktiviert den Button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic Variants
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Löschen',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
}

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient',
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Klein',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Groß',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <LucideIconWrapper icon={Heart} className="h-4 w-4" />,
  },
}

// With Icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        Download
        <LucideIconWrapper icon={Download} className="ml-2 h-4 w-4" />
      </>
    ),
  },
}

export const IconLeft: Story = {
  args: {
    children: (
      <>
        <LucideIconWrapper icon={ArrowRight} className="mr-2 h-4 w-4" />
        Weiter
      </>
    ),
  },
}

// States
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <LucideIconWrapper icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
        Bitte warten...
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Deaktiviert',
  },
}

// Button Group Example
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Button variant="outline">Abbrechen</Button>
      <Button>Speichern</Button>
    </div>
  ),
}

// All Variants Grid
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="gradient">Gradient</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
