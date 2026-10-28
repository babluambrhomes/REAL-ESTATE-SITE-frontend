"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { BuilderHeroBanner } from "@/components/builders/BuilderHeroBanner";
import { BuilderFilterTabs } from "@/components/builders/BuilderFilterTabs";
import { TopRatedBuilders } from "@/components/builders/TopRatedBuilders";
import { TopRatedAgents } from "@/components/builders/TopRatedAgents";
import { LazySection } from "@/components/common/LazySection";

// Dynamically imported below-the-fold components
const SpecializationBuilders = dynamic(
  () => import("@/components/builders/SpecializationBuilders").then((m) => m.SpecializationBuilders),
  { ssr: false }
);
const SpecializationAgents = dynamic(
  () => import("@/components/builders/SpecializationAgents").then((m) => m.SpecializationAgents),
  { ssr: false }
);
const BuildersNearBy = dynamic(
  () => import("@/components/builders/BuildersNearBy").then((m) => m.BuildersNearBy),
  { ssr: false }
);
const AgentNearBy = dynamic(
  () => import("@/components/builders/AgentNearBy").then((m) => m.AgentNearBy),
  { ssr: false }
);
const ExpertsByArea = dynamic(
  () => import("@/components/builders/ExpertsByArea").then((m) => m.ExpertsByArea),
  { ssr: false }
);
const ExpertsByPropertyType = dynamic(
  () => import("@/components/builders/ExpertsByPropertyType").then((m) => m.ExpertsByPropertyType),
  { ssr: false }
);
const TopBrokerCompanies = dynamic(
  () => import("@/components/builders/TopBrokerCompanies").then((m) => m.TopBrokerCompanies),
  { ssr: false }
);
const AllPropertyExpertsList = dynamic(
  () => import("@/components/builders/AllPropertyExpertsList").then((m) => m.AllPropertyExpertsList),
  { ssr: false }
);
const AllPropertyExpertsGrid = dynamic(
  () => import("@/components/builders/AllPropertyExpertsGrid").then((m) => m.AllPropertyExpertsGrid),
  { ssr: false }
);

export interface BuildersPageContentProps {
  initialTab?: "agents" | "builders";
}

export function BuildersPageContent({ initialTab = "builders" }: BuildersPageContentProps) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState<"agents" | "builders">(initialTab);

  return (
    <div className="min-h-screen bg-[#FAFCFF] flex flex-col font-poppins">
      {/* 1. Top Announcement Bar */}
      {showAnnouncement && (
        <TopAnnouncementBar isFixed={false} onClose={() => setShowAnnouncement(false)} />
      )}

      {/* 2. Global Unified Search Header */}
      <SearchHeader />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* 3. Hero Banner (Immediate) */}
        <BuilderHeroBanner />

        {/* 4. Agents / Builders Toggle & Search Filter (Immediate) */}
        <BuilderFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 5. Top Rated Slider (Agents vs Builders) */}
        {activeTab === "agents" ? <TopRatedAgents /> : <TopRatedBuilders />}

        {/* 6. Specialization Slider (Lazy Loaded) */}
        <LazySection minHeight="360px" skeletonType="cards">
          {activeTab === "agents" ? <SpecializationAgents /> : <SpecializationBuilders />}
        </LazySection>

        {/* 7. Builder / Agent Near By (Lazy Loaded) */}
        <LazySection minHeight="360px" skeletonType="cards">
          {activeTab === "agents" ? <AgentNearBy /> : <BuildersNearBy />}
        </LazySection>

        {/* 8. Find An Expert By Area (Lazy Loaded) */}
        <LazySection minHeight="320px" skeletonType="grid">
          <ExpertsByArea />
        </LazySection>

        {/* 9. Find An Expert By Property Type (Lazy Loaded) */}
        <LazySection minHeight="320px" skeletonType="grid">
          <ExpertsByPropertyType />
        </LazySection>

        {/* 10. Top Broker Companies (in Agents mode) (Lazy Loaded) */}
        {activeTab === "agents" && (
          <LazySection minHeight="360px" skeletonType="cards">
            <TopBrokerCompanies />
          </LazySection>
        )}

        {/* 11. All Property Expert (Grid on agents mode, Stack on builders mode) (Lazy Loaded) */}
        <LazySection minHeight="420px" skeletonType="cards">
          {activeTab === "agents" ? <AllPropertyExpertsGrid /> : <AllPropertyExpertsList />}
        </LazySection>
      </main>
    </div>
  );
}

export default BuildersPageContent;
