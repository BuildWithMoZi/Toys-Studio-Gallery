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
  const primaryBadge = product.badges[0];

  return (
    <article className="card-toy group relative overflow-hidden rounded-xl transition-all duration-300 md:rounded-2xl md:hover:-translate-y-2 md:hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-primary/30 sm:aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 md:group-hover:scale-110"
          sizes="(max-width:640px) 45vw, 25vw"
        />
        <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-1 md:inset-x-3 md:top-3">
          {primaryBadge ? (
            <Badge
              label={primaryBadge}
              className="!px-1.5 !py-0.5 !text-[9px] md:!text-xs"
            />
          ) : (
            <span />
          )}
          {discount > 0 && (
            <span className="shrink-0 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white md:px-2 md:text-xs">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-2.5 md:p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-xs font-bold text-foreground line-clamp-2 hover:text-secondary transition-colors md:text-base md:line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 hidden text-sm text-muted line-clamp-2 md:block">
          {product.description}
        </p>
        <div className="mt-1 flex items-center gap-1 text-amber-500 md:mt-2">
          <HiStar className="h-3 w-3 fill-current md:h-4 md:w-4" />
          <span className="text-[10px] font-semibold text-foreground md:text-sm">
            {product.rating}
          </span>
          <span className="hidden text-xs text-muted md:inline">
            ({product.reviewCount})
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-1.5 md:mt-3 md:gap-2">
          <div className="min-w-0">
            <span className="font-display text-sm font-bold text-secondary md:text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-1 block text-[10px] text-muted line-through md:ml-2 md:inline md:text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => toggle(product)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)] bg-card md:h-9 md:w-9",
                wishlisted && "text-rose-500"
              )}
              aria-label="Toggle wishlist"
            >
              <HiHeart
                className={cn("h-3.5 w-3.5 md:h-5 md:w-5", wishlisted && "fill-current")}
              />
            </button>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white transition-all md:h-10 md:w-10 md:hover:scale-110 md:hover:bg-secondary-ii"
              aria-label="Add to cart"
            >
              <HiShoppingBag className="h-3.5 w-3.5 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
