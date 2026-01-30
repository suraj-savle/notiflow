import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ToastType } from "../types/types";
import { TOAST_THEMES } from "../core/constants";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";


const SWIPE_CLOSE = 90;

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {

function getToastIcon(
  status?: ToastType["status"],
  theme?: ToastType["theme"]
) {
  const key = status ?? (typeof theme === "string" ? theme : "default");

  switch (key) {
    case "success":
      return <CheckCircle size={18} />;
    case "error":
      return <AlertCircle size={18} />;
    case "warning":
      return <AlertTriangle size={18} />;
    case "info":
      return <Info size={18} />;
    case "loading":
      return <Loader2 size={18} className="toast-spin" />;
    default:
      return null;
  }
}


  const {
    id,
    duration,
    theme = "default",
    hideProgressBar,
    closeOnClick,
    draggable,
  } = toast;

  const colors =
    typeof theme === "object"
      ? theme
      : (TOAST_THEMES[theme] ?? TOAST_THEMES.default);

  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // auto close (non-feedback)
  useEffect(() => {
    if (toast.kind === "feedback") return;
    if (!duration || duration === 0) return;

    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, toast.kind, onClose]);

  /* ---------------- FEEDBACK TOAST ---------------- */
  if (toast.kind === "feedback") {
    return (
      <motion.div
        className="toast feedback"
        style={{
          background: colors.background,
          color: colors.text,
          pointerEvents: "auto",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // prevent accidental close
      >
        {toast.title && <strong className="toast-title">{toast.title}</strong>}

        <textarea
          placeholder={toast.placeholder ?? "Your feedback..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
        />

        <div className="toast-actions">
          <button className="toast-btn cancel" onClick={() => onClose(id)}>
            {toast.cancelText ?? "Cancel"}
          </button>

          <button
            className="toast-btn submit"
            disabled={!input || submitting}
            onClick={async () => {
              setSubmitting(true);
              await toast.onSubmit(input);
              onClose(id);
            }}
          >
            {submitting ? "Sending..." : (toast.submitText ?? "Send")}
          </button>
        </div>
      </motion.div>
    );
  }

  /* ---------------- NORMAL TOAST ---------------- */
  return (
    <motion.div
      className="toast"
      style={
        {
          "--toast-bg": colors.background,
          "--toast-text": colors.text,
          "--toast-progress": colors.progress,
          pointerEvents: "auto",
        } as React.CSSProperties
      }
      data-draggable={draggable}
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (draggable && Math.abs(info.offset.x) > SWIPE_CLOSE) {
          onClose(id);
        }
      }}
      onClick={() => closeOnClick && onClose(id)}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {getToastIcon(toast.status, toast.theme)}

      <span className="toast-message">{toast.message}</span>

      {toast.closable && (
        <button
          className="toast-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
        >
           <X size={18} />
        </button>
      )}

      {!hideProgressBar && duration > 0 && (
        <motion.div
          className="toast-progress"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
