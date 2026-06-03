import type { Metadata } from "next";
import { HiShoppingBag } from "react-icons/hi2";
import { OrderForm } from "@/components/order/OrderForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your toy order via WhatsApp and email.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-28 pb-20 md:px-6">
      <h1 className="mb-8 flex items-center justify-center gap-3 text-center font-display text-4xl font-bold text-gradient">
        <HiShoppingBag className="h-9 w-9 shrink-0 text-secondary" aria-hidden />
        Checkout
      </h1>
      <OrderForm />
    </div>
  );
}
