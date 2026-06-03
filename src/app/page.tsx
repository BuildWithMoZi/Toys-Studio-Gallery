"use client";

import { cn } from "@/lib/utils";
import { HomeScrollNavbar } from "@/components/layout/Navbar";
import { HeroPortal } from "@/components/home-new/HeroPortal";
import { ShopAllToys } from "@/components/home-new/ShopAllToys";
import { CategoryProductStrips } from "@/components/home-new/CategoryProductStrips";
import { CategoryBento } from "@/components/home-new/CategoryBento";
import { DealsShowcase } from "@/components/home-new/DealsShowcase";
import { SpotlightProducts } from "@/components/home-new/SpotlightProducts";
import { NewArrivalsRail } from "@/components/home-new/NewArrivalsRail";
import { TrustNexus } from "@/components/home-new/TrustNexus";
import { VoiceWall } from "@/components/home-new/VoiceWall";
import { QuickFAQ } from "@/components/home-new/QuickFAQ";
import { HomeCTA } from "@/components/home-new/HomeCTA";
import {
  HOME_SHELL,
  HOME_SHELL_MARGIN,
} from "@/components/home-new/homeStyles";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-background text-foreground">
      <HomeScrollNavbar />
      <div className={cn(HOME_SHELL_MARGIN, "mb-6 md:mb-8")}>
        <div className={HOME_SHELL}>
          <HeroPortal />
          <ShopAllToys />
          <CategoryProductStrips />
          <CategoryBento />
          <DealsShowcase />
          <SpotlightProducts />
          <NewArrivalsRail />
          <TrustNexus />
          <VoiceWall />
          <QuickFAQ />
          <HomeCTA />
        </div>
      </div>
    </div>
  );
}
