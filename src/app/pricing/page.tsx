"use client";

import { useState } from "react";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { PricingHeroPlans } from "@/components/pricing/PricingHeroPlans";
import { WhyGoPremiumSection } from "@/components/pricing/WhyGoPremiumSection";
import { StandOutSection } from "@/components/pricing/StandOutSection";

export default function PricingPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="min-h-screen bg-white relative flex flex-col font-jakarta overflow-x-clip">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top Announcement Bar */}
        {showAnnouncement && (
          <TopAnnouncementBar
            isFixed={true}
            onClose={() => setShowAnnouncement(false)}
          />
        )}

        {/* 2. Global Unified Search Header */}
        <SearchHeader hasAnnouncement={showAnnouncement} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Section 1: Pricing Hero & 4 Plans */}
          <PricingHeroPlans />

          {/* Section 2: Why Go Premium? & 3D Chosen House Keychain */}
          <WhyGoPremiumSection />

          {/* Section 3: Don't Just List. Stand Out. */}
          <StandOutSection />
        </main>
      </div>
    </div>
  );
}
