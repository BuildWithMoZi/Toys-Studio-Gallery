"use client";

import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiShoppingBag, HiStar } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const wishlisted = isWishlisted(product.id);

  return (
    <article className="card-toy group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-primary/30">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => toggle(product)}
          className={cn(
            "absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-md transition-all hover:scale-110",
            wishlisted && "text-rose-500"
          )}
          aria-label="Toggle wishlist"
        >
          <HiHeart className={cn("h-5 w-5", wishlisted && "fill-current")} />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-bold text-foreground line-clamp-1 hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center gap-1 text-amber-500">
          <HiStar className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold text-foreground">
            {product.rating}
          </span>
          <span className="text-xs text-muted">({product.reviewCount})</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="font-display text-lg font-bold text-secondary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-all hover:scale-110 hover:bg-secondary-ii"
            aria-label="Add to cart"
          >
            <HiShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
