import React, { createContext, useContext, useReducer } from "react";
import { ToastType, NormalToast, FeedbackToast } from "../types/types";

/* ================= SAFE UPDATE TYPE ================= */

export type ToastUpdate =
  | Partial<Omit<NormalToast, "id" | "kind">>
  | Partial<Omit<FeedbackToast, "id" | "kind">>;

/* ================= ACTIONS ================= */

type Action =
  | { type: "ADD_TOAST"; toast: ToastType }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "UPDATE_TOAST"; id: string; updates: ToastUpdate };

/* ================= REDUCER ================= */

function reducer(state: ToastType[], action: Action): ToastType[] {
  switch (action.type) {
    case "ADD_TOAST":
      if (state.some((t) => t.id === action.toast.id)) {
        return state; // ⛔ prevent duplicate
      }
      return [...state, action.toast];

    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.id);

    case "UPDATE_TOAST":
      return state.map((toast) =>
        toast.id === action.id ? { ...toast, ...action.updates } : toast,
      );

    default:
      return state;
  }
}

/* ================= CONTEXT ================= */

const ToastContext = createContext<{
  toasts: ToastType[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

/* ================= PROVIDER ================= */

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, dispatch] = useReducer(reducer, []);

  return (
    <ToastContext.Provider value={{ toasts, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

/* ================= HOOK ================= */

export function useToastStore() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastStore must be used inside ToastProvider");
  }
  return ctx;
}
