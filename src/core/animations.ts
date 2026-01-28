// src/core/animations.ts
export const toastVariants = {
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
};
