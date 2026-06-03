"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import {
  HiGift,
  HiSparkles,
  HiHeart,
  HiRocketLaunch,
  HiStar,
} from "react-icons/hi2";
import { Button } from "@/components/ui/Button";

const surprises: { Icon: IconType; message: string }[] = [
  { Icon: HiGift, message: "Free sticker pack on orders above ₹999!" },
  { Icon: HiStar, message: "Secret 10% off code: PLAYJOY10" },
  { Icon: HiHeart, message: "Buy 2 plush toys, get a mini keychain free!" },
  { Icon: HiRocketLaunch, message: "Express delivery FREE this weekend!" },
];

export function SurpriseSection() {
  const [revealed, setRevealed] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const handleReveal = (index: number) => {
    setRevealed(index);
    setOpened((prev) => new Set(prev).add(index));
  };

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary-ii/15 px-4 py-1 text-sm font-bold text-secondary-ii">
          <HiSparkles className="h-4 w-4" aria-hidden />
          Surprise Box
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          Tap a Box for a Surprise Deal!
        </h2>
        <p className="mt-2 text-muted">
          Each box hides a special offer — collect them all!
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {surprises.map((s, i) => {
            const Icon = s.Icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleReveal(i)}
                className={`aspect-square rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                  opened.has(i)
                    ? "border-secondary bg-secondary/10 scale-95"
                    : "border-secondary-ii/30 bg-gradient-to-br from-primary to-secondary/10 animate-pulse-glow"
                }`}
              >
                {opened.has(i) ? (
                  <div className="flex h-full flex-col items-center justify-center p-4">
                    <Icon className="h-10 w-10 text-secondary" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {s.message}
                    </p>
                  </div>
                ) : (
                  <span className="flex h-full items-center justify-center text-secondary">
                    <HiGift className="h-12 w-12" aria-hidden />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {revealed !== null && (
          <Button className="mt-8" href="/products">
            Shop with Surprise Deal
          </Button>
        )}
      </div>
    </section>
  );
}
