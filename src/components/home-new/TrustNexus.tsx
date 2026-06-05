"use client";

import type { IconType } from "react-icons";
import {
  HiShieldCheck,
  HiTrophy,
  HiTruck,
  HiUserGroup,
} from "react-icons/hi2";
import {
  homeFullInner,
  homeFullSection,
  homeFullTitle,
} from "./homeStyles";

type AchievementIconKey = "families" | "trophy" | "speed" | "safety";

const ACHIEVEMENT_ICONS: Record<AchievementIconKey, IconType> = {
  families: HiUserGroup,
  trophy: HiTrophy,
  speed: HiTruck,
  safety: HiShieldCheck,
};

const STAT_HIGHLIGHT: Record<string, string> = {
  "1": "10,000+",
  "2": "500+",
  "3": "24hr",
  "4": "100%",
};

const achievements = [
  {
    id: "1",
    title: "Happy Families",
    description: "10,000+ smiling kids",
    iconKey: "families" as const,
  },
  {
    id: "2",
    title: "Toy Champions",
    description: "500+ premium toys",
    iconKey: "trophy" as const,
  },
  {
    id: "3",
    title: "Super Speed",
    description: "Fast delivery nationwide",
    iconKey: "speed" as const,
  },
  {
    id: "4",
    title: "Safety Stars",
    description: "100% kid-safe certified",
    iconKey: "safety" as const,
  },
];

export function TrustNexus() {
  return (
    <section className={homeFullSection} aria-label="Why families trust us">
      <h2 className={homeFullTitle}>Trusted by happy families</h2>

      <div className={`${homeFullInner} overflow-hidden rounded-2xl border border-gray-100 md:rounded-3xl`}>
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-100">
          {achievements.map((a, i) => {
            const Icon = ACHIEVEMENT_ICONS[a.iconKey];
            return (
              <div
                key={a.id}
                className={`flex flex-col items-center px-4 py-6 text-center sm:py-8 ${
                  i % 2 === 0 ? "border-r border-gray-100 md:border-r-0" : ""
                } ${i < 2 ? "border-b border-gray-100 md:border-b-0" : ""}`}
              >
                <span className="font-display text-2xl font-bold text-[#c8102e] sm:text-3xl">
                  {STAT_HIGHLIGHT[a.id] ?? "★"}
                </span>
                <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#c8102e]/10 text-[#c8102e]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-display text-sm font-bold text-foreground sm:text-base">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
