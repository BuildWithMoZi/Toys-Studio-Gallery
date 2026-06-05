"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi2";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const HERO_RED = "#c8102e";

const heroCategories = [
  { label: "Infants", href: "/products?category=plush" },
  { label: "Books", href: "/products?category=educational" },
  { label: "Toys", href: "/products" },
  { label: "Sports", href: "/products?category=outdoor" },
  { label: "School Items", href: "/products?category=educational" },
  { label: "Electronics", href: "/products?category=games" },
  { label: "Contact Us", href: "/contact" },
];

export function HeroHeader() {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const iconBtnClass =
    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 md:h-10 md:w-10";

  return (
    <header className="relative z-20 shrink-0 bg-white">
      {/* Main nav row */}
      <div className="border-b border-gray-100 px-3 py-3 sm:px-5 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-3 md:gap-4">
          <Link
            href="/"
            scroll={false}
            onClick={(e) => handleNavLinkClick(e, "/", pathname)}
            className="shrink-0 transition-opacity hover:opacity-90"
          >
            <SiteLogo priority className="h-11 md:h-14" />
          </Link>

          <form
            onSubmit={handleSearch}
            className="relative mx-auto hidden min-w-0 max-w-xl flex-1 sm:block"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Toys"
              className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-11 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:bg-white md:h-11"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:text-gray-700 md:h-9 md:w-9"
              aria-label="Search toys"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={iconBtnClass}
              aria-label={
                totalItems > 0 ? `Cart, ${totalItems} items` : "Open cart"
              }
            >
              <HiShoppingBag className="h-[18px] w-[18px] md:h-5 md:w-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: HERO_RED }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/wishlist"
              scroll={false}
              onClick={(e) => handleNavLinkClick(e, "/wishlist", pathname)}
              className={iconBtnClass}
              aria-label={
                wishlistItems.length > 0
                  ? `Wishlist, ${wishlistItems.length} items`
                  : "Wishlist"
              }
            >
              <HiHeart className="h-[18px] w-[18px] md:h-5 md:w-5" />
              {wishlistItems.length > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: HERO_RED }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              scroll={false}
              onClick={(e) => handleNavLinkClick(e, "/contact", pathname)}
              className={iconBtnClass}
              aria-label="Contact"
            >
              <HiUser className="h-[18px] w-[18px] md:h-5 md:w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="relative mx-auto mt-3 sm:hidden">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Toys"
            className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-11 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500"
            aria-label="Search toys"
          >
            <HiMagnifyingGlass className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Category pills */}
      <div
        className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ backgroundColor: HERO_RED }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-2.5 sm:px-5 md:justify-center md:gap-3 md:px-6 lg:px-8">
          {heroCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              scroll={false}
              onClick={(e) => handleNavLinkClick(e, cat.href, pathname)}
              className={cn(
                "shrink-0 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:px-4 sm:text-sm"
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
