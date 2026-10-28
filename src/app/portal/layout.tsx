"use client";

import { useState } from "react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalProvider, usePortal } from "@/components/portal/PortalContext";

function PortalLayoutInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { activeView, setActiveView } = usePortal();

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-poppins antialiased flex">
      {/* 1. Deep Royal Blue Collapsible Sidebar matching Figma */}
      <PortalSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        activeView={activeView}
        onSelectView={(view: any) => setActiveView(view)}
      />

      {/* 2. Main Scrollable Container */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col ${
          collapsed ? "ml-[76px]" : "ml-[240px]"
        }`}
      >
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      <PortalLayoutInner>{children}</PortalLayoutInner>
    </PortalProvider>
  );
}
