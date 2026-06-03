"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HiEnvelope,
  HiGift,
  HiHeart,
  HiMapPin,
  HiPhone,
  HiCheckCircle,
} from "react-icons/hi2";

const quickLinks: [string, string][] = [
  ["Shop All", "/products"],
  ["New Arrivals", "/products?badge=new"],
  ["Best Sellers", "/products?badge=bestseller"],
  ["Offers", "/products?badge=sale"],
  ["FAQ", "/faq"],
];

/** Site-wide footer — use in root layout or any page. */
export function Footer({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "relative mt-20 shrink-0 overflow-hidden bg-gradient-to-b from-primary/50 to-primary dark:from-card dark:to-background",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -top-16 left-1/2 z-0 h-32 w-[120%] -translate-x-1/2 rounded-[50%] bg-background"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-14 md:px-6 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              scroll={false}
              onClick={(e) => handleNavLinkClick(e, "/", pathname)}
              className="flex items-center gap-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <HiGift className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl font-bold text-gradient">
                PlayJoy Toys
              </span>
            </Link>
            <p className="mt-4 text-muted">
              Where every toy sparks joy! Premium, safe, and magical toys for
              kids of all ages.
            </p>
            <div className="mt-4 flex gap-3">
              {[FaInstagram, FaFacebook, FaTwitter, FaWhatsapp].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all hover:scale-110 hover:bg-secondary hover:text-white"
                    aria-label="Social link"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    scroll={false}
                    onClick={(e) => handleNavLinkClick(e, href, pathname)}
                    className="text-muted transition-colors hover:text-secondary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold">Contact</h4>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex items-center gap-2">
                <HiPhone className="h-5 w-5 shrink-0 text-secondary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <HiEnvelope className="h-5 w-5 shrink-0 text-secondary" />
                hello@playjoytoys.com
              </li>
              <li className="flex items-start gap-2">
                <HiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                123 Toy Street, Mumbai, India
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold">Newsletter</h4>
            <p className="mt-2 text-sm text-muted">
              Get surprise deals & new toy alerts!
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 text-sm text-muted md:flex-row">
          <p className="flex items-center justify-center gap-1.5 md:justify-start">
            © {new Date().getFullYear()} PlayJoy Toys. Made with
            <HiHeart className="inline h-4 w-4 text-rose-500" aria-hidden />
            for kids.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-secondary">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-secondary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-full border border-card-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary"
      />
      <button
        type="submit"
        className="flex min-h-11 min-w-[4.5rem] touch-manipulation items-center justify-center rounded-2xl bg-secondary px-4 py-2.5 text-sm font-bold text-white transition-all active:scale-[0.98] hover:bg-secondary/90 sm:min-h-0 sm:rounded-full sm:hover:scale-105"
      >
        {status === "success" ? (
          <HiCheckCircle className="h-5 w-5" aria-hidden />
        ) : (
          "Join"
        )}
      </button>
    </form>
  );
}
