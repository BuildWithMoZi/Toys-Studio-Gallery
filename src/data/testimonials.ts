import type { Testimonial } from "@/types";
import { toyImage } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Happy Parent",
    avatar: toyImage(9),
    text: "My kids absolutely love the building blocks! Quality is amazing and delivery was super fast. Will order again!",
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Mehta",
    role: "Gift Buyer",
    avatar: toyImage(14),
    text: "Ordered the plush bear for my niece's birthday. She hasn't let go of it since! Best toy shop experience.",
    rating: 5,
  },
  {
    id: "3",
    name: "Anita Desai",
    role: "Teacher",
    avatar: toyImage(17),
    text: "Educational toys are top-notch. I recommend PlayJoy to all parents in my classroom. Trustworthy and fun!",
    rating: 5,
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Dad of Two",
    avatar: toyImage(26),
    text: "WhatsApp ordering was so easy! Got confirmation within minutes. The action figures are premium quality.",
    rating: 4,
  },
];

/** Product detail page review cards (rotated per slug). */
export interface ProductDetailReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  verified?: boolean;
}

const productDetailReviews: ProductDetailReview[] = [
  {
    id: "r1",
    author: "Priya Sharma",
    role: "Verified Buyer",
    avatar: toyImage(9),
    rating: 5,
    text: "Quality exceeded expectations — sturdy, colorful, and my child plays with it daily. Delivery was quick too!",
    verified: true,
  },
  {
    id: "r2",
    author: "Rahul Mehta",
    role: "Gift Buyer",
    avatar: toyImage(14),
    rating: 5,
    text: "Perfect birthday gift! Packaging was neat and the toy looked even better in person than in photos.",
    verified: true,
  },
  {
    id: "r3",
    author: "Anita Desai",
    role: "Parent & Teacher",
    avatar: toyImage(17),
    rating: 5,
    text: "Safe materials and thoughtful design. I recommend this to parents looking for fun + learning.",
    verified: true,
  },
  {
    id: "r4",
    author: "Vikram Singh",
    role: "Dad of Two",
    avatar: toyImage(26),
    rating: 4,
    text: "Great value for money. WhatsApp ordering was smooth and we got a confirmation within minutes.",
    verified: true,
  },
  {
    id: "r5",
    author: "Meera Kapoor",
    role: "Happy Parent",
    avatar: toyImage(11),
    rating: 5,
    text: "Kids loved it from day one. Build quality feels premium — worth every rupee.",
    verified: true,
  },
];

export function getReviewsForProduct(
  slug: string,
  count = 3
): ProductDetailReview[] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % productDetailReviews.length;
  }
  const out: ProductDetailReview[] = [];
  for (let i = 0; i < count; i++) {
    out.push(productDetailReviews[(hash + i) % productDetailReviews.length]);
  }
  return out;
}
