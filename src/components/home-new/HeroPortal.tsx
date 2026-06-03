"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { getWhatsAppUrl } from "@/lib/order";
import { assetPath } from "@/lib/utils";

const heroStats = [
  { label: "Happy families", value: 10000, suffix: "+" },
  { label: "Premium toys", value: 500, suffix: "+" },
  {
    label: "Avg. rating",
    value: 48,
    suffix: " ★",
    display: (n: number) => (n / 10).toFixed(1),
  },
  { label: "Same-day replies", value: 99, suffix: "%" },
];

function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function HeroStatItem({
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

function HeroStatsBar() {
  return (
    <div className="relative z-10 shrink-0 border-t border-[var(--navbar-border)] bg-[var(--navbar-bg)]">
      <div className="flex flex-wrap items-center justify-center divide-x divide-[var(--card-border)] md:flex-nowrap">
        {heroStats.map((s) => (
          <HeroStatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

export function HeroPortal() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} id="home-hero" className="relative">
      <Navbar variant="hero-floating" />

      <div className="relative flex min-h-[min(70vh,680px)] flex-col justify-center overflow-hidden bg-background px-3 py-10 pt-6 sm:px-5 sm:py-12 sm:pt-8 md:min-h-[min(75vh,760px)] md:pt-10 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src={assetPath("/hero/1.png")}
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="scale-105 object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent dark:from-background/90 dark:via-background/50" />
        </div>

        <div className="hero-reveal relative z-10 max-w-xl space-y-6 md:space-y-7">
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Play beyond imagination.
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
            Safe, joyful toys for every child — order in minutes via WhatsApp
            with fast delivery to your door.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="/products"
              className="rounded-full bg-[var(--hero-cta-bg)] px-7 py-3 text-sm font-semibold text-[var(--hero-cta-text)] transition-opacity hover:opacity-90"
            >
              Shop toys
            </Link>
            <Link
              href={getWhatsAppUrl("Hi! I'd like to explore PlayJoy Toys.")}
              className="text-sm font-semibold text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              WhatsApp order
            </Link>
          </div>
        </div>
      </div>

      <HeroStatsBar />
    </div>
  );
}
