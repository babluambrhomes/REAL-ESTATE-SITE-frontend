"use client";

import { useState } from "react";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";

import { BuilderProfileHeader } from "@/components/builder-profile/BuilderProfileHeader";
import { BuilderTrustAndStats } from "@/components/builder-profile/BuilderTrustAndStats";
import { BuilderNavTabs } from "@/components/builder-profile/BuilderNavTabs";
import { BuilderProjectsSection } from "@/components/builder-profile/BuilderProjectsSection";
import { BuilderSidebarLeadForm } from "@/components/builder-profile/BuilderSidebarLeadForm";
import { BuilderTrackRecord } from "@/components/builder-profile/BuilderTrackRecord";
import { BuilderConstructionProgress } from "@/components/builder-profile/BuilderConstructionProgress";
import { BuilderAboutDetails } from "@/components/builder-profile/BuilderAboutDetails";
import { BuilderReviewsSection } from "@/components/builder-profile/BuilderReviewsSection";
import { BuilderFaqSection } from "@/components/builder-profile/BuilderFaqSection";

export default function SingleBuilderProfilePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F6FF] relative flex flex-col font-jakarta overflow-x-hidden">
      {/* Soft Ambient Figma Glow Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(219,234,254,0.6),rgba(240,246,255,0.9))] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
      {/* 1. Top Announcement Bar */}
      {showAnnouncement && (
        <TopAnnouncementBar
          isFixed={false}
          onClose={() => setShowAnnouncement(false)}
        />
      )}

      {/* 2. Global Unified Header */}
      <SearchHeader />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {/* 3. Hero Cover, Logo, Title, Verification, Actions */}
        <BuilderProfileHeader />

        {/* 4. Roofin Trust Score & Location Presence Stats */}
        <BuilderTrustAndStats />

        {/* 5. Sticky Navigation Tabs Strip */}
        <BuilderNavTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 6. Main 2-Column Content Layout */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Projects, Track Record, Progress, About, Reviews, FAQs (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Projects Section */}
              <div id="projects" className="scroll-mt-6">
                <BuilderProjectsSection />
              </div>

              {/* Delivery Track Record */}
              <div id="delivery" className="scroll-mt-6">
                <BuilderTrackRecord />
              </div>

              {/* Construction Progress */}
              <div id="construction" className="scroll-mt-6">
                <BuilderConstructionProgress />
              </div>

              {/* About Builder Details */}
              <div id="about" className="scroll-mt-6">
                <BuilderAboutDetails />
              </div>

              {/* Reputation & Reviews */}
              <div id="reviews" className="scroll-mt-6">
                <BuilderReviewsSection />
              </div>

              {/* FAQs Accordion */}
              <div id="qa" className="scroll-mt-6">
                <BuilderFaqSection />
              </div>
            </div>

            {/* Right Column: Lead Form, Bank Approvals, Portfolio Donut (Col 4 Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
              <BuilderSidebarLeadForm />
            </div>

          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
