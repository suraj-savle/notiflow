import { ToastType } from "../types/types";
import { ToastUpdate } from "../store/toastStore";

let handlers: any = null;

export const toastStore = {
  register(h: any) {
    handlers = h;
  },
  add(toast: ToastType) {
    handlers?.add(toast);
  },
  remove(id: string) {
    handlers?.remove(id);
  },
  update(id: string, updates: ToastUpdate) {
    handlers?.update(id, updates);
  },
};
