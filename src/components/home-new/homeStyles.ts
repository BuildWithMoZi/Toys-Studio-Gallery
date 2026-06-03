import { cn } from "@/lib/utils";

export const HOME_SHELL_MARGIN =
  "mx-0 mt-0 mb-0 md:mx-6 md:mt-5 md:mb-8 lg:mx-8 lg:mt-6 xl:mx-auto xl:max-w-7xl";

export const HOME_SHELL =
  "flex flex-col overflow-x-hidden border-0 shadow-none md:border md:border-[var(--navbar-border)] md:shadow-[var(--shadow)]";

export type HomeTone = "light" | "peach" | "navbar";

export function homeSection(
  tone: HomeTone,
  className?: string,
  options?: { showBorder?: boolean }
) {
  return cn(
    options?.showBorder !== false && "border-t border-[var(--navbar-border)]",
    "relative",
    tone === "peach" ? "bg-[var(--primary)]" : "bg-background",
    className
  );
}

export const homeSectionInner =
  "mx-auto w-full max-w-7xl px-3 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16 lg:px-10";

/** Product grids on home */
export const homeProductGrid =
  "grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4";

export const homeEyebrow = "text-xs font-bold uppercase tracking-[0.22em] text-secondary";

export const homeTitle =
  "mt-2 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl";

export const homeCard =
  "rounded-2xl border border-[var(--card-border)] bg-card shadow-sm";
