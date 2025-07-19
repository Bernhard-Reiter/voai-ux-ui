import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CometInput, CometTextarea } from './CometForm';

describe('CometInput', () => {
  it('renders with label', () => {
    render(<CometInput label="Email Address" />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<CometInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<CometInput label="Name" />);
    
    const input = screen.getByLabelText('Name');
    await user.type(input, 'John Doe');
    
    expect(input).toHaveValue('John Doe');
  });

  it('can be disabled', () => {
    render(<CometInput label="Disabled Input" disabled />);
    const input = screen.getByLabelText('Disabled Input');
    
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('applies custom className', () => {
    render(<CometInput label="Custom" className="w-full" />);
    expect(screen.getByLabelText('Custom')).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CometInput ref={ref} label="Ref Test" />);
    expect(ref).toHaveBeenCalled();
  });

  it('generates unique id when not provided', () => {
    render(
      <>
        <CometInput label="Input 1" />
        <CometInput label="Input 2" />
      </>
    );
    
    const input1 = screen.getByLabelText('Input 1');
    const input2 = screen.getByLabelText('Input 2');
    
    expect(input1.id).toBeTruthy();
    expect(input2.id).toBeTruthy();
    expect(input1.id).not.toBe(input2.id);
  });

  it('uses provided id', () => {
    render(<CometInput id="custom-id" label="Custom ID" />);
    expect(screen.getByLabelText('Custom ID')).toHaveAttribute('id', 'custom-id');
  });
});

describe('CometTextarea', () => {
  it('renders with label', () => {
    render(<CometTextarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<CometTextarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<CometTextarea label="Description" />);
    
    const textarea = screen.getByLabelText('Description');
    await user.type(textarea, 'This is a test description');
    
    expect(textarea).toHaveValue('This is a test description');
  });

  it('can be disabled', () => {
    render(<CometTextarea label="Disabled Textarea" disabled />);
    const textarea = screen.getByLabelText('Disabled Textarea');
    
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('has resize-y and min-height by default', () => {
    render(<CometTextarea label="Resizable" />);
    const textarea = screen.getByLabelText('Resizable');
    
    expect(textarea).toHaveClass('resize-y', 'min-h-[80px]');
  });

  it('applies custom className', () => {
    render(<CometTextarea label="Custom" className="h-40" />);
    expect(screen.getByLabelText('Custom')).toHaveClass('h-40');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CometTextarea ref={ref} label="Ref Test" />);
    expect(ref).toHaveBeenCalled();
  });

  it('supports all textarea attributes', () => {
    render(
      <CometTextarea 
        label="Limited" 
        maxLength={100}
        rows={5}
        cols={50}
      />
    );
    
    const textarea = screen.getByLabelText('Limited');
    expect(textarea).toHaveAttribute('maxLength', '100');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '50');
  });
});