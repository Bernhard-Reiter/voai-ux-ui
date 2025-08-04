# CosmicFlow - Canvas-based Flow Visualization

## Overview

CosmicFlow is a canvas-based flow visualization component that renders nodes and connections with interactive pan, zoom, and drag capabilities.

## Features

- **Canvas Rendering**: High-performance canvas-based rendering
- **Interactive Nodes**: Drag nodes to reposition them
- **Pan & Zoom**: Click and drag to pan, mouse wheel to zoom
- **Connection Arrows**: Curved connection lines with directional arrows
- **Node Types**: Support for input, output, and default node types
- **Grid Background**: Visual grid for alignment
- **Zoom Controls**: Built-in zoom in/out and reset buttons
- **Read-only Mode**: Optional read-only mode to prevent editing

## Usage

```tsx
import { CosmicFlow } from '@voai/ui';

const nodes = [
  { id: '1', x: 100, y: 100, label: 'Start', type: 'input' },
  { id: '2', x: 300, y: 100, label: 'Process' },
  { id: '3', x: 500, y: 100, label: 'End', type: 'output' },
];

const connections = [
  { id: 'c1', source: '1', target: '2' },
  { id: 'c2', source: '2', target: '3' },
];

function FlowDiagram() {
  const [currentNodes, setCurrentNodes] = useState(nodes);

  return (
    <CosmicFlow
      nodes={currentNodes}
      connections={connections}
      onNodesChange={setCurrentNodes}
      width={800}
      height={600}
    />
  );
}
```

## Node Types

- **input**: Green nodes, typically used for data sources
- **output**: Red nodes, typically used for final outputs
- **default**: Gray nodes, used for intermediate processing

## Interactions

### Mouse Controls
- **Drag Node**: Click and drag on a node to move it
- **Pan Canvas**: Click and drag on empty space to pan the view
- **Zoom**: Use mouse wheel to zoom in/out at cursor position

### Button Controls
- **Zoom In**: Click + button to zoom in by 20%
- **Zoom Out**: Click - button to zoom out by 20%
- **Reset View**: Click reset button to return to 100% zoom at origin

## Props

```tsx
interface CosmicFlowProps {
  nodes?: CosmicNode[];
  connections?: CosmicConnection[];
  onNodesChange?: (nodes: CosmicNode[]) => void;
  onConnectionsChange?: (connections: CosmicConnection[]) => void;
  width?: number;
  height?: number;
  className?: string;
  readOnly?: boolean;
}
```

## Node Structure

```tsx
interface CosmicNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type?: 'default' | 'input' | 'output';
  data?: Record<string, any>;
}
```

## Connection Structure

```tsx
interface CosmicConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}
```

## Styling

The component uses CSS variables for theming:
- Node colors based on type
- Grid lines use `--c-border-subtle`
- Connection lines use `--c-primary`
- Controls use surface and border colors

## Performance

- Canvas-based rendering for smooth performance with many nodes
- Efficient redraw only when state changes
- Zoom limits (10% to 500%) prevent performance issues