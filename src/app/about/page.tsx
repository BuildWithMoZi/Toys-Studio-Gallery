import type { Metadata } from "next";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { HiShieldCheck, HiTruck } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { toyImage } from "@/data/images";
import { PAGE_SHELL } from "@/lib/pageLayout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PlayJoy Toys — our mission to bring joy to every child.",
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
        About PlayJoy Toys
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
          Welcome to <strong className="text-foreground">PlayJoy Toys</strong> — where
          imagination meets quality! Founded with a simple mission: every child
          deserves safe, fun, and enriching toys that spark creativity and joy.
        </p>
        <p>
          We hand-pick every product for safety, durability, and play value. From
          cuddly plush companions to brain-boosting educational kits, our
          collection is curated by parents, for parents.
        </p>
        <p>
          Ordering is simple — add to cart, fill your details, and we confirm via
          WhatsApp within hours. Cash on delivery available nationwide. No
          complicated checkout, just happy kids!
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
        <Button href="/products" size="lg">
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
