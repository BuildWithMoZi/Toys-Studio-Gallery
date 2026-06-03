"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

const HERO_ID = "home-hero";

/**
 * On home: keeps hero-embedded navbar unchanged; shows a fixed bar once the hero scrolls away.
 */
export function HomeScrollNavbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) return;

    const update = () => {
      setVisible(hero.getBoundingClientRect().bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[transform,opacity] duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <Navbar variant="scroll-pill" />
    </div>
  );
}
