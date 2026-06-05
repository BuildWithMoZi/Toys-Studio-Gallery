import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { HiShieldCheck, HiTruck } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { SITE, STORE_LOCATION } from "@/data/site";
import { toyImage } from "@/data/images";
import { PAGE_SHELL } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — ${SITE.tagline}. ${SITE.description}.`,
};

const features = [
  {
    Icon: HiShieldCheck,
    title: "100% Safe",
    desc: "Certified non-toxic materials",
  },
  {
    Icon: HiTruck,
    title: "Fast Delivery",
    desc: "3-5 days nationwide",
  },
  {
    Icon: FaWhatsapp,
    title: "WhatsApp Support",
    desc: "Friendly team always ready",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <div className={cn(PAGE_SHELL, "max-w-4xl")}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">
            Our Story
          </p>
          <h1 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            About {SITE.name}
          </h1>
        </div>

        <div className="relative mx-auto mt-8 aspect-video max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm md:mt-10 md:rounded-3xl">
          <Image
            src={toyImage(3)}
            alt="Happy kids playing"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted sm:text-base md:mt-10">
          <p>
            Welcome to <strong className="text-foreground">{SITE.name}</strong> —{" "}
            {SITE.tagline.toLowerCase()} for every age! Based in{" "}
            <strong className="text-foreground">{STORE_LOCATION.address}</strong>,
            we are a {SITE.category.toLowerCase()} shop built around fun, gifts,
            and RC toys that kids love.
          </p>
          <p>
            We hand-pick every product for safety, durability, and play value —
            from cuddly plush companions to remote-control toys and brain-boosting
            educational kits. {SITE.description}.
          </p>
          <p>
            Ordering is simple — browse our collection, then{" "}
            {SITE.orderCta.toLowerCase()}. Reach us on WhatsApp at{" "}
            {STORE_LOCATION.phone} or visit us in Mahatma Nagar, Nashik. Cash on
            delivery available. No complicated checkout, just happy kids!
          </p>
        </div>

        <div className="mt-8 grid divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 md:mt-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c8102e]/10 text-[#c8102e]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-display font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Button href="/products" size="lg" layout="block" className="mx-auto max-w-sm">
            Start Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
