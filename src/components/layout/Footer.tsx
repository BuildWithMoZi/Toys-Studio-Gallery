"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HiArrowTopRightOnSquare,
  HiMapPin,
  HiPhone,
} from "react-icons/hi2";
import {
  DEFAULT_WHATSAPP_GREETING,
  getDirectionsUrl,
  SITE,
  STORE_LOCATION,
} from "@/data/site";
import { getWhatsAppUrl } from "@/lib/order";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { SiteLogo } from "./SiteLogo";

const FooterMap = dynamic(
  () => import("./FooterMap").then((mod) => mod.FooterMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-56 animate-pulse rounded-2xl bg-gray-100 sm:h-64 md:h-72"
        aria-hidden
      />
    ),
  }
);

const directionsUrl = getDirectionsUrl();

const shopLinks: [string, string][] = [
  ["Shop All", "/products"],
  ["New Arrivals", "/products?badge=new"],
  ["Best Sellers", "/products?badge=bestseller"],
  ["Offers", "/products?badge=sale"],
];

const helpLinks: [string, string][] = [
  ["FAQ", "/faq"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Categories", "/categories"],
];

const socialLinks = [
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: SITE.instagram.url,
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    href: getWhatsAppUrl(DEFAULT_WHATSAPP_GREETING),
  },
];

/** Site-wide footer — clean full-width layout matching home sections. */
export function Footer({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "w-full shrink-0 border-t border-gray-100 bg-white",
        className
      )}
    >
      <div className="px-2 py-10 sm:px-3 md:py-12 lg:px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Link
            href="/"
            scroll={false}
            onClick={(e) => handleNavLinkClick(e, "/", pathname)}
            className="transition-opacity hover:opacity-90"
          >
            <SiteLogo className="h-14 md:h-16" />
          </Link>
          <p className="mt-4 max-w-md text-sm text-muted">
            {SITE.tagline} — {SITE.description}. Based in {STORE_LOCATION.address}.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-[#c8102e] hover:text-[#c8102e]"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <h4 className="text-center font-display text-sm font-bold uppercase tracking-wider text-foreground sm:text-left">
              Shop
            </h4>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start">
              {shopLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    scroll={false}
                    onClick={(e) => handleNavLinkClick(e, href, pathname)}
                    className="text-sm text-muted transition-colors hover:text-[#c8102e]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-center font-display text-sm font-bold uppercase tracking-wider text-foreground sm:text-left">
              Help
            </h4>
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start">
              {helpLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    scroll={false}
                    onClick={(e) => handleNavLinkClick(e, href, pathname)}
                    className="text-sm text-muted transition-colors hover:text-[#c8102e]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-center font-display text-sm font-bold uppercase tracking-wider text-foreground sm:text-left">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <HiPhone className="h-4 w-4 shrink-0 text-[#c8102e]" />
                <a href={STORE_LOCATION.phoneTel} className="hover:text-[#c8102e]">
                  {STORE_LOCATION.phone}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <FaInstagram className="h-4 w-4 shrink-0 text-[#c8102e]" />
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8102e]"
                >
                  {SITE.instagram.display}
                </a>
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <HiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8102e]" />
                {STORE_LOCATION.addressFull}
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <h4 className="text-center font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Find us
          </h4>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:rounded-3xl">
            <div className="relative h-56 sm:h-64 md:h-72">
              <FooterMap />
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white hover:text-[#c8102e]"
            >
              Get directions
              <HiArrowTopRightOnSquare className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left sm:text-sm">
          <p>© {new Date().getFullYear()} Safal&apos;s Toy Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-[#c8102e]">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-[#c8102e]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
