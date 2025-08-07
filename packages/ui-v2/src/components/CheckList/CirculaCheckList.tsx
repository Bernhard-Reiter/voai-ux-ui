import * as React from 'react';
import { cn } from '../../utils';

export interface CheckListItem {
  id: string;
  text: string;
  checked?: boolean;
}

export interface CirculaCheckListProps {
  items: CheckListItem[];
  className?: string;
}

/**
 * CheckIcon - Green checkmark icon for success states
 * Uses Apple green (#41a344) - the ONLY place where green is used
 */
const CheckIcon: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizes = {
    sm: { wrapper: 16, svg: 10 },
    md: { wrapper: 24, svg: 24 },
    lg: { wrapper: 32, svg: 32 },
  };
  
  if (size === 'sm') {
    return (
      <div
        className={cn(
          'w-4 h-4 rounded-full bg-[var(--circula-success)] flex items-center justify-center flex-shrink-0',
          className
        )}
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  
  return (
    <svg
      width={sizes[size].svg}
      height={sizes[size].svg}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="var(--circula-success)" />
      <path
        d="M7.5 12.5L10.5 15.5L16.5 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * CirculaCheckList - Feature list with green checkmarks
 * Clean design with Apple green success indicators
 */
export const CirculaCheckList: React.FC<CirculaCheckListProps> = ({ 
  items, 
  className 
}) => {
  return (
    <div className={cn('space-y-[var(--circula-space-3)]', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-[var(--circula-space-3)]"
        >
          <CheckIcon className="flex-shrink-0 mt-[2px]" />
          <span className="text-[var(--circula-text-base)] text-[var(--circula-gray-700)] leading-[var(--circula-leading-normal)]">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

CirculaCheckList.displayName = 'CirculaCheckList';

/**
 * CirculaCheckListCompact - Compact version for smaller spaces
 */
export const CirculaCheckListCompact: React.FC<CirculaCheckListProps> = ({ 
  items, 
  className 
}) => {
  return (
    <div className={cn('space-y-[var(--circula-space-2)]', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-[var(--circula-space-2)]"
        >
          <CheckIcon size="sm" />
          <span className="text-[var(--circula-text-sm)] text-[var(--circula-gray-700)]">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

CirculaCheckListCompact.displayName = 'CirculaCheckListCompact';

/**
 * CirculaCheckListCard - Feature list inside a card
 */
interface CirculaCheckListCardProps extends CirculaCheckListProps {
  title?: string;
  description?: string;
}

export const CirculaCheckListCard: React.FC<CirculaCheckListCardProps> = ({
  items,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-[var(--circula-white)] border border-[var(--circula-gray-100)]',
        'rounded-[var(--circula-radius-lg)] p-[var(--circula-space-6)]',
        className
      )}
    >
      {title && (
        <h3 className="text-[var(--circula-text-xl)] font-[var(--circula-font-semibold)] text-[var(--circula-gray-900)] mb-[var(--circula-space-2)]">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-[var(--circula-text-base)] text-[var(--circula-gray-600)] mb-[var(--circula-space-5)]">
          {description}
        </p>
      )}
      <CirculaCheckList items={items} />
    </div>
  );
};

CirculaCheckListCard.displayName = 'CirculaCheckListCard';

/**
 * CirculaSuccessMessage - Success notification with green checkmark
 */
export const CirculaSuccessMessage: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-[var(--circula-success-light)] text-[var(--circula-gray-900)]',
        'px-[var(--circula-space-4)] py-[var(--circula-space-3)]',
        'rounded-[var(--circula-radius-sm)]',
        'border border-[rgba(65,163,68,0.2)]',
        'flex items-start gap-[var(--circula-space-3)]',
        className
      )}
    >
      <CheckIcon size="sm" className="mt-[2px]" />
      <div className="text-[var(--circula-text-sm)]">{children}</div>
    </div>
  );
};

CirculaSuccessMessage.displayName = 'CirculaSuccessMessage';