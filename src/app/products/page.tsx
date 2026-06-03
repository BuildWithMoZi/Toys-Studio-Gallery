import { Suspense } from "react";
import type { Metadata } from "next";
import { HiCube } from "react-icons/hi2";
import { ProductsPageClient } from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Shop All Toys",
  description: "Browse our full collection of premium kids toys with filters and search.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-28">
          <HiCube className="h-12 w-12 animate-bounce text-secondary" aria-hidden />
        </div>
      }
    >
      <ProductsPageClient />
    </Suspense>
  );
}
