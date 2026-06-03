"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/home-new/categoryIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function Categories() {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".category-card",
    stagger: 0.1,
  });

  return (
    <section id="categories" className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Shop by Category"
          title="Find Your Perfect Play"
          subtitle="From cuddly plushies to brain-boosting educational toys — explore every adventure!"
        />
        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`category-card group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.color} p-6 transition-all hover:-translate-y-2 hover:shadow-xl card-toy`}
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
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl shrink-0">
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
  );
}
