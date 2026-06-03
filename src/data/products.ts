import type { Category, Product } from "@/types";
import { toyImagePair } from "./images";

export const products: Product[] = [
  {
    id: "1",
    slug: "rainbow-building-blocks",
    name: "Rainbow Building Blocks Set",
    description: "120 colorful blocks for creative builders ages 3+.",
    longDescription:
      "Spark creativity with our premium rainbow building blocks! Made from child-safe ABS plastic, these blocks help develop motor skills, spatial awareness, and imagination. Includes a storage bag and idea booklet with 50+ builds.",
    price: 1299,
    originalPrice: 1599,
    category: "educational",
    images: toyImagePair(0, 1),
    rating: 4.8,
    reviewCount: 234,
    badges: ["bestseller", "featured"],
    stock: 45,
    ageRange: "3-8 years",
    features: ["120 pieces", "Non-toxic", "Storage bag included"],
  },
  {
    id: "2",
    slug: "cosmic-robot-figure",
    name: "Cosmic Robot Action Figure",
    description: "Articulated 12-inch hero with light-up chest panel.",
    longDescription:
      "Meet Cosmo-Bot, the galaxy's bravest defender! Features 15 points of articulation, LED chest light, and interchangeable hands. Perfect for epic playtime battles and display.",
    price: 899,
    category: "action-figures",
    images: toyImagePair(2, 3),
    rating: 4.6,
    reviewCount: 189,
    badges: ["new", "featured"],
    stock: 30,
    ageRange: "5+ years",
    features: ["LED lights", "15 articulation points", "Collector quality"],
  },
  {
    id: "3",
    slug: "fluffy-cloud-bear",
    name: "Fluffy Cloud Bear Plush",
    description: "Ultra-soft 40cm teddy with embroidered smile.",
    longDescription:
      "The cuddliest companion in the toy universe! Made from hypoallergenic cloud-fleece with safety-stitched eyes. Machine washable and perfect for bedtime snuggles.",
    price: 649,
    originalPrice: 799,
    category: "plush",
    images: toyImagePair(4, 5),
    rating: 4.9,
    reviewCount: 412,
    badges: ["bestseller", "sale"],
    stock: 60,
    ageRange: "All ages",
    features: ["Hypoallergenic", "40cm size", "Machine washable"],
  },
  {
    id: "4",
    slug: "adventure-board-game",
    name: "Treasure Island Board Game",
    description: "Cooperative pirate adventure for 2-4 players.",
    longDescription:
      "Set sail on a cooperative quest! Work together to find treasure before the island sinks. Includes beautifully illustrated board, 4 player pieces, cards, and dice. Average playtime 30 minutes.",
    price: 1099,
    category: "games",
    images: toyImagePair(6, 7),
    rating: 4.7,
    reviewCount: 156,
    badges: ["featured"],
    stock: 25,
    ageRange: "6+ years",
    features: ["2-4 players", "Cooperative play", "30 min gameplay"],
  },
  {
    id: "5",
    slug: "mega-water-blaster",
    name: "Mega Splash Water Blaster",
    description: "Pump-action blaster with 500ml tank.",
    longDescription:
      "Dominate summer with the Mega Splash! Long-range pump action, ergonomic grip, and quick-fill port. Made from durable, BPA-free plastic for endless outdoor fun.",
    price: 499,
    originalPrice: 649,
    category: "outdoor",
    images: toyImagePair(8, 9),
    rating: 4.5,
    reviewCount: 98,
    badges: ["sale"],
    stock: 40,
    ageRange: "5+ years",
    features: ["500ml tank", "Long range", "BPA-free"],
  },
  {
    id: "6",
    slug: "galaxy-art-kit",
    name: "Galaxy Art & Craft Kit",
    description: "50+ pieces: paints, glitter, canvases & stencils.",
    longDescription:
      "Create cosmic masterpieces! This all-in-one kit includes acrylic paints, glitter tubes, 3 canvases, space-themed stencils, brushes, and an apron. Perfect for rainy day creativity.",
    price: 799,
    category: "creative",
    images: toyImagePair(10, 11),
    rating: 4.8,
    reviewCount: 203,
    badges: ["new", "featured"],
    stock: 35,
    ageRange: "4+ years",
    features: ["50+ pieces", "Non-toxic paints", "Apron included"],
  },
  {
    id: "7",
    slug: "smart-learning-tablet",
    name: "Smart Learning Tablet",
    description: "Interactive ABC, numbers & music for toddlers.",
    longDescription:
      "Screen-free learning fun! 8 activity modes covering letters, numbers, colors, and music. Volume control, durable design, and auto shut-off. Batteries included.",
    price: 1499,
    originalPrice: 1899,
    category: "educational",
    images: toyImagePair(12, 13),
    rating: 4.6,
    reviewCount: 167,
    badges: ["bestseller", "sale"],
    stock: 20,
    ageRange: "2-5 years",
    features: ["8 activities", "Volume control", "Batteries included"],
  },
  {
    id: "8",
    slug: "racing-car-set",
    name: "Speed Champions Racing Set",
    description: "4 die-cast cars with loop-de-loop track.",
    longDescription:
      "Race to victory! Includes 4 metal die-cast cars, flexible track pieces, loop, and launchers. Easy snap-together assembly. Compatible with expansion packs.",
    price: 1199,
    category: "games",
    images: toyImagePair(14, 15),
    rating: 4.7,
    reviewCount: 278,
    badges: ["bestseller"],
    stock: 28,
    ageRange: "4+ years",
    features: ["4 die-cast cars", "Loop track", "Easy assembly"],
  },
  {
    id: "9",
    slug: "unicorn-plush-family",
    name: "Unicorn Plush Family (Set of 3)",
    description: "Magical mini unicorns in pastel rainbow colors.",
    longDescription:
      "A trio of enchanted unicorns! Mom, dad, and baby in soft pastel fleece with glitter horns. Each 15cm tall. Perfect gift set for unicorn lovers.",
    price: 899,
    category: "plush",
    images: toyImagePair(16, 17),
    rating: 4.9,
    reviewCount: 145,
    badges: ["new"],
    stock: 50,
    ageRange: "3+ years",
    features: ["Set of 3", "Glitter horns", "Pastel colors"],
  },
  {
    id: "10",
    slug: "super-hero-squad-pack",
    name: "Super Hero Squad Pack",
    description: "5 mini heroes with display stand.",
    longDescription:
      "Assemble the ultimate squad! Five 4-inch poseable figures with team display base. Each hero has unique accessories. Collect them all!",
    price: 749,
    originalPrice: 999,
    category: "action-figures",
    images: toyImagePair(20, 21),
    rating: 4.5,
    reviewCount: 112,
    badges: ["sale", "featured"],
    stock: 38,
    ageRange: "4+ years",
    features: ["5 figures", "Display stand", "Accessories"],
  },
  {
    id: "11",
    slug: "garden-explorer-kit",
    name: "Garden Explorer Outdoor Kit",
    description: "Bug catcher, magnifier, compass & journal.",
    longDescription:
      "Little naturalists rejoice! Includes mesh bug habitat, 5x magnifier, real compass, field journal, and stickers. Encourages outdoor exploration and STEM learning.",
    price: 599,
    category: "outdoor",
    images: toyImagePair(22, 23),
    rating: 4.8,
    reviewCount: 89,
    badges: ["new"],
    stock: 42,
    ageRange: "5-10 years",
    features: ["Bug habitat", "5x magnifier", "Field journal"],
  },
  {
    id: "12",
    slug: "clay-sculpting-studio",
    name: "Clay Sculpting Studio",
    description: "24 colors air-dry clay with tools & molds.",
    longDescription:
      "Sculpt anything you imagine! 24 vibrant air-dry clay colors, rolling pin, cutters, molds, and project guide. Clay dries in 24 hours — no oven needed!",
    price: 549,
    originalPrice: 699,
    category: "creative",
    images: toyImagePair(24, 25),
    rating: 4.7,
    reviewCount: 201,
    badges: ["bestseller", "sale"],
    stock: 55,
    ageRange: "4+ years",
    features: ["24 colors", "Air-dry", "Tools included"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.badges.includes("featured"));
}

export function getNewArrivals() {
  return products.filter((p) => p.badges.includes("new"));
}

export function getBestSellers() {
  return products.filter((p) => p.badges.includes("bestseller"));
}

export function getOnSale() {
  return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
}

export function getProductsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}

export function getBudgetPicks(maxPrice = 999) {
  return products.filter((p) => p.price <= maxPrice);
}
