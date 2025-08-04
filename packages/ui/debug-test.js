// Simple test to check what's happening
const mockOnSubmit = jest.fn();

// Simulate what should happen
const formData = { name: 'John Doe', email: 'john@example.com', message: '' };
mockOnSubmit(formData);

console.log('Mock called with:', mockOnSubmit.mock.calls[0][0]);
console.log('Type:', typeof mockOnSubmit.mock.calls[0][0]);
