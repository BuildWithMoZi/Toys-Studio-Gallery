"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { PAGE_SHELL } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [activeId, setActiveId] = useState(faqs[0]?.id ?? "");

  const activeFaq = faqs.find((f) => f.id === activeId) ?? faqs[0];

  return (
    <div className="w-full bg-white">
      <div className={cn(PAGE_SHELL, "max-w-4xl")}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
            Help Center
          </p>
          <h1 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Everything you need to know about ordering
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
          <ul className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <li key={faq.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(faq.id)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                    activeId === faq.id
                      ? "border-[#c8102e] bg-[#c8102e]/5 text-foreground"
                      : "border-gray-100 bg-white text-muted hover:border-gray-200 hover:text-foreground"
                  )}
                >
                  <span className="mr-2 font-display text-[#c8102e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </button>
              </li>
            ))}
          </ul>

          {activeFaq && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">
                Answer
              </p>
              <h2 className="mt-2 font-display text-lg font-bold text-foreground md:text-xl">
                {activeFaq.question}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {activeFaq.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
