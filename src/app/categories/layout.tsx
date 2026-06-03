import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse toys by category at PlayJoy Toys.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
