export function scheduleIdle(task: () => void, timeoutMs = 3000): () => void {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(
      () => {
        task();
      },
      { timeout: timeoutMs },
    );
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(task, Math.min(timeoutMs, 1500));
  return () => window.clearTimeout(id);
}
