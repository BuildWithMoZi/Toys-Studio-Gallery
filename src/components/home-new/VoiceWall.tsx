"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/data/testimonials";
import {
  homeFullSection,
  homeFullTitle,
} from "./homeStyles";

export function VoiceWall() {
  return (
    <section className={homeFullSection} aria-label="Customer reviews">
      <h2 className={homeFullTitle}>Loved by parents</h2>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent sm:w-12" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent sm:w-12" />

        <div className="flex gap-3 overflow-x-auto px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-3 lg:px-4 [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="flex w-[min(88vw,420px)] shrink-0 gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 sm:w-[400px] sm:p-5 md:rounded-3xl"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex gap-0.5 text-accent-yellow">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <HiStar key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-3">
                  <cite className="not-italic font-display text-sm font-bold text-foreground">
                    {t.name}
                  </cite>
                  <p className="text-xs text-muted">{t.role}</p>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
