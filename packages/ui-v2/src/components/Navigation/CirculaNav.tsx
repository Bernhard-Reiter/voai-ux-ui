import * as React from 'react';
import { cn } from '../../utils';

export interface CirculaNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface CirculaNavProps {
  items: CirculaNavItem[];
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  onItemClick?: (item: CirculaNavItem) => void;
  className?: string;
}

/**
 * CirculaNav - Clean top navigation bar
 * Minimal design without colored accents, black text for active states
 */
export const CirculaNav: React.FC<CirculaNavProps> = ({
  items,
  logo,
  cta,
  onItemClick,
  className,
}) => {
  return (
    <nav
      className={cn(
        'h-[72px] bg-[var(--circula-white)] border-b border-[var(--circula-gray-100)]',
        'sticky top-0 z-[var(--circula-z-sticky)]',
        className
      )}
    >
      <div className="circula-container h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          {logo && <div className="flex items-center">{logo}</div>}
          
          {/* Navigation Items */}
          <div className="flex items-center h-full mx-auto">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={cn(
                  'relative px-[var(--circula-space-5)] h-full',
                  'text-[var(--circula-text-base)] transition-colors duration-[var(--circula-transition-fast)]',
                  'hover:text-[var(--circula-gray-900)]',
                  item.active
                    ? 'text-[var(--circula-gray-900)] font-[var(--circula-font-medium)]'
                    : 'text-[var(--circula-gray-600)] font-[var(--circula-font-normal)]'
                )}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          
          {/* CTA */}
          {cta && <div className="ml-auto">{cta}</div>}
        </div>
      </div>
    </nav>
  );
};

CirculaNav.displayName = 'CirculaNav';

export interface CirculaSideNavProps {
  items: CirculaNavItem[];
  collapsed?: boolean;
  logo?: React.ReactNode;
  onItemClick?: (item: CirculaNavItem) => void;
  className?: string;
}

/**
 * CirculaSideNav - Minimal side navigation
 */
export const CirculaSideNav: React.FC<CirculaSideNavProps> = ({
  items,
  collapsed = false,
  logo,
  onItemClick,
  className,
}) => {
  return (
    <aside
      className={cn(
        'bg-[var(--circula-white)] h-full transition-all duration-[var(--circula-transition-slow)]',
        'border-r border-[var(--circula-gray-100)]',
        collapsed ? 'w-[64px]' : 'w-[240px]',
        className
      )}
    >
      {/* Logo Area */}
      {logo && (
        <div
          className={cn(
            'h-[72px] border-b border-[var(--circula-gray-100)] flex items-center',
            collapsed ? 'px-[var(--circula-space-3)]' : 'px-[var(--circula-space-5)]'
          )}
        >
          {logo}
        </div>
      )}
      
      {/* Navigation Items */}
      <div
        className={cn(
          'py-[var(--circula-space-4)]',
          collapsed ? 'px-[var(--circula-space-2)]' : 'px-[var(--circula-space-3)]'
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={cn(
              'w-full flex items-center gap-[var(--circula-space-3)] rounded-[var(--circula-radius-sm)]',
              'text-[var(--circula-text-sm)] transition-all duration-[var(--circula-transition-fast)]',
              collapsed
                ? 'px-[var(--circula-space-2)] py-[var(--circula-space-2)]'
                : 'px-[var(--circula-space-3)] py-[var(--circula-space-2)]',
              'hover:bg-[var(--circula-gray-50)]',
              item.active
                ? 'text-[var(--circula-gray-900)] font-[var(--circula-font-medium)] bg-[var(--circula-gray-50)]'
                : 'text-[var(--circula-gray-600)] font-[var(--circula-font-normal)] hover:text-[var(--circula-gray-900)]'
            )}
            title={collapsed ? item.label : undefined}
          >
            {item.icon && (
              <span
                className={cn('flex-shrink-0', collapsed && 'mx-auto')}
              >
                {item.icon}
              </span>
            )}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
};

CirculaSideNav.displayName = 'CirculaSideNav';

/**
 * CirculaLogo - Minimal logo component
 */
export const CirculaLogo: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-[var(--circula-space-2)]">
      <div className="w-2 h-2 bg-[var(--circula-gray-900)] rounded-full" />
      {!collapsed && (
        <span className="text-[var(--circula-text-xl)] font-[var(--circula-font-bold)] text-[var(--circula-gray-900)]">
          voai
        </span>
      )}
    </div>
  );
};

CirculaLogo.displayName = 'CirculaLogo';

/**
 * CirculaMobileNav - Mobile navigation
 */
export const CirculaMobileNav: React.FC<CirculaNavProps> = ({
  items,
  onItemClick,
  className,
}) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-[var(--circula-white)]',
        'border-t border-[var(--circula-gray-200)]',
        'flex justify-around py-[var(--circula-space-2)]',
        'z-[var(--circula-z-fixed)]',
        className
      )}
    >
      {items.slice(0, 5).map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className={cn(
            'flex flex-col items-center gap-1 p-[var(--circula-space-2)]',
            'text-[var(--circula-text-xs)] transition-colors duration-[var(--circula-transition-fast)]',
            item.active
              ? 'text-[var(--circula-gray-900)]'
              : 'text-[var(--circula-gray-500)]'
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

CirculaMobileNav.displayName = 'CirculaMobileNav';