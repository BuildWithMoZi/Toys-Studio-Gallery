import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCube,
  HiHeart,
  HiPaintBrush,
  HiSparkles,
  HiSun,
} from "react-icons/hi2";
import type { Category } from "@/types";

const CATEGORY_ICONS: Record<Category, IconType> = {
  educational: HiAcademicCap,
  games: HiCube,
  "action-figures": HiSparkles,
  plush: HiHeart,
  outdoor: HiSun,
  creative: HiPaintBrush,
};

export function CategoryIcon({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category];
  return <Icon className={className} aria-hidden />;
}
