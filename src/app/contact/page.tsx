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
    <div className={cn(PAGE_SHELL, "max-w-5xl")}>
      <h1 className="text-center font-display text-4xl font-bold text-gradient">
        Contact Us
      </h1>
      <p className="mt-2 text-center text-muted">
        {SITE.orderCta} — we&apos;d love to hear from you!
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {contactItems.map((item) => (
            <div key={item.title} className="card-toy flex gap-4 p-5">
              <item.icon className="h-8 w-8 shrink-0 text-secondary" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target={item.title === "Instagram" ? "_blank" : undefined}
                    rel={
                      item.title === "Instagram"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-muted transition-colors hover:text-secondary"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted">{item.value}</p>
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

        <form onSubmit={handleSubmit} className="card-toy space-y-4 p-6">
          <h2 className="font-display text-xl font-bold">Send a Message</h2>
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
  );
}
