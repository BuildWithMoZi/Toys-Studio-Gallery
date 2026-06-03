export type Category =
  | "educational"
  | "games"
  | "action-figures"
  | "plush"
  | "outdoor"
  | "creative";

export type ProductBadge = "new" | "bestseller" | "sale" | "featured";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: Category;
  images: string[];
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  stock: number;
  ageRange: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  productDetails: string;
  quantity: number;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type AchievementIconKey = "families" | "trophy" | "speed" | "safety";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconKey: AchievementIconKey;
  color: string;
}
