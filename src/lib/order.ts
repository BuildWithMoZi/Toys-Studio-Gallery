import type { CartItem, OrderFormData } from "@/types";
import { formatPrice } from "./utils";

export function buildOrderMessage(
  data: OrderFormData,
  cartItems?: CartItem[]
): string {
  const site = process.env.NEXT_PUBLIC_SITE_NAME || "PlayJoy Toys";
  let msg = `*New Order — ${site}*\n\n`;
  msg += `*Name:* ${data.name}\n`;
  msg += `*Phone:* ${data.phone}\n`;
  msg += `*Address:* ${data.address}\n`;
  msg += `*Quantity:* ${data.quantity}\n`;

  if (cartItems?.length) {
    msg += `\n*Cart Items:*\n`;
    cartItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name} x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}\n`;
    });
    const total = cartItems.reduce(
      (s, i) => s + i.product.price * i.quantity,
      0
    );
    msg += `\n*Total:* ${formatPrice(total)}\n`;
  } else if (data.productDetails) {
    msg += `\n*Product:* ${data.productDetails}\n`;
  }

  if (data.notes) msg += `\n*Notes:* ${data.notes}\n`;
  msg += `\n_Sent from ${site} website_`;
  return msg;
}

export function getWhatsAppUrl(message: string) {
  const phone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "919876543210";
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl(subject: string, body: string) {
  const email =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@playjoytoys.com";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
