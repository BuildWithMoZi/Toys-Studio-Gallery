import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Toys",
  description:
    "Browse our full collection of premium kids toys with filters and search.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
