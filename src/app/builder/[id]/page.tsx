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

  return (
    <div className="min-h-screen bg-[#F0F6FF] relative flex flex-col font-poppins overflow-x-clip">
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

        {/* Main Content Area */}
        <main className="flex-1 pb-16">
          {/* 3. Hero Cover, Logo, Title, Verification, Actions */}
          <BuilderProfileHeader />

          {/* 4. Roofin Trust Score & Location Presence Stats */}
          <BuilderTrustAndStats />

          {/* 5. Sticky Navigation Tabs Strip */}
          <BuilderNavTabs
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
          />

          {/* 6. Main 2-Column Content Layout */}
          <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* =========================================================================
                  SINGLE UNIFIED LEFT CONTAINER DIV (Contains all left-side content & tabs)
                 ========================================================================= */}
              <div id="builder-left-content-column" className="lg:col-span-8 w-full flex flex-col space-y-6">
                
                {/* 1. Overview Tab -> All sections stacked */}
                {activeTab === "overview" && (
                  <div className="w-full flex flex-col space-y-6">
                    <BuilderProjectsSection />
                    <BuilderTrackRecord />
                    <BuilderConstructionProgress />
                    <BuilderAboutDetails />
                    <BuilderReviewsSection />
                    <BuilderFaqSection />
                  </div>
                )}

                {/* 2. Projects Tab */}
                {activeTab === "projects" && (
                  <div className="w-full">
                    <BuilderProjectsSection />
                  </div>
                )}

                {/* 3. Delivery Track Record Tab */}
                {activeTab === "delivery" && (
                  <div className="w-full space-y-3">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B132B] px-1">
                      Delivery Track Record
                    </h2>
                    <BuilderTrackRecord />
                  </div>
                )}

                {/* 4. Construction Updates Tab */}
                {activeTab === "construction" && (
                  <div className="w-full space-y-3">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B132B] px-1">
                      Construction Updates
                    </h2>
                    <BuilderConstructionProgress />
                  </div>
                )}

                {/* 5. About Tab */}
                {activeTab === "about" && (
                  <div className="w-full space-y-3">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B132B] px-1">
                      About
                    </h2>
                    <BuilderAboutDetails />
                  </div>
                )}

                {/* 6. Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="w-full space-y-3">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B132B] px-1">
                      Reviews
                    </h2>
                    <BuilderReviewsSection />
                  </div>
                )}

                {/* 7. Q&A / FAQs Tab */}
                {activeTab === "qa" && (
                  <div className="w-full space-y-3">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B132B] px-1">
                      FAQS & Inquiries
                    </h2>
                    <BuilderFaqSection />
                  </div>
                )}

              </div>

              {/* Right Column (Col 4): Sticky Sidebar (3 Cards) */}
              <div id="builder-right-sticky-sidebar" className="lg:col-span-4 sticky top-4 self-start space-y-4">
                <BuilderSidebarLeadForm />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
