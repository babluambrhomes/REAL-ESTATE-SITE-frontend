"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LayoutGrid,
  Columns2,
  Menu,
  User,
  Megaphone,
  CreditCard,
  Building2,
  Building,
  Home,
  Users2,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  FolderGit2,
  Sparkles,
  Rocket,
  CalendarCheck,
  PhoneCall,
  Kanban,
  CheckSquare,
  History,
  Timer,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authSlice";
import { usePortal } from "./PortalContext";

interface PortalSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeView: string;
  onSelectView: (view: string) => void;
}

export const PortalSidebar = ({
  collapsed,
  onToggleCollapse,
  activeView,
  onSelectView,
}: PortalSidebarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { setCrmTab } = usePortal();

  // Accordion state for dropdowns
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [crmOpen, setCrmOpen] = useState(false);

  const userName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Jitender Singh";

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#1865F2] text-white flex flex-col transition-all duration-300 ease-in-out select-none shadow-xl ${
        collapsed ? "w-[76px]" : "w-[240px]"
      }`}
    >
      {/* Top Header: Logo & Toggle Button (Figma media_1793005427309.png 1:1) */}
      {collapsed ? (
        <div className="flex flex-col items-center pt-4 pb-2 gap-3.5">
          {/* Split rect toggle button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-10 h-10 rounded-xl hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <Columns2 size={20} strokeWidth={2.2} />
          </button>

          {/* R^ Stylized Logo */}
          <Link
            href="/"
            className="flex items-center justify-center text-white font-black text-2xl tracking-tighter hover:opacity-90 transition-opacity"
            title="Roofin"
          >
            <span className="flex items-center">
              R<sup className="text-sm -top-1 ml-0.5">^</sup>
            </span>
          </Link>
        </div>
      ) : (
        <div className="pt-4 pb-2 px-4 space-y-3">
          {/* Toggle Button at top */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <Columns2 size={20} strokeWidth={2.2} />
          </button>

          {/* Roofin^ Logo */}
          <Link href="/" className="block pl-1">
            <span className="text-[26px] font-black tracking-tight text-white flex items-center">
              Roofin<sup className="text-base -top-1 ml-0.5 font-bold">^</sup>
            </span>
          </Link>
        </div>
      )}

      {/* Navigation Menu List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 no-scrollbar">
        {/* 1. Dashboard (Main Item) - White rounded pill matching Figma */}
        <div className="relative">
          <button
            type="button"
            onClick={() => onSelectView("dashboard")}
            className={`w-full flex items-center gap-3 py-2.5 rounded-2xl font-bold text-[13.5px] transition-all cursor-pointer ${
              activeView === "dashboard"
                ? "bg-white text-[#1865F2] shadow-sm"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            } ${collapsed ? "justify-center w-12 h-12 mx-auto p-0" : "px-3.5"}`}
            title="Dashboard"
          >
            <LayoutGrid size={20} className="shrink-0" strokeWidth={2.2} />
            {!collapsed && <span>Dashboard</span>}
          </button>
        </div>

        {/* 2. Properties (Dropdown matching Figma 1:1) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (collapsed) {
                setPropertiesOpen((prev) => !prev);
                setCrmOpen(false);
              } else {
                setPropertiesOpen((prev) => !prev);
                setCrmOpen(false);
              }
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
              propertiesOpen || activeView.startsWith("property") || activeView === "my-properties"
                ? "text-white bg-white/15 font-bold"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            } ${collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""}`}
            title="Properties"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={19} className="shrink-0" />
              {!collapsed && <span>Properties</span>}
            </div>
            {!collapsed && (
              propertiesOpen ? (
                <ChevronDown size={15} className="text-white/80" />
              ) : (
                <ChevronRight size={15} className="text-white/60" />
              )
            )}
          </button>

          {/* Properties Submenu in White Container - Expanded Mode (Figma Column 4) */}
          {!collapsed && propertiesOpen && (
            <div className="mt-1.5 mx-1 p-2 rounded-2xl bg-white text-slate-700 shadow-sm space-y-1">
              <button
                type="button"
                onClick={() => onSelectView("my-properties")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "my-properties" || activeView === "health-score" || activeView === "performance-diagnosis"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Home size={15} className={activeView === "my-properties" ? "text-[#1865F2]" : "text-slate-400"} />
                <span>My Properties</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView("post-property")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "post-property"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <PlusCircle size={15} className={activeView === "post-property" ? "text-[#1865F2]" : "text-slate-400"} />
                <span>My Post</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView("my-projects")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "my-projects"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <FolderGit2 size={15} className="text-slate-400" />
                <span>My Projects</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView("drafts")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "drafts"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <FileText size={15} className="text-slate-400" />
                <span>Drafts</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView("boost-property")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "boost-property"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Rocket size={15} className="text-slate-400" />
                <span>Boost Property</span>
              </button>
            </div>
          )}

          {/* Properties Submenu in White Container - Collapsed Mode (Figma Column 3) */}
          {collapsed && propertiesOpen && (
            <div className="mt-1.5 p-1.5 rounded-2xl bg-white text-slate-700 shadow-md flex flex-col items-center space-y-2 mx-auto w-12">
              <button
                type="button"
                onClick={() => onSelectView("my-properties")}
                className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center cursor-pointer"
                title="My Properties"
              >
                <Home size={15} />
              </button>
              <button
                type="button"
                onClick={() => onSelectView("post-property")}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="My Post"
              >
                <PlusCircle size={15} />
              </button>
              <button
                type="button"
                onClick={() => onSelectView("my-projects")}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="My Projects"
              >
                <FolderGit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => onSelectView("drafts")}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Drafts"
              >
                <FileText size={15} />
              </button>
              <button
                type="button"
                onClick={() => onSelectView("boost-property")}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Boost Property"
              >
                <Rocket size={15} />
              </button>
            </div>
          )}
        </div>

        {/* 3. CRM (Dropdown matching Figma 1:1) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (collapsed) {
                setCrmOpen((prev) => !prev);
                setPropertiesOpen(false);
              } else {
                setCrmOpen((prev) => !prev);
                setPropertiesOpen(false);
              }
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
              crmOpen || activeView.startsWith("crm") || activeView === "lead-detail"
                ? "text-white bg-white/20 font-bold"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            } ${collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""}`}
            title="CRM"
          >
            <div className="flex items-center gap-3">
              <div className="px-1 py-0.5 border border-current rounded text-[8.5px] font-black leading-none tracking-tight shrink-0">
                CRM
              </div>
              {!collapsed && <span>CRM</span>}
            </div>
            {!collapsed && (
              crmOpen ? (
                <ChevronDown size={15} className="text-white/80" />
              ) : (
                <ChevronRight size={15} className="text-white/60" />
              )
            )}
          </button>

          {/* CRM Submenu in White Container - Expanded Mode (Figma Column 2) */}
          {!collapsed && crmOpen && (
            <div className="mt-1.5 mx-1 p-2 rounded-2xl bg-white text-slate-700 shadow-sm space-y-1">
              <button
                type="button"
                onClick={() => {
                  setCrmTab("All Leads");
                  onSelectView("crm-leads");
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === "crm-leads" || activeView === "lead-detail"
                    ? "bg-[#EAF2FF] text-[#1865F2] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Users size={15} className={activeView === "crm-leads" || activeView === "lead-detail" ? "text-[#1865F2]" : "text-slate-400"} />
                <span>Leads</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("Contacted");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <PhoneCall size={15} className="text-slate-400" />
                <span>Follow-ups</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("Site Visit");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Building size={15} className="text-slate-400" />
                <span>Site Visits</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("Negotiation");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Kanban size={15} className="text-slate-400" />
                <span>Pipeline</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("New");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <CheckSquare size={15} className="text-slate-400" />
                <span>Tasks</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("Converted");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <History size={15} className="text-slate-400" />
                <span>Lead History</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrmTab("Not Respond");
                  onSelectView("crm-leads");
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Timer size={15} className="text-slate-400" />
                <span>Response Time</span>
              </button>
            </div>
          )}

          {/* CRM Submenu in White Container - Collapsed Mode (Figma Column 1) */}
          {collapsed && crmOpen && (
            <div className="mt-1.5 p-1.5 rounded-2xl bg-white text-slate-700 shadow-md flex flex-col items-center space-y-2 mx-auto w-12">
              <button
                type="button"
                onClick={() => {
                  setCrmTab("All Leads");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center cursor-pointer"
                title="Leads"
              >
                <Users size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("Contacted");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Follow-ups"
              >
                <PhoneCall size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("Site Visit");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Site Visits"
              >
                <Building size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("Negotiation");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Pipeline"
              >
                <Kanban size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("New");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Tasks"
              >
                <CheckSquare size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("Converted");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Lead History"
              >
                <History size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrmTab("Not Respond");
                  onSelectView("crm-leads");
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#1865F2] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Response Time"
              >
                <Timer size={15} />
              </button>
            </div>
          )}
        </div>

        {/* 4. Audience */}
        <button
          type="button"
          onClick={() => onSelectView("audience")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-white/85 hover:bg-white/10 hover:text-white cursor-pointer ${
            collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""
          }`}
          title="Audience"
        >
          <div className="flex items-center gap-3">
            <User size={19} className="shrink-0" />
            {!collapsed && <span>Audience</span>}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-white/60" />}
        </button>

        {/* 5. Content */}
        <button
          type="button"
          onClick={() => onSelectView("content")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-white/85 hover:bg-white/10 hover:text-white cursor-pointer ${
            collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""
          }`}
          title="Content"
        >
          <div className="flex items-center gap-3">
            <Building size={19} className="shrink-0" />
            {!collapsed && <span>Content</span>}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-white/60" />}
        </button>

        {/* 6. Analytics */}
        <button
          type="button"
          onClick={() => onSelectView("analytics")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-white/85 hover:bg-white/10 hover:text-white cursor-pointer ${
            collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""
          }`}
          title="Analytics"
        >
          <div className="flex items-center gap-3">
            <BarChart3 size={19} className="shrink-0" />
            {!collapsed && <span>Analytics</span>}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-white/60" />}
        </button>

        {/* 7. Insights */}
        <button
          type="button"
          onClick={() => onSelectView("insights")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-white/85 hover:bg-white/10 hover:text-white cursor-pointer ${
            collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""
          }`}
          title="Insights"
        >
          <div className="flex items-center gap-3">
            <Megaphone size={19} className="shrink-0" />
            {!collapsed && <span>Insights</span>}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-white/60" />}
        </button>

        {/* 8. Account */}
        <button
          type="button"
          onClick={() => onSelectView("account")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-white/85 hover:bg-white/10 hover:text-white cursor-pointer ${
            collapsed ? "justify-center px-0 w-12 h-10 mx-auto" : ""
          }`}
          title="Account"
        >
          <div className="flex items-center gap-3">
            <Settings size={19} className="shrink-0" />
            {!collapsed && <span>Account</span>}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-white/60" />}
        </button>
      </div>

      {/* Bottom Area: Upgrade Card + Logout + Profile Avatar (Figma media_1793005427309.png 1:1) */}
      <div className="p-3 border-t border-white/15 space-y-2.5 shrink-0">
        {/* Upgrade Card (White card with Rocket and Upgrade now button) */}
        {!collapsed && (
          <div className="rounded-2xl bg-white p-3 shadow-md flex items-center justify-between text-[#0B132B]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Rocket size={17} />
              </div>
              <div className="min-w-0">
                <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                  Want to upgrade?
                </span>
                <button
                  type="button"
                  onClick={() => onSelectView("boost-property")}
                  className="mt-1 px-3 py-1 rounded-full bg-[#0B132B] hover:bg-black text-white font-bold text-[9.5px] shadow-2xs transition-colors cursor-pointer"
                >
                  Upgrade now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button (Solid Blue Pill) */}
        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white bg-[#2563EB] hover:bg-blue-600 transition-colors cursor-pointer shadow-xs ${
            collapsed ? "justify-center px-0" : ""
          }`}
          title="Logout"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Profile Pill */}
        <div
          onClick={() => onSelectView("account")}
          className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer ${
            collapsed ? "justify-center px-0" : ""
          }`}
          title={userName}
        >
          <div className="relative w-8.5 h-8.5 rounded-full overflow-hidden border-2 border-white shrink-0 bg-white/20 shadow-xs">
            <Image
              src="/broker/jitender_singh_figma.jpg"
              alt={userName}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder avatar
                (e.target as any).src = "/customers/customer_man_laptop.jpg";
              }}
            />
          </div>
          {!collapsed && (
            <span className="text-[13.5px] font-bold text-white tracking-tight">
              Profile
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
