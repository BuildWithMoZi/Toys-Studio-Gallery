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

  if (variant === "compact") {
    return (
      <article
        className={cn(
          homeCard,
          "flex w-[min(100%,220px)] shrink-0 flex-col overflow-hidden sm:w-[240px]"
        )}
      >
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-primary/20"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="240px"
          />
          {discount > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-3">
          <Link
            href={`/products/${product.slug}`}
            className="font-display text-sm font-bold text-foreground line-clamp-2 hover:text-secondary"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-display text-base font-bold text-secondary">
            {formatPrice(product.price)}
          </p>
          <div className="mt-auto flex gap-2 pt-3">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-secondary py-2 text-xs font-bold text-white"
            >
              <HiShoppingBag className="h-3.5 w-3.5" />
              Add
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
              <HiHeart className={cn("h-4 w-4", wishlisted && "fill-current")} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(homeCard, "flex flex-col overflow-hidden")}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-primary/20"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-sm font-bold text-foreground line-clamp-1 hover:text-secondary md:text-base"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-muted line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center gap-1 text-amber-500">
          <HiStar className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="font-display text-base font-bold text-secondary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-1.5 text-xs text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white"
              aria-label="Add to cart"
            >
              <HiShoppingBag className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => toggle(product)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--card-border)]",
                wishlisted && "text-rose-500"
              )}
              aria-label="Wishlist"
            >
              <HiHeart className={cn("h-4 w-4", wishlisted && "fill-current")} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
