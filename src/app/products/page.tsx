"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { HiCube, HiMagnifyingGlass } from "react-icons/hi2";
import { products } from "@/data/products";
import { filterProducts, PAGE_SHELL } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";

function ProductsPageContent() {
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
    <div className="w-full bg-white">
      <div className={PAGE_SHELL}>
      <div className="mb-8 text-center md:mb-10">
        <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
          Shop All Toys
        </h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {filtered.length} toys waiting for you
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <ProductFilters />
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HiMagnifyingGlass
              className="h-16 w-16 text-[#c8102e]/40"
              aria-hidden
            />
            <p className="mt-4 text-lg font-semibold text-muted">
              No toys found. Try different filters!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-28">
          <HiCube
            className="h-12 w-12 animate-bounce text-[#c8102e]"
            aria-hidden
          />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
