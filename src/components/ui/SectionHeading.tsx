import { cn } from "@/lib/utils";

export function SectionHeading({
  badge,
  title,
  subtitle,
  className,
  align = "center",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold text-secondary dark:text-secondary">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-muted md:text-lg mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
