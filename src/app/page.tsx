"use client";

import { HeroPortal } from "@/components/home-new/HeroPortal";
import { HotNewArrivalsSlider } from "@/components/home-new/HotNewArrivalsSlider";
import { ShopByAge } from "@/components/home-new/ShopByAge";
import { ShopAllToys } from "@/components/home-new/ShopAllToys";
import { PromoBannerPair } from "@/components/home-new/PromoBannerPair";
import { NewArrivalsRail } from "@/components/home-new/NewArrivalsRail";
import { TrendingShorts } from "@/components/home-new/TrendingShorts";
import { TrustNexus } from "@/components/home-new/TrustNexus";
import { VoiceWall } from "@/components/home-new/VoiceWall";
import { QuickFAQ } from "@/components/home-new/QuickFAQ";
import { HomeCTA } from "@/components/home-new/HomeCTA";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-white text-foreground">
      <HeroPortal />
      <HotNewArrivalsSlider />
      <ShopByAge />
      <ShopAllToys />
      <PromoBannerPair />
      <NewArrivalsRail />
      <TrendingShorts />
      <TrustNexus />
      <VoiceWall />
      <QuickFAQ />
      <HomeCTA />
    </div>
  );
}
