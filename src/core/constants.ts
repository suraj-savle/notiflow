// src/core/constants.ts
import { PresetToastTheme, CustomToastTheme } from "../types/types";

/* ================= COLOR MODE ================= */

export type ColorMode = "light" | "dark";

/* ================= GRADIENT BUILDER ================= */

const createGradient = (direction: string, colors: string[]) => 
  `linear-gradient(${direction}, ${colors.join(", ")})`;

/* ================= THEMES WITH GRADIENTS ================= */

export const TOAST_THEMES: Record<
  ColorMode,
  Record<PresetToastTheme, CustomToastTheme>
> = {
  light: {
    default: {
      background: createGradient("135deg", [
        "#ffffff",
        "#f8fafc",
        "#f1f5f9"
      ]),
      text: "#111827",
      progress: "#2563eb",
    },
    success: {
      background: createGradient("135deg", [
        "#ecfdf5",
        "#d1fae5",
        "#a7f3d0"
      ]),
      text: "#065f46",
      progress: "#22c55e",
    },
    error: {
      background: createGradient("135deg", [
        "#fef2f2",
        "#fee2e2",
        "#fecaca"
      ]),
      text: "#991b1b",
      progress: "#ef4444",
    },
    warning: {
      background: createGradient("135deg", [
        "#fffbeb",
        "#fef3c7",
        "#fde68a"
      ]),
      text: "#92400e",
      progress: "#f59e0b",
    },
    info: {
      background: createGradient("135deg", [
        "#eff6ff",
        "#dbeafe",
        "#bfdbfe"
      ]),
      text: "#1e3a8a",
      progress: "#3b82f6",
    },
  },

  dark: {
    default: {
      background: createGradient("135deg", [
        "#1f2937",
        "#111827",
        "#0f172a"
      ]),
      text: "#ffffff",
      progress: "#3b82f6",
    },
    success: {
      background: createGradient("135deg", [
        "#16a34a",
        "#15803d",
        "#166534"
      ]),
      text: "#ffffff",
      progress: "#22c55e",
    },
    error: {
      background: createGradient("135deg", [
        "#dc2626",
        "#b91c1c",
        "#991b1b"
      ]),
      text: "#ffffff",
      progress: "#ef4444",
    },
    warning: {
      background: createGradient("135deg", [
        "#f59e0b",
        "#d97706",
        "#b45309"
      ]),
      text: "#000000",
      progress: "#fbbf24",
    },
    info: {
      background: createGradient("135deg", [
        "#2563eb",
        "#1d4ed8",
        "#1e40af"
      ]),
      text: "#ffffff",
      progress: "#3b82f6",
    },
  },
};

/* ================= ANIMATION ================= */

export const ANIMATION_DURATION = 300;

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