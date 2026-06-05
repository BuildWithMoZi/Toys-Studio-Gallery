"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { HomeProductCard } from "./HomeProductCard";
import {
  homeFullGrid,
  homeFullHeading,
  homeFullInner,
  homeFullSection,
} from "./homeStyles";

export function ShopAllToys() {
  return (
    <section className={homeFullSection} aria-label="Shop all toys">
      <div className="mb-5 flex flex-col items-center gap-2 px-4 sm:mb-6 md:mb-8">
        <h2 className={homeFullHeading}>Shop all toys</h2>
        <Link
          href="/products"
          className="text-sm font-semibold text-secondary hover:underline"
        >
          View catalog →
        </Link>
      </div>

      <div className={`${homeFullInner} ${homeFullGrid}`}>
        {products.map((p) => (
          <HomeProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
