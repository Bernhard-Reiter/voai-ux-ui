import * as React from 'react';
import { cn } from '../../utils/cn';

export interface CosmicNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type?: 'default' | 'input' | 'output';
  data?: Record<string, any>;
}

export interface CosmicConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface CosmicFlowProps {
  nodes?: CosmicNode[];
  connections?: CosmicConnection[];
  onNodesChange?: (nodes: CosmicNode[]) => void;
  width?: number;
  height?: number;
  className?: string;
  readOnly?: boolean;
}

interface ViewTransform {
  x: number;
  y: number;
  zoom: number;
}

/**
 * CosmicFlow - Canvas-based flow visualization component
 * Renders nodes and connections with pan/zoom support
 */
export const CosmicFlow = React.forwardRef<HTMLCanvasElement, CosmicFlowProps>(
  (
    {
      nodes = [],
      connections = [],
      onNodesChange,
      width = 800,
      height = 600,
      className,
      readOnly = false,
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [transform, setTransform] = React.useState<ViewTransform>({
      x: 0,
      y: 0,
      zoom: 1,
    });
    const [draggedNode, setDraggedNode] = React.useState<string | null>(null);
    const [isPanning, setIsPanning] = React.useState(false);
    const [panStart, setPanStart] = React.useState({ x: 0, y: 0 });

    // Combine refs
    React.useImperativeHandle(ref, () => canvasRef.current!);

    // Convert screen coordinates to world coordinates
    const screenToWorld = React.useCallback(
      (screenX: number, screenY: number) => {
        return {
          x: (screenX - transform.x) / transform.zoom,
          y: (screenY - transform.y) / transform.zoom,
        };
      },
      [transform]
    );


    // Find node at position
    const getNodeAtPosition = React.useCallback(
      (x: number, y: number) => {
        const worldPos = screenToWorld(x, y);
        const nodeRadius = 30;

        for (const node of nodes) {
          const distance = Math.sqrt(
            Math.pow(worldPos.x - node.x, 2) + Math.pow(worldPos.y - node.y, 2)
          );
          if (distance <= nodeRadius) {
            return node;
          }
        }
        return null;
      },
      [nodes, screenToWorld]
    );

    // Draw the canvas
    const draw = React.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Save context state
      ctx.save();

      // Apply transform
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.zoom, transform.zoom);

      // Draw grid
      ctx.strokeStyle = 'var(--c-border-subtle)';
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      const startX = Math.floor(-transform.x / transform.zoom / gridSize) * gridSize;
      const endX = Math.ceil((width - transform.x) / transform.zoom / gridSize) * gridSize;
      const startY = Math.floor(-transform.y / transform.zoom / gridSize) * gridSize;
      const endY = Math.ceil((height - transform.y) / transform.zoom / gridSize) * gridSize;

      for (let x = startX; x <= endX; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }

      for (let y = startY; y <= endY; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }

      // Draw connections
      ctx.strokeStyle = 'var(--c-primary)';
      ctx.lineWidth = 2;
      connections.forEach((connection) => {
        const sourceNode = nodes.find((n) => n.id === connection.source);
        const targetNode = nodes.find((n) => n.id === connection.target);

        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          
          // Draw curved line
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const cx = sourceNode.x + dx * 0.5;
          const cy = sourceNode.y + dy * 0.5 - Math.abs(dx) * 0.1;
          
          ctx.quadraticCurveTo(cx, cy, targetNode.x, targetNode.y);
          ctx.stroke();

          // Draw arrow
          const angle = Math.atan2(targetNode.y - cy, targetNode.x - cx);
          const arrowLength = 10;
          const arrowAngle = Math.PI / 6;

          ctx.beginPath();
          ctx.moveTo(targetNode.x, targetNode.y);
          ctx.lineTo(
            targetNode.x - arrowLength * Math.cos(angle - arrowAngle),
            targetNode.y - arrowLength * Math.sin(angle - arrowAngle)
          );
          ctx.moveTo(targetNode.x, targetNode.y);
          ctx.lineTo(
            targetNode.x - arrowLength * Math.cos(angle + arrowAngle),
            targetNode.y - arrowLength * Math.sin(angle + arrowAngle)
          );
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = draggedNode === node.id;

        // Node background
        ctx.fillStyle = isSelected
          ? 'var(--c-primary)'
          : node.type === 'input'
          ? 'var(--c-success)'
          : node.type === 'output'
          ? 'var(--c-error)'
          : 'var(--c-surface-elevated)';

        ctx.beginPath();
        ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = 'var(--c-border)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node label
        ctx.fillStyle = isSelected ? 'white' : 'var(--c-text)';
        ctx.font = '14px var(--font-sans)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      // Restore context state
      ctx.restore();
    }, [nodes, connections, transform, width, height, draggedNode]);

    // Redraw on changes
    React.useEffect(() => {
      draw();
    }, [draw]);

    // Mouse handlers
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (readOnly) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const node = getNodeAtPosition(x, y);
      if (node) {
        setDraggedNode(node.id);
      } else {
        setIsPanning(true);
        setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (draggedNode && !readOnly) {
        const worldPos = screenToWorld(x, y);
        const updatedNodes = nodes.map((node) =>
          node.id === draggedNode
            ? { ...node, x: worldPos.x, y: worldPos.y }
            : node
        );
        onNodesChange?.(updatedNodes);
      } else if (isPanning) {
        setTransform((prev) => ({
          ...prev,
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedNode(null);
      setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(5, transform.zoom * scaleFactor));

      // Zoom towards mouse position
      const worldPos = screenToWorld(x, y);
      const newScreenPos = {
        x: worldPos.x * newZoom,
        y: worldPos.y * newZoom,
      };

      setTransform({
        x: x - newScreenPos.x,
        y: y - newScreenPos.y,
        zoom: newZoom,
      });
    };

    return (
      <div className={cn('cosmic-flow-container relative', className)}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="cosmic-flow-canvas border border-[var(--c-border)] rounded-[var(--radius-md)] cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: draggedNode ? 'grabbing' : isPanning ? 'grabbing' : 'grab' }}
        />
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            className="cosmic-flow-zoom-in p-2 bg-[var(--c-surface-elevated)] border border-[var(--c-border)] rounded-[var(--radius-sm)] hover:bg-[var(--c-surface-hover)]"
            onClick={() => setTransform((prev) => ({ ...prev, zoom: Math.min(5, prev.zoom * 1.2) }))}
            aria-label="Zoom in"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 7a.5.5 0 0 0-1 0V6a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0 0 1h1v1H8a.5.5 0 0 0 0 1h1v1H8a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .5-.5V9h1a.5.5 0 0 0 0-1h-1V7z"/>
              <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
          </button>
          <button
            className="cosmic-flow-zoom-out p-2 bg-[var(--c-surface-elevated)] border border-[var(--c-border)] rounded-[var(--radius-sm)] hover:bg-[var(--c-surface-hover)]"
            onClick={() => setTransform((prev) => ({ ...prev, zoom: Math.max(0.1, prev.zoom / 1.2) }))}
            aria-label="Zoom out"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 7.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
              <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
          </button>
          <button
            className="cosmic-flow-reset p-2 bg-[var(--c-surface-elevated)] border border-[var(--c-border)] rounded-[var(--radius-sm)] hover:bg-[var(--c-surface-hover)]"
            onClick={() => setTransform({ x: 0, y: 0, zoom: 1 })}
            aria-label="Reset view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
        </div>

        {/* Status */}
        <div className="absolute top-4 left-4 text-xs text-[var(--c-text-secondary)]">
          Zoom: {(transform.zoom * 100).toFixed(0)}%
        </div>
      </div>
    );
  }
);

CosmicFlow.displayName = 'CosmicFlow';