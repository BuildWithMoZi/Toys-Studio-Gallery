/** Toy catalog images (Pinterest) — single source for the site */
export const TOY_IMAGES = [
  "https://i.pinimg.com/736x/5f/d5/8f/5fd58ff149f2ff347c0f1a7ea0e9bb5d.jpg",
  "https://i.pinimg.com/736x/6f/3f/d8/6f3fd87f311263ebc2dcbf4d8071d502.jpg",
  "https://i.pinimg.com/736x/fa/b7/90/fab790d0abc78441f64eb2ee33aa5fbf.jpg",
  "https://i.pinimg.com/1200x/52/82/10/5282108c34a3e7bddf7af9a4b8a148a2.jpg",
  "https://i.pinimg.com/736x/5a/ec/51/5aec515227f76aac7f887503be7c2675.jpg",
  "https://i.pinimg.com/736x/43/fb/02/43fb02c10f93cc474ca61cb6534bd351.jpg",
  "https://i.pinimg.com/1200x/c2/5d/5d/c25d5df913dc3bb9dcd7cc4f2a29c370.jpg",
  "https://i.pinimg.com/736x/4a/da/fa/4adafa4a369bdd685ff57901999f46b9.jpg",
  "https://i.pinimg.com/1200x/f6/4d/8f/f64d8f16043a4e3882e71d633c20277c.jpg",
  "https://i.pinimg.com/736x/fa/4e/58/fa4e58d672dad21b87478ed095cbfb9b.jpg",
  "https://i.pinimg.com/736x/11/ca/67/11ca67b7cfe0fb63ea6686ea54a3af05.jpg",
  "https://i.pinimg.com/736x/61/3f/3b/613f3b10856aa0e89c3210ce6d1c782c.jpg",
  "https://i.pinimg.com/736x/b2/59/c0/b259c04d31e7444be98b24d24bfc259c.jpg",
  "https://i.pinimg.com/736x/ab/52/e8/ab52e8c8163e111d34ca0dd0e602ffd2.jpg",
  "https://i.pinimg.com/736x/6d/72/35/6d7235358a3a9637717a5a3dcad93c9b.jpg",
  "https://i.pinimg.com/736x/75/85/51/758551517c5adb38e6959ec6ca6cb2d8.jpg",
  "https://i.pinimg.com/736x/f3/61/93/f36193efef575d33c090af1fff5fdb3a.jpg",
  "https://i.pinimg.com/736x/b1/c1/1a/b1c11a6c4b57f61e5dd9aef4d67008a3.jpg",
  "https://i.pinimg.com/736x/0a/cf/01/0acf01ff338f715a296a91b59b5e8cf8.jpg",
  "https://i.pinimg.com/736x/ec/76/bf/ec76bf57c07e6be5b0384046f9f3991d.jpg",
  "https://i.pinimg.com/736x/db/aa/31/dbaa310f2de2f5b9ba58a53a55edd304.jpg",
  "https://i.pinimg.com/736x/30/68/42/306842775ad894f11dfde925642e438f.jpg",
  "https://i.pinimg.com/736x/20/59/17/2059172185b8edeec5069090128197df.jpg",
  "https://i.pinimg.com/736x/6f/e5/73/6fe5735ca5111c3030af44cbd84ee977.jpg",
  "https://i.pinimg.com/1200x/ef/f4/17/eff41710d0772a6f2fc1426a5dc654a9.jpg",
  "https://i.pinimg.com/1200x/91/d8/59/91d859a51874228e0b77988e68680c5f.jpg",
  "https://i.pinimg.com/736x/d7/db/eb/d7dbebd4fa5e01e846c62b4adb17da88.jpg",
  "https://i.pinimg.com/736x/44/28/b3/4428b3fd22f62e10c39394ac13180453.jpg",
  "https://i.pinimg.com/1200x/14/90/44/1490445d5a8fab31855ba2f867d1a82f.jpg",
] as const;

/** Home page — Hot New Arrivals carousel */
export const HOT_ARRIVALS_SLIDES = [
  "https://toyfort.in/uploads/slider/slider_69d3bc5ac1f3f6-09152154-24694122.png",
  "https://toyfort.in/uploads/slider/slider_69f74f81a95203-93256760-27693461.png",
  "https://toyfort.in/uploads/slider/slider_69f74d89014867-77187989-11785983.png",
  "https://toyfort.in/uploads/slider/slider_69c926b5302899-89668444-68165145.png",
  "https://toyfort.in/uploads/slider/slider_69c92f1445ec71-42585463-40747160.png",
  "https://toyfort.in/uploads/slider/slider_69c92fb6366fb3-69418554-17483794.png",
  "https://toyfort.in/uploads/slider/slider_69c927e94bc571-39893816-96270073.png",
  "https://toyfort.in/uploads/slider/slider_69c929f27c8a32-08450224-38438135.png",
  "https://toyfort.in/uploads/slider/slider_69f8325333b5b7-85459613-44498695.png",
] as const;

/** Home page — Shop By Age cards (`public/hero/age-images`) */
export const SHOP_BY_AGE = [
  {
    label: "0-18 Months",
    image: "/hero/age-images/1.png",
    href: "/products?category=plush",
  },
  {
    label: "18-36 Months",
    image: "/hero/age-images/2.png",
    href: "/products?category=educational",
  },
  {
    label: "3-5 Years",
    image: "/hero/age-images/3.png",
    href: "/products?category=creative",
  },
  {
    label: "5-8 Years",
    image: "/hero/age-images/4.png",
    href: "/products?category=outdoor",
  },
  {
    label: "9-12 Years",
    image: "/hero/age-images/5.png",
    href: "/products?category=games",
  },
  {
    label: "12+ Years",
    image: "/hero/age-images/6.png",
    href: "/products?category=action-figures",
  },
] as const;

/** Home page — side-by-side promo banners */
export const PROMO_BANNER_PAIR = [
  {
    image:
      "https://toyfort.in/uploads/blocks/block_69cbaa6b025868-20989433-58969300.png",
    href: "/products?category=outdoor",
    alt: "Swimming pools collection",
  },
  {
    image:
      "https://toyfort.in/uploads/blocks/block_69cbaf18f2d050-00533121-57604239.png",
    href: "/products?category=outdoor",
    alt: "Bouncy castle collection",
  },
] as const;

/** Home page — Trending Shorts / Reels (YouTube Shorts or Instagram Reels URLs) */
export const TRENDING_SHORTS = [
  {
    url: "https://www.instagram.com/reel/DJHGQe_pHvt/?igsh=bDZxZGttMHIzdHc2",
    title: "Reel 1",
  },
  {
    url: "https://www.instagram.com/reel/DJI8vjZsUaO/?igsh=czh0MGViMnc5YnJs",
    title: "Reel 2",
  },
  {
    url: "https://www.instagram.com/reel/DKocPd8M1dJ/?igsh=MWRkMGJ0NzE1ZjNxdQ==",
    title: "Reel 3",
  },
  {
    url: "https://www.instagram.com/reel/DKph8EVsHUa/?igsh=MWo3cGdwYWZ3Yjg4cQ==",
    title: "Reel 4",
  },
  {
    url: "https://www.instagram.com/reel/DKr_TiQTgCW/?igsh=bzY3djN4dXcyN3k4",
    title: "Reel 5",
  },
  {
    url: "https://www.instagram.com/reel/DK4DsRSJF69/?igsh=cWpxNW5mMjY4b3R5",
    title: "Reel 6",
  },
  {
    url: "https://www.instagram.com/reel/DK7HzaPsUF0/?igsh=MXB5dzVvMWg3Zmt6dg==",
    title: "Reel 7",
  },
  {
    url: "https://www.instagram.com/reel/DWapVSFiTXA/?igsh=MW9sYTNwcm10MnFnYg==",
    title: "Reel 8",
  },
  {
    url: "https://www.instagram.com/reel/DWapsuXiTDN/?igsh=MTc4b3VtcXh2bGRxdQ==",
    title: "Reel 9",
  },
  {
    url: "https://www.instagram.com/reel/DWft4g4if9X/?igsh=MXNrazh3djluY2sxdA==",
    title: "Reel 10",
  },
  {
    url: "https://www.instagram.com/reel/DWfuPQZiUkn/?igsh=MWhpNjlqNncxczJ5bw==",
    title: "Reel 11",
  },
  {
    url: "https://www.instagram.com/reel/DXJwLVdTJH6/?igsh=MTlyNGk4aG0weXlubw==",
    title: "Reel 12",
  },
] as const;

/** Hero + content area background */
export const HERO_IMAGE = TOY_IMAGES[18];

export function toyImage(index: number): string {
  return TOY_IMAGES[index % TOY_IMAGES.length]!;
}

export function toyImagePair(
  first: number,
  second: number
): [string, string] {
  return [toyImage(first), toyImage(second)];
}
