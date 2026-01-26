import { ToastType } from "../types/types";

let handlers: any = null;
let registered = false;

export const toastStore = {
  register(h: any) {
    if (registered) return;
    handlers = h;
    registered = true;
  },
  add(toast: any) {
    handlers?.add(toast);
  },
  remove(id: string) {
    handlers?.remove(id);
  },
  update(id: string, updates: any) {
    handlers?.update(id, updates);
  }
};

