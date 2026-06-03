"use client";

import { HiHeart } from "react-icons/hi2";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import { PAGE_SHELL } from "@/lib/pageLayout";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className={PAGE_SHELL}>
      <h1 className="flex items-center gap-3 font-display text-4xl font-bold text-gradient">
        <HiHeart className="h-9 w-9 shrink-0 text-rose-500" aria-hidden />
        My Wishlist
      </h1>
      <p className="mt-2 text-muted">{items.length} saved toys</p>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <HiHeart className="h-16 w-16 text-rose-400/80" aria-hidden />
          <p className="mt-4 text-lg text-muted">No favorites yet!</p>
          <Button className="mt-6" href="/products">
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
  );
}
