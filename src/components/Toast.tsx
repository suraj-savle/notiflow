import React, { useEffect, useRef, useState } from "react";
import {
  ToastTheme,
  CustomToastTheme,
  PresetToastTheme,
} from "../types/types";
import { TOAST_THEMES, ANIMATION_DURATION } from "../core/constants";

function resolveTheme(theme?: ToastTheme): CustomToastTheme {
  if (!theme) return TOAST_THEMES.default;

  // custom object theme
  if (typeof theme === "object") {
    return theme;
  }

  // preset theme name
  return TOAST_THEMES[theme] ?? TOAST_THEMES.default;
}

export interface ToastProps {
  id: string;
  message: React.ReactNode;
  theme?: ToastTheme;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  theme,
  duration = 5000,
  onClose,
}: ToastProps) {
  const colors = resolveTheme(theme);

  const [isExiting, setIsExiting] = useState(false);
  const [remaining, setRemaining] = useState(duration);

  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (ms: number) => {
    startRef.current = Date.now();
    timerRef.current = window.setTimeout(handleClose, ms);
  };

  const handleClose = () => {
    clearTimer();
    setIsExiting(true);
    setTimeout(() => onClose(id), ANIMATION_DURATION);
  };

  useEffect(() => {
    if (duration === 0) return;

    setRemaining(duration);
    clearTimer();
    startTimer(duration);

    return clearTimer;
  }, [id, message, theme, duration]);

  return (
    <div
      className={`toast ${isExiting ? "exit" : ""}`}
      style={{
        "--toast-bg": colors.background,
        "--toast-text": colors.text,
        "--toast-progress": colors.progress,
      } as React.CSSProperties}
    >
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={handleClose}>
        ✕
      </button>

      {duration > 0 && (
        <div
          key={`${id}-${message}`}
          className="toast-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
}
