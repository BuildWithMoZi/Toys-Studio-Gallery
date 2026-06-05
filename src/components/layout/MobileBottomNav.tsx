"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiBars3,
  HiHeart,
  HiHome,
  HiMagnifyingGlass,
  HiEnvelope,
  HiQuestionMarkCircle,
  HiShoppingBag,
  HiSquares2X2,
  HiTag,
  HiUser,
  HiXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { DEFAULT_WHATSAPP_GREETING } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/order";
import { buildProductsSearchUrl } from "@/lib/navigation";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const HERO_RED = "#c8102e";
const NAV_INNER_HEIGHT = "3.75rem";

const sideTabs = [
  { href: "/", label: "Home", icon: HiHome, match: (p: string) => p === "/" },
  {
    href: "/products",
    label: "Shop",
    icon: HiTag,
    match: (p: string) => p === "/products" || p.startsWith("/products/"),
  },
] as const;

const moreLinks = [
  { href: "/categories", label: "Categories", icon: HiSquares2X2 },
  { href: "/wishlist", label: "Wishlist", icon: HiHeart },
  { href: "/about", label: "About", icon: HiUser },
  { href: "/contact", label: "Contact", icon: HiEnvelope },
  { href: "/faq", label: "FAQ", icon: HiQuestionMarkCircle },
  { href: "/checkout", label: "Checkout", icon: HiShoppingBag },
  {
    href: getWhatsAppUrl(DEFAULT_WHATSAPP_GREETING),
    label: "WhatsApp",
    icon: FaWhatsapp,
    external: true,
  },
] as const;

function TabLink({
  href,
  label,
  icon: Icon,
  active,
  pathname,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  pathname: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      onClick={(e) => handleNavLinkClick(e, href, pathname)}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors",
        active ? "text-[#c8102e]" : "text-gray-500"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsOpen } = useCart();
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMoreOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen && !searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [moreOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildProductsSearchUrl(query);
    setSearchOpen(false);
    setQuery("");
    router.push(url);
  };

  const overlayOpen = moreOpen || searchOpen;

  return (
    <>
      {overlayOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/40 md:hidden"
          role="presentation"
          onClick={() => {
            setMoreOpen(false);
            setSearchOpen(false);
          }}
        />
      )}

      {searchOpen && (
        <div
          className="fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-[66] mx-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl md:hidden"
          role="dialog"
          aria-label="Search toys"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-gray-800">
              Search toys
            </span>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-gray-500"
              aria-label="Close search"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for toys..."
              className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
            />
            <button
              type="submit"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: HERO_RED }}
              aria-label="Submit search"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {moreOpen && (
        <div
          className="fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-[66] mx-3 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl md:hidden"
          role="dialog"
          aria-label="More navigation"
        >
          <div className="mb-1 flex items-center justify-between px-2 py-1">
            <span className="text-sm font-semibold text-gray-800">More</span>
            <button
              type="button"
              onClick={() => setMoreOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-gray-500"
              aria-label="Close menu"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
          <ul>
            {moreLinks.map((link) => {
              const Icon = link.icon;
              const external = "external" in link && link.external;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    scroll={false}
                    onClick={(e) => {
                      if (!external) handleNavLinkClick(e, link.href, pathname);
                      setMoreOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-gray-600" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Mobile bottom navigation"
      >
        <div className="relative mx-auto max-w-lg">
          <button
            type="button"
            onClick={() => {
              setMoreOpen(false);
              setSearchOpen((open) => !open);
            }}
            className={cn(
              "absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_4px_14px_rgba(200,16,46,0.45)] ring-4 ring-white transition-transform active:scale-95",
              searchOpen && "scale-105"
            )}
            style={{ backgroundColor: HERO_RED }}
            aria-label="Search toys"
            aria-expanded={searchOpen}
          >
            <HiMagnifyingGlass className="h-7 w-7" />
          </button>

          <div
            className="grid max-w-lg grid-cols-5 items-end pb-2"
            style={{ height: NAV_INNER_HEIGHT }}
          >
            {sideTabs.map(({ href, label, icon, match }) => (
              <TabLink
                key={href}
                href={href}
                label={label}
                icon={icon}
                active={match(pathname)}
                pathname={pathname}
              />
            ))}

            <div className="flex flex-col items-center justify-end">
              <span
                className={cn(
                  "text-[10px] font-semibold",
                  searchOpen ? "text-[#c8102e]" : "text-gray-500"
                )}
              >
                Search
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setIsOpen(true);
              }}
              className="relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold text-gray-500 transition-colors"
              aria-label={
                totalItems > 0 ? `Cart, ${totalItems} items` : "Open cart"
              }
            >
              <HiShoppingBag className="h-5 w-5" />
              Cart
              {totalItems > 0 && (
                <span
                  className="absolute right-[calc(50%-1.25rem)] top-0 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[9px] font-bold text-white"
                  style={{ backgroundColor: HERO_RED }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setMoreOpen((open) => !open);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors",
                moreOpen ? "text-[#c8102e]" : "text-gray-500"
              )}
              aria-label="More options"
              aria-expanded={moreOpen}
            >
              <HiBars3 className="h-5 w-5" />
              More
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
