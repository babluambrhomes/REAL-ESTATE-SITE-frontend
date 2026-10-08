"use client";

interface BuilderNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BuilderNavTabs = ({
  activeTab,
  onTabChange,
}: BuilderNavTabsProps) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "delivery", label: "Delivery Track Record" },
    { id: "construction", label: "Construction Updates" },
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews" },
    { id: "qa", label: "Q&A" },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 font-jakarta">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1865F2] text-white shadow-[0_4px_12px_rgba(24,101,242,0.3)]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
