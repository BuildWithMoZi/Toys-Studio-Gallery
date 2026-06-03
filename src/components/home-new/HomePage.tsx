"use client";

import { cn } from "@/lib/utils";
import { HomeScrollNavbar } from "@/components/layout/HomeScrollNavbar";
import { HeroPortal } from "./HeroPortal";
import { ShopAllToys } from "./ShopAllToys";
import { CategoryProductStrips } from "./CategoryProductStrips";
import { CategoryBento } from "./CategoryBento";
import { DealsShowcase } from "./DealsShowcase";
import { SpotlightProducts } from "./SpotlightProducts";
import { NewArrivalsRail } from "./NewArrivalsRail";
import { TrustNexus } from "./TrustNexus";
import { VoiceWall } from "./VoiceWall";
import { QuickFAQ } from "./QuickFAQ";
import { HomeCTA } from "./HomeCTA";
import { HOME_SHELL, HOME_SHELL_MARGIN } from "./homeStyles";

export function HomePage() {
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
