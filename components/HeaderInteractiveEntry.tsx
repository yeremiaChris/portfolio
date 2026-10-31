"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeaderInteractiveHydrated = dynamic(
  () =>
    import("@/components/HeaderInteractiveHydrated").then((mod) => ({
      default: mod.HeaderInteractiveHydrated,
    })),
  { ssr: false },
);

export function HeaderInteractiveEntry() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const schedule =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback
        : (callback: IdleRequestCallback) =>
            window.setTimeout(
              () => callback({ didTimeout: false, timeRemaining: () => 0 }),
              1,
            );
    const cancel =
      typeof cancelIdleCallback === "function"
        ? cancelIdleCallback
        : (id: number) => window.clearTimeout(id);

    const id = schedule(() => {
      document.querySelector("[data-header-fallback]")?.remove();
      setReady(true);
    });
    return () => cancel(id);
  }, []);

  if (!ready) {
    return null;
  }

  return <HeaderInteractiveHydrated />;
}
