import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useToastStore, ToastUpdate } from "../store/toastStore";
import { toastStore } from "../core/storeBridge";
import Toast from "./Toast";
import { ToastPosition, ToastType } from "../types/types";

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-middle",
  "top-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export const NotifyContainer = () => {
  const { toasts, dispatch } = useToastStore();

  useEffect(() => {
    toastStore.register({
      add: (toast: ToastType) =>
        dispatch({ type: "ADD_TOAST", toast }),

      remove: (id: string) =>
        dispatch({ type: "REMOVE_TOAST", id }),

      update: (id: string, updates: ToastUpdate) =>
        dispatch({ type: "UPDATE_TOAST", id, updates }),
    });
  }, [dispatch]);

  return (
    <>
      {POSITIONS.map((pos) => (
        <div key={pos} style={getContainerStyle(pos)}>
          <AnimatePresence initial={false}>
            {toasts
              .filter((t) => t.position === pos)
              .map((toast) => (
                <Toast
                  key={toast.id}
                  toast={toast}
                  onClose={(id: string) =>
                    dispatch({ type: "REMOVE_TOAST", id })
                  }
                />
              ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

function getContainerStyle(position: ToastPosition): React.CSSProperties {
  const style: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    pointerEvents: "none",
  };

  if (position.startsWith("top")) style.top = 16;
  if (position.startsWith("bottom")) style.bottom = 16;
  if (position.endsWith("left")) style.left = 16;
  if (position.endsWith("right")) style.right = 16;
  if (position.endsWith("middle")) {
    style.left = "50%";
    style.transform = "translateX(-50%)";
  }

  return style;
}
