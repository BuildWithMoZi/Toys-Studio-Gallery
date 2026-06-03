"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function Testimonials() {
  const ref = useGsapReveal<HTMLDivElement>({
    children: ".testimonial-card",
    stagger: 0.1,
  });

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Happy Parents"
          title="What Families Say About Us"
        />
        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="testimonial-card card-toy p-6 transition-all hover:-translate-y-1"
            >
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <HiStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
