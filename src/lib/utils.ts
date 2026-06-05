import type { Product } from "@/types";

/** Shared page wrapper — full width on mobile, contained from md */
export const PAGE_SHELL =
  "mx-auto w-full max-w-7xl px-3 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20";

/** Prefix public asset paths for GitHub Pages (subpath deploy). */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDiscountPercent(price: number, original?: number) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function filterProducts(
  products: Product[],
  opts: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    badge?: string;
    sort?: string;
  }
) {
  let result = [...products];

  if (opts.search?.trim()) {
    const q = opts.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (opts.category && opts.category !== "all") {
    result = result.filter((p) => p.category === opts.category);
  }

  if (opts.badge && opts.badge !== "all") {
    result = result.filter((p) => p.badges.includes(opts.badge as never));
  }

  if (opts.minPrice != null) {
    result = result.filter((p) => p.price >= opts.minPrice!);
  }
  if (opts.maxPrice != null) {
    result = result.filter((p) => p.price <= opts.maxPrice!);
  }

  switch (opts.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) =>
        a.badges.includes("new") ? -1 : b.badges.includes("new") ? 1 : 0
      );
      break;
    default:
      break;
  }

  return result;
}

/** YouTube Shorts / watch URLs and Instagram Reels → embed iframe src */
export function getVideoEmbedUrl(
  url: string,
  options?: { autoplay?: boolean }
): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const autoplay = options?.autoplay !== false;

  const ytParams = autoplay
    ? "?autoplay=1&mute=1&playsinline=1&loop=1&rel=0&modestbranding=1"
    : "";

  const shorts = trimmed.match(/youtube\.com\/shorts\/([^/?&]+)/);
  if (shorts?.[1])
    return `https://www.youtube.com/embed/${shorts[1]}${ytParams}`;

  const watch = trimmed.match(/[?&]v=([^&]+)/);
  if (watch?.[1])
    return `https://www.youtube.com/embed/${watch[1]}${ytParams}`;

  const youtuBe = trimmed.match(/youtu\.be\/([^/?&]+)/);
  if (youtuBe?.[1])
    return `https://www.youtube.com/embed/${youtuBe[1]}${ytParams}`;

  const embed = trimmed.match(/youtube\.com\/embed\/([^/?&]+)/);
  if (embed?.[1])
    return `https://www.youtube.com/embed/${embed[1]}${ytParams}`;

  const igReel = trimmed.match(/instagram\.com\/reel\/([^/?&]+)/);
  if (igReel?.[1]) {
    const id = igReel[1];
    return autoplay
      ? `https://www.instagram.com/reel/${id}/embed/?autoplay=1&mute=1`
      : `https://www.instagram.com/reel/${id}/embed/captioned`;
  }

  return null;
}
