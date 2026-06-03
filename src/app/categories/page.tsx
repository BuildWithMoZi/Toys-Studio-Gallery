"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/home-new/CategoryBento";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

function CategoriesHeading() {
  return (
    <div className="mb-10 text-center">
      <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold text-secondary dark:text-secondary">
        Shop by Category
      </span>
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        Find Your Perfect Play
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-muted md:text-lg">
        From cuddly plushies to brain-boosting educational toys — explore every
        adventure!
      </p>
    </div>
  );
}

export default function CategoriesPage() {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".category-card",
    stagger: 0.1,
  });

  return (
    <div className="pt-24">
      <section id="categories" className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <CategoriesHeading />
          <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={cn(
                  "category-card group relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 card-toy transition-all hover:-translate-y-2 hover:shadow-xl",
                  cat.color
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-secondary">
                      <CategoryIcon category={cat.id} className="h-7 w-7" />
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{cat.description}</p>
                  </div>
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="mt-4 inline-block text-sm font-bold text-secondary group-hover:underline">
                  Shop now →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
