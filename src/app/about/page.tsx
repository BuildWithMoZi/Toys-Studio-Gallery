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
    <div className={cn(PAGE_SHELL, "max-w-4xl")}>
      <h1 className="font-display text-4xl font-bold text-gradient text-center">
        About {SITE.name}
      </h1>
      <div className="relative mx-auto mt-10 aspect-video max-w-2xl overflow-hidden rounded-3xl card-toy">
        <Image
          src={toyImage(3)}
          alt="Happy kids playing"
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-10 space-y-6 text-muted leading-relaxed">
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
          Ordering is simple — browse our collection, then {SITE.orderCta.toLowerCase()}.
          Reach us on WhatsApp at {STORE_LOCATION.phone} or visit us in Mahatma
          Nagar, Nashik. Cash on delivery available. No complicated checkout,
          just happy kids!
        </p>
      </div>
      <div className="mt-10 grid gap-4 text-center sm:grid-cols-3">
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="card-toy p-6">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <Icon className="h-7 w-7" />
            </span>
            <h3 className="mt-3 font-display font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/products" size="lg" layout="block" className="mx-auto max-w-sm">
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
