"use client";

import Image from "next/image";
import { useState } from "react";
import { HiHeart, HiShoppingBag, HiStar } from "react-icons/hi2";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderForm } from "@/components/order/OrderForm";
import { PAGE_SHELL } from "@/lib/pageLayout";

export function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={PAGE_SHELL}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl card-toy">
            <Image
              src={product.images[activeImage]}
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
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all",
                  activeImage === i
                    ? "border-secondary scale-105"
                    : "border-transparent opacity-70"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
            {discount > 0 && (
              <Badge label={`${discount}% OFF`} />
            )}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-amber-500">
            <HiStar className="h-5 w-5 fill-current" />
            <span className="font-bold text-foreground">{product.rating}</span>
            <span className="text-muted">({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-secondary">
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
            <li className="rounded-full bg-primary/80 px-3 py-1 text-sm font-medium">
              Age: {product.ageRange}
            </li>
            <li className="rounded-full bg-primary/80 px-3 py-1 text-sm font-medium">
              {product.stock} in stock
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-foreground">
            {product.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => addItem(product)}>
              <HiShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggle(product)}
            >
              <HiHeart
                className={cn("h-5 w-5", wishlisted && "fill-rose-500 text-rose-500")}
              />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
        <OrderForm product={product} />
      </div>
    </div>
  );
}
