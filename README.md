# PlayJoy Toys — Kids-Friendly Toy Shop

Modern, colorful toy store built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP**, and **React Icons**.

## Features

- Responsive design (mobile, tablet, desktop)
- Light theme (default) + dark theme toggle
- Hero, categories, featured/new/bestseller/offers sections
- Product listing with search & filters
- Product detail pages with image gallery
- Cart & wishlist (localStorage)
- Direct order via WhatsApp + Email
- Testimonials, FAQ, About, Contact, Newsletter
- GSAP scroll animations, floating toys, surprise boxes, animated counters

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your admin WhatsApp number and email
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

GitHub Pages serves **static files only**. It cannot run the Next.js server, so publishing the repo root (README + source) shows the README instead of the app.

1. Push to `main` — the workflow builds the app and publishes static files into the **`docs/`** folder on **`main`** (source code stays; only `docs/` is updated).
2. In the repo: **Settings → Pages → Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** **`main`** → folder **`/docs`** (not `/(root)` — root is README + source)
3. Wait for the **Actions** workflow to finish (green check), then open `https://buildwithmozi.github.io/Toys-Studio-Gallery/`.

The `docs/` folder is auto-generated — do not edit it by hand.

Local static preview (same as Pages):

```bash
# PowerShell
$env:GITHUB_PAGES = "true"
npm run build:pages
npx serve out
```

**Note:** On GitHub Pages, `/api/order` (SMTP email) does not run. Orders still work via WhatsApp and mailto fallback.

For full Next.js features (API routes, image optimization), use [Vercel](https://vercel.com) instead.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ADMIN_WHATSAPP` | Admin WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin email for orders |
| `NEXT_PUBLIC_SITE_NAME` | Store name in messages |
| `SMTP_*` | Optional — enables email API without mailto fallback |

## Order Flow

1. User adds toys to cart or orders from product page
2. Fills name, phone, address, quantity, notes
3. Submit opens **WhatsApp** with pre-filled order message
4. **Email** sent via `/api/order` (SMTP) or mailto fallback

## Tech Stack

- Next.js 16 + App Router
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- next-themes (dual theme)
- react-icons
