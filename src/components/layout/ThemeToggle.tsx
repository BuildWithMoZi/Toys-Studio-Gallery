"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "navbar";
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-full bg-primary/50",
          variant === "navbar" ? "h-8 w-8" : "h-10 w-10"
        )}
      />
    );
  }

  if (variant === "navbar") {
    return (
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-8 w-8 items-center justify-center text-[var(--navbar-muted)] transition-colors hover:text-[var(--navbar-logo)]"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <HiSun className="h-[18px] w-[18px]" />
        ) : (
          <HiMoon className="h-[18px] w-[18px]" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-secondary transition-all hover:scale-110 hover:bg-secondary hover:text-white dark:bg-card dark:text-secondary-ii dark:hover:bg-secondary-ii dark:hover:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <HiSun className="h-5 w-5" />
      ) : (
        <HiMoon className="h-5 w-5" />
      )}
    </button>
  );
}
