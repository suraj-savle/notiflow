const timeouts = new Map<string, number>();

export function setToastTimeout(
  id: string,
  duration: number,
  onTimeout: () => void
) {
  clearToastTimeout(id);

  if (duration <= 0) return;

  const timeoutId = window.setTimeout(() => {
    timeouts.delete(id);
    onTimeout();
  }, duration);

  timeouts.set(id, timeoutId);
}

export function clearToastTimeout(id: string) {
  const timeout = timeouts.get(id);
  if (timeout) {
    clearTimeout(timeout);
    timeouts.delete(id);
  }
}
