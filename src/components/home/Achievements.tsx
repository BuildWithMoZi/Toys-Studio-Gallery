"use client";

import { achievements } from "@/data/achievements";
import { AchievementIcon } from "@/components/home-new/categoryIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function Achievements() {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".achievement-card",
    stagger: 0.12,
  });

  return (
    <section className="py-16 px-4 md:px-6 bg-primary/30 dark:bg-card/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Our Achievements"
          title="Trusted by Families Everywhere"
        />
        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`achievement-card card-toy p-6 text-center transition-all hover:-translate-y-2 hover:shadow-xl ${a.color}`}
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-secondary">
                <AchievementIcon iconKey={a.iconKey} className="h-8 w-8" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                {a.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
