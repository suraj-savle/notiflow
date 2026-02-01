// src/core/constants.ts
import { PresetToastTheme, CustomToastTheme } from "../types/types";

/* ================= COLOR MODE ================= */

export type ColorMode = "light" | "dark";

/* ================= GRADIENT BUILDER ================= */

const createGradient = (direction: string, colors: string[]) => 
  `linear-gradient(${direction}, ${colors.join(", ")})`;

/* ================= THEMES WITH GRADIENTS ================= */
/* ================= THEMES WITH REFINED GRADIENTS ================= */

export const TOAST_THEMES: Record<
  ColorMode,
  Record<PresetToastTheme, CustomToastTheme>
> = {
  light: {
    default: {
      background: createGradient("135deg", ["#ffffff", "#f9fafb"]),
      text: "#1f2937",
      progress: "#111827", // Modern high-contrast accent
    },
    success: {
      background: createGradient("135deg", ["#f0fdf4", "#dcfce7"]),
      text: "#166534",
      progress: "#22c55e",
    },
    error: {
      background: createGradient("135deg", ["#fef2f2", "#fee2e2"]),
      text: "#991b1b",
      progress: "#ef4444",
    },
    warning: {
      background: createGradient("135deg", ["#fffbeb", "#fef3c7"]),
      text: "#92400e",
      progress: "#f59e0b",
    },
    info: {
      background: createGradient("135deg", ["#f0f9ff", "#e0f2fe"]),
      text: "#075985",
      progress: "#0ea5e9",
    },
  },

  dark: {
    default: {
      // Deep Charcoal instead of Navy
      background: createGradient("135deg", ["#171717", "#0a0a0a"]),
      text: "#f5f5f5",
      progress: "#ffffff",
    },
    success: {
      background: createGradient("135deg", ["#064e3b", "#022c22"]),
      text: "#ecfdf5",
      progress: "#10b981",
    },
    error: {
      background: createGradient("135deg", ["#450a0a", "#2d0606"]),
      text: "#fef2f2",
      progress: "#ef4444",
    },
    warning: {
      background: createGradient("135deg", ["#451a03", "#290e02"]),
      text: "#fffbeb",
      progress: "#f59e0b",
    },
    info: {
      background: createGradient("135deg", ["#082f49", "#0c4a6e"]),
      text: "#f0f9ff",
      progress: "#0ea5e9",
    },
  },
};

/* ================= ANIMATION ================= */

export const ANIMATION_DURATION = 400;

export const TRANSITIONS = {
  slide: {
    enter: "toast-slide-enter",
    exit: "toast-slide-exit",
  },
  bounce: {
    enter: "toast-bounce-enter",
    exit: "toast-bounce-exit",
  },
  zoom: {
    enter: "toast-zoom-enter",
    exit: "toast-zoom-exit",
  },
} as const;

export type ToastTransition = keyof typeof TRANSITIONS;