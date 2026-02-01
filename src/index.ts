

import { injectNotiflowStyles } from "./styles/injectStyles";

/* inject once when library loads */
injectNotiflowStyles();

/* public api */
export { notify } from "./core/notify";
export { NotifyContainer } from "./components/NotifyContainer";

/* ⚠️ DO NOT export ToastProvider */
export type {
  NotifyOptions,
  ToastPosition,
  ToastStatus,
  ToastTheme,
} from "./types/types";

export { NotifyProvider } from "./store/toastStore";
