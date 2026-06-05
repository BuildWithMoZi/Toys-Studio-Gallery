"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiEnvelope, HiXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import type { CartItem, OrderFormData, Product } from "@/types";
import { STORE_LOCATION } from "@/data/site";
import { buildOrderMessage, getWhatsAppUrl, getMailtoUrl } from "@/lib/order";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface OrderFormProps {
  product?: Product;
  defaultQuantity?: number;
  variant?: "default" | "modal";
  onSuccess?: () => void;
}

export function OrderForm({
  product,
  defaultQuantity = 1,
  variant = "default",
  onSuccess,
}: OrderFormProps) {
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
      if (items) clearCart();
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

  const isModal = variant === "modal";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isModal
          ? "space-y-4"
          : "card-toy space-y-5 p-6 md:p-8"
      }
    >
      {!isModal && (
        <h2 className="font-display text-2xl font-bold">Place Your Order</h2>
      )}
      <p className="text-sm text-muted">
        Fill in details below — order goes to admin via WhatsApp & Email. Pay on
        delivery!
      </p>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
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
            placeholder={STORE_LOCATION.phone}
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
        <div className="rounded-2xl bg-success/15 p-4 text-success text-sm font-medium">
          {message}
        </div>
      )}

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        layout="block"
        className="btn-action-full min-h-[3.25rem] sm:min-h-0"
        disabled={status === "loading"}
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" />
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            <span className="sm:hidden">Order on WhatsApp</span>
            <span className="hidden sm:inline">Order via WhatsApp & Email</span>
          </>
        )}
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-muted">
        <HiEnvelope className="h-4 w-4" />
        Admin receives email + WhatsApp notification
      </p>
    </form>
  );
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
  defaultQuantity?: number;
}

export function OrderModal({
  open,
  onClose,
  product,
  defaultQuantity = 1,
}: OrderModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close order form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        className={cn(
          "relative z-10 flex w-full max-h-[min(92dvh,100%)] flex-col overflow-hidden bg-card shadow-2xl",
          "rounded-t-3xl border border-card-border sm:max-h-[90vh] sm:max-w-lg sm:rounded-3xl"
        )}
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-card-border sm:hidden" />
        <div className="flex shrink-0 items-center justify-between border-b border-card-border px-4 py-3 sm:px-6">
          <h2
            id="order-modal-title"
            className="font-display text-lg font-bold sm:text-xl"
          >
            Place Your Order
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-primary/80"
            aria-label="Close"
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-6 sm:pt-4">
          <OrderForm
            product={product}
            defaultQuantity={defaultQuantity}
            variant="modal"
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
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
