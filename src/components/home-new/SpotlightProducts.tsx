"use client";

import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiShoppingBag, HiStar } from "react-icons/hi2";
import { getBestSellers } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { HomeSection } from "./HomeSection";
import { homeCard, homeEyebrow, homeTitle } from "./homeStyles";

const bestsellers = getBestSellers();
const hero = bestsellers[0];
const side = bestsellers.slice(1, 4);

export function SpotlightProducts() {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  if (!hero) return null;

  const discount = getDiscountPercent(hero.price, hero.originalPrice);

  return (
    <HomeSection tone="peach" dividerTo="light">
      <div className="mb-10">
        <p className={homeEyebrow}>Bestsellers</p>
        <h2 className={homeTitle}>
          Fan favorites <span className="text-gradient">this week</span>
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        <article
          className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-card lg:col-span-7"
        >
          <div className="relative min-h-[380px] lg:min-h-[480px]">
            <Image
              src={hero.images[0]}
              alt={hero.name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
              #1 Trending
            </div>
            {discount > 0 && (
              <div className="absolute right-5 top-5 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-1 text-amber-500">
                <HiStar className="h-4 w-4 fill-current" />
                <span className="text-sm font-bold text-foreground">
                  {hero.rating}
                </span>
                <span className="text-xs text-muted">({hero.reviewCount})</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground md:text-2xl">
                {hero.name}
              </h3>
              <p className="mt-1 max-w-md text-sm text-muted line-clamp-2">
                {hero.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-display text-2xl font-bold text-gradient">
                  {formatPrice(hero.price)}
                </span>
                <Link
                  href={`/products/${hero.slug}`}
                  className="rounded-full bg-[var(--hero-cta-bg)] px-5 py-2 text-sm font-semibold text-[var(--hero-cta-text)] hover:opacity-90"
                >
                  View details
                </Link>
                <button
                  type="button"
                  onClick={() => addItem(hero)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white"
                  aria-label="Add to cart"
                >
                  <HiShoppingBag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-3 lg:col-span-5">
          {side.map((p) => {
            const d = getDiscountPercent(p.price, p.originalPrice);
            const wish = isWishlisted(p.id);
            return (
              <article
                key={p.id}
                className={`group flex gap-3 ${homeCard} p-3`}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                  {d > 0 && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      -{d}%
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-display text-sm font-bold text-foreground hover:text-secondary line-clamp-1"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm font-bold text-secondary">
                    {formatPrice(p.price)}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => addItem(p)}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(p)}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full border border-[var(--card-border)]",
                        wish && "text-rose-500"
                      )}
                      aria-label="Wishlist"
                    >
                      <HiHeart className={cn("h-3.5 w-3.5", wish && "fill-current")} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          <Link
            href="/products?badge=bestseller"
            className="mt-1 block rounded-full border border-[var(--card-border)] bg-card py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary"
          >
            See all bestsellers
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
