import React from "react";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-middle"
  | "bottom-left"
  | "bottom-right"
  | "bottom-middle";

export type ToastStatus = "idle" | "loading" | "success" | "error";

/* 🔹 Preset theme names */
export type PresetToastTheme =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info";

/* 🔹 Custom theme object */
export interface CustomToastTheme {
  background: string;
  text: string;
  progress: string;
}

/* 🔹 Final theme type (string OR object) */
export type ToastTheme = PresetToastTheme | CustomToastTheme;

export type ToastAnimationState = "entering" | "visible" | "exiting";

export interface NotifyOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  status?: ToastStatus;
  closable?: boolean;
  theme?: ToastTheme; // ✅ now supports custom themes
}

export interface ToastType {
  id: string;
  message: React.ReactNode;
  position: ToastPosition;
  status: ToastStatus;
  duration: number;
  closable: boolean;
  theme: ToastTheme; // ✅ stored safely
  animation: ToastAnimationState;
}
