import React from "react";

/* ================= POSITION ================= */
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-middle"
  | "bottom-left"
  | "bottom-right"
  | "bottom-middle";

/* ================= STATUS ================= */
export type ToastStatus = "idle" | "loading" | "success" | "error";

/* ================= THEMES ================= */
export type PresetToastTheme =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface CustomToastTheme {
  background: string;
  text: string;
  progress?: string;
}

export type ToastTheme = PresetToastTheme | CustomToastTheme;

/* ================= ANIMATION ================= */
export type ToastAnimationState = "entering" | "visible" | "exiting";

/* ================= NOTIFY OPTIONS ================= */
export interface NotifyOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  status?: ToastStatus;
  closable?: boolean;
  theme?: ToastTheme;

  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  transition?: "slide" | "bounce" | "zoom";
}

/* ================= TOAST KINDS ================= */
export type ToastKind = "normal" | "feedback";

/* ================= BASE TOAST ================= */
interface BaseToast {
  id: string;
  position: ToastPosition;
  status: ToastStatus;
  duration: number;
  closable: boolean;
  theme: ToastTheme;
  animation: ToastAnimationState;
  kind: ToastKind;

  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  transition?: "slide" | "bounce" | "zoom";
}

/* ================= NORMAL TOAST ================= */
export interface NormalToast extends BaseToast {
  kind: "normal";
  message: React.ReactNode;
}

/* ================= FEEDBACK TOAST ================= */
export interface FeedbackToast extends BaseToast {
  kind: "feedback";
  title?: string;
  placeholder?: string;
  submitText?: string;
  cancelText?: string;
  onSubmit: (value: string) => void | Promise<string | void>;
}

/* ================= FINAL UNION ================= */
export type ToastType = NormalToast | FeedbackToast;

export type ToastUpdate =
  | (Partial<Omit<NormalToast, "kind" | "id">> & { kind?: "normal" })
  | (Partial<Omit<FeedbackToast, "kind" | "id">> & { kind?: "feedback" });
