"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/category/CategoryIcon";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { PAGE_SHELL } from "@/lib/utils";

export default function CategoriesPage() {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".category-card",
    stagger: 0.08,
  });

  return (
    <div className="w-full bg-white">
      <section id="categories" className={PAGE_SHELL}>
        <div className="mb-8 text-center md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
            Shop by Category
          </p>
          <h1 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            Find Your Perfect Play
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted sm:text-base">
            From cuddly plushies to brain-boosting educational toys — explore
            every adventure!
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="category-card group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c8102e]/20 hover:shadow-md md:rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-start gap-3 p-4 md:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c8102e]/15 bg-[#c8102e]/5 text-[#c8102e]">
                  <CategoryIcon category={cat.id} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-[#c8102e] md:text-lg">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
