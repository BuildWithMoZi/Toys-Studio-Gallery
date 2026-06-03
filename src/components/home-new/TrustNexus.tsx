"use client";

import { achievements } from "@/data/achievements";
import { AchievementIcon } from "./categoryIcons";
import { HomeSection } from "./HomeSection";
import { homeEyebrow, homeTitle } from "./homeStyles";

export function TrustNexus() {
  return (
    <HomeSection tone="peach" dividerTo="light" waveFlip>
      <div className="mb-10 text-center">
        <p className={homeEyebrow}>Why PlayJoy</p>
        <h2 className={homeTitle}>
          Trusted by <span className="text-gradient">happy families</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex flex-col items-center rounded-2xl border border-[var(--card-border)] bg-card p-6 text-center"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-secondary ${a.color}`}
            >
              <AchievementIcon iconKey={a.iconKey} className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {a.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{a.description}</p>
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
