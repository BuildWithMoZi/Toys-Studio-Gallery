import { cn } from "@/lib/utils";
import type { HomeTone } from "./homeStyles";

function toneColor(tone: HomeTone) {
  if (tone === "peach") return "var(--primary)";
  if (tone === "navbar") return "var(--navbar-bg)";
  return "var(--background)";
}

/** Wave curve A — gentle roll into next section */
const WAVE_A = "M0,36 C320,8 640,52 960,28 C1200,12 1320,44 1440,32 L1440,80 L0,80 Z";

/** Wave curve B — alternate rhythm */
const WAVE_B = "M0,24 C280,56 560,12 840,40 C1080,56 1260,16 1440,44 L1440,80 L0,80 Z";

type Position = "top" | "bottom";

/**
 * Seamless curve between home section backgrounds.
 * Prefer `position="bottom"` on the upper section to avoid gap lines.
 */
export function HomeWaveDivider({
  from,
  to,
  position = "bottom",
  flip = false,
  className,
}: {
  from: HomeTone;
  to: HomeTone;
  position?: Position;
  flip?: boolean;
  className?: string;
}) {
  if (from === to) return null;

  const toColor = toneColor(to);
  const path = flip ? WAVE_B : WAVE_A;

  if (position === "bottom") {
    return (
      <div
        className={cn(
          "relative z-[1] -mb-px w-full shrink-0 overflow-hidden leading-[0]",
          className
        )}
        aria-hidden
      >
        <svg
          className="block h-11 w-full md:h-14"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill={toColor} d={path} />
        </svg>
      </div>
    );
  }

  const fromColor = toneColor(from);

  return (
    <div
      className={cn(
        "relative z-[1] -mt-px w-full shrink-0 overflow-hidden leading-[0]",
        className
      )}
      style={{ backgroundColor: fromColor }}
      aria-hidden
    >
      <svg
        className="block h-11 w-full md:h-14"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={toColor} d={path} />
      </svg>
    </div>
  );
}
