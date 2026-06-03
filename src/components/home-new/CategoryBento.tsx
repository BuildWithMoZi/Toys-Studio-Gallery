"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { categories } from "@/data/categories";
import { CategoryIcon } from "./categoryIcons";
import { HomeSection } from "./HomeSection";
import { homeEyebrow, homeTitle } from "./homeStyles";

const bentoLayout = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

export function CategoryBento() {
  return (
    <HomeSection tone="light" dividerTo="peach" waveFlip>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={homeEyebrow}>Shop by category</p>
          <h2 className={homeTitle}>
            Pick your <span className="text-gradient">play zone</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted">
          Six curated worlds — tap any tile to explore collections.
        </p>
      </div>

      <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className={`group relative block min-h-[140px] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-card transition-all hover:-translate-y-0.5 hover:shadow-md md:min-h-[160px] ${bentoLayout[i]}`}
          >
            <Image
              src={cat.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 25vw"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.color} mix-blend-multiply`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/50 to-card/20" />
            <div className="relative flex h-full min-h-[140px] flex-col justify-between p-5 md:min-h-[160px]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-secondary shadow-sm">
                <CategoryIcon category={cat.id} className="h-6 w-6" />
              </span>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-foreground md:text-xl">
                    {cat.name}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white transition-transform group-hover:rotate-45">
                    <HiArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{cat.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </HomeSection>
  );
}
