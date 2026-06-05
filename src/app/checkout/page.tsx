import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/order/CheckoutPageClient";

export const metadata: Metadata = {
  title: "My Cart",
  description: "Review your cart and place your toy order via WhatsApp.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
