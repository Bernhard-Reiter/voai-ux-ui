import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { cosmicMotion } from '../../utils/motion';
import { motion, AnimatePresence } from 'framer-motion';

export interface PortalGateProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  variant?: 'modal' | 'drawer-left' | 'drawer-right' | 'drawer-bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  backdropClassName?: string;
}

/**
 * PortalGate - Modal/Drawer (Circula)
 * Focus-trapped overlays for important interactions
 */
export const PortalGate: React.FC<PortalGateProps> = ({
  open,
  onClose,
  children,
  title,
  description,
  variant = 'modal',
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  backdropClassName,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const portalRef = React.useRef<HTMLDivElement>(null);

  // Mount portal container
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle escape key
  React.useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!open || !portalRef.current) return;

    const portal = portalRef.current;
    const focusableElements = portal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element
    const previouslyFocused = document.activeElement as HTMLElement;
    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    portal.addEventListener('keydown', handleTab);

    return () => {
      portal.removeEventListener('keydown', handleTab);
      previouslyFocused?.focus();
    };
  }, [open]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  // Variant-specific animations
  const variantMotion = {
    modal: cosmicMotion.scaleIn,
    'drawer-left': {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
    'drawer-right': {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
    'drawer-bottom': {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
  };

  // Variant-specific classes
  const variantClasses = {
    modal: cn(
      'w-full',
      sizeClasses[size],
      'rounded-[var(--radius-md)]',
      'shadow-[var(--elevation-4)]'
    ),
    'drawer-left': 'fixed left-0 top-0 h-full w-80 max-w-[90vw]',
    'drawer-right': 'fixed right-0 top-0 h-full w-80 max-w-[90vw]',
    'drawer-bottom': 'fixed bottom-0 left-0 right-0 max-h-[90vh]',
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          ref={portalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'portal-title' : undefined}
          aria-describedby={description ? 'portal-description' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className={cn(
              'absolute inset-0 bg-black/50 backdrop-blur-[var(--blur-sm)]',
              backdropClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Content */}
          <motion.div
            className={cn(
              'relative bg-[var(--c-bg)] text-[var(--c-text-primary)]',
              'max-h-[90vh] overflow-auto',
              variantClasses[variant],
              className
            )}
            initial={variantMotion[variant].initial}
            animate={variantMotion[variant].animate}
            exit={variantMotion[variant].exit}
            transition={variantMotion[variant].transition}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-[var(--space-3)] border-b border-[var(--c-border)]">
                <div>
                  {title && (
                    <h2 id="portal-title" className="text-[var(--c-text-primary)] font-semibold">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="portal-description" className="text-[var(--c-text-secondary)] text-xs mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={cn(
                      'p-2 rounded-[var(--radius-sm)]',
                      'text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]',
                      'hover:bg-[var(--c-surface)] transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)]'
                    )}
                    aria-label="Close dialog"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M15 5L5 15M5 5l10 10" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-[var(--space-3)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};