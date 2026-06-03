"use client";

import Image from "next/image";
import Link from "next/link";
import { getNewArrivals, getOnSale } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { HomeSection } from "./HomeSection";
import { homeCard, homeEyebrow, homeTitle } from "./homeStyles";

const railItems = [...getNewArrivals(), ...getOnSale()].slice(0, 8);
const doubled = [...railItems, ...railItems];

export function NewArrivalsRail() {
  return (
    <HomeSection tone="light" dividerTo="peach" waveFlip innerClassName="!px-0 overflow-hidden">
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col gap-2 px-3 sm:mb-8 sm:px-5 md:flex-row md:items-end md:justify-between md:px-8 lg:px-10">
        <div>
          <p className={homeEyebrow}>New arrivals</p>
          <h2 className={homeTitle}>
            Fresh drops & <span className="text-gradient">deals</span>
          </h2>
        </div>
        <Link
          href="/products?badge=new"
          className="text-sm font-semibold text-secondary hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent md:w-20" />

        <div className="marquee-track flex w-max gap-3 px-3 hover:[animation-play-state:paused] sm:gap-4 sm:px-5 md:px-8">
          {doubled.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/products/${p.slug}`}
              className={`group relative w-[240px] shrink-0 overflow-hidden sm:w-[260px] ${homeCard}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary/40">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="260px"
                />
                {p.badges.includes("new") && (
                  <span className="absolute left-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">
                    NEW
                  </span>
                )}
                {p.originalPrice && p.originalPrice > p.price && (
                  <span className="absolute right-3 top-3 rounded-full bg-secondary-ii px-2 py-0.5 text-[10px] font-bold text-white">
                    SALE
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-bold text-foreground line-clamp-1 group-hover:text-secondary">
                  {p.name}
                </h3>
                <p className="mt-1 font-display text-base font-bold text-gradient">
                  {formatPrice(p.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
