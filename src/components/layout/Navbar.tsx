"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { handleNavLinkClick } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({
  variant = "fixed",
}: {
  variant?: "fixed" | "hero-floating" | "scroll-pill";
}) {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isHeroFloating = variant === "hero-floating";
  const isScrollPill = variant === "scroll-pill";

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
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const navLinkClass = (href: string) =>
    cn(
      "text-[10px] font-semibold uppercase tracking-[0.22em] transition-all xl:text-[11px]",
      isScrollPill && "rounded-full px-3 py-2",
      isActive(pathname, href)
        ? isScrollPill
          ? "bg-card text-[var(--navbar-link-hover)] shadow-sm ring-1 ring-[var(--navbar-ring)]/40"
          : "text-[var(--navbar-link-hover)]"
        : "text-[var(--navbar-link)] hover:text-[var(--navbar-link-hover)]",
      isScrollPill &&
        !isActive(pathname, href) &&
        "hover:bg-card/60"
    );

  const navPadding = isHeroFloating
    ? "px-5 md:px-7 lg:px-8"
    : isScrollPill
      ? "px-5 md:px-6"
      : "px-6 md:px-10 lg:px-14";

  const iconBtnClass = cn(
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--navbar-ring)] text-[var(--navbar-logo)] transition-all hover:scale-105 md:h-11 md:w-11",
    isScrollPill ? "bg-card shadow-md" : "bg-[var(--card)]"
  );

  const cartBtnClass = cn(
    iconBtnClass,
    "border-[3px]",
    isScrollPill ? "bg-card" : "bg-[var(--navbar-bg)]"
  );

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
        className={cn(
          "relative z-10 shrink-0 font-display font-bold leading-none tracking-tight text-[var(--navbar-logo)] transition-opacity hover:opacity-80",
          isScrollPill ? "text-xl md:text-[1.35rem]" : "text-[1.35rem] md:text-2xl"
        )}
      >
          {isScrollPill && (
            <span
              className="absolute -left-1 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-secondary md:block"
              aria-hidden
            />
          )}
          <span className={isScrollPill ? "md:pl-2" : undefined}>PlayJoy</span>
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
            aria-label={
              canSubmitSearch ? "Search toys" : "Close search"
            }
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
          <ul
            className={cn(
              "hidden min-w-0 flex-1 items-center justify-center lg:flex",
              isScrollPill ? "gap-1 xl:gap-1.5" : "gap-4 xl:gap-6"
            )}
          >
            {links.map((link) => (
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
              <div className="hidden md:block">
                <ThemeToggle variant="navbar" />
              </div>

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
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--navbar-logo)] text-[9px] font-bold text-[var(--navbar-bg)]">
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
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--navbar-logo)] text-[9px] font-bold text-[var(--navbar-bg)]">
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

  const panels = (
    <>
      {mobileOpen && !searchOpen && (
        <div
          className={cn(
            "border-t border-[var(--navbar-border)] py-4 lg:hidden",
            isScrollPill
              ? "bg-[var(--navbar-bg)] md:bg-card/95"
              : "bg-[var(--navbar-bg)]",
            navPadding
          )}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  scroll={false}
                  onClick={(e) => handleNavLinkClick(e, link.href, pathname)}
                  className={cn(
                    "block py-2.5 text-xs font-semibold uppercase tracking-[0.2em]",
                    isActive(pathname, link.href)
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
            <ThemeToggle variant="navbar" />
          </div>
        </div>
      )}
    </>
  );

  if (isScrollPill) {
    return (
      <header className="relative z-20 w-full md:px-6 md:pt-4">
        <div
          className={cn(
            "w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)]/95 backdrop-blur-md",
            "md:mx-auto md:max-w-6xl md:overflow-hidden md:rounded-full md:border md:border-[var(--navbar-border)] md:shadow-[var(--scroll-nav-shadow)] md:ring-1 md:ring-[var(--scroll-nav-glow)]",
            mobileOpen && "md:rounded-3xl"
          )}
        >
          {navInner}
          {panels}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "w-full bg-[var(--navbar-bg)]",
        isHeroFloating
          ? "relative z-20 shrink-0"
          : "fixed left-0 right-0 top-0 z-50 border-b border-[var(--navbar-border)]"
      )}
    >
      {navInner}
      {panels}
    </header>
  );
}

const HERO_ID = "home-hero";

/** Global navbar — hidden on home; hero embeds its own floating bar. */
export function LayoutNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar variant="fixed" />;
}

/** Home: pill navbar after hero scrolls out of view. */
export function HomeScrollNavbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) return;

    const update = () => {
      setVisible(hero.getBoundingClientRect().bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[transform,opacity] duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <Navbar variant="scroll-pill" />
    </div>
  );
}
