"use client";

import { HiHeart } from "react-icons/hi2";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import { PAGE_SHELL } from "@/lib/utils";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="w-full bg-white">
      <div className={PAGE_SHELL}>
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
            Saved Toys
          </p>
          <h1 className="mt-2 flex items-center justify-center gap-2 font-display text-xl font-bold text-foreground sm:text-2xl md:justify-start md:text-3xl">
            <HiHeart className="h-7 w-7 shrink-0 text-[#c8102e]" aria-hidden />
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            {items.length} saved toys
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <HiHeart className="h-16 w-16 text-[#c8102e]/40" aria-hidden />
            <p className="mt-4 text-lg text-muted">No favorites yet!</p>
            <Button
              className="mt-6 max-w-xs"
              size="lg"
              layout="block"
              href="/products"
            >
              Discover Toys
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
