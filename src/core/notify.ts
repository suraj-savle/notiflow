import React from "react";
import { generateId } from "../utils/generateId";
import { NotifyOptions, ToastType, ToastUpdate } from "../types/types";
import { toastStore } from "./storeBridge";
import { setToastTimeout, clearToastTimeout } from "./timeoutManager";
import { ANIMATION_DURATION } from "./constants";
import { injectNotiflowStyles } from "./injectStyles";

/* ================= MAIN NOTIFY ================= */

const notifyImpl = (
  message: React.ReactNode,
  options: NotifyOptions = {}
): string => {
  injectNotiflowStyles();

  const id = options.id ?? generateId();

  const toast: ToastType = {
    id,
    kind: "normal",
    message,

    position: options.position ?? "top-right",
    status: options.status ?? "idle",
    duration: options.duration ?? 5000,
    closable: options.closable ?? true,
    theme: options.theme ?? "default",
    animation: "entering",

    hideProgressBar: options.hideProgressBar ?? false,
    closeOnClick: options.closeOnClick ?? true,
    pauseOnHover: options.pauseOnHover ?? true,
    draggable: options.draggable ?? false,
    transition: options.transition ?? "slide",
  };

  toastStore.add(toast);

  setTimeout(() => {
    toastStore.update(id, { animation: "visible" });
  }, 10);

  if (toast.duration > 0) {
    setToastTimeout(id, toast.duration, () => exitToast(id));
  }

  return id;
};

/* ================= EXIT ================= */

function exitToast(id: string) {
  toastStore.update(id, { animation: "exiting" });

  setTimeout(() => {
    toastStore.remove(id);
  }, ANIMATION_DURATION);
}

/* ================= TYPE ================= */

type NotifyFn = {
  (message: React.ReactNode, options?: NotifyOptions): string;

  update: (id: string, updates: ToastUpdate) => void;


  promise: <T>(
    p: Promise<T>,
    options: {
      loading: React.ReactNode;
      success: React.ReactNode;
      error: React.ReactNode;
    }
  ) => Promise<T>;

  feedback: (options: {
    title?: string;
    placeholder?: string;
    submitText?: string;
    cancelText?: string;
    onSubmit: (value: string) => void | Promise<string | void>;
  }) => string;
};

/* ================= EXPORT ================= */

export const notify = notifyImpl as NotifyFn;

/* ================= UPDATE ================= */

notify.update = (id, updates) => {
  toastStore.update(id, updates);

  if (updates.duration !== undefined) {
    clearToastTimeout(id);

    if (updates.duration > 0) {
      setToastTimeout(id, updates.duration, () => exitToast(id));
    }
  }
};

/* ================= PROMISE ================= */

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
  });

  promise
    .then(() => {
      notify.update(id, {
        message: messages.success,
        status: "success",
        theme: "success",
        duration: 3000,
      });
    })
    .catch(() => {
      notify.update(id, {
        message: messages.error,
        status: "error",
        theme: "error",
        duration: 3000,
      });
    });

  return promise;
};

/* ================= FEEDBACK ================= */

notify.feedback = (options) => {
  injectNotiflowStyles();

  const id = generateId();

  const toast: ToastType = {
    id,
    kind: "feedback",
    position: "top-right",
    status: "idle",
    duration: 0,
    closable: false,
    theme: "default",
    animation: "entering",

    title: options.title ?? "Feedback",
    placeholder: options.placeholder ?? "Type here...",
    submitText: options.submitText ?? "Send",
    cancelText: options.cancelText ?? "Cancel",
    onSubmit: options.onSubmit,
  };

  toastStore.add(toast);
  return id;
};
