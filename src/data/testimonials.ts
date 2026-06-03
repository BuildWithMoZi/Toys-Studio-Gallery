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
