import { cn } from "@/lib/utils";

const LOGO_TEXT = "craftdesk Toy's";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <span
      aria-label={LOGO_TEXT}
      className={cn(
        "font-display inline-flex items-center whitespace-nowrap text-xl font-bold leading-none tracking-tight text-[var(--brand-red)] md:text-2xl",
        className,
      )}
    >
      craftdesk&nbsp;<span className="text-foreground">Toy&apos;s</span>
    </span>
  );
}
