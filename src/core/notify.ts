import React from "react";
import { generateId } from "../utils/generateId";
import { NotifyOptions, ToastType } from "../types/types";
import { toastStore } from "./storeBridge";
import { setToastTimeout, clearToastTimeout } from "./timeoutManager";
import { ANIMATION_DURATION } from "./constants";
import { injectNotiflowStyles } from "./injectStyles";

export function notify(
  message: React.ReactNode,
  options: NotifyOptions = {}
) {
  injectNotiflowStyles();
  const id = options.id ?? generateId();

  const toast: ToastType = {
    id,
    message,

    position: options.position ?? "top-right",
    status: options.status ?? "idle",
    duration: options.duration ?? 5000,
    closable: options.closable ?? true,
    theme: options.theme ?? "default",
    animation: "entering",

    // toastify-like defaults
    hideProgressBar: options.hideProgressBar ?? false,
    closeOnClick: options.closeOnClick ?? true,
    pauseOnHover: options.pauseOnHover ?? true,
    draggable: options.draggable ?? true,
    transition: options.transition ?? "slide",
  };

  toastStore.add(toast);

  // enter → visible
  setTimeout(() => {
    toastStore.update(id, { animation: "visible" });
  }, 10);

  if (toast.duration > 0) {
    setToastTimeout(id, toast.duration, () => exitToast(id));
  }

  return id;
}


function exitToast(id: string) {
  toastStore.update(id, { animation: "exiting" });

  setTimeout(() => {
    toastStore.remove(id);
  }, ANIMATION_DURATION);
}

notify.update = function (
  id: string,
  updates: Partial<ToastType>
) {
  toastStore.update(id, updates);

  if (updates.duration !== undefined) {
    clearToastTimeout(id);

    if (updates.duration > 0) {
      setToastTimeout(id, updates.duration, () => exitToast(id));
    }
  }
};


notify.promise = function <T>(
  promise: Promise<T>,
  messages: {
    loading: React.ReactNode;
    success: React.ReactNode;
    error: React.ReactNode;
  }
) {
  const id = notify(messages.loading, {
    status: "loading",
    duration: 0,
    theme: "default"
  });

  promise
    .then(() => {
      notify.update(id, {
        message: messages.success,
        status: "success",
        theme: "success",
        duration: 3000
      });
    })
    .catch(() => {
      notify.update(id, {
        message: messages.error,
        status: "error",
        theme: "error",
        duration: 3000
      });
    });

  return promise;
};
