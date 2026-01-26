// src/components/NotifyContainer.tsx
import React, { useEffect } from "react";
import { useToastStore } from "../store/toastStore";
import { toastStore } from "../core/storeBridge";
import Toast from "./Toast";
import { ToastPosition, ToastType } from "../types/types";

export interface NotifyContainerProps {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  theme?: "default" | "light" | "success" | "error" | "warning" | "info";
  transition?: "slide" | "bounce" | "zoom";
}

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-middle",
  "top-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export const NotifyContainer: React.FC<NotifyContainerProps> = (props) => {
  const {
    position = "top-right",
    autoClose = 5000,
    hideProgressBar = false,
    newestOnTop = false,
    closeOnClick = true,
    rtl = false,
    pauseOnFocusLoss = true,
    draggable = true,
    pauseOnHover = true,
    theme = "default",
    transition = "slide",
  } = props;

  const { toasts, dispatch } = useToastStore();

  useEffect(() => {
    toastStore.register({
      add: (toast: ToastType) => dispatch({ type: "ADD_TOAST", toast }),
      remove: (id: string) => dispatch({ type: "REMOVE_TOAST", id }),
      update: (id: string, updates: Partial<ToastType>) =>
        dispatch({ type: "UPDATE_TOAST", id, updates }),
    });
  }, [dispatch]);

  const sortedToasts = newestOnTop ? [...toasts].reverse() : toasts;

  return (
    <>
      {POSITIONS.map((pos) => (
        <div key={pos} style={getContainerStyle(pos, rtl)}>
          {sortedToasts
            .filter((t) => t.position === pos)
            .map((t) => (
              <Toast
                key={t.id}
                id={t.id}
                message={t.message}
                theme={t.theme ?? theme}
                duration={t.duration ?? autoClose}
                hideProgressBar={hideProgressBar}
                closeOnClick={closeOnClick}
                pauseOnHover={pauseOnHover}
                draggable={draggable}
                transition={transition}
                onClose={(id) => dispatch({ type: "REMOVE_TOAST", id })}
              />
            ))}
        </div>
      ))}
    </>
  );
};

function getContainerStyle(
  position: ToastPosition,
  rtl: boolean
): React.CSSProperties {
  const style: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    pointerEvents: "none",
  };

  /* vertical */
  if (position.startsWith("top")) style.top = "16px";
  if (position.startsWith("bottom")) style.bottom = "16px";

  /* horizontal */
  if (position.endsWith("left")) {
    style.left = rtl ? "unset" : "16px";
    style.right = rtl ? "16px" : "unset";
  }

  if (position.endsWith("right")) {
    style.right = rtl ? "unset" : "16px";
    style.left = rtl ? "16px" : "unset";
  }

  if (position.endsWith("middle")) {
    style.left = "50%";
    style.right = "unset";
    style.transform = "translateX(-50%)";
  }

  return style;
}