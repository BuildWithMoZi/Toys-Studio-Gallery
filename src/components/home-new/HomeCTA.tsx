"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/lib/order";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Button } from "@/components/ui/Button";
import { HomeSection } from "./HomeSection";
import { homeEyebrow, homeTitle } from "./homeStyles";

export function HomeCTA() {
  const ref = useGsapReveal<HTMLDivElement>({ y: 24, duration: 0.8 });

  return (
    <HomeSection tone="light" className="pb-14 md:pb-16">
      <div
        ref={ref}
        className="grid gap-8 md:grid-cols-2 md:items-center"
      >
        <div>
          <p className={homeEyebrow}>Get started</p>
          <h2 className={homeTitle}>
            Ready for your next <span className="text-gradient">adventure?</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Add to cart, order on WhatsApp, and we confirm within hours. Cash on
            delivery available.
          </p>
        </div>

        <div className="btn-action-row sm:flex sm:flex-wrap">
          <Button href="/products" size="lg" layout="block">
            Browse all toys
          </Button>
          <Button
            href={getWhatsAppUrl("Hi! I'm ready to order from PlayJoy Toys.")}
            variant="outline"
            size="lg"
            layout="block"
          >
            <FaWhatsapp className="h-4 w-4 shrink-0" />
            WhatsApp order
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-5 border-t border-[var(--navbar-border)] pt-6">
        {[
          { href: "/categories", label: "Categories" },
          { href: "/wishlist", label: "Wishlist" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-muted transition-colors hover:text-secondary"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </HomeSection>
  );
}
