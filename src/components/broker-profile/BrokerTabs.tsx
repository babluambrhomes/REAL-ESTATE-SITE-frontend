"use client";

interface BrokerTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BrokerTabs = ({ activeTab, onTabChange }: BrokerTabsProps) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "videos", label: "Videos" },
    { id: "properties-listed", label: "Properties Listed" },
    { id: "about", label: "About" },
    { id: "post", label: "Post" },
  ];

  return (
    <div className="border-b border-slate-100 pb-3 font-jakarta overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white text-[#1865F2] border border-[#1865F2] shadow-2xs"
                  : "bg-transparent text-[#0B132B] hover:text-[#1865F2] border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
