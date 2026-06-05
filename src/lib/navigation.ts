/** Shared site navigation — single source of truth for all nav menus. */

export const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export const HERO_CATEGORY_PILLS = [
  { label: "Infants", href: "/products?category=plush" },
  { label: "Books", href: "/products?category=educational" },
  { label: "Toys", href: "/products" },
  { label: "Sports", href: "/products?category=outdoor" },
  { label: "School Items", href: "/products?category=creative" },
  { label: "Electronics", href: "/products?category=games" },
  { label: "Contact Us", href: "/contact" },
] as const;

/** Home hero mobile sidebar — categories + pages (no duplicates). */
export const HERO_SIDEBAR_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

export function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const path = href.split("?")[0] ?? href;
  if (path === "/") return pathname === "/";
  if (path === "/products") {
    return pathname === "/products" || pathname.startsWith("/products/");
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function buildProductsSearchUrl(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return "/products";
  return `/products?search=${encodeURIComponent(trimmed)}`;
}
