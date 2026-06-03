"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

/** Global navbar — hidden on home; hero embeds its own floating bar. */
export function LayoutNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar variant="fixed" />;
}
