import Image from "next/image";
import { assetPath, cn } from "@/lib/utils";

const LOGO_ALT = "Safal's Toy Studio";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ className, priority }: SiteLogoProps) {
  return (
    <Image
      src={assetPath("/logo.png")}
      alt={LOGO_ALT}
      width={220}
      height={88}
      priority={priority}
      className={cn("h-10 w-auto object-contain md:h-12", className)}
    />
  );
}
