import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import { ToastType } from "../types/types";
import { resolveIcon } from "../internal/resolveIcon";
import { resolveTheme } from "../internal/resolveTheme";
import { resolveFeedback } from "../internal/resolveFeedback";
import { iconVariants } from "../internal/resolveAnimation";

const SWIPE_CLOSE = 90;

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

  /* ================= RESOLVERS ================= */

  const colors = resolveTheme(theme, mode);
  const resolvedIcon = resolveIcon(toast);
  const isLoading = toast.status === "loading";

  /* ================= FEEDBACK STATE ================= */

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
    const { title, helperText, placeholder, submitText } =
      resolveFeedback(toast);

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
        {/* Header */}
        <div className="feedback-head">
          <strong className="toast-title">{title}</strong>

          <button
            className="toast-close"
            onClick={() => onClose(id)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Helper text */}
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
      {/* Icon */}
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

      {/* Message */}
      <span className="toast-message">{toast.message}</span>

      {/* Close */}
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

      {/* Progress bar */}
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
