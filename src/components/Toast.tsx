import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

/* ================= ICON RESOLUTION ================= */

function resolveIcon(toast: ToastType) {
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

/* ================= ICON ANIMATION ================= */

const iconVariants = {
  slide: {
    initial: { x: -8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  bounce: {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  zoom: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
};

/* ================= COMPONENT ================= */

export default function Toast({
  toast,
  onClose,
}: {
  toast: ToastType;
  onClose: (id: string) => void;
}) {
  const {
    id,
    duration,
    theme = "default",
    mode = "light",
    hideProgressBar,
    closeOnClick,
    draggable,
  } = toast;

  /* ===== THEME RESOLUTION (LIGHT / DARK) ===== */

  const colors = typeof theme === "object" ? theme : TOAST_THEMES[mode][theme];

  const resolvedIcon = resolveIcon(toast);
  const isLoading = toast.status === "loading";

  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= AUTO CLOSE ================= */

  useEffect(() => {
    if (toast.kind === "feedback") return;
    if (!duration || duration === 0) return;

    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, toast.kind, onClose]);

  /* ================= FEEDBACK TOAST ================= */

  if (toast.kind === "feedback") {
    const title = toast.title ?? "Feedback";
    const helperText = toast.helperText ?? "Your feedback helps us improve.";
    const placeholder = toast.placeholder ?? "Share your thoughts...";
    const submitText = toast.submitText ?? "Send";

    return (
      <motion.div
        className="toast feedback"
        style={{
          background: colors.background,
          color: colors.text,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="feedback-head">

          {/* Title */}
          <strong className="toast-title">{title}</strong>

          <button
            className="toast-close"
            onClick={() => onClose(id)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Helper line */}
        <p className="toast-subtext">{helperText}</p>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder={placeholder}
        />

        {/* Actions */}
        <div className="toast-actions">
          <button
            className="toast-btn submit"
            disabled={!input || submitting}
            onClick={async () => {
              setSubmitting(true);
              await toast.onSubmit(input);
              onClose(id);
            }}
          >
            {submitting ? "Sending..." : submitText}
          </button>
        </div>
      </motion.div>
    );
  }

  /* ================= NORMAL TOAST ================= */

  return (
    <motion.div
      className="toast"
      style={
        {
          "--toast-bg": colors.background,
          "--toast-text": colors.text,
          "--toast-progress": colors.progress,
        } as React.CSSProperties
      }
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      data-draggable={draggable}
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
      {resolvedIcon && (
        <motion.span
          className="toast-icon"
          variants={iconVariants[toast.transition ?? "slide"]}
          initial="initial"
          animate="animate"
        >
          {resolvedIcon}
        </motion.span>
      )}

      <span className="toast-message">{toast.message}</span>

      {!isLoading && toast.closable && (
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

      {!hideProgressBar && duration > 0 && !isLoading && (
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
