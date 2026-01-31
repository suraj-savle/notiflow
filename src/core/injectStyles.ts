// src/core/injectStyles.ts
let injected = false;

export function injectNotiflowStyles() {
  if (typeof document === "undefined") return;
  if (injected) return;

  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-notiflow", "true");

  style.innerHTML = `
/* ===== Notiflow Base ===== */

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 18px;
  height: 18px;

  color: currentColor; /* 🔥 REQUIRED */
}

.toast-icon svg {
  width: 18px;
  height: 18px;
}


.toast-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;

  /* 🔥 THIS IS THE MAGIC */
  transform-origin: center;
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


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
  gap: 10px;              /* ✅ spacing */
  justify-content: flex-start; /* ✅ NOT space-between */

  position: relative;
  overflow: hidden;
}


.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

/* ===== Close Button ===== */

.toast-close {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  opacity: .7;
  display: flex;
  align-items: center;
}

.toast-close:hover {
  opacity: 1;
}

/* ===== Progress Bar ===== */

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: var(--toast-progress);
  transform-origin: left;
}

/* ===== Draggable UX ===== */

.toast[data-draggable="true"] {
  cursor: grab;
}

.toast[data-draggable="true"]:active {
  cursor: grabbing;
}

/* ===== FEEDBACK TOAST ===== */

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
  resize: none;
  border-radius: 6px;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 13px;
  background: #1e1e1e;
  color: #fff;
}

.toast.feedback textarea::placeholder {
  color: #888;
}

/* ===== Feedback Buttons ===== */

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
  color: white;
}

.toast-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
}
`;

  document.head.appendChild(style);
}
