"use client";

import { usePortal } from "@/components/portal/PortalContext";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { PortalStats } from "@/components/portal/PortalStats";
import { PortalCharts } from "@/components/portal/PortalCharts";
import { PortalProperties } from "@/components/portal/PortalProperties";
import { PortalWidgets } from "@/components/portal/PortalWidgets";
import { PortalPostProperty } from "@/components/portal/PortalPostProperty";
import { PortalHealthScore } from "@/components/portal/PortalHealthScore";
import { PortalPerformanceDiagnosis } from "@/components/portal/PortalPerformanceDiagnosis";
import { PortalCrmLeads } from "@/components/portal/PortalCrmLeads";
import { PortalLeadDetail } from "@/components/portal/PortalLeadDetail";

import { PortalDrafts } from "@/components/portal/PortalDrafts";
import { PortalBoostProperty } from "@/components/portal/PortalBoostProperty";
import {
  PortalAudience,
  PortalContentManager,
  PortalAnalyticsView,
  PortalInsightsView,
  PortalAccountSettings,
} from "@/components/portal/PortalExtendedViews";

export default function PortalPage() {
  const { activeView, setActiveView, setSelectedLeadId, crmTab } = usePortal();

  return (
    <div className="space-y-6">
      {/* Top Header matching Figma 1:1 */}
      <PortalHeader />

      {/* 1. Main Dashboard Overview (Figma media_1793005427309.png 1:1) */}
      {activeView === "dashboard" && (
        <>
          <PortalStats />
          <PortalCharts />
          <PortalProperties
            onPostProperty={() => setActiveView("post-property")}
            onViewHealthScore={() => setActiveView("health-score")}
            onViewDiagnosis={() => setActiveView("performance-diagnosis")}
            onSelectLead={(leadId) => {
              setSelectedLeadId(leadId);
              setActiveView("lead-detail");
            }}
          />
          <PortalWidgets
            onPostProperty={() => setActiveView("post-property")}
            onSelectView={(view) => setActiveView(view)}
          />
        </>
      )}

      {/* 2. My Properties Dedicated Table View */}
      {activeView === "my-properties" && (
        <PortalProperties
          onPostProperty={() => setActiveView("post-property")}
          onViewHealthScore={() => setActiveView("health-score")}
          onViewDiagnosis={() => setActiveView("performance-diagnosis")}
        />
      )}

      {/* 3. Post a Property 7-Step Wizard (Screenshots 4 & 5) */}
      {activeView === "post-property" && (
        <PortalPostProperty
          onCancel={() => setActiveView("dashboard")}
          onComplete={() => setActiveView("my-properties")}
        />
      )}

      {/* 4. Properties Health Score (Screenshot 3) */}
      {activeView === "health-score" && (
        <PortalHealthScore
          onBack={() => setActiveView("my-properties")}
          onViewDiagnosis={() => setActiveView("performance-diagnosis")}
        />
      )}

      {/* 5. Performance Diagnosis (Screenshot 4) */}
      {activeView === "performance-diagnosis" && (
        <PortalPerformanceDiagnosis
          onBack={() => setActiveView("my-properties")}
          onViewHealthScore={() => setActiveView("health-score")}
        />
      )}

      {/* 6. CRM Leads Table (Screenshot 5 & 6) */}
      {activeView === "crm-leads" && (
        <PortalCrmLeads
          initialTab={crmTab}
          onSelectLead={(leadId) => {
            setSelectedLeadId(leadId);
            setActiveView("lead-detail");
          }}
        />
      )}

      {/* 7. CRM Lead Detail / Customer Profile (Screenshot 7) */}
      {activeView === "lead-detail" && (
        <PortalLeadDetail
          onBack={() => setActiveView("crm-leads")}
        />
      )}

      {/* 8. Saved Drafts View */}
      {activeView === "drafts" && (
        <PortalDrafts
          onResumeDraft={() => setActiveView("post-property")}
          onPostProperty={() => setActiveView("post-property")}
        />
      )}

      {/* 9. Boost Property Promotion Packages */}
      {activeView === "boost-property" && (
        <PortalBoostProperty
          onBack={() => setActiveView("my-properties")}
        />
      )}

      {/* 10. My Projects View */}
      {activeView === "my-projects" && (
        <PortalProperties
          initialNavTab="my-projects"
          onPostProperty={() => setActiveView("post-property")}
          onViewHealthScore={() => setActiveView("health-score")}
          onViewDiagnosis={() => setActiveView("performance-diagnosis")}
          onSelectLead={(leadId) => {
            setSelectedLeadId(leadId);
            setActiveView("lead-detail");
          }}
        />
      )}

      {/* 11. Audience Demographics */}
      {activeView === "audience" && <PortalAudience />}

      {/* 12. Marketing Content & Media */}
      {activeView === "content" && <PortalContentManager />}

      {/* 13. Detailed Analytics */}
      {activeView === "analytics" && <PortalAnalyticsView />}

      {/* 14. Market Insights */}
      {activeView === "insights" && <PortalInsightsView />}

      {/* 15. Agent Profile & Account Settings */}
      {activeView === "account" && <PortalAccountSettings />}
    </div>
  );
}
