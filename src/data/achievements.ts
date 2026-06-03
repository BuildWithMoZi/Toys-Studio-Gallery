import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Happy Families",
    description: "10,000+ smiling kids",
    iconKey: "families",
    color: "bg-cyan-100 dark:bg-cyan-900/40",
  },
  {
    id: "2",
    title: "Toy Champions",
    description: "500+ premium toys",
    iconKey: "trophy",
    color: "bg-purple-100 dark:bg-purple-900/40",
  },
  {
    id: "3",
    title: "Super Speed",
    description: "Fast delivery nationwide",
    iconKey: "speed",
    color: "bg-amber-100 dark:bg-amber-900/40",
  },
  {
    id: "4",
    title: "Safety Stars",
    description: "100% kid-safe certified",
    iconKey: "safety",
    color: "bg-rose-100 dark:bg-rose-900/40",
  },
];
