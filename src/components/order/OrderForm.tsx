"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import type { CartItem, OrderFormData, Product } from "@/types";
import { buildOrderMessage, getWhatsAppUrl, getMailtoUrl } from "@/lib/order";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface OrderFormProps {
  product?: Product;
  defaultQuantity?: number;
}

export function OrderForm({ product, defaultQuantity = 1 }: OrderFormProps) {
  const { items: cartItems, clearCart } = useCart();
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
    productDetails: product
      ? `${product.name} (${product.slug})`
      : "",
    quantity: defaultQuantity,
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const items: CartItem[] | undefined =
    !product && cartItems.length > 0 ? cartItems : undefined;

  const update = (field: keyof OrderFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const orderMsg = buildOrderMessage(form, items);
    const waUrl = getWhatsAppUrl(orderMsg);

    window.open(waUrl, "_blank");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cartItems: items?.map((i) => ({
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
        window.location.href = getMailtoUrl(
          `New Order from ${form.name}`,
          orderMsg
        );
      }

      setStatus("success");
      setMessage(
        "Order sent! Check WhatsApp — we will confirm shortly. Email notification sent to admin."
      );
      if (items) clearCart();
    } catch {
      setStatus("success");
      setMessage(
        "WhatsApp opened with your order! Email will open as backup if SMTP is not configured."
      );
      window.location.href = getMailtoUrl(
        `New Order from ${form.name}`,
        orderMsg
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-toy space-y-5 p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold">Place Your Order</h2>
      <p className="text-sm text-muted">
        Fill in details below — order goes to admin via WhatsApp & Email. Pay on
        delivery!
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name *" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-field"
            placeholder="Parent name"
          />
        </Field>
        <Field label="Phone Number *" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input-field"
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field label="Delivery Address *" required>
        <textarea
          required
          rows={3}
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className="input-field resize-none"
          placeholder="House no, street, city, pincode"
        />
      </Field>

      {!items && (
        <Field label="Product Details *" required>
          <input
            required
            value={form.productDetails}
            onChange={(e) => update("productDetails", e.target.value)}
            className="input-field"
            placeholder="Toy name or description"
            readOnly={!!product}
          />
        </Field>
      )}

      <Field label="Quantity *" required>
        <input
          required
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) => update("quantity", parseInt(e.target.value) || 1)}
          className="input-field w-32"
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
        <div className="rounded-2xl bg-emerald-500/15 p-4 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
          {message}
        </div>
      )}

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        <FaWhatsapp className="h-5 w-5" />
        {status === "loading" ? "Sending..." : "Order via WhatsApp & Email"}
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
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
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
