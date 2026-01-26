// src/components/Toast.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ToastTheme,
  PresetToastTheme,
  CustomToastTheme,
} from "../types/types";
import { TOAST_THEMES, ANIMATION_DURATION } from "../core/constants";
import "./toast.css";

export interface ToastProps {
  id: string;
  message: React.ReactNode;
  theme?: ToastTheme;
  duration?: number;
  onClose: (id: string) => void;

  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  transition?: "slide" | "bounce" | "zoom";
}

function resolveTheme(theme?: ToastTheme): CustomToastTheme {
  if (!theme) return TOAST_THEMES.default;

  if (typeof theme === "object") return theme;

  return TOAST_THEMES[theme] ?? TOAST_THEMES.default;
}

export default function Toast({
  id,
  message,
  theme,
  duration = 5000,
  onClose,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  transition = "slide",
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

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    if (timerRef.current && startRef.current) {
      clearTimer();
      const elapsed = Date.now() - startRef.current;
      setRemaining((prev) => prev - elapsed);
    }
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;
    if (remaining > 0) startTimer(remaining);
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
      className={`toast ${isExiting ? "exit" : ""} ${transition}`}
      style={{
        "--toast-bg": colors.background,
        "--toast-text": colors.text,
        "--toast-progress": colors.progress,
      } as React.CSSProperties}
      onClick={() => closeOnClick && handleClose()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={handleClose}>
        ✕
      </button>

      {!hideProgressBar && duration! > 0 && (
        <div
          key={`${id}-${message}`}
          className="toast-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
}
