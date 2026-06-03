import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  new: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  bestseller: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  sale: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  featured: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
};

export function Badge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const key = label.toLowerCase();
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide",
        badgeStyles[key] || "bg-secondary/15 text-secondary",
        className
      )}
    >
      {label}
    </span>
  );
}
