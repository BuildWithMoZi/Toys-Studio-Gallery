"use client";

import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMapPin, HiPhone } from "react-icons/hi2";
import { SITE, STORE_LOCATION } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/order";
import { Button } from "@/components/ui/Button";
import { PAGE_SHELL } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}${form.email ? ` (${form.email})` : ""}. ${form.message}`;
    window.open(getWhatsAppUrl(msg), "_blank");
    setSent(true);
  };

  const contactItems = [
    {
      icon: HiPhone,
      title: "Phone",
      value: STORE_LOCATION.phone,
      href: STORE_LOCATION.phoneTel,
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      value: SITE.instagram.display,
      href: SITE.instagram.url,
    },
    {
      icon: HiMapPin,
      title: "Address",
      value: STORE_LOCATION.addressFull,
    },
  ] as const;

  return (
    <div className="w-full bg-white">
      <div className={cn(PAGE_SHELL, "max-w-5xl")}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
            Get in Touch
          </p>
          <h1 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            {SITE.orderCta} — we&apos;d love to hear from you!
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <item.icon className="h-7 w-7 shrink-0 text-[#c8102e]" />
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target={item.title === "Instagram" ? "_blank" : undefined}
                      rel={
                        item.title === "Instagram"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted transition-colors hover:text-[#c8102e]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="whatsapp"
              size="lg"
              layout="block"
              href={getWhatsAppUrl(`Hi! I'd like to get in touch with ${SITE.name}.`)}
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              Message on WhatsApp
            </Button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-lg font-bold text-foreground">
              Send a Message
            </h2>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field resize-none"
            />
            {sent && (
              <p className="text-sm font-medium text-success">
                WhatsApp opened! We&apos;ll reply soon.
              </p>
            )}
            <Button type="submit" size="lg" layout="block">
              Send via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
