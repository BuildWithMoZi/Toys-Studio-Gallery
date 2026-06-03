import type { MouseEvent } from "react";

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

/** Same-route: smooth scroll to top. Cross-route: rely on SmoothScrollOnNavigate. */
export function handleNavLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string
) {
  if (normalizePath(href) === normalizePath(pathname)) {
    e.preventDefault();
    scrollToTop();
  }
}
