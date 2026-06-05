"use client";

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
      <div className="mb-5 px-4 text-center sm:mb-6 md:mb-8">
        <h2 className={homeFullHeading}>Shop all toys</h2>
      </div>

      <div className={`${homeFullInner} ${homeFullGrid}`}>
        {products.map((p) => (
          <HomeProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
