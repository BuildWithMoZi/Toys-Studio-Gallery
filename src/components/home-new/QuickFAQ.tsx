"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";
import {
  homeFullHeading,
  homeFullInner,
  homeFullSection,
} from "./homeStyles";

const preview = faqs.slice(0, 5);

export function QuickFAQ() {
  const [activeId, setActiveId] = useState<string>(preview[0]?.id ?? "");
  const active = preview.find((f) => f.id === activeId) ?? preview[0];

  return (
    <section className={homeFullSection} aria-label="FAQ">
      <div className="mb-5 px-4 text-center sm:mb-6 md:mb-8">
        <h2 className={homeFullHeading}>Quick answers</h2>
      </div>

      <div
        className={`${homeFullInner} grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-6`}
      >
        <div className="flex flex-col gap-2">
          {preview.map((faq, index) => {
            const isActive = faq.id === activeId;
            return (
              <button
                key={faq.id}
                type="button"
                onClick={() => setActiveId(faq.id)}
                className={cn(
                  "rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors md:rounded-3xl md:px-5 md:py-4 md:text-base",
                  isActive
                    ? "border-[#c8102e] bg-[#c8102e]/5 text-foreground"
                    : "border-gray-100 bg-white text-muted hover:border-gray-200 hover:text-foreground"
                )}
              >
                <span className="mr-2 font-display text-[#c8102e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {faq.question}
              </button>
            );
          })}
        </div>

        {active && (
          <div className="flex min-h-[200px] flex-col justify-center rounded-2xl bg-gray-50 px-5 py-6 md:rounded-3xl md:px-8 md:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">
              Answer
            </p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground md:text-xl">
              {active.question}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {active.answer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
