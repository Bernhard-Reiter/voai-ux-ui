import { render, screen, fireEvent } from '@testing-library/react';
import { CosmicFlow } from './CosmicFlow';

describe('CosmicFlow', () => {
  const mockNodes = [
    { id: '1', x: 100, y: 100, label: 'Start', type: 'input' as const },
    { id: '2', x: 300, y: 100, label: 'Process' },
    { id: '3', x: 500, y: 100, label: 'End', type: 'output' as const },
  ];

  const mockConnections = [
    { id: 'c1', source: '1', target: '2' },
    { id: 'c2', source: '2', target: '3' },
  ];

  beforeEach(() => {
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      clearRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      quadraticCurveTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
      fillText: jest.fn(),
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 1,
      font: '',
      textAlign: '',
      textBaseline: '',
    })) as any;

    HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      right: 800,
      bottom: 600,
      width: 800,
      height: 600,
    })) as any;
  });

  it('renders canvas element', () => {
    const { container } = render(<CosmicFlow />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe('CANVAS');
  });

  it('renders with custom dimensions', () => {
    const { container } = render(<CosmicFlow width={1000} height={800} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveAttribute('width', '1000');
    expect(canvas).toHaveAttribute('height', '800');
  });

  it('renders zoom controls', () => {
    render(<CosmicFlow />);
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset view')).toBeInTheDocument();
  });

  it('shows zoom level', () => {
    render(<CosmicFlow />);
    expect(screen.getByText('Zoom: 100%')).toBeInTheDocument();
  });

  it('handles zoom in', () => {
    render(<CosmicFlow />);
    const zoomIn = screen.getByLabelText('Zoom in');
    
    fireEvent.click(zoomIn);
    expect(screen.getByText('Zoom: 120%')).toBeInTheDocument();
  });

  it('handles zoom out', () => {
    render(<CosmicFlow />);
    const zoomOut = screen.getByLabelText('Zoom out');
    
    fireEvent.click(zoomOut);
    expect(screen.getByText('Zoom: 83%')).toBeInTheDocument();
  });

  it('handles reset view', () => {
    render(<CosmicFlow />);
    const zoomIn = screen.getByLabelText('Zoom in');
    const reset = screen.getByLabelText('Reset view');
    
    fireEvent.click(zoomIn);
    fireEvent.click(zoomIn);
    expect(screen.getByText('Zoom: 144%')).toBeInTheDocument();
    
    fireEvent.click(reset);
    expect(screen.getByText('Zoom: 100%')).toBeInTheDocument();
  });

  it('calls draw when nodes change', () => {
    const { rerender } = render(<CosmicFlow nodes={[]} />);
    const ctx = HTMLCanvasElement.prototype.getContext();
    
    rerender(<CosmicFlow nodes={mockNodes} />);
    
    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled(); // For drawing nodes
  });

  it('calls draw when connections change', () => {
    const { rerender } = render(<CosmicFlow nodes={mockNodes} connections={[]} />);
    const ctx = HTMLCanvasElement.prototype.getContext();
    
    rerender(<CosmicFlow nodes={mockNodes} connections={mockConnections} />);
    
    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.quadraticCurveTo).toHaveBeenCalled(); // For drawing connections
  });

  it('handles mouse wheel for zoom', () => {
    const { container } = render(<CosmicFlow />);
    const canvas = container.querySelector('canvas')!;
    
    fireEvent.wheel(canvas, { deltaY: -100 });
    expect(screen.getByText('Zoom: 110%')).toBeInTheDocument();
    
    fireEvent.wheel(canvas, { deltaY: 100 });
    expect(screen.getByText('Zoom: 99%')).toBeInTheDocument();
  });

  it('prevents zoom beyond limits', () => {
    const { container } = render(<CosmicFlow />);
    const canvas = container.querySelector('canvas')!;
    
    // Zoom out to minimum
    for (let i = 0; i < 20; i++) {
      fireEvent.wheel(canvas, { deltaY: 100 });
    }
    expect(screen.getByText('Zoom: 10%')).toBeInTheDocument();
    
    // Zoom in to maximum
    for (let i = 0; i < 30; i++) {
      fireEvent.wheel(canvas, { deltaY: -100 });
    }
    expect(screen.getByText('Zoom: 500%')).toBeInTheDocument();
  });

  it('respects readOnly prop', () => {
    const onNodesChange = jest.fn();
    const { container } = render(
      <CosmicFlow 
        nodes={mockNodes} 
        onNodesChange={onNodesChange}
        readOnly
      />
    );
    
    const canvas = container.querySelector('canvas')!;
    
    // Try to drag
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    fireEvent.mouseUp(canvas);
    
    expect(onNodesChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<CosmicFlow className="custom-flow" />);
    expect(screen.getByRole('img', { hidden: true }).parentElement).toHaveClass('custom-flow');
  });
});