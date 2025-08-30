import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo bar', 'baz')).toBe('foo bar baz');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    expect(cn('foo', true && 'bar', 'baz')).toBe('foo bar baz');
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    expect(cn('foo', null, 'bar')).toBe('foo bar');
  });

  it('merges Tailwind classes intelligently', () => {
    // Conflicting classes - later wins
    expect(cn('text-gray-500', 'text-gray-700')).toBe('text-gray-700');
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('mt-2 mb-2', 'my-4')).toBe('my-4');
  });

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
    expect(cn(['foo', false && 'bar'], 'baz')).toBe('foo baz');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn('', '')).toBe('');
    expect(cn(undefined)).toBe('');
    expect(cn(null)).toBe('');
    expect(cn(false)).toBe('');
  });

  it('handles complex Tailwind merging', () => {
    // Padding
    expect(cn('px-4 py-2', 'p-8')).toBe('p-8');
    expect(cn('p-8', 'px-4')).toBe('p-8 px-4');
    
    // Margins
    expect(cn('mx-4 my-2', 'm-8')).toBe('m-8');
    expect(cn('m-8', 'mx-4')).toBe('m-8 mx-4');
    
    // Border radius
    expect(cn('rounded-sm', 'rounded-lg')).toBe('rounded-lg');
    expect(cn('rounded-t-sm rounded-b-sm', 'rounded-md')).toBe('rounded-md');
  });

  it('preserves non-conflicting classes', () => {
    expect(cn('text-gray-500 font-bold', 'text-gray-700')).toBe('font-bold text-gray-700');
    expect(cn('p-4 m-4', 'p-8')).toBe('m-4 p-8');
    expect(cn('bg-gray-500 text-white', 'bg-gray-700 font-bold')).toBe('text-white bg-gray-700 font-bold');
  });

  it('handles responsive and state variants', () => {
    expect(cn('hover:text-gray-500', 'hover:text-gray-700')).toBe('hover:text-gray-700');
    expect(cn('md:p-4', 'md:p-8')).toBe('md:p-8');
    expect(cn('dark:bg-gray-800', 'dark:bg-gray-900')).toBe('dark:bg-gray-900');
  });

  it('handles arbitrary values', () => {
    expect(cn('p-[10px]', 'p-[20px]')).toBe('p-[20px]');
    expect(cn('text-[#6b7280]', 'text-[#374151]')).toBe('text-[#374151]');
  });
});