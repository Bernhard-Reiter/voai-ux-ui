import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Card';
import { Button } from '../../atoms/Button';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a card description that provides context.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. You can add any elements inside.</p>
      </CardContent>
    </Card>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>
          A card with interactive elements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This card has a button for actions.</p>
        <Button variant="primary" size="sm">
          Take Action
        </Button>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <h3 className="font-semibold mb-2">Simple Card</h3>
      <p className="text-gray-600">
        Cards don't always need headers. You can use them as simple containers.
      </p>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4">
        <h4 className="font-medium mb-2">Feature 1</h4>
        <p className="text-sm text-gray-600">
          Description of the first feature.
        </p>
      </Card>
      <Card className="p-4">
        <h4 className="font-medium mb-2">Feature 2</h4>
        <p className="text-sm text-gray-600">
          Description of the second feature.
        </p>
      </Card>
      <Card className="p-4">
        <h4 className="font-medium mb-2">Feature 3</h4>
        <p className="text-sm text-gray-600">
          Description of the third feature.
        </p>
      </Card>
    </div>
  ),
};