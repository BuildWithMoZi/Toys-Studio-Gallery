"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/data/testimonials";
import { HomeSection } from "./HomeSection";
import { homeCard, homeEyebrow, homeTitle } from "./homeStyles";

export function VoiceWall() {
  return (
    <HomeSection tone="light" dividerTo="peach">
      <div className="mb-10 text-center">
        <p className={homeEyebrow}>Reviews</p>
        <h2 className={homeTitle}>
          Loved by <span className="text-gradient">parents</span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <blockquote key={t.id} className={`flex flex-col p-5 ${homeCard}`}>
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: t.rating }).map((_, j) => (
                <HiStar key={j} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{t.text}&rdquo;
            </p>
            <footer className="mt-4 flex items-center gap-3 border-t border-[var(--card-border)] pt-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <cite className="not-italic font-display text-sm font-bold text-foreground">
                  {t.name}
                </cite>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </HomeSection>
  );
}
