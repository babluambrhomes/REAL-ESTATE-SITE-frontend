"use client";

import { forwardRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  TrendingUp,
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

/* Custom Tab Mask Icon Helper that renders PNG masks in currentColor (white when active, slate grey when inactive) */
const TabMaskIcon = ({ src, className }: { src: string; className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("inline-block shrink-0 bg-current transition-colors", className)}
    style={{
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    }}
  />
);

const BuyIcon = ({ className }: { className?: string }) => (
  <TabMaskIcon src="/icon/tabs/tab_buy.png" className={className} />
);

const CommercialIcon = ({ className }: { className?: string }) => (
  <TabMaskIcon src="/icon/tabs/tab_commercial.png" className={className} />
);

const PlotLandIcon = ({ className }: { className?: string }) => (
  <TabMaskIcon src="/icon/tabs/tab_plot.png" className={className} />
);

const RocketTabIcon = ({ className }: { className?: string }) => (
  <TabMaskIcon src="/icon/tabs/tab_rocket.png" className={className} />
);

const tabsList = [
  { label: "Buy", value: "buy", Icon: BuyIcon },
  { label: "Rent", value: "rent", Icon: Building2 },
  { label: "Pg/Coliving", value: "pg", Icon: TrendingUp },
  { label: "New Launch", value: "new-launch", Icon: RocketTabIcon },
  { label: "Commercial", value: "commercial", Icon: CommercialIcon },
  { label: "Plot/Land", value: "plot", Icon: PlotLandIcon },
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

import { useSearchSuggestionsQuery } from "@/lib/features/property/propertyHooks";

export const SearchBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [locality, setLocality] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<OptionType | null>(null);
  const [selectedType, setSelectedType] = useState<OptionType | null>(null);
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.location.selectedCity);

  const { data: suggestionsData } = useSearchSuggestionsQuery();

  // Merge live backend cities with existing LocationList
  const dynamicCityOptions = useMemo<OptionType[]>(() => {
    const liveCities = suggestionsData?.data?.cities;
    if (!liveCities || liveCities.length === 0) return LocationList;

    const countMap = new Map<string, number>();
    liveCities.forEach((c) => countMap.set(c.city.toLowerCase(), c.count));

    const mapped = LocationList.map((loc) => {
      const count = countMap.get(loc.value.toLowerCase()) || countMap.get(loc.label.toLowerCase());
      return {
        ...loc,
        label: count ? `${loc.label} (${count})` : loc.label,
      };
    });

    liveCities.forEach((c) => {
      const cleanVal = c.city.toLowerCase().replace(/\s+/g, "-");
      const exists = mapped.some(
        (m) => m.value.toLowerCase() === cleanVal || m.label.toLowerCase().startsWith(c.city.toLowerCase())
      );
      if (!exists) {
        mapped.push({
          value: cleanVal,
          label: `${c.city} (${c.count})`,
        });
      }
    });

    return mapped;
  }, [suggestionsData]);

  // Merge live backend property types with existing propertyTypeOptions
  const dynamicTypeOptions = useMemo<OptionType[]>(() => {
    const liveTypes = suggestionsData?.data?.propertyTypes;
    if (!liveTypes || liveTypes.length === 0) return propertyTypeOptions;

    const countMap = new Map<string, number>();
    liveTypes.forEach((t) => countMap.set(t.type.toUpperCase(), t.count));

    return propertyTypeOptions.map((opt) => {
      const upper = opt.value.toUpperCase().replace(/-/g, "_");
      const count = countMap.get(upper);
      return {
        ...opt,
        label: count ? `${opt.label} (${count})` : opt.label,
      };
    });
  }, [suggestionsData]);

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
        {/* Bottom-Only Gradient Underlay */}
        <div className="absolute inset-x-4 -bottom-2 h-full rounded-[22px] sm:rounded-[24px] bg-gradient-to-r from-[#1865F2] via-[#2A5AF0] to-[#4338CA] -z-10 opacity-90" />

        {/* Main Floating Search Card (Ultra-Sleek & Bareek) */}
        <div className="relative rounded-[22px] sm:rounded-[24px] bg-white p-3 sm:p-4.5 shadow-[0_12px_40px_rgba(24,101,242,0.12),0_2px_10px_rgba(0,0,0,0.03)] border border-[#DCE8FE]">
          {/* Top Category Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 cursor-pointer rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-[12px] sm:text-[12.5px] font-medium transition-all duration-200 shrink-0",
                    isActive
                      ? "bg-[#1865F2] text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <tab.Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-white" : "text-slate-500"
                    )}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Thin Separator Line */}
          <div className="h-px mt-2.5 mb-2.5 w-full bg-slate-100" />

          {/* 4 Filter Dropdowns + Search Button Grid (Ultra-Bareek 34px Height) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5 items-end">
            {/* 1. CITY */}
            <div className="w-full">
              <label className="mb-0.5 block text-[9.5px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
                City
              </label>
              <Select<OptionType, false>
                instanceId="search-city-select"
                options={dynamicCityOptions}
                styles={searchBoxSelectStyles}
                value={selectedCity ?? dynamicCityOptions[0] ?? LocationList[0]}
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
              <label className="mb-0.5 block text-[9.5px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Locality
              </label>
              <div className="relative">
                <input
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Select Locality"
                  className="h-[34px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[12px] font-normal text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:border-[#1865F2] focus:border-[#1865F2] focus:ring-1 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* 3. BUDGET */}
            <div className="w-full">
              <label className="mb-0.5 block text-[9.5px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
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
              <label className="mb-0.5 block text-[9.5px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Property Type
              </label>
              <Select<OptionType, false>
                instanceId="search-property-type-select"
                options={dynamicTypeOptions}
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
                className="flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-gradient-to-r from-[#1865F2] via-[#2A52EE] to-[#3E38E0] px-3.5 text-[12.5px] font-semibold text-white shadow-[0_3px_10px_rgba(30,80,240,0.25)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_4px_14px_rgba(30,80,240,0.3)] cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Bottom Popular Searches Row */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11.5px] font-medium text-slate-400 shrink-0">
              Popular:
            </span>
            {popularList.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handlePopularSearch(search)}
                className="rounded-full bg-[#f1f6fb] hover:bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 hover:text-[#1865F2] transition-colors border border-slate-200/50 cursor-pointer"
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
