// src/core/injectStyles.ts
let injected = false;

export function injectNotiflowStyles() {
  if (typeof document === "undefined") return;
  if (injected) return;

  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-notiflow", "true");

  style.innerHTML = `
/* ================= BASE ================= */

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
  align-items: center;
  gap: 10px;
  justify-content: flex-start;

  position: relative;
  overflow: hidden;
  user-select: none;
}

/* ================= MESSAGE ================= */

.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

/* ================= ICON ================= */

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 18px;
  height: 18px;

  color: currentColor;
}

.toast-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}

/* ================= LOADER ================= */

.toast-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ================= CLOSE BUTTON ================= */

.toast-close {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;

  display: flex;
  align-items: center;

  color: currentColor;
  opacity: .7;
}

.toast-close svg {
  stroke: currentColor; /* 🔥 DARK MODE FIX */
}

.toast-close:hover {
  opacity: 1;
}

/* ================= PROGRESS ================= */

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;

  height: 3px;
  width: 100%;

  background: var(--toast-progress);
  transform-origin: left;
}

/* ================= DRAG ================= */

.toast[data-draggable="true"] {
  cursor: grab;
}

.toast[data-draggable="true"]:active {
  cursor: grabbing;
}

/* ================= FEEDBACK TOAST ================= */

.toast.feedback {
  flex-direction: column;
  align-items: stretch;
  gap: 10px;

  background: #111;
  color: #fff;
}

.toast.feedback .toast-title {
  font-weight: 600;
  font-size: 14px;
}

.toast.feedback textarea {
  width: 100%;
  resize: none;

  padding: 8px;
  border-radius: 6px;
  border: none;
  outline: none;

  font-size: 13px;
  background: #1e1e1e;
  color: #fff;
}

.toast.feedback textarea::placeholder {
  color: #888;
}

/* ================= FEEDBACK ACTIONS ================= */

.toast-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.toast-btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.toast-btn.cancel {
  background: #2a2a2a;
  color: #bbb;
}

.toast-btn.submit {
  background: #4f46e5;
  color: #fff;
}

.toast-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
}
`;

  document.head.appendChild(style);
}
