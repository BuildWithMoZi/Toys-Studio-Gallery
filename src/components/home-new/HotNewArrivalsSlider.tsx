"use client";

import { RemoteImage } from "@/components/ui/RemoteImage";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { HOT_ARRIVALS_SLIDES } from "@/data/images";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 4000;
const TOTAL = HOT_ARRIVALS_SLIDES.length;

function useVisibleCount() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setCount(2);
      else setCount(2);
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

  const maxIndex = Math.max(0, TOTAL - visibleCount);
  const pageCount = Math.ceil(TOTAL / visibleCount);
  const activePage = Math.min(Math.floor(index / visibleCount), pageCount - 1);

  const goToPage = useCallback(
    (page: number) => {
      setIndex(Math.min(page * visibleCount, maxIndex));
    },
    [visibleCount, maxIndex]
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((prev) => {
        const next = prev + direction * visibleCount;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return 0;
        return next;
      });
    },
    [visibleCount, maxIndex]
  );

  useEffect(() => {
    setIndex(0);
  }, [visibleCount]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => step(1), AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, step]);

  const slideWidthOnTrack = 100 / TOTAL;
  const trackWidth = (TOTAL * 100) / visibleCount;

  return (
    <section
      className="w-full bg-white py-5 md:py-8 lg:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hot new arrivals"
    >
      <h2 className="px-3 text-center font-display text-lg font-bold leading-snug text-foreground sm:px-4 sm:text-2xl md:text-3xl lg:text-4xl">
        Hot New Arrivals – Be the First to Own Them!
      </h2>

      <div className="relative mt-4 w-full sm:mt-6 md:mt-8">
        <button
          type="button"
          onClick={() => step(-1)}
          className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:left-4 sm:h-11 sm:w-11 md:left-6 lg:left-8"
          aria-label="Previous slides"
        >
          <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          type="button"
          onClick={() => step(1)}
          className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:right-4 sm:h-11 sm:w-11 md:right-6 lg:right-8"
          aria-label="Next slides"
        >
          <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="overflow-hidden px-8 sm:px-12 md:px-14 lg:px-16">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${trackWidth}%`,
              transform: `translateX(-${index * slideWidthOnTrack}%)`,
            }}
          >
            {HOT_ARRIVALS_SLIDES.map((src, i) => (
              <div
                key={src}
                className="shrink-0 px-1 sm:px-1.5 md:px-2"
                style={{ width: `${slideWidthOnTrack}%` }}
              >
                <Link
                  href="/products?badge=new"
                  className="group block w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl md:rounded-2xl"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5] md:aspect-[16/11] lg:aspect-[16/10]">
                    <RemoteImage
                      src={src}
                      alt={`Hot new arrival ${i + 1}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 45vw, (max-width: 1024px) 33vw, 30vw"
                      priority={i < visibleCount}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-1.5 md:mt-5">
          {Array.from({ length: pageCount }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              onClick={() => goToPage(pageIndex)}
              className={cn(
                "h-2 rounded-full transition-all",
                activePage === pageIndex
                  ? "w-6 bg-[#c8102e]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide group ${pageIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
