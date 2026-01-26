import React, { createContext, useContext, useReducer } from "react";
import { ToastType } from "../types/types";

type Action =
  | { type: "ADD_TOAST"; toast: ToastType }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "UPDATE_TOAST"; id: string; updates: Partial<ToastType> };

function toastReducer(state: ToastType[], action: Action): ToastType[] {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast];

    case "REMOVE_TOAST":
      return state.filter(t => t.id !== action.id);

    case "UPDATE_TOAST":
      return state.map(t =>
        t.id === action.id ? { ...t, ...action.updates } : t
      );

    default:
      return state;
  }
}

const ToastContext = createContext<{
  toasts: ToastType[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={{ toasts, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToastStore() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}
