import { ToastTheme, ColorMode } from "../types/types";
import { TOAST_THEMES } from "../core/constants";

export function resolveTheme(
  theme: ToastTheme,
  mode: ColorMode
) {
  return typeof theme === "object"
    ? theme
    : TOAST_THEMES[mode][theme];
}
