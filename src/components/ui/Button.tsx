"use client";

import Link from "next/link";
import { isExternalHref, isInternalHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";
type Layout = "block" | "inline";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  size?: Size;
  /** block = full-width on mobile (default for CTAs) */
  layout?: Layout;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#c8102e] text-white shadow-md shadow-[#c8102e]/20 hover:bg-[#a00d24] sm:shadow-lg sm:shadow-[#c8102e]/25",
  secondary:
    "bg-[#a00d24] text-white shadow-md shadow-[#a00d24]/20 hover:bg-[#8b0b1f] sm:shadow-lg",
  outline:
    "border-2 border-[#c8102e] bg-transparent text-[#c8102e] hover:bg-[#c8102e] hover:text-white",
  ghost:
    "bg-transparent text-foreground shadow-none hover:bg-[#c8102e]/8",
  whatsapp:
    "bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 hover:bg-[#20bd5a] sm:shadow-lg",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm sm:min-h-0 sm:rounded-full sm:py-2",
  md: "min-h-11 px-5 py-2.5 text-sm sm:min-h-0 sm:rounded-full sm:px-6 sm:py-3 sm:text-base",
  lg: "min-h-12 px-5 py-3 text-sm sm:min-h-0 sm:rounded-full sm:px-8 sm:py-4 sm:text-lg",
};

const layouts: Record<Layout, string> = {
  block: "w-full sm:w-auto",
  inline: "w-auto min-w-0",
};

export function Button({
  variant = "primary",
  size = "md",
  layout = "block",
  className,
  href,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex touch-manipulation select-none items-center justify-center gap-2 rounded-2xl text-center font-semibold leading-snug whitespace-normal transition-[transform,box-shadow,background-color] duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none motion-reduce:transform-none sm:whitespace-nowrap sm:hover:scale-[1.03] sm:active:scale-[0.98]",
    variants[variant],
    sizes[size],
    layouts[layout],
    className
  );

  if (href) {
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternalHref(href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
