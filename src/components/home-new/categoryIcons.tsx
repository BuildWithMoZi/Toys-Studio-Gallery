import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiCube,
  HiHeart,
  HiPaintBrush,
  HiShieldCheck,
  HiSparkles,
  HiSun,
  HiTrophy,
  HiTruck,
  HiUserGroup,
} from "react-icons/hi2";
import type { Category } from "@/types";

export const CATEGORY_ICONS: Record<Category, IconType> = {
  educational: HiAcademicCap,
  games: HiCube,
  "action-figures": HiSparkles,
  plush: HiHeart,
  outdoor: HiSun,
  creative: HiPaintBrush,
};

export type AchievementIconKey = "families" | "trophy" | "speed" | "safety";

export const ACHIEVEMENT_ICONS: Record<AchievementIconKey, IconType> = {
  families: HiUserGroup,
  trophy: HiTrophy,
  speed: HiTruck,
  safety: HiShieldCheck,
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

export function AchievementIcon({
  iconKey,
  className,
}: {
  iconKey: AchievementIconKey;
  className?: string;
}) {
  const Icon = ACHIEVEMENT_ICONS[iconKey];
  return <Icon className={className} aria-hidden />;
}
