import type { Meta, StoryObj } from '@storybook/react';
import { CosmicFlow } from './CosmicFlow';
import { useState } from 'react';
import type { CosmicNode, CosmicConnection } from './CosmicFlow';

const meta = {
  title: 'Atoms/CosmicFlow',
  component: CosmicFlow,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/cosmic-flow-canvas',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CosmicFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 800,
    height: 600,
  },
};

export const WithNodes: Story = {
  args: {
    width: 800,
    height: 600,
    nodes: [
      { id: '1', x: 150, y: 300, label: 'Start', type: 'input' },
      { id: '2', x: 400, y: 200, label: 'Process A' },
      { id: '3', x: 400, y: 400, label: 'Process B' },
      { id: '4', x: 650, y: 300, label: 'End', type: 'output' },
    ],
  },
};

export const WithConnections: Story = {
  args: {
    width: 800,
    height: 600,
    nodes: [
      { id: '1', x: 150, y: 300, label: 'Input', type: 'input' },
      { id: '2', x: 400, y: 200, label: 'Transform' },
      { id: '3', x: 400, y: 400, label: 'Validate' },
      { id: '4', x: 650, y: 300, label: 'Output', type: 'output' },
    ],
    connections: [
      { id: 'c1', source: '1', target: '2' },
      { id: 'c2', source: '1', target: '3' },
      { id: 'c3', source: '2', target: '4' },
      { id: 'c4', source: '3', target: '4' },
    ],
  },
};

const InteractiveComponent = () => {
  const [nodes, setNodes] = useState<CosmicNode[]>([
    { id: '1', x: 100, y: 100, label: 'Drag Me', type: 'input' },
    { id: '2', x: 300, y: 100, label: 'Move Me' },
    { id: '3', x: 500, y: 100, label: 'Drag Me Too', type: 'output' },
  ]);

  const [connections] = useState<CosmicConnection[]>([
    { id: 'c1', source: '1', target: '2' },
    { id: 'c2', source: '2', target: '3' },
  ]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-[var(--c-text-secondary)]">
        <p>Try these interactions:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Drag nodes to reposition them</li>
          <li>Click and drag on empty space to pan</li>
          <li>Use mouse wheel to zoom in/out</li>
          <li>Click zoom controls in the bottom right</li>
        </ul>
      </div>
      <CosmicFlow
        nodes={nodes}
        connections={connections}
        onNodesChange={setNodes}
        width={800}
        height={400}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};

const ComplexFlowComponent = () => {
  const [nodes] = useState<CosmicNode[]>([
    { id: 'input', x: 100, y: 250, label: 'Data Source', type: 'input' },
    { id: 'parse', x: 250, y: 150, label: 'Parse' },
    { id: 'validate', x: 250, y: 350, label: 'Validate' },
    { id: 'transform', x: 400, y: 250, label: 'Transform' },
    { id: 'enrich', x: 550, y: 150, label: 'Enrich' },
    { id: 'filter', x: 550, y: 350, label: 'Filter' },
    { id: 'aggregate', x: 700, y: 250, label: 'Aggregate' },
    { id: 'output', x: 850, y: 250, label: 'Output', type: 'output' },
  ]);

  const [connections] = useState<CosmicConnection[]>([
    { id: 'c1', source: 'input', target: 'parse' },
    { id: 'c2', source: 'input', target: 'validate' },
    { id: 'c3', source: 'parse', target: 'transform' },
    { id: 'c4', source: 'validate', target: 'transform' },
    { id: 'c5', source: 'transform', target: 'enrich' },
    { id: 'c6', source: 'transform', target: 'filter' },
    { id: 'c7', source: 'enrich', target: 'aggregate' },
    { id: 'c8', source: 'filter', target: 'aggregate' },
    { id: 'c9', source: 'aggregate', target: 'output' },
  ]);

  return (
    <CosmicFlow
      nodes={nodes}
      connections={connections}
      width={1000}
      height={500}
    />
  );
};

export const ComplexFlow: Story = {
  render: () => <ComplexFlowComponent />,
};

export const ReadOnly: Story = {
  args: {
    width: 800,
    height: 400,
    readOnly: true,
    nodes: [
      { id: '1', x: 150, y: 200, label: 'Read Only', type: 'input' },
      { id: '2', x: 400, y: 200, label: 'Cannot Drag' },
      { id: '3', x: 650, y: 200, label: 'Fixed Position', type: 'output' },
    ],
    connections: [
      { id: 'c1', source: '1', target: '2' },
      { id: 'c2', source: '2', target: '3' },
    ],
  },
};

export const EmptyCanvas: Story = {
  args: {
    width: 800,
    height: 600,
    nodes: [],
    connections: [],
  },
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
  args: {
    width: 800,
    height: 400,
    nodes: [
      { id: '1', x: 150, y: 200, label: 'Dark Start', type: 'input' },
      { id: '2', x: 400, y: 200, label: 'Dark Process' },
      { id: '3', x: 650, y: 200, label: 'Dark End', type: 'output' },
    ],
    connections: [
      { id: 'c1', source: '1', target: '2' },
      { id: 'c2', source: '2', target: '3' },
    ],
  },
};

export const SmallCanvas: Story = {
  args: {
    width: 400,
    height: 300,
    nodes: [
      { id: '1', x: 100, y: 150, label: 'A' },
      { id: '2', x: 200, y: 150, label: 'B' },
      { id: '3', x: 300, y: 150, label: 'C' },
    ],
    connections: [
      { id: 'c1', source: '1', target: '2' },
      { id: 'c2', source: '2', target: '3' },
    ],
  },
};

export const LargeCanvas: Story = {
  args: {
    width: 1200,
    height: 800,
    nodes: [
      { id: '1', x: 200, y: 400, label: 'Large Canvas', type: 'input' },
      { id: '2', x: 600, y: 200, label: 'Top Node' },
      { id: '3', x: 600, y: 600, label: 'Bottom Node' },
      { id: '4', x: 1000, y: 400, label: 'End Node', type: 'output' },
    ],
    connections: [
      { id: 'c1', source: '1', target: '2' },
      { id: 'c2', source: '1', target: '3' },
      { id: 'c3', source: '2', target: '4' },
      { id: 'c4', source: '3', target: '4' },
    ],
  },
};