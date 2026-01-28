// src/core/constants.ts

// 1️⃣ Define allowed theme names
export type ToastTheme = "default" | "success" | "error" | "warning" | "info";


import { PresetToastTheme, CustomToastTheme } from "../types/types";

export const TOAST_THEMES: Record<PresetToastTheme, CustomToastTheme> = {
  default: {
    background: "#1f2937",
    text: "#ffffff",
    progress: "#3b82f6",
  },
  success: {
    background: "#16a34a",
    text: "#ffffff",
    progress: "#22c55e",
  },
  error: {
    background: "#dc2626",
    text: "#ffffff",
    progress: "#ef4444",
  },
  warning: {
    background: "#f59e0b",
    text: "#000000",
    progress: "#fbbf24",
  },
  info: {
    background: "#2563eb",
    text: "#ffffff",
    progress: "#3b82f6",
  },
};

export const ANIMATION_DURATION = 300;

// export const ANIMATION_DURATION = 180;

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
