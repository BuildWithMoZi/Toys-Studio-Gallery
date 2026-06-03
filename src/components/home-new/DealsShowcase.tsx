"use client";

import Link from "next/link";
import { HiTag } from "react-icons/hi2";
import { getBudgetPicks, getOnSale } from "@/data/products";
import { HomeSection } from "./HomeSection";
import { HomeProductCard } from "./HomeProductCard";
import { homeEyebrow, homeTitle } from "./homeStyles";

const saleItems = getOnSale();
const budgetItems = getBudgetPicks(999).filter(
  (p) => !saleItems.some((s) => s.id === p.id)
);

export function DealsShowcase() {
  if (saleItems.length === 0 && budgetItems.length === 0) return null;

  return (
    <HomeSection tone="peach">
      {saleItems.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                <HiTag className="h-5 w-5" />
              </span>
              <div>
                <p className={homeEyebrow}>On sale</p>
                <h2 className={homeTitle}>
                  Today&apos;s <span className="text-gradient">deals</span>
                </h2>
              </div>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-secondary hover:underline"
            >
              All offers →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {saleItems.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {budgetItems.length > 0 && (
        <div>
          <div className="mb-6">
            <p className={homeEyebrow}>Budget friendly</p>
            <h2 className={homeTitle}>
              Under <span className="text-gradient">₹999</span>
            </h2>
            <p className="mt-2 text-sm text-muted">
              Great gifts without breaking the bank.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {budgetItems.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </HomeSection>
  );
}
