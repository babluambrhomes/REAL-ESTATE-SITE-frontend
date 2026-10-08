"use client";

import { useState } from "react";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { BuilderHeroBanner } from "@/components/builders/BuilderHeroBanner";
import { BuilderFilterTabs } from "@/components/builders/BuilderFilterTabs";
import { TopRatedBuilders } from "@/components/builders/TopRatedBuilders";
import { TopRatedAgents } from "@/components/builders/TopRatedAgents";
import { SpecializationBuilders } from "@/components/builders/SpecializationBuilders";
import { SpecializationAgents } from "@/components/builders/SpecializationAgents";
import { BuildersNearBy } from "@/components/builders/BuildersNearBy";
import { ExpertsByArea } from "@/components/builders/ExpertsByArea";
import { ExpertsByPropertyType } from "@/components/builders/ExpertsByPropertyType";
import { AllPropertyExpertsList } from "@/components/builders/AllPropertyExpertsList";

import { AgentNearBy } from "@/components/builders/AgentNearBy";
import { TopBrokerCompanies } from "@/components/builders/TopBrokerCompanies";
import { AllPropertyExpertsGrid } from "@/components/builders/AllPropertyExpertsGrid";

export default function AllBuildersPage({ initialTab = "builders" }: { initialTab?: "agents" | "builders" }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeTab, setActiveTab] = useState<"agents" | "builders">(initialTab);

  return (
    <div className="min-h-screen bg-[#FAFCFF] flex flex-col font-jakarta">
      
      {/* 1. Top Announcement Bar */}      
      {showAnnouncement && (
        <TopAnnouncementBar isFixed={false} onClose={() => setShowAnnouncement(false)} />
      )}

      {/* 2. Global Unified Search Header */}
      <SearchHeader />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* 3. Hero Banner */}
        <BuilderHeroBanner />

        {/* 4. Agents / Builders Toggle & Search Filter */}
        <BuilderFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 5. Top Rated Slider (Agents vs Builders) */}
        {activeTab === "agents" ? <TopRatedAgents /> : <TopRatedBuilders />}

        {/* 6. Specialization Slider (Agents vs Builders) */}
        {activeTab === "agents" ? <SpecializationAgents /> : <SpecializationBuilders />}

        {/* 7. Builder / Agent Near By */}
        {activeTab === "agents" ? <AgentNearBy /> : <BuildersNearBy />}

        {/* 8. Find An Expert By Area */}
        <ExpertsByArea />

        {/* 9. Find An Expert By Property Type */}
        <ExpertsByPropertyType />

        {/* 10. Top Broker Companies (in Agents mode) */}
        {activeTab === "agents" && <TopBrokerCompanies />}

        {/* 11. All Property Expert (Grid on agents mode, Stack on builders mode) */}
        {activeTab === "agents" ? <AllPropertyExpertsGrid /> : <AllPropertyExpertsList />}

      </main>
    </div>
  );
}


