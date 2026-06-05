"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { homeCard } from "./homeStyles";

const cardShell = cn(
  homeCard,
  "flex flex-col overflow-hidden rounded-xl md:rounded-2xl"
);

/** Home grid card — image + category label (Shop all toys section). */
export function HomeProductCard({ product }: { product: Product }) {
  const categoryName =
    categories.find((c) => c.id === product.category)?.name ?? product.category;

  return (
    <article
      className={cn(
        cardShell,
        "overflow-hidden rounded-2xl border-gray-100 shadow-sm transition-shadow hover:shadow-md md:rounded-3xl"
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group relative block aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 50vw, 20vw"
        />
      </Link>
      <Link
        href={`/products?category=${product.category}`}
        className="block px-2 py-3 text-center md:px-3 md:py-3.5"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-secondary sm:text-sm">
          {categoryName}
        </span>
      </Link>
    </article>
  );
}
