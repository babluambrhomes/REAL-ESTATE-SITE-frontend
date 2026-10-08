"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { BrokerHeroSection } from "@/components/broker-profile/BrokerHeroSection";
import { BrokerHighlightsRow } from "@/components/broker-profile/BrokerHighlightsRow";
import { BrokerTabs } from "@/components/broker-profile/BrokerTabs";
import { BrokerPostedProperties } from "@/components/broker-profile/BrokerPostedProperties";
import { BrokerRecentPosts } from "@/components/broker-profile/BrokerRecentPosts";
import { BrokerVideosSection } from "@/components/broker-profile/BrokerVideosSection";
import { BrokerAboutSection } from "@/components/broker-profile/BrokerAboutSection";
import { BrokerSidebar } from "@/components/broker-profile/BrokerSidebar";

export default function BrokerProfilePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col font-jakarta bg-[#F8FAFC]">
      
      {/* 1. Top Announcement Bar */}
      {showAnnouncement && (
        <TopAnnouncementBar isFixed={false} onClose={() => setShowAnnouncement(false)} />
      )}

      {/* 2. Full-Bleed (Edge to Edge 100vw) Top Mesh Background Section */}
      <div 
        className="w-full relative pt-3 pb-24 sm:pb-28 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #B5F2E3 0%, #BCE7FD 50%, #A9C7FA 100%)",
        }}
      >
        {/* Mint / Emerald green ambient glow on the left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_55%,rgba(16,185,129,0.5)_0%,rgba(52,211,153,0.3)_30%,transparent_65%)] pointer-events-none" />

        {/* Deep Royal Blue ambient glow on the right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_86%_38%,rgba(29,78,216,0.85)_0%,rgba(37,99,235,0.5)_35%,transparent_70%)] pointer-events-none" />

        {/* Subtle white perspective grid lines */}
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,0.7)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,255,255,0.7)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Global Search Header inside top mesh banner */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-30">
          <SearchHeader className="!relative !top-0 !left-auto !right-auto !px-0 pointer-events-auto" />
        </div>

        {/* Add Cover page button floating at bottom-right of full-width banner */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-end relative z-10">
          <button
            type="button"
            className="px-4 py-2 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-[0_4px_14px_rgba(24,101,242,0.45)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Cover page</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content Area Overlapping the Top Gradient Banner */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16 relative z-20">
        
        {/* Profile Hero Card */}
        <BrokerHeroSection />

        {/* Separate Standalone Highlights Metrics Card */}
        <BrokerHighlightsRow />

        {/* Two-Column Layout: Left (3/4 = 75%) | Right Sidebar (1/4 = 25%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start mt-6">
          
          {/* Left Main Content (9 of 12 cols = 3/4) */}
          <div className="lg:col-span-9">
            
            {/* Single White Container Card Wrapping ALL Left Content */}
            <div className="bg-white rounded-[12px] border border-[#D8E6FC] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-6 space-y-6">
              <BrokerTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Dynamic Content Based on Tab */}
              {activeTab === "overview" && (
                <>
                  <BrokerPostedProperties />
                  <div className="pt-3 border-t border-slate-100">
                    <BrokerRecentPosts />
                  </div>
                </>
              )}
              {activeTab === "videos" && <BrokerVideosSection />}
              {(activeTab === "properties-listed" || activeTab === "listed-properties") && (
                <BrokerPostedProperties />
              )}
              {activeTab === "about" && <BrokerAboutSection />}
              {activeTab === "post" && <BrokerRecentPosts isFullGrid={true} />}
            </div>

          </div>

          {/* Right Sidebar (3 of 12 cols = 1/4) - Sticky on Scroll */}
          <div className="lg:col-span-3 sticky top-6 self-start">
            <BrokerSidebar />
          </div>

        </div>

      </main>

    </div>
  );
}

