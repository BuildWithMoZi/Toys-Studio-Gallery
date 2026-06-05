"use client";

import { RemoteImage } from "@/components/ui/RemoteImage";
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
  const detailHref = `/products/${product.slug}`;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 md:rounded-2xl md:hover:-translate-y-1 md:hover:shadow-md">
      <Link href={detailHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 sm:aspect-square">
          <RemoteImage
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
              <span className="shrink-0 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold text-white md:px-2 md:text-xs">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="relative p-2.5 md:p-4">
        <Link href={detailHref} className="block">
          <h3 className="font-display text-xs font-bold text-foreground line-clamp-2 transition-colors group-hover:text-[#c8102e] md:text-base md:line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-0.5 hidden text-sm text-muted line-clamp-2 md:block">
            {product.description}
          </p>
          <div className="mt-1 flex items-center gap-1 text-accent-yellow md:mt-2">
            <HiStar className="h-3 w-3 fill-current md:h-4 md:w-4" />
            <span className="text-[10px] font-semibold text-foreground md:text-sm">
              {product.rating}
            </span>
            <span className="hidden text-xs text-muted md:inline">
              ({product.reviewCount})
            </span>
          </div>
        </Link>

        <div className="mt-2 flex items-center justify-between gap-1.5 md:mt-3 md:gap-2">
          <Link href={detailHref} className="min-w-0 flex-1">
            <span className="font-display text-sm font-bold text-[#c8102e] md:text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-1 block text-[10px] text-muted line-through md:ml-2 md:inline md:text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </Link>
          <div className="relative z-10 flex shrink-0 gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(product);
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)] bg-card md:h-9 md:w-9",
                wishlisted && "border-[#c8102e]/30 text-[#c8102e]"
              )}
              aria-label="Toggle wishlist"
            >
              <HiHeart
                className={cn(
                  "h-3.5 w-3.5 md:h-5 md:w-5",
                  wishlisted && "fill-current"
                )}
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8102e] text-white transition-all md:h-10 md:w-10 md:hover:scale-105 md:hover:bg-[#a00d24]"
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
