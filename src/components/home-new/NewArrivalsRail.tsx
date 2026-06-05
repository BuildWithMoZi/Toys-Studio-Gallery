"use client";

import Image from "next/image";
import Link from "next/link";
import { getNewArrivals, getOnSale } from "@/data/products";
import {
  homeFullHeading,
  homeFullSection,
} from "./homeStyles";

const railItems = [...getNewArrivals(), ...getOnSale()].slice(0, 8);
const doubled = [...railItems, ...railItems];

export function NewArrivalsRail() {
  return (
    <section className={homeFullSection} aria-label="New arrivals">
      <div className="mb-5 px-4 text-center sm:mb-6 md:mb-8">
        <h2 className={homeFullHeading}>Fresh drops</h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent sm:w-12 md:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent sm:w-12 md:w-16" />

        <div className="marquee-track flex w-max gap-2 px-2 hover:[animation-play-state:paused] sm:gap-3 sm:px-3 md:gap-4">
          {doubled.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/products/${p.slug}`}
              className="group relative w-[min(44vw,200px)] shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm sm:w-[220px] md:w-[240px] md:rounded-3xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 sm:aspect-square">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="240px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
