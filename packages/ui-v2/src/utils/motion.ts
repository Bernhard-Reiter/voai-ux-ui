/**
 * Cosmic Motion System - Framer Motion Variants
 * Consistent animations across the cosmic interface
 */

export const cosmicMotion = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }
  },

  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] as [number, number, number, number] }
  },

  // Cosmic reveal
  cosmicReveal: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // Cosmic bounce
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

// Hover states
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 30px rgba(79, 70, 229, 0.2)",
    transition: { duration: 0.3 }
  }
};

// Focus states
export const focusRing = {
  whileFocus: {
    outline: "3px solid var(--c-accent)",
    outlineOffset: "2px",
    transition: { duration: 0.15 }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
};

// Reduced motion variants
export const reducedMotion = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.01 }
  }
};