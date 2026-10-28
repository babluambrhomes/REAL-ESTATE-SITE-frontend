"use client";

import React, { createContext, useContext, useState } from "react";

export type PortalViewType =
  | "dashboard"
  | "my-properties"
  | "post-property"
  | "health-score"
  | "performance-diagnosis"
  | "crm-leads"
  | "lead-detail"
  | "my-projects"
  | "drafts"
  | "boost-property"
  | "audience"
  | "content"
  | "analytics"
  | "insights"
  | "account";

interface PortalContextType {
  activeView: PortalViewType;
  setActiveView: (view: PortalViewType) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  crmTab: string;
  setCrmTab: (tab: string) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeView, setActiveView] = useState<PortalViewType>("dashboard");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [crmTab, setCrmTab] = useState<string>("All Leads");

  return (
    <PortalContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedLeadId,
        setSelectedLeadId,
        selectedPropertyId,
        setSelectedPropertyId,
        crmTab,
        setCrmTab,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};
