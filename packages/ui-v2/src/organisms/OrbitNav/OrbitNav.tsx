import * as React from 'react';
import { cn } from '../../utils';

export interface OrbitNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface OrbitNavProps {
  items: OrbitNavItem[];
  onItemClick?: (item: OrbitNavItem) => void;
  className?: string;
}

/**
 * OrbitNav - Navigation (Circula)
 * Minimal top-bar with active accent indicators
 */
export const OrbitNav: React.FC<OrbitNavProps> = ({
  items,
  onItemClick,
  className,
}) => {
  return (
  <nav className={cn('bg-[var(--c-surface)] border-b border-[var(--c-border)]', className)}>
      <div className="max-w-[var(--circula-container-max)] mx-auto px-[var(--circula-container-padding)]">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  'hover:text-[var(--c-text-primary)]',
                  item.active
                    ? 'text-[var(--c-text-primary)]'
                    : 'text-[var(--c-text-secondary)]'
                )}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {item.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--c-accent)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export interface OrbitSideNavProps {
  items: OrbitNavItem[];
  collapsed?: boolean;
  onItemClick?: (item: OrbitNavItem) => void;
  className?: string;
}

/**
 * OrbitSideNav - Collapsible side navigation
 */
export const OrbitSideNav: React.FC<OrbitSideNavProps> = ({
  items,
  collapsed = false,
  onItemClick,
  className,
}) => {
  return (
    <aside
      className={cn(
      'bg-[var(--c-surface)] h-full transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)]',
              'text-sm font-medium transition-all duration-150',
              'hover:bg-[var(--c-surface)]',
              item.active
                ? 'text-[var(--c-accent)] bg-[var(--c-accent)]/10'
                : 'text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]'
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
};