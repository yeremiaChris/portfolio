"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { scrollDocumentToY } from "@/lib/programmatic-scroll";

/**
 * Next.js client navigations keep Lenis internal scroll across route changes.
 * Reset to top on pathname change; preserve back/forward and hash targets.
 */
export function RouteScrollToTop() {
  const pathname = usePathname();
  const skipForBackForward = useRef(false);
  const isInitial = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      skipForBackForward.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (skipForBackForward.current) {
      skipForBackForward.current = false;
      return;
    }
    if (window.location.hash) {
      return;
    }
    scrollDocumentToY(0, { immediate: true });
  }, [pathname]);

  return null;
}
