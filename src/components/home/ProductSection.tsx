"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function ProductSection({
  id,
  badge,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  id?: string;
  badge: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
}) {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".product-card-wrap",
    stagger: 0.08,
  });

  return (
    <section id={id} className="py-16 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} />
        <div
          ref={ref}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" href={viewAllHref}>
            View All →
          </Button>
        </div>
      </div>
    </section>
  );
}
