"use client";

import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SmoothScrollOnNavigate } from "@/components/layout/SmoothScrollOnNavigate";

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
