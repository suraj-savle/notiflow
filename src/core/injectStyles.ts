// src/core/injectStyles.ts
let injected = false;

export function injectNotiflowStyles() {
  if (typeof document === "undefined") return; // SSR safe
  if (injected) return;

  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-notiflow", "true");

  style.innerHTML = `
/* ===== Notiflow styles ===== */

.toast {
  pointer-events: auto;
  min-width: 280px;
  max-width: 360px;
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--toast-bg);
  color: var(--toast-text);
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  overflow: hidden;
  animation: toast-enter 200ms ease-out;
}

.toast.exit {
  animation: toast-exit 180ms ease-in forwards;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  opacity: .7;
}

.toast-close:hover {
  opacity: 1;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: var(--toast-progress);
  transform-origin: left;
  animation-name: toast-progress;
  animation-timing-function: linear;
}

@keyframes toast-progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

@keyframes toast-enter {
  from { opacity: 0; transform: translateY(8px) scale(.96); }
  to { opacity: 1; transform: none; }
}

@keyframes toast-exit {
  to { opacity: 0; transform: translateY(-6px) scale(.95); }
}
`;

  document.head.appendChild(style);
}
