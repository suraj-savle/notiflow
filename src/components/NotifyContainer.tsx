// src/components/NotifyContainer.tsx
import React, { useEffect } from "react";
import { useToastStore } from "../store/toastStore";
import { toastStore } from "../core/storeBridge";
import Toast from "./Toast";
import { ToastPosition } from "../types/types";
import { injectNotiflowStyles } from "../core/injectStyles";

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-middle",
  "top-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export const NotifyContainer: React.FC = () => {
  const { toasts, dispatch } = useToastStore();

  useEffect(() => {
    toastStore.register({
      add: (toast: any) => dispatch({ type: "ADD_TOAST", toast }),
      remove: (id: string) => dispatch({ type: "REMOVE_TOAST", id }),
      update: (id: string, updates: any) =>
        dispatch({ type: "UPDATE_TOAST", id, updates }),
    });
  }, [dispatch]);

  useEffect(() => {
    injectNotiflowStyles(); // 🔥 toastify-style behavior
  }, []);

  const handleClose = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", id });
  };

  return (
    <>
      {POSITIONS.map((position) => (
        <div key={position} style={getContainerStyle(position)}>
          {toasts
            .filter((t) => t.position === position)
            .map((t) => (
              <Toast
                key={t.id}
                id={t.id}
                message={t.message}
                theme={t.theme}
                duration={t.duration}
                onClose={handleClose}
              />
            ))}
        </div>
      ))}
    </>
  );
};

function getContainerStyle(position: ToastPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    pointerEvents: "none",
  };

  if (position.includes("top")) base.top = "16px";
  if (position.includes("bottom")) base.bottom = "16px";
  if (position.includes("left")) base.left = "16px";
  if (position.includes("right")) base.right = "16px";
  if (position.includes("middle")) {
    base.left = "50%";
    base.transform = "translateX(-50%)";
  }

  return base;
}
