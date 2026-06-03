"use client";

import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiShoppingBag, HiStar } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { homeCard } from "./homeStyles";

type Variant = "grid" | "compact";

const cardShell = cn(
  homeCard,
  "flex flex-col overflow-hidden rounded-xl md:rounded-2xl"
);

export function HomeProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: Variant;
}) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const wishlisted = isWishlisted(product.id);
  const primaryBadge = product.badges[0];

  if (variant === "compact") {
    return (
      <article
        className={cn(cardShell, "w-[min(100%,200px)] shrink-0 sm:w-[220px]")}
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-primary/20 sm:aspect-square"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="200px"
          />
          {discount > 0 && (
            <span className="absolute right-1.5 top-1.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-2.5">
          <Link
            href={`/products/${product.slug}`}
            className="font-display text-xs font-bold text-foreground line-clamp-2 hover:text-secondary sm:text-sm"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-display text-sm font-bold text-secondary">
            {formatPrice(product.price)}
          </p>
          <div className="mt-auto flex gap-1.5 pt-2">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex h-8 flex-1 items-center justify-center gap-1 rounded-full bg-secondary text-[10px] font-bold text-white sm:text-xs"
            >
              <HiShoppingBag className="h-3.5 w-3.5" />
              Add
            </button>
            <button
              type="button"
              onClick={() => toggle(product)}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)]",
                wishlisted && "text-rose-500"
              )}
              aria-label="Wishlist"
            >
              <HiHeart className={cn("h-3.5 w-3.5", wishlisted && "fill-current")} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cardShell}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-primary/20 sm:aspect-square"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 45vw, 25vw"
        />
        <div className="absolute inset-x-1.5 top-1.5 flex items-start justify-between gap-1">
          {primaryBadge ? (
            <Badge
              label={primaryBadge}
              className="!px-1.5 !py-0.5 !text-[9px] md:!text-xs"
            />
          ) : (
            <span />
          )}
          {discount > 0 && (
            <span className="shrink-0 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white md:px-2 md:text-[10px]">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-2.5 md:p-4">
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-xs font-bold leading-snug text-foreground line-clamp-2 hover:text-secondary md:text-sm md:line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="mt-0.5 hidden text-xs text-muted line-clamp-2 md:block">
          {product.description}
        </p>
        <div className="mt-1 flex items-center gap-1 text-amber-500">
          <HiStar className="h-3 w-3 fill-current md:h-3.5 md:w-3.5" />
          <span className="text-[10px] font-semibold text-foreground md:text-xs">
            {product.rating}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-1.5 md:mt-3 md:gap-2">
          <div className="min-w-0">
            <span className="font-display text-sm font-bold text-secondary md:text-base">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-1 block text-[10px] text-muted line-through md:ml-1.5 md:inline md:text-xs">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white md:h-9 md:w-9"
              aria-label="Add to cart"
            >
              <HiShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
            <button
              type="button"
              onClick={() => toggle(product)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)]",
                wishlisted && "text-rose-500"
              )}
              aria-label="Wishlist"
            >
              <HiHeart
                className={cn("h-3.5 w-3.5 md:h-4 md:w-4", wishlisted && "fill-current")}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
