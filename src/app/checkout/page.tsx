import type { Metadata } from "next";
import { HiShoppingBag } from "react-icons/hi2";
import { OrderForm } from "@/components/order/OrderForm";
import { PAGE_SHELL } from "@/lib/pageLayout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your toy order via WhatsApp and email.",
};

export default function CheckoutPage() {
  return (
    <div className={cn(PAGE_SHELL, "max-w-2xl")}>
      <h1 className="mb-8 flex items-center justify-center gap-3 text-center font-display text-4xl font-bold text-gradient">
        <HiShoppingBag className="h-9 w-9 shrink-0 text-secondary" aria-hidden />
        Checkout
      </h1>
      <OrderForm />
    </div>
  );
}
