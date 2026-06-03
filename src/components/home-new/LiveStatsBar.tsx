"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  { label: "Happy families", value: 10000, suffix: "+" },
  { label: "Premium toys", value: 500, suffix: "+" },
  { label: "Avg. rating", value: 48, suffix: " ★", display: (n: number) => (n / 10).toFixed(1) },
  { label: "Same-day replies", value: 99, suffix: "%" },
];

function StatItem({
  label,
  value,
  suffix,
  display,
}: {
  label: string;
  value: number;
  suffix: string;
  display?: (n: number) => string;
}) {
  const { count, ref } = useAnimatedCounter(value);
  const shown = display ? display(count) : count.toLocaleString();

  return (
    <div className="flex min-w-[140px] flex-col items-center gap-1 px-6 py-4 sm:min-w-[160px]">
      <span
        ref={ref}
        className="font-display text-3xl font-bold text-gradient sm:text-4xl"
      >
        {shown}
        {suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--navbar-link)] opacity-80">
        {label}
      </span>
    </div>
  );
}

export function LiveStatsBar({ joined = false }: { joined?: boolean }) {
  const inner = (
    <div className="flex flex-wrap items-center justify-center divide-x divide-[var(--card-border)] md:flex-nowrap">
      {stats.map((s) => (
        <StatItem key={s.label} {...s} />
      ))}
    </div>
  );

  if (joined) {
    return (
      <div className="relative z-10 shrink-0 border-t border-[var(--navbar-border)] bg-[var(--navbar-bg)]">
        {inner}
      </div>
    );
  }

  return (
    <section className="relative -mt-4 px-5 md:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl glass-panel neon-ring">
        {inner}
      </div>
    </section>
  );
}
