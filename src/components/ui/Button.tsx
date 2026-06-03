"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25",
  secondary:
    "bg-secondary-ii text-white hover:bg-secondary-ii/90 shadow-lg shadow-secondary-ii/25",
  outline:
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-secondary dark:text-secondary dark:hover:text-white",
  ghost: "hover:bg-primary/80 text-foreground",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
