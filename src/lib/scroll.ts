import type { MouseEvent } from "react";
import { isExternalHref } from "@/lib/navigation";

export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToTop(behavior?: ScrollBehavior) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior ?? getScrollBehavior(),
  });
}

function normalizePath(path: string) {
  const base = path.split("?")[0] ?? path;
  if (base === "/") return "/";
  return base.replace(/\/$/, "") || "/";
}

/** Same path + query: scroll to top. Otherwise let Next.js navigate. */
export function handleNavLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string
) {
  if (isExternalHref(href)) return;
  if (typeof window === "undefined") return;

  const target = new URL(href, window.location.origin);
  const current = new URL(window.location.href);

  const samePath =
    normalizePath(target.pathname) === normalizePath(pathname);
  const sameSearch = target.search === current.search;

  if (samePath && sameSearch) {
    e.preventDefault();
    scrollToTop();
  }
}
