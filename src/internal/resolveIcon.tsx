import React from "react";
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { ToastType } from "../types/types";

export function resolveIcon(toast: ToastType): React.ReactNode {
  if (toast.icon === false) return null;

  if (typeof toast.icon === "function") {
    return toast.icon(toast);
  }

  if (toast.icon) return toast.icon;

  switch (toast.status) {
    case "success":
      return <CheckCircle size={18} />;
    case "error":
      return <AlertCircle size={18} />;
    case "loading":
      return (
        <Loader2
          size={18}
          className="toast-spinner"
          style={
            {
              "--spin-duration": `${toast.duration ?? 1000}ms`,
            } as React.CSSProperties
          }
        />
      );
  }

  if (typeof toast.theme === "string") {
    if (toast.theme === "info") return <Info size={18} />;
    if (toast.theme === "warning") return <AlertTriangle size={18} />;
  }

  return null;
}
