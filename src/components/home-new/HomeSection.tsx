import { cn } from "@/lib/utils";
import { HomeWaveDivider } from "./HomeWaveDivider";
import { homeSection, homeSectionInner, type HomeTone } from "./homeStyles";

export function HomeSection({
  tone = "light",
  dividerFrom,
  dividerTo,
  waveFlip = false,
  className,
  innerClassName,
  children,
}: {
  tone?: HomeTone;
  /** Rare: wave at top (e.g. hero stats → first section) */
  dividerFrom?: HomeTone;
  /** Wave at bottom into the next section — preferred, no gap */
  dividerTo?: HomeTone;
  waveFlip?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const hasTopWave = dividerFrom != null && dividerFrom !== tone;
  const hasBottomWave = dividerTo != null && dividerTo !== tone;
  const hasAnyWave = hasTopWave || hasBottomWave;

  return (
    <section
      className={homeSection(tone, className, { showBorder: !hasAnyWave })}
    >
      {hasTopWave && (
        <HomeWaveDivider
          from={dividerFrom}
          to={tone}
          position="top"
          flip={waveFlip}
          className="w-full"
        />
      )}
      <div className={cn(homeSectionInner, innerClassName)}>{children}</div>
      {hasBottomWave && (
        <HomeWaveDivider
          from={tone}
          to={dividerTo}
          position="bottom"
          flip={waveFlip}
          className="w-full"
        />
      )}
    </section>
  );
}
