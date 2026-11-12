"use client";

import { useLayoutEffect } from "react";

export function HydrationMarker() {
  useLayoutEffect(() => {
    document.documentElement.dataset.hydrated = "";
  }, []);

  return null;
}
