import * as React from 'react';
import { cn } from '../../utils';
import { useVirtualizer } from '@tanstack/react-virtual';

export interface NebulaGridColumn<T = any> {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  resizable?: boolean;
}

export interface NebulaGridProps<T = any> {
  data: T[];
  columns: NebulaGridColumn<T>[];
  rowHeight?: number;
  headerHeight?: number;
  onRowClick?: (row: T, index: number) => void;
  selectedRowIndex?: number;
  density?: 'compact' | 'normal' | 'spacious';
  className?: string;
  stickyHeader?: boolean;
  virtualize?: boolean;
  emptyMessage?: string;
}

/**
 * NebulaGrid - Cosmic data-dense table with virtualization
 * High-performance grid for exploring data constellations
 */
export function NebulaGrid<T = any>({
  data,
  columns,
  rowHeight = 48,
  headerHeight = 56,
  onRowClick,
  selectedRowIndex,
  density = 'normal',
  className,
  stickyHeader = true,
  virtualize = true,
  emptyMessage = 'No data to display',
}: NebulaGridProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});

  // Density-based row heights
  const densityHeights = {
    compact: 36,
    normal: 48,
    spacious: 64,
  };
  const actualRowHeight = densityHeights[density];

  // Virtual row management
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => actualRowHeight,
    overscan: 5,
    enabled: virtualize && data.length > 50,
  });

  // Column resize handler
  const handleColumnResize = (columnId: string, delta: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: Math.max(50, (prev[columnId] || 150) + delta),
    }));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.(data[rowIndex], rowIndex);
    }
  };

  const virtualRows = virtualize && data.length > 50 
    ? rowVirtualizer.getVirtualItems()
    : data.map((_, index) => ({ index, start: index * actualRowHeight, size: actualRowHeight }));

  return (
    <div
      className={cn(
        'cosmic-surface rounded-[var(--radius-md)] overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex bg-[var(--c-surface)] border-b border-[var(--c-border)]',
          stickyHeader && 'sticky top-0 z-10'
        )}
        style={{ height: headerHeight }}
      >
        {columns.map((column, colIndex) => (
          <div
            key={column.id}
            className={cn(
              'flex items-center px-[var(--space-2)] font-medium text-[var(--c-text-secondary)]',
              'border-r border-[var(--c-border)] last:border-r-0',
              column.sortable && 'cursor-pointer hover:text-[var(--c-text-primary)]'
            )}
            style={{ 
              width: columnWidths[column.id] || column.width || 'auto',
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              flex: !column.width && !columnWidths[column.id] ? 1 : undefined,
            }}
          >
            <span className="truncate">{column.header}</span>
            {column.resizable && (
              <div
                className="w-1 h-full cursor-col-resize hover:bg-[var(--c-accent)] ml-auto"
                onMouseDown={(e) => {
                  const startX = e.pageX;
                  const startWidth = columnWidths[column.id] || column.width || 150;
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    handleColumnResize(column.id, e.pageX - startX);
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: `calc(100% - ${headerHeight}px)` }}
      >
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-[var(--c-text-secondary)]">
            {emptyMessage}
          </div>
        ) : (
          <div
            style={{
              height: virtualize && data.length > 50 
                ? `${rowVirtualizer.getTotalSize()}px`
                : `${data.length * actualRowHeight}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualRows.map((virtualRow) => {
              const row = data[virtualRow.index];
              const isSelected = selectedRowIndex === virtualRow.index;
              
              return (
                <div
                  key={virtualRow.index}
                  className={cn(
                    'flex border-b border-[var(--c-border)] transition-colors',
                    'hover:bg-[var(--c-surface)] cursor-pointer',
                    isSelected && 'bg-[var(--c-accent)]/10',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-inset'
                  )}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => onRowClick?.(row, virtualRow.index)}
                  onKeyDown={(e) => handleKeyDown(e, virtualRow.index)}
                  tabIndex={0}
                  role="row"
                  aria-selected={isSelected}
                >
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className={cn(
                        'flex items-center px-[var(--space-2)]',
                        'border-r border-[var(--c-border)] last:border-r-0',
                        'truncate'
                      )}
                      style={{ 
                        width: columnWidths[column.id] || column.width || 'auto',
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        flex: !column.width && !columnWidths[column.id] ? 1 : undefined,
                      }}
                      role="gridcell"
                    >
                      {column.accessor(row)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}