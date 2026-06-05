"use client";

import { RemoteImage } from "@/components/ui/RemoteImage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiBolt, HiCheckBadge, HiShoppingBag, HiStar } from "react-icons/hi2";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";
import {
  getRelatedProducts,
  getSuggestedProducts,
} from "@/data/products";
import { getReviewsForProduct } from "@/data/testimonials";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { PAGE_SHELL } from "@/lib/utils";

function DetailSectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function ProductDetailBelowFold({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  const suggested = getSuggestedProducts(product, 4);
  const reviews = getReviewsForProduct(product.slug, 3);
  const categoryLabel =
    categories.find((c) => c.id === product.category)?.name ??
    product.category;

  return (
    <div className="mt-14 space-y-14 border-t border-gray-100 pt-14 md:mt-20 md:space-y-20 md:pt-20">
      <section>
        <DetailSectionTitle
          eyebrow="Recommended"
          title={`More in ${categoryLabel}`}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <DetailSectionTitle
          eyebrow="You might like"
          title="Popular picks for you"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {suggested.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <DetailSectionTitle
          eyebrow="Reviews"
          title="What parents are saying"
        />
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-1 text-accent-yellow">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating)
                    ? "fill-current"
                    : "opacity-30"
                }`}
              />
            ))}
          </div>
          <span className="font-display text-lg font-bold">
            {product.rating} out of 5
          </span>
          <span className="text-sm text-muted">
            Based on {product.reviewCount} reviews
          </span>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex gap-0.5 text-accent-yellow">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <HiStar key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <RemoteImage
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-foreground">
                    {review.author}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    {review.role}
                    {review.verified && (
                      <HiCheckBadge
                        className="h-3.5 w-3.5 text-[#c8102e]"
                        aria-label="Verified"
                      />
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [activeRemoteImage, setActiveRemoteImage] = useState(0);
  const { addItem } = useCart();

  const handleBuyNow = () => {
    addItem(product, 1, { openDrawer: false });
    router.push("/checkout");
  };
  const discount = getDiscountPercent(product.price, product.originalPrice);

  return (
    <div className="w-full bg-white">
      <div className={PAGE_SHELL}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm md:rounded-3xl">
            <RemoteImage
              src={product.images[activeRemoteImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveRemoteImage(i)}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all",
                  activeRemoteImage === i
                    ? "border-[#c8102e] scale-105"
                    : "border-gray-200 opacity-70"
                )}
              >
                <RemoteImage src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
            {discount > 0 && <Badge label={`${discount}% OFF`} />}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-accent-yellow">
            <HiStar className="h-5 w-5 fill-current" />
            <span className="font-bold text-foreground">{product.rating}</span>
            <span className="text-muted">({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-[#c8102e]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-muted leading-relaxed">
            {product.longDescription}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li className="rounded-full border border-[#c8102e]/20 bg-[#c8102e]/5 px-3 py-1 text-sm font-medium text-foreground">
              Age: {product.ageRange}
            </li>
            <li className="rounded-full border border-[#c8102e]/20 bg-[#c8102e]/5 px-3 py-1 text-sm font-medium text-foreground">
              {product.stock} in stock
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-foreground">
            {product.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <div className="btn-action-row mt-8">
            <Button size="lg" layout="block" onClick={() => addItem(product)}>
              <HiShoppingBag className="h-5 w-5 shrink-0" />
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="lg"
              layout="block"
              onClick={handleBuyNow}
            >
              <HiBolt className="h-5 w-5 shrink-0" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailBelowFold product={product} />

      </div>
    </div>
  );
}
