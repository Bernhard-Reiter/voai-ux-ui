import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "warning", "error", "outline"],
      description: "Visual style variant of the badge",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">
        <svg
          className="mr-1 h-3 w-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
        Active
      </Badge>
      <Badge variant="warning">
        <svg
          className="mr-1 h-3 w-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Pending
      </Badge>
      <Badge variant="error">
        <svg
          className="mr-1 h-3 w-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        Offline
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">API Status:</span>
        <Badge variant="success">Operational</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Build Status:</span>
        <Badge variant="warning">Building...</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Service Status:</span>
        <Badge variant="error">Maintenance</Badge>
      </div>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Messages</span>
        <Badge variant="default">24</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Notifications</span>
        <Badge variant="secondary">5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Updates</span>
        <Badge variant="outline">12</Badge>
      </div>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    children: "This is a badge with longer text content",
    variant: "secondary",
  },
};