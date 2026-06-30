/** Safal's Toy Studio — shared business details (@safal_toy_studio_sts) */

export const SITE = {
  name: "Safal's Toy Studio",
  shortName: "Safal Toy Studio STS",
  tagline: "Fun • Gifts • RC Toys",
  description: "Premium toys for every age",
  category: "Shopping & retail",
  orderCta: "DM / Call for orders",
  instagram: {
    handle: "safal_toy_studio_sts",
    display: "@safal_toy_studio_sts",
    url: "https://www.instagram.com/safal_toy_studio_sts/",
  },
} as const;

export const STORE_LOCATION = {
  name: SITE.name,
  address: "Mahatma Nagar, Nashik",
  addressFull: "Mahatma Nagar, Nashik, Maharashtra, India",
  phone: "+91 95187 28908",
  phoneTel: "tel:+919518728908",
  whatsapp: "919518728908",
  coordinates: {
    lat: 19.9805,
    lng: 73.7889,
  },
} as const;

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_META = {
  title: `${SITE.name} — ${SITE.tagline}`,
  titleTemplate: `%s | ${SITE.name}`,
  description: `${SITE.description}. ${SITE.tagline} in Mahatma Nagar, Nashik. Order via WhatsApp or call — fast, friendly service.`,
  keywords: [
    "toys",
    "RC toys",
    "gifts",
    "Nashik toy shop",
    "Safal Toy Studio",
    "kids toys",
    "Mahatma Nagar Nashik",
  ],
  openGraph: {
    title: SITE.name,
    description: `${SITE.tagline} — ${SITE.description}`,
  },
} as const;

/** Absolute URL for metadata, sitemap, and social previews. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

export function getDirectionsUrl() {
  const { lat, lng } = STORE_LOCATION.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function getAnnouncementText() {
  return `Call us at ${STORE_LOCATION.phone} for orders, bulk inquiries & assistance — ${SITE.orderCta}`;
}

export const DEFAULT_WHATSAPP_GREETING = `Hi! I'd like to order from ${SITE.name}.`;
