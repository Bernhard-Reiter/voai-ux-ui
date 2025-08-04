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

  let mockContext: any;

  beforeEach(() => {
    // Mock canvas context
    mockContext = {
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
    };
    
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

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

  it('renders nodes on canvas', () => {
    render(<CosmicFlow nodes={mockNodes} />);
    
    // Check that canvas drawing methods were called
    expect(mockContext.clearRect).toHaveBeenCalled();
    expect(mockContext.arc).toHaveBeenCalledTimes(mockNodes.length); // One arc per node
  });

  it('renders connections on canvas', () => {
    render(<CosmicFlow nodes={mockNodes} connections={mockConnections} />);
    
    // Check that canvas drawing methods were called for connections
    expect(mockContext.quadraticCurveTo).toHaveBeenCalledTimes(mockConnections.length); // One curve per connection
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
    
    // Find zoom text and check it's at or near minimum
    let zoomText = screen.getByText(/Zoom: \d+%/);
    let zoomValue = parseInt(zoomText.textContent!.match(/\d+/)![0]);
    expect(zoomValue).toBeLessThanOrEqual(12); // Allow for floating point precision
    expect(zoomValue).toBeGreaterThanOrEqual(10);
    
    // Zoom in to maximum
    for (let i = 0; i < 50; i++) {
      fireEvent.wheel(canvas, { deltaY: -100 });
    }
    
    // Check that zoom is at maximum
    zoomText = screen.getByText(/Zoom: \d+%/);
    zoomValue = parseInt(zoomText.textContent!.match(/\d+/)![0]);
    expect(zoomValue).toBe(500);
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
    const { container } = render(<CosmicFlow className="custom-flow" />);
    const flowContainer = container.querySelector('.cosmic-flow-container');
    expect(flowContainer).toHaveClass('custom-flow');
  });
});