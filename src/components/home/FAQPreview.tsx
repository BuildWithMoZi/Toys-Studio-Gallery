"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { faqs } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const preview = faqs.slice(0, 4);

  return (
    <section className="py-20 px-4 md:px-6 bg-primary/20 dark:bg-card/30">
      <div className="mx-auto max-w-3xl">
        <SectionHeading badge="FAQ" title="Got Questions?" />
        <div className="space-y-3">
          {preview.map((faq) => (
            <div key={faq.id} className="card-toy overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-foreground"
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
                  openId === faq.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="px-5 pb-5 text-muted">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" href="/faq">
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}
