import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  new: "bg-success/15 text-success",
  bestseller: "bg-accent-yellow/25 text-foreground",
  sale: "bg-danger/15 text-danger",
  featured: "bg-secondary-ii/15 text-secondary-ii",
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
