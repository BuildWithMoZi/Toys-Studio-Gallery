"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { categories } from "@/data/categories";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const category = searchParams.get("category") || "all";
  const badge = searchParams.get("badge") || "all";
  const sort = searchParams.get("sort") || "default";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const applyFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all" || value === "default") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search });
  };

  return (
    <aside className="card-toy space-y-6 p-5 lg:sticky lg:top-28 lg:self-start">
      <h3 className="font-display text-lg font-bold">Filters</h3>

      <form onSubmit={handleSearch}>
        <label className="text-sm font-semibold">Search</label>
        <div className="mt-2 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Toy name..."
            className="input-field flex-1 text-sm"
          />
          <button
            type="submit"
            className="rounded-xl bg-secondary px-4 text-sm font-bold text-white hover:bg-secondary/90"
          >
            Go
          </button>
        </div>
      </form>

      <div>
        <label className="text-sm font-semibold">Category</label>
        <select
          value={category}
          onChange={(e) => applyFilters({ category: e.target.value })}
          className="input-field mt-2 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">Badge</label>
        <select
          value={badge}
          onChange={(e) => applyFilters({ badge: e.target.value })}
          className="input-field mt-2 text-sm"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="bestseller">Best Seller</option>
          <option value="sale">On Sale</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">Sort By</label>
        <select
          value={sort}
          onChange={(e) => applyFilters({ sort: e.target.value })}
          className="input-field mt-2 text-sm"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm font-semibold">Min ₹</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => applyFilters({ minPrice: e.target.value })}
            placeholder="0"
            className="input-field mt-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Max ₹</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => applyFilters({ maxPrice: e.target.value })}
            placeholder="5000"
            className="input-field mt-2 text-sm"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/products")}
        className="w-full rounded-full border-2 border-secondary py-2 text-sm font-bold text-secondary hover:bg-secondary hover:text-white transition-colors"
      >
        Clear Filters
      </button>
    </aside>
  );
}
