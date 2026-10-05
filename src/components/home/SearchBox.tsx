"use client";

import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Building2,
  TrendingUp,
  Rocket,
  Store,
  LandPlot,
  FileText,
  UserCheck,
  Search,
} from "lucide-react";
import Select from "react-select";
import { cn } from "@/lib/utils";
import type { OptionType } from "@/types";
import { LocationList } from "@/data/headerData";
import { SEARCH_BOX } from "@/data/headerData";
import { searchBoxSelectStyles } from "@/lib/selectStyles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCity } from "@/store/slice/locationSlice";

const {
  budgetOptions,
  propertyTypeOptions,
} = SEARCH_BOX;

const tabsList = [
  { label: "Buy", value: "buy", Icon: Home },
  { label: "Rent", value: "rent", Icon: Building2 },
  { label: "Pg/Coliving", value: "pg", Icon: TrendingUp },
  { label: "New Launch", value: "new-launch", Icon: Rocket },
  { label: "Commercial", value: "commercial", Icon: Store },
  { label: "Plot/Land", value: "plot", Icon: LandPlot },
  { label: "Project", value: "project", Icon: FileText },
  { label: "Agent", value: "agent", Icon: UserCheck },
];

const popularList = [
  "3 BHK in Noida",
  "Flats in NCR",
  "Villas in NCR",
  "Plots in NCR",
  "Studio Apartment",
  "2 BHK under 1 Cr",
];

export const SearchBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [locality, setLocality] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<OptionType | null>(null);
  const [selectedType, setSelectedType] = useState<OptionType | null>(null);
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.location.selectedCity);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeTab) params.set("purpose", activeTab);
    if (selectedCity?.value) params.set("city", selectedCity.value);
    if (locality) params.set("locality", locality);
    if (selectedBudget?.value) params.set("budget", selectedBudget.value);
    if (selectedType?.value) params.set("type", selectedType.value);
    
    router.push(`/properties?${params.toString()}`);
  };

  const handlePopularSearch = (query: string) => {
    router.push(`/properties?q=${encodeURIComponent(query)}`);
  };

  return (
    <section ref={ref} className="relative z-30 mx-auto -mt-20 sm:-mt-24 w-full max-w-[1000px] px-4 sm:px-6">
      <div className="relative">
        {/* Bottom-Only Gradient Underlay (Matches Screenshot) */}
        <div className="absolute inset-x-4 -bottom-2.5 h-full rounded-[28px] bg-gradient-to-r from-[#1865F2] via-[#2A5AF0] to-[#4338CA] -z-10 opacity-90" />

        {/* Main Floating Search Card */}
        <div className="relative rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_16px_48px_rgba(24,101,242,0.16),0_2px_12px_rgba(0,0,0,0.04)] border border-[#DCE8FE]">
          {/* Top Category Tabs (Compact fit in single row) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 cursor-pointer rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 text-[13px] font-medium transition-all duration-200 shrink-0",
                    isActive
                      ? "bg-[#1865F2] text-white shadow-md shadow-blue-500/30"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <tab.Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-white" : "text-slate-500",
                      tab.value === "new-launch" && !isActive ? "text-cyan-500" : ""
                    )}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Thin Separator Line */}
          <div className="h-px mt-3.5 mb-4 w-full bg-slate-100" />

          {/* 4 Filter Dropdowns + Search Button Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* 1. CITY */}
            <div className="w-full">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                City
              </label>
              <Select<OptionType, false>
                instanceId="search-city-select"
                options={LocationList}
                styles={searchBoxSelectStyles}
                value={selectedCity ?? LocationList[0]}
                onChange={(option) => {
                  if (option) dispatch(setCity(option));
                }}
                placeholder="Select City"
                isSearchable
                className="min-w-0"
              />
            </div>

            {/* 2. LOCALITY */}
            <div className="w-full">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Locality
              </label>
              <div className="relative">
                <input
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Select Locality"
                  className="h-[48px] w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:border-[#1865F2] focus:border-[#1865F2] focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* 3. BUDGET */}
            <div className="w-full">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Budget
              </label>
              <Select<OptionType, false>
                instanceId="search-budget-select"
                options={budgetOptions}
                styles={searchBoxSelectStyles}
                value={selectedBudget}
                onChange={(option) => setSelectedBudget(option)}
                placeholder="Select Budget"
                isSearchable
                className="min-w-0"
              />
            </div>

            {/* 4. PROPERTY TYPE */}
            <div className="w-full">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Property Type
              </label>
              <Select<OptionType, false>
                instanceId="search-property-type-select"
                options={propertyTypeOptions}
                styles={searchBoxSelectStyles}
                value={selectedType}
                onChange={(option) => setSelectedType(option)}
                placeholder="Select Type"
                isSearchable
                className="min-w-0"
              />
            </div>

            {/* 5. SEARCH BUTTON (Exact Royal Blue -> Indigo Gradient) */}
            <div className="w-full">
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1865F2] via-[#2A52EE] to-[#3E38E0] px-5 text-[15px] font-bold text-white shadow-[0_8px_22px_rgba(30,80,240,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_26px_rgba(30,80,240,0.5)] cursor-pointer"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Bottom Popular Searches Row */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-2">
            <span className="text-[13px] font-medium text-slate-500 shrink-0">
              Popular:
            </span>
            {popularList.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handlePopularSearch(search)}
                className="rounded-full bg-[#f1f6fb] hover:bg-blue-50 px-4 py-1.5 text-[13px] font-medium text-slate-700 hover:text-[#1865F2] transition-colors border border-slate-200/50 cursor-pointer"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SearchBox.displayName = "SearchBox";

