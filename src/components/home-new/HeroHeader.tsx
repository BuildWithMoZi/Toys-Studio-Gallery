"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiBars3,
  HiChevronRight,
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiUser,
  HiXMark,
} from "react-icons/hi2";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  buildProductsSearchUrl,
  HERO_CATEGORY_PILLS,
  HERO_SIDEBAR_LINKS,
} from "@/lib/navigation";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const HERO_RED = "#c8102e";

const sidebarCategories = HERO_CATEGORY_PILLS.filter(
  (cat) => cat.label !== "Contact Us"
);

export function HeroHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildProductsSearchUrl(query);
    setQuery("");
    closeSidebar();
    router.push(url);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const iconBtnClass =
    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 md:h-10 md:w-10";

  const cartBadge = (
    <span
      className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-bold text-white"
      style={{ backgroundColor: HERO_RED }}
    >
      {totalItems}
    </span>
  );

  return (
    <>
    <header className="relative z-20 shrink-0 bg-white">
      {/* ── Mobile only (< md) ── */}
      <div className="border-b border-gray-100 md:hidden">
        <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center px-3 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center text-gray-800"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <HiBars3 className="h-6 w-6" />
          </button>

          <Link
            href="/"
            scroll={false}
            onClick={(e) => handleNavLinkClick(e, "/", pathname)}
            className="flex justify-center transition-opacity hover:opacity-90"
          >
            <SiteLogo priority className="h-10" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center text-gray-800"
            aria-label={
              totalItems > 0 ? `Cart, ${totalItems} items` : "Open cart"
            }
          >
            <HiShoppingBag className="h-6 w-6" />
            {totalItems > 0 && cartBadge}
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex px-3 pb-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-11 min-w-0 flex-1 border border-gray-200 bg-gray-100 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex h-11 w-12 shrink-0 items-center justify-center text-white"
            style={{ backgroundColor: HERO_RED }}
            aria-label="Search toys"
          >
            <HiMagnifyingGlass className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* ── Tablet + desktop (≥ md) — unchanged ── */}
      <div className="hidden border-b border-gray-100 px-3 py-3 sm:px-5 md:block md:px-6 lg:px-8">
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
            className="relative mx-auto min-w-0 max-w-xl flex-1"
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
      </div>

      {/* Category pills — tablet + desktop only */}
      <div
        className="hidden overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:block [&::-webkit-scrollbar]:hidden"
        style={{ backgroundColor: HERO_RED }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-2.5 sm:px-5 md:justify-center md:gap-3 md:px-6 lg:px-8">
          {HERO_CATEGORY_PILLS.map((cat) => (
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

    {/* Portal-like overlay: outside header so z-index clears announcement bar (z-60) */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 z-[70] md:hidden"
        role="dialog"
        aria-modal
        aria-label="Navigation menu"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          onClick={closeSidebar}
          aria-label="Close menu"
        />
        <aside className="relative flex h-full w-[min(100%,280px)] flex-col bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <span className="text-sm font-semibold text-gray-800">Menu</span>
            <button
              type="button"
              onClick={closeSidebar}
              className="flex h-9 w-9 items-center justify-center text-gray-600"
              aria-label="Close menu"
            >
              <HiXMark className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul>
              {sidebarCategories.map((cat) => (
                <li key={cat.label} className="border-b border-gray-100">
                  <Link
                    href={cat.href}
                    scroll={false}
                    onClick={(e) => {
                      handleNavLinkClick(e, cat.href, pathname);
                      closeSidebar();
                    }}
                    className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-700"
                  >
                    {cat.label}
                    <HiChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
              ))}
              {HERO_SIDEBAR_LINKS.map((link) => (
                <li key={link.href} className="border-b border-gray-100">
                  <Link
                    href={link.href}
                    scroll={false}
                    onClick={(e) => {
                      handleNavLinkClick(e, link.href, pathname);
                      closeSidebar();
                    }}
                    className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-700"
                  >
                    {link.label}
                    {link.label === "Wishlist" && wishlistItems.length > 0 && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: HERO_RED }}
                      >
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    )}
    </>
  );
}
