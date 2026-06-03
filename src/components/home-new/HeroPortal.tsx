"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { LiveStatsBar } from "./LiveStatsBar";
import { HERO_IMAGE } from "@/data/images";
import { getWhatsAppUrl } from "@/lib/order";

export function HeroPortal() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} id="home-hero" className="relative">
      <Navbar variant='hero-floating' />

      <div className='relative flex min-h-[min(70vh,680px)] flex-col justify-center overflow-hidden bg-background px-5 py-12 pt-8 md:min-h-[min(75vh,760px)] md:pt-10 lg:px-8'>
        <div
          className='pointer-events-none absolute inset-0 overflow-hidden'
          aria-hidden>
          <Image
            src={"/hero/1.png"}
            alt=''
            fill
            sizes='(max-width: 1280px) 100vw, 1280px'
            className="scale-105 object-cover object-right"
          />
          <div className='absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent dark:from-background/90 dark:via-background/50' />
        </div>

        <div className='hero-reveal relative z-10 max-w-xl space-y-6 md:space-y-7'>
          <h1 className='font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Play beyond imagination.
          </h1>

          <p className='max-w-md text-sm leading-relaxed text-muted md:text-base'>
            Safe, joyful toys for every child — order in minutes via WhatsApp
            with fast delivery to your door.
          </p>

          <div className='flex flex-wrap items-center gap-4 pt-1'>
            <Link
              href='/products'
              className='rounded-full bg-[var(--hero-cta-bg)] px-7 py-3 text-sm font-semibold text-[var(--hero-cta-text)] transition-opacity hover:opacity-90'>
              Shop toys
            </Link>
            <Link
              href={getWhatsAppUrl("Hi! I'd like to explore PlayJoy Toys.")}
              className='text-sm font-semibold text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline'>
              WhatsApp order
            </Link>
          </div>
        </div>
      </div>

      <LiveStatsBar joined />
    </div>
  );
}
