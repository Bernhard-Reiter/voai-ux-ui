import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";

const meta = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content. This is where your main content goes.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant="success">Active</Badge>
        </div>
        <CardDescription>Monitor your project progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <p className="text-center text-gray-600">Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};