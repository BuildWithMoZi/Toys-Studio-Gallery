"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HiMinus, HiPlus, HiShoppingBag, HiTrash, HiXMark } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(panelRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[70] bg-black/40"
        onClick={() => setIsOpen(false)}
      />
      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md translate-x-full flex-col bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-card-border p-5">
          <h2 className="font-display text-xl font-bold">
            Your Cart ({totalItems})
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 hover:bg-primary/80"
            aria-label="Close cart"
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <HiShoppingBag className="h-16 w-16 text-secondary/60" aria-hidden />
              <p className="mt-4 font-semibold text-muted">
                Your cart is empty. Add some toys!
              </p>
              <Button
                className="mt-6"
                onClick={() => setIsOpen(false)}
                href="/products"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 rounded-2xl border border-card-border p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="font-semibold text-sm line-clamp-1 hover:text-secondary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-secondary font-bold text-sm">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="rounded-lg bg-primary/80 p-1 disabled:opacity-40"
                      >
                        <HiMinus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-bold">
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
                        className="rounded-lg bg-primary/80 p-1"
                      >
                        <HiPlus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-rose-500 p-1"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-card-border p-5 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-secondary">{formatPrice(totalPrice)}</span>
            </div>
            <Button
              className="w-full"
              href="/checkout"
              onClick={() => setIsOpen(false)}
            >
              Place Order
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
