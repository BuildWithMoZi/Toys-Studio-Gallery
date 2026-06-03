"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";

export function ProductsPageClient() {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    return filterProducts(products, {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      badge: searchParams.get("badge") || undefined,
      sort: searchParams.get("sort") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
    });
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 md:px-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-4xl font-bold text-gradient">
          Shop All Toys
        </h1>
        <p className="mt-2 text-muted">
          {filtered.length} magical toys waiting for you
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <ProductFilters />
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HiMagnifyingGlass className="h-16 w-16 text-secondary/60" aria-hidden />
            <p className="mt-4 text-lg font-semibold text-muted">
              No toys found. Try different filters!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
