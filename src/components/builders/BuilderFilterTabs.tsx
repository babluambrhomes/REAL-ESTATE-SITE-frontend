import { useState } from "react";
import { Home, HardHat, SlidersHorizontal, ChevronDown } from "lucide-react";
import { AgentFilterModal } from "./AgentFilterModal";

interface BuilderFilterTabsProps {
  activeTab: "agents" | "builders";
  onTabChange: (tab: "agents" | "builders") => void;
  onOpenFilter?: () => void;
}

export const BuilderFilterTabs = ({
  activeTab,
  onTabChange,
  onOpenFilter,
}: BuilderFilterTabsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 font-jakarta">
      
      {/* Left Pill Toggle (Agents vs Builders) */}
      <div className="flex items-center gap-3">
        {/* Agents Toggle */}
        <button
          type="button"
          onClick={() => onTabChange("agents")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "agents"
              ? "bg-[#1865F2] text-white shadow-[0_4px_14px_rgba(24,101,242,0.35)]"
              : "bg-white text-[#1865F2] border border-[#1865F2]/40 hover:border-[#1865F2] shadow-2xs"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Agents</span>
        </button>

        {/* Builders Toggle */}
        <button
          type="button"
          onClick={() => onTabChange("builders")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "builders"
              ? "bg-[#1865F2] text-white shadow-[0_4px_14px_rgba(24,101,242,0.35)]"
              : "bg-white text-[#1865F2] border border-[#1865F2]/40 hover:border-[#1865F2] shadow-2xs"
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>Builders</span>
        </button>
      </div>

      {/* Right Search By Filter Button with Dropdown Drawer */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            onOpenFilter?.();
          }}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-[13px] font-bold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Search By Filter</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Filter Modal / Drawer */}
        <AgentFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

    </div>
  );
};
