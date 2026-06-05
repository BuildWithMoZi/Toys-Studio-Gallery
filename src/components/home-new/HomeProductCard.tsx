"use client";

import { RemoteImage } from "@/components/ui/RemoteImage";
import Link from "next/link";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { homeCard } from "./homeStyles";

const cardShell = cn(
  homeCard,
  "flex flex-col overflow-hidden rounded-xl md:rounded-2xl"
);

/** Home grid card — full card opens product detail. */
export function HomeProductCard({ product }: { product: Product }) {
  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category;
  const detailHref = `/products/${product.slug}`;

  return (
    <Link
      href={detailHref}
      className={cn(
        cardShell,
        "group overflow-hidden rounded-2xl border-gray-100 shadow-sm transition-shadow hover:shadow-md md:rounded-3xl"
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <RemoteImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 50vw, 20vw"
        />
      </div>
      <div className="px-2 py-3 text-center md:px-3 md:py-3.5">
        <p className="text-xs font-bold text-foreground line-clamp-2 transition-colors group-hover:text-[#c8102e] sm:text-sm">
          {product.name}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
          {categoryName}
        </p>
      </div>
    </Link>
  );
}
