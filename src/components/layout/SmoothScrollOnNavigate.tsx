"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { scrollToTop } from "@/lib/scroll";

/** Smooth scroll to top after client-side route changes (pairs with Link scroll={false}). */
export function SmoothScrollOnNavigate() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    requestAnimationFrame(() => scrollToTop());
  }, [pathname]);

  return null;
}
