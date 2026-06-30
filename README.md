# craftdesk Toy's

Modern toy store for **craftdesk Toy's** (Nashik) — built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React Icons**.

## Features

- Responsive design (mobile, tablet, desktop)
- Home hero, sliders, shop by age, trending shorts, testimonials
- Product listing with search and filters
- Cart and wishlist (localStorage)
- Checkout via WhatsApp
- Store map, contact, FAQ, About
- GitHub Pages static deploy **or** Vercel full-stack

## Getting Started

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_ADMIN_WHATSAPP and optional NEXT_PUBLIC_SITE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages (free static hosting)

### One-time GitHub Settings (required)

1. Repo → **Settings → Pages → Build and deployment**
2. **Source:** **GitHub Actions** (NOT “Deploy from a branch”)
3. Save

If Source is still **main / docs** or **gh-pages / root**, GitHub may keep serving an **old cached build** (PlayJoy) even after a successful deploy.

### Auto deploy on every push to main

1. Push to **`main`**
2. Action **“Deploy to GitHub Pages”** runs → builds `out/` → publishes via GitHub Actions
3. Site URL: `https://buildwithmozi.github.io/Toys-Studio-Gallery/`

**Manual redeploy:** Actions tab → **Deploy to GitHub Pages** → **Run workflow**

**Local static preview:**

```bash
npm run build:pages
npx serve out
```

On GitHub Pages, `/api/order` (email) does not run — **WhatsApp orders work fully**.

## Deploy to Vercel (recommended for custom domain + email API)

1. Import repo on [vercel.com](https://vercel.com)
2. Set environment variables from `.env.example`
3. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
4. Deploy — images are optimized and `/api/order` works with SMTP

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Live site URL (SEO, sitemap, social previews) |
| `NEXT_PUBLIC_ADMIN_WHATSAPP` | Admin WhatsApp (`919518728908`) |
| `NEXT_PUBLIC_SITE_NAME` | Store name in order messages |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Optional admin email |
| `SMTP_*` | Optional — enables `/api/order` email on Vercel |

## Production images

- **Local assets** (`public/logo.png`, `public/hero/*`) — work on GitHub Pages via `basePath`
- **ToyFort / Pinterest URLs** — loaded with `referrerPolicy: no-referrer` for hotlink reliability
- Replace demo Pinterest product photos with your own images in `src/data/images.ts` or `public/` for best results

## Order Flow

1. Add toys to cart
2. Checkout — fill name, phone, address
3. Submit opens **WhatsApp** with order details
4. Email sent on Vercel when SMTP is configured

## Tech Stack

- Next.js 16 (App Router)
- TypeScript, Tailwind CSS v4
- GSAP, react-leaflet, react-icons
