import type { Category } from "@/types";
import { toyImage } from "./images";

export const categories: {
  id: Category;
  name: string;
  description: string;
  image: string;
  color: string;
}[] = [
  {
    id: "educational",
    name: "Educational Toys",
    description: "Learn while you play!",
    image: toyImage(24),
    color: "from-primary/30 to-primary-strong/30",
  },
  {
    id: "games",
    name: "Games",
    description: "Family fun for everyone",
    image: toyImage(25),
    color: "from-secondary-ii/30 to-secondary-ii/20",
  },
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Epic adventures await",
    image: toyImage(26),
    color: "from-primary/30 to-secondary/30",
  },
  {
    id: "plush",
    name: "Plush Toys",
    description: "Soft hugs guaranteed",
    image: toyImage(27),
    color: "from-secondary/30 to-danger/20",
  },
  {
    id: "outdoor",
    name: "Outdoor Play",
    description: "Sunshine & smiles",
    image: toyImage(28),
    color: "from-accent-green/30 to-success/30",
  },
  {
    id: "creative",
    name: "Creative Kits",
    description: "Unleash imagination",
    image: toyImage(3),
    color: "from-accent-yellow/30 to-accent-yellow/20",
  },
];
