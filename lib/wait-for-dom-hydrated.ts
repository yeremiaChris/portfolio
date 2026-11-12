export function isDomHydrated(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  return document.documentElement.dataset.hydrated !== undefined;
}

export function waitForDomHydrated(onReady: () => void): () => void {
  if (isDomHydrated()) {
    onReady();
    return () => undefined;
  }

  const observer = new MutationObserver(() => {
    if (!isDomHydrated()) {
      return;
    }
    onReady();
    observer.disconnect();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-hydrated"],
  });

  return () => observer.disconnect();
}
