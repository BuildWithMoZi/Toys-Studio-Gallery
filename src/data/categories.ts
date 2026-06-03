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
    color: "from-cyan-400/30 to-teal-300/30",
  },
  {
    id: "games",
    name: "Games",
    description: "Family fun for everyone",
    image: toyImage(25),
    color: "from-purple-400/30 to-violet-300/30",
  },
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Epic adventures await",
    image: toyImage(26),
    color: "from-sky-400/30 to-cyan-300/30",
  },
  {
    id: "plush",
    name: "Plush Toys",
    description: "Soft hugs guaranteed",
    image: toyImage(27),
    color: "from-pink-400/30 to-rose-300/30",
  },
  {
    id: "outdoor",
    name: "Outdoor Play",
    description: "Sunshine & smiles",
    image: toyImage(28),
    color: "from-emerald-400/30 to-green-300/30",
  },
  {
    id: "creative",
    name: "Creative Kits",
    description: "Unleash imagination",
    image: toyImage(3),
    color: "from-amber-400/30 to-yellow-300/30",
  },
];
