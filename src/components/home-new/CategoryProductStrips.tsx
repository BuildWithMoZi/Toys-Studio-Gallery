"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { HomeSection } from "./HomeSection";
import { HomeProductCard } from "./HomeProductCard";
import { CategoryIcon } from "./CategoryBento";
import { homeEyebrow, homeTitle } from "./homeStyles";

export function CategoryProductStrips() {
  return (
    <HomeSection tone="light">
      <div className="mb-8">
        <p className={homeEyebrow}>By category</p>
        <h2 className={homeTitle}>
          Browse by <span className="text-gradient">play style</span>
        </h2>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const items = getProductsByCategory(cat.id).slice(0, 2);
          if (items.length === 0) return null;

          return (
            <div key={cat.id}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                    <CategoryIcon category={cat.id} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted">{cat.description}</p>
                  </div>
                </div>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="flex shrink-0 items-center gap-1 text-sm font-semibold text-secondary hover:underline"
                >
                  See all
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 scrollbar-thin sm:gap-4">
                {items.map((p) => (
                  <HomeProductCard key={p.id} product={p} variant="compact" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </HomeSection>
  );
}
