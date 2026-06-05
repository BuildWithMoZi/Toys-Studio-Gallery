"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  buildProductsSearchUrl,
  isNavLinkActive,
  MAIN_NAV_LINKS,
} from "@/lib/navigation";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { SiteLogo } from "./SiteLogo";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildProductsSearchUrl(query);
    setSearchOpen(false);
    setQuery("");
    router.push(url);
  };

  const navLinkClass = (href: string) =>
    cn(
      "text-[10px] font-semibold uppercase tracking-[0.22em] transition-all xl:text-[11px]",
      isNavLinkActive(pathname, href)
        ? "text-[var(--navbar-link-hover)]"
        : "text-[var(--navbar-link)] hover:text-[var(--navbar-link-hover)]"
    );

  const navPadding = "px-6 md:px-10 lg:px-14";

  const iconBtnClass =
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 md:h-11 md:w-11";

  const cartBtnClass =
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] text-white transition-colors hover:bg-[#a00d24] md:h-11 md:w-11";

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const openSearch = () => {
    setMobileOpen(false);
    setSearchOpen(true);
  };

  const canSubmitSearch = query.trim().length > 0;

  const navInner = (
    <nav
      className={cn(
        "relative mx-auto flex h-[3.25rem] max-w-full items-center gap-3 md:h-14",
        navPadding
      )}
    >
      <Link
        href="/"
        scroll={false}
        onClick={(e) => handleNavLinkClick(e, "/", pathname)}
        className="relative z-10 shrink-0 transition-opacity hover:opacity-80"
      >
        <SiteLogo className="h-10 md:h-11" />
      </Link>

      {searchOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative z-10 flex min-w-0 flex-1 items-center gap-2"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search toys..."
            className="h-10 min-w-0 flex-1 rounded-full border border-[var(--navbar-border)] bg-[var(--card)] px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-[var(--navbar-ring)] md:h-11 md:px-5"
            autoFocus
          />
          <button
            type={canSubmitSearch ? "submit" : "button"}
            onClick={() => {
              if (!canSubmitSearch) closeSearch();
            }}
            className={iconBtnClass}
            aria-label={canSubmitSearch ? "Search toys" : "Close search"}
          >
            {canSubmitSearch ? (
              <HiMagnifyingGlass className="h-5 w-5" />
            ) : (
              <HiXMark className="h-5 w-5" />
            )}
          </button>
        </form>
      ) : (
        <>
          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  scroll={false}
                  onClick={(e) => handleNavLinkClick(e, link.href, pathname)}
                  className={navLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="hidden items-center gap-2 sm:flex md:gap-2.5">
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
                <HiHeart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8102e] text-[9px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openSearch}
                className={iconBtnClass}
                aria-label="Open search"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={openSearch}
              className={cn(iconBtnClass, "sm:hidden")}
              aria-label="Open search"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={cartBtnClass}
              aria-label={
                totalItems > 0 ? `Cart, ${totalItems} items` : "Open cart"
              }
            >
              <HiShoppingBag className="h-[18px] w-[18px] md:h-5 md:w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#c8102e] ring-1 ring-[#c8102e]">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--navbar-border)] lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-[var(--navbar-link)] transition-all",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-[var(--navbar-link)] transition-all",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-[var(--navbar-link)] transition-all",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </button>
          </div>
        </>
      )}
    </nav>
  );

  const panels =
    mobileOpen && !searchOpen ? (
      <div
        className={cn(
          "border-t border-gray-100 bg-white py-4 lg:hidden",
          navPadding
        )}
      >
        <ul className="flex flex-col gap-1">
          {MAIN_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                scroll={false}
                onClick={(e) => handleNavLinkClick(e, link.href, pathname)}
                className={cn(
                  "block py-2.5 text-xs font-semibold uppercase tracking-[0.2em]",
                  isNavLinkActive(pathname, link.href)
                    ? "text-[var(--navbar-link-hover)]"
                    : "text-[var(--navbar-link)]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--navbar-border)] pt-4">
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--navbar-link)]"
          >
            <HiMagnifyingGlass className="h-4 w-4" />
            Search
          </button>
          <Link
            href="/wishlist"
            scroll={false}
            onClick={(e) => handleNavLinkClick(e, "/wishlist", pathname)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--navbar-link)]"
          >
            <HiHeart className="h-4 w-4" />
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="text-[var(--navbar-logo)]">
                ({wishlistItems.length})
              </span>
            )}
          </Link>
          <Link
            href="/checkout"
            scroll={false}
            onClick={(e) => handleNavLinkClick(e, "/checkout", pathname)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--navbar-link)]"
          >
            <HiShoppingBag className="h-4 w-4" />
            Checkout
          </Link>
        </div>
      </div>
    ) : null;

  return (
    <header className="fixed left-0 right-0 top-7 z-50 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)]">
      {navInner}
      {panels}
    </header>
  );
}

/** Global navbar — hidden on home; hero embeds its own header. */
export function LayoutNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar />;
}
