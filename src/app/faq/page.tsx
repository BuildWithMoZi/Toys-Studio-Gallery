"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-20 md:px-6">
      <h1 className="text-center font-display text-4xl font-bold text-gradient">
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-center text-muted">
        Everything you need to know about ordering
      </p>
      <div className="mt-12 space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="card-toy overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
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
                "overflow-hidden transition-all duration-300",
                openId === faq.id ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="px-5 pb-5 text-muted">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
