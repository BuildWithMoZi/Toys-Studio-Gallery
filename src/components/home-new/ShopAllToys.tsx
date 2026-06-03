"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { HomeSection } from "./HomeSection";
import { HomeProductCard } from "./HomeProductCard";
import { homeEyebrow, homeProductGrid, homeTitle } from "./homeStyles";

export function ShopAllToys() {
  return (
    <HomeSection tone="peach" dividerFrom="navbar" dividerTo="light">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={homeEyebrow}>Full catalog</p>
          <h2 className={homeTitle}>
            Shop all <span className="text-gradient">toys</span>
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Every item in stock — tap a card for details, or add straight to cart.
          </p>
        </div>
        <Link
          href="/products"
          className="shrink-0 text-sm font-semibold text-secondary hover:underline"
        >
          View catalog →
        </Link>
      </div>

      <div className={homeProductGrid}>
        {products.map((p) => (
          <HomeProductCard key={p.id} product={p} />
        ))}
      </div>
    </HomeSection>
  );
}
