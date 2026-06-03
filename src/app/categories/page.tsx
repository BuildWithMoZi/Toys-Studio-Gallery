import type { Metadata } from "next";
import { Categories } from "@/components/home/Categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse toys by category at PlayJoy Toys.",
};

export default function CategoriesPage() {
  return (
    <div className="pt-24">
      <Categories />
    </div>
  );
}
