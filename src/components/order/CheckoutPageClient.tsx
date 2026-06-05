"use client";

import Image from "next/image";
import Link from "next/link";
import { HiChevronLeft, HiMinus, HiPlus, HiXMark } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { SITE } from "@/data/site";
import { OrderForm } from "@/components/order/OrderForm";
import { Button } from "@/components/ui/Button";
import { PAGE_SHELL } from "@/lib/utils";
import {
  formatPrice,
  getDiscountPercent,
} from "@/lib/utils";

export function CheckoutPageClient() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
  } = useCart();

  const totalOriginal = items.reduce((sum, item) => {
    const unit = item.product.originalPrice ?? item.product.price;
    return sum + unit * item.quantity;
  }, 0);
  const savings = Math.max(0, totalOriginal - totalPrice);

  if (items.length === 0) {
    return (
      <div className="w-full bg-white">
        <div className={PAGE_SHELL}>
          <div className="mx-auto max-w-lg py-16 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              My Cart (0)
            </h1>
            <p className="mt-3 text-muted">Your cart is empty. Add some toys!</p>
            <Button href="/products" size="lg" className="mt-8">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className={PAGE_SHELL}>
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            My Cart ({totalItems})
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_380px]">
            {/* Left — cart items */}
            <div>
              <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
                {items.map((item) => {
                  const discount = getDiscountPercent(
                    item.product.price,
                    item.product.originalPrice
                  );
                  return (
                    <li
                      key={item.product.id}
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5"
                    >
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-28 sm:w-28"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-display text-base font-bold text-foreground transition-colors hover:text-[#c8102e] md:text-lg"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted">
                          By {SITE.name}
                        </p>

                        <div className="mt-2 flex flex-wrap items-baseline gap-2">
                          {item.product.originalPrice && (
                            <span className="text-sm text-muted line-through">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                          <span className="font-bold text-[#c8102e]">
                            {formatPrice(item.product.price)}
                          </span>
                          {discount > 0 && (
                            <span className="text-sm font-semibold text-success">
                              {discount}% Off
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:text-[#c8102e]"
                        >
                          <HiXMark className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:border-gray-300 disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <HiMinus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:border-gray-300"
                          aria-label="Increase quantity"
                        >
                          <HiPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
              >
                <HiChevronLeft className="h-4 w-4" />
                Keep Shopping
              </Link>
            </div>

            {/* Right — price summary + order form */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                <h2 className="font-display text-lg font-bold text-foreground">
                  Price Details
                </h2>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Total Price</dt>
                    <dd className="font-medium text-muted line-through">
                      {formatPrice(totalOriginal)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Discounted Price</dt>
                    <dd className="font-semibold text-success">
                      {formatPrice(totalPrice)}
                    </dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">You have saved</dt>
                      <dd className="font-semibold text-success">
                        {formatPrice(savings)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Delivery Charges</dt>
                    <dd className="font-semibold text-success">Free</dd>
                  </div>
                </dl>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex justify-between gap-4 text-base font-bold">
                    <span>Total Amount</span>
                    <span className="text-[#c8102e]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <p className="mt-2 text-sm font-semibold text-[#c8102e]">
                      You will save {formatPrice(savings)} on this order
                    </p>
                  )}
                </div>
              </div>

              <OrderForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
