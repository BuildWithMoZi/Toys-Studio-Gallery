"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
import { getWhatsAppUrl } from "@/lib/order";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name} (${form.email}). ${form.message}`;
    window.open(getWhatsAppUrl(msg), "_blank");
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 md:px-6">
      <h1 className="text-center font-display text-4xl font-bold text-gradient">
        Contact Us
      </h1>
      <p className="mt-2 text-center text-muted">
        We&apos;d love to hear from you!
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            {
              icon: HiPhone,
              title: "Phone",
              value: "+91 98765 43210",
              href: "tel:+919876543210",
            },
            {
              icon: HiEnvelope,
              title: "Email",
              value: "hello@playjoytoys.com",
              href: "mailto:hello@playjoytoys.com",
            },
            {
              icon: HiMapPin,
              title: "Address",
              value: "123 Toy Street, Mumbai, India",
            },
          ].map((item) => (
            <div key={item.title} className="card-toy flex gap-4 p-5">
              <item.icon className="h-8 w-8 text-secondary shrink-0" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-muted hover:text-secondary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted">{item.value}</p>
                )}
              </div>
            </div>
          ))}
          <Button variant="whatsapp" size="lg" href="/checkout" className="w-full">
            <FaWhatsapp className="h-5 w-5" />
            Quick Order on WhatsApp
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
            required
            type="email"
            placeholder="Email"
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
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              WhatsApp opened! We&apos;ll reply soon.
            </p>
          )}
          <Button type="submit" className="w-full">
            Send via WhatsApp
          </Button>
        </form>
      </div>
    </div>
  );
}
