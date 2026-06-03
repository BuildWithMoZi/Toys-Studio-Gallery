"use client";

import Link from "next/link";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";
import { HomeSection } from "./HomeSection";
import { homeCard, homeEyebrow, homeTitle } from "./homeStyles";

const preview = faqs.slice(0, 4);

export function QuickFAQ() {
  const [openId, setOpenId] = useState<string | null>(preview[0]?.id ?? null);

  return (
    <HomeSection tone="peach" dividerTo="light" waveFlip>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className={homeEyebrow}>FAQ</p>
          <h2 className={homeTitle}>
            Quick <span className="text-gradient">answers</span>
          </h2>
          <p className="mt-3 text-sm text-muted">
            Everything you need before your first order.
          </p>
          <Link
            href="/faq"
            className="mt-5 inline-flex text-sm font-semibold text-secondary hover:underline"
          >
            Full FAQ →
          </Link>
        </div>

        <div className="space-y-2">
          {preview.map((faq) => (
            <div key={faq.id} className={homeCard}>
              <button
                type="button"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left font-display text-sm font-semibold text-foreground"
              >
                {faq.question}
                <HiChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-secondary transition-transform",
                    openId === faq.id && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  openId === faq.id
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
