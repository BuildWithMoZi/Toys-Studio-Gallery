"use client";

import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import type { CartItem, OrderFormData } from "@/types";
import { STORE_LOCATION } from "@/data/site";
import { buildOrderMessage, getWhatsAppUrl, getMailtoUrl } from "@/lib/order";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface OrderFormProps {
  onSuccess?: () => void;
}

/** Checkout delivery form — cart items come from CartContext. */
export function OrderForm({ onSuccess }: OrderFormProps) {
  const { items: cartItems, clearCart } = useCart();
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
    productDetails: "",
    quantity: 1,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const items: CartItem[] = cartItems;

  const update = (field: keyof OrderFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const orderMsg = buildOrderMessage(form, items);
    const waUrl = getWhatsAppUrl(orderMsg);

    window.open(waUrl, "_blank");

    const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

    if (isStaticExport) {
      setStatus("success");
      setMessage(
        "WhatsApp opened with your order! We will confirm shortly."
      );
      clearCart();
      onSuccess?.();
      return;
    }

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cartItems: items.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
          message: orderMsg,
        }),
      });

      const data = await res.json();

      if (!res.ok && !data.fallback) {
        throw new Error(data.error || "Email failed");
      }

      if (data.fallback) {
        const mailto = getMailtoUrl(
          `New Order from ${form.name}`,
          orderMsg
        );
        if (mailto) window.location.href = mailto;
      }

      setStatus("success");
      setMessage(
        "Order sent! Check WhatsApp — we will confirm shortly. Email notification sent to admin."
      );
      clearCart();
      onSuccess?.();
    } catch {
      setStatus("success");
      setMessage(
        "WhatsApp opened with your order! Email will open as backup if SMTP is not configured."
      );
      const mailto = getMailtoUrl(
        `New Order from ${form.name}`,
        orderMsg
      );
      if (mailto) window.location.href = mailto;
      onSuccess?.();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="checkout-form"
      className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6"
    >
      <h2 className="font-display text-lg font-bold text-foreground">
        Delivery Details
      </h2>
      <p className="text-sm text-muted">
        Enter your details below. Pay on delivery — we confirm via WhatsApp!
      </p>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <Field label="Full Name *">
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-field"
            placeholder="Parent name"
          />
        </Field>
        <Field label="Phone Number *">
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input-field"
            placeholder={STORE_LOCATION.phone}
          />
        </Field>
      </div>

      <Field label="Delivery Address *">
        <textarea
          required
          rows={3}
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className="input-field resize-none"
          placeholder="House no, street, city, pincode"
        />
      </Field>

      <Field label="Notes (optional)">
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="input-field resize-none"
          placeholder="Gift wrap, delivery time, etc."
        />
      </Field>

      {status === "success" && (
        <div className="rounded-2xl bg-success/15 p-4 text-sm font-medium text-success">
          {message}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        layout="block"
        className="!rounded-xl !bg-gray-900 !text-white hover:!bg-gray-800 !shadow-none min-h-[3.25rem] sm:min-h-0"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Continue to Checkout"}
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-muted">
        <HiEnvelope className="h-4 w-4" />
        Admin receives email + WhatsApp notification
      </p>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
