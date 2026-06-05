"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { scrollToTop } from "@/lib/scroll";

function SmoothScrollOnNavigate() {
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

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>
        <WishlistProvider>
          <SmoothScrollOnNavigate />
          {children}
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
