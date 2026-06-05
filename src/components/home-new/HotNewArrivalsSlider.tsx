"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { HOT_ARRIVALS_SLIDES } from "@/data/images";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 1500;

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function HotNewArrivalsSlider() {
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HOT_ARRIVALS_SLIDES.length;

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((prev) => {
        const next = prev + direction * visibleCount;
        if (next < 0) return total - (total % visibleCount || visibleCount);
        if (next >= total) return 0;
        return next;
      });
    },
    [visibleCount, total]
  );

  useEffect(() => {
    setIndex(0);
  }, [visibleCount]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => step(1), AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, step]);

  const slideBasis = `${100 / visibleCount}%`;

  return (
    <section
      className="w-full bg-white py-6 md:py-8 lg:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hot new arrivals"
    >
      <h2 className="px-4 text-center font-display text-xl font-bold leading-snug text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
        Hot New Arrivals – Be the First to Own Them!
      </h2>

      <div className="relative mt-5 w-full sm:mt-6 md:mt-8">
        <button
          type="button"
          onClick={() => step(-1)}
          className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-white sm:left-4 sm:h-12 sm:w-12 md:left-6 lg:left-8"
          aria-label="Previous slides"
        >
          <HiChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={() => step(1)}
          className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-white sm:right-4 sm:h-12 sm:w-12 md:right-6 lg:right-8"
          aria-label="Next slides"
        >
          <HiChevronRight className="h-6 w-6" />
        </button>

        <div className="w-full overflow-hidden px-1 sm:px-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(index / total) * 100}%)`,
            }}
          >
            {HOT_ARRIVALS_SLIDES.map((src, i) => (
              <div
                key={src}
                className="shrink-0 px-1 sm:px-1.5 md:px-2 lg:px-2.5"
                style={{ flexBasis: slideBasis, maxWidth: slideBasis }}
              >
                <Link
                  href="/products?badge=new"
                  className="group block w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl md:rounded-3xl"
                >
                  <div className="relative h-[min(52vw,280px)] w-full overflow-hidden sm:h-[min(44vw,340px)] md:h-[min(38vw,400px)] lg:h-[min(32vw,480px)] xl:h-[min(28vw,520px)]">
                    <Image
                      src={src}
                      alt={`Hot new arrival ${i + 1}`}
                      fill
                      className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="100vw"
                      priority={i < visibleCount}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-1.5 md:mt-5">
          {Array.from({ length: Math.ceil(total / visibleCount) }).map(
            (_, dotIndex) => {
              const dotStart = dotIndex * visibleCount;
              const isActive = index === dotStart;
              return (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => setIndex(dotStart)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    isActive
                      ? "w-6 bg-[#c8102e]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide group ${dotIndex + 1}`}
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
