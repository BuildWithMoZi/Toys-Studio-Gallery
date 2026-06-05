"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { HeroHeader } from "@/components/home-new/HeroHeader";
import { DEFAULT_WHATSAPP_GREETING } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/order";
import { RemoteImage } from "@/components/ui/RemoteImage";

export function HeroPortal() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      id="home-hero"
      className="relative flex min-h-screen w-full flex-col"
    >
      <HeroHeader />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <RemoteImage
          src="/hero/mobile-view-hero-banner.png"
          alt="Luxury ride-on toys for kids"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        <RemoteImage
          src="/hero/hero-banner.png"
          alt="Luxury ride-on toys for kids"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />

        <div className="absolute inset-0 z-10 flex items-end justify-end p-4 sm:p-5 md:p-6 lg:p-8">
          <Link
            href={getWhatsAppUrl(DEFAULT_WHATSAPP_GREETING)}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-reveal flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:h-14 sm:w-14"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}
