"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHeart,
  HiQuestionMarkCircle,
  HiShoppingBag,
  HiSquares2X2,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { DEFAULT_WHATSAPP_GREETING, SITE, STORE_LOCATION } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/order";
import { handleNavLinkClick } from "@/lib/scroll";
import {
  homeFullInner,
  homeFullSection,
  homeFullTitle,
} from "./homeStyles";

const ctaLinks = [
  { href: "/products", label: "Browse toys", icon: HiShoppingBag },
  { href: "/categories", label: "Categories", icon: HiSquares2X2 },
  { href: "/wishlist", label: "Wishlist", icon: HiHeart },
  { href: "/faq", label: "FAQ", icon: HiQuestionMarkCircle },
  {
    href: getWhatsAppUrl(DEFAULT_WHATSAPP_GREETING),
    label: "WhatsApp",
    icon: FaWhatsapp,
    external: true,
  },
];

export function HomeCTA() {
  const pathname = usePathname();

  return (
    <section className={`${homeFullSection} pb-10 md:pb-12`} aria-label="Get started">
      <h2 className={homeFullTitle}>Ready for your next adventure?</h2>

      <div className={`${homeFullInner} mx-auto max-w-4xl`}>
        <p className="text-center text-sm text-muted md:text-base">
          {SITE.orderCta}. Call {STORE_LOCATION.phone} or message us on
          WhatsApp — we confirm within hours.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
          {ctaLinks.map(({ href, label, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              scroll={false}
              onClick={
                external
                  ? undefined
                  : (e) => handleNavLinkClick(e, href, pathname)
              }
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 rounded-full border border-[#c8102e]/30 bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-[#c8102e] hover:bg-[#c8102e]/5 sm:px-5"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#c8102e]" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
