let injected = false;

export function injectNotiflowStyles() {
  if (typeof document === "undefined") return;
  if (injected) return;

  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-notiflow", "true");

  style.innerHTML = `
/* ================= SHARED BASE ================= */
.toast {
  pointer-events: auto;
  min-width: 280px;
  max-width: 360px;
  padding: 12px 16px;
  border-radius: 4px;
  background: var(--toast-bg);
  color: var(--toast-text);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  user-select: none;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* ================= FEEDBACK SPECIFIC ================= */
.toast.feedback {
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 14px;
}

.feedback-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.toast-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.toast-subtext {
  font-size: 13px;
  opacity: 0.6;
  line-height: 1.4;
  margin: -4px 0 0 0;
}

.toast.feedback textarea {
  width: 100%;
  min-height: 90px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 13px;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.toast.feedback textarea:focus {
  border-color: rgba(0, 0, 0, 0.3);
}

/* ================= BUTTONS & ACTIONS ================= */
.toast-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.toast-btn.submit {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background: #000; /* Stylish Black */
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toast-btn.submit:hover:not(:disabled) {
  background: #222;
  transform: translateY(-1px);
}

.toast-btn.submit:active:not(:disabled) {
  transform: translateY(0);
}

.toast-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ================= UTILS (Icon, Close, Progress) ================= */
.toast-message { flex: 1; font-size: 14px; line-height: 1.4; }

.toast-icon { 
  display: flex; align-items: center; justify-content: center; 
  flex-shrink: 0; width: 20px; height: 20px; 
}

.toast-close {
  background: none; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: inherit; opacity: 0.4; transition: opacity 0.2s;
  padding: 4px;
}

.toast-close:hover { opacity: 1; }

.toast-progress {
  position: absolute; bottom: 0; left: 0;
  height: 3px; width: 100%;
  background: var(--toast-progress);
  transform-origin: left;
}

.toast-spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.toast[data-draggable="true"] { cursor: grab; }
.toast[data-draggable="true"]:active { cursor: grabbing; }
`;

  document.head.appendChild(style);
}