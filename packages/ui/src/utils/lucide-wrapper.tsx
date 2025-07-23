import * as React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Wrapper function to correctly type Lucide icons for use as JSX components
 * This resolves TypeScript errors when using Lucide icons in React components
 */
export function LucideIconWrapper({ icon: IconComponent, ...props }: { icon: LucideIcon } & Omit<LucideProps, 'ref'>) {
  // Cast the component to avoid type issues
  const Component = IconComponent as React.ComponentType<LucideProps>;
  return <Component {...props} />;
}