"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { scrollToTop } from "@/lib/scroll";
import { assetPath } from "@/lib/utils";

function SmoothScrollOnNavigate() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    requestAnimationFrame(() => scrollToTop());
  }, [pathname]);

  return null;
}

/** Vertical scroll track on the left — home page only (desktop). */
function ScrollProgress() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const scrollIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carSrc = assetPath("/hero/car.png");

  useEffect(() => {
    if (!isHome) return;

    let rafId = 0;

    const apply = () => {
      const track = trackRef.current;
      const car = carRef.current;
      if (!track || !car) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / docHeight))
          : 0;

      const maxTravel = Math.max(0, track.clientHeight - car.offsetHeight);
      const y = ratio * maxTravel;

      car.style.transform = `translate3d(-50%, ${y}px, 0)`;
      car.dataset.scrolling = "true";
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
      scrollIdleRef.current = setTimeout(() => {
        delete car.dataset.scrolling;
      }, 200);
    };

    const schedule = () => {
      if (window.innerWidth < 768) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(apply);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-full w-12 overflow-visible md:block md:left-1 md:w-14"
      aria-hidden
    >
      <div ref={trackRef} className="relative h-full w-full overflow-visible">
        <div
          ref={carRef}
          className="scroll-car-rig absolute left-1/2 top-0 z-[1] will-change-transform"
          style={{ transform: "translate3d(-50%, 0px, 0)" }}
        >
          <div className="scroll-car-sparks" aria-hidden>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="scroll-car-spark"
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
          <span className="scroll-car-spark-core" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={carSrc}
            alt=""
            width={44}
            height={80}
            decoding="async"
            className="block h-11 w-10 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] sm:h-12 sm:w-11"
          />
        </div>
      </div>
    </div>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>
        <WishlistProvider>
          <SmoothScrollOnNavigate />
          <ScrollProgress />
          {children}
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
