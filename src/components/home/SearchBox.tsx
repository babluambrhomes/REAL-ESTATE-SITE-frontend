"use client";

import { useState } from "react";
import {
  BedDouble,
  Building,
  Building2,
  Home,
  KeyRound,
  LandPlot,
  Rocket,
  Search,
  User,
} from "lucide-react";
import Select, {
  type GroupBase,
  type StylesConfig,
} from "react-select";
import { cn } from "@/lib/utils";

type OptionType = { value: string; label: string };

const tabs = [
  { label: "Buy", value: "buy", Icon: Home },
  { label: "Rent", value: "rent", Icon: KeyRound },
  { label: "PG/Coliving", value: "pg", Icon: BedDouble },
  { label: "New Launch", value: "new-launch", Icon: Rocket },
  { label: "Commercial", value: "commercial", Icon: Building2 },
  { label: "Plot/Land", value: "plot", Icon: LandPlot },
  { label: "Project", value: "project", Icon: Building },
  { label: "Agent", value: "agent", Icon: User },
];

const popularSearches = ["3BHK in Noida", "Flats in NCR", "Plots in NCR"];

const cityOptions: OptionType[] = [
  { value: "noida", label: "Noida" },
  { value: "greater-noida", label: "Greater Noida" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "delhi", label: "Delhi" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "faridabad", label: "Faridabad" },
];

const localityOptions: OptionType[] = [
  { value: "sector-62", label: "Sector 62, Noida" },
  { value: "sector-150", label: "Sector 150, Noida" },
  { value: "golf-course-extension", label: "Golf Course Extension, Gurgaon" },
  { value: "dlf-phase-4", label: "DLF Phase 4, Gurgaon" },
  { value: "indirapuram", label: "Indirapuram, Ghaziabad" },
  { value: "vaishali", label: "Vaishali, Ghaziabad" },
  { value: "south-delhi", label: "South Delhi" },
];

const budgetOptions: OptionType[] = [
  { value: "under-30l", label: "Under ₹30 L" },
  { value: "30-50l", label: "₹30 L - ₹50 L" },
  { value: "50-75l", label: "₹50 L - ₹75 L" },
  { value: "75l-1cr", label: "₹75 L - ₹1 Cr" },
  { value: "1-1.5cr", label: "₹1 Cr - ₹1.5 Cr" },
  { value: "1.5-3cr", label: "₹1.5 Cr - ₹3 Cr" },
  { value: "above-3cr", label: "Above ₹3 Cr" },
];

const propertyTypeOptions: OptionType[] = [
  { value: "flat", label: "Flat / Apartment" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "plot", label: "Plot / Land" },
  { value: "builder-floor", label: "Independent Builder Floor" },
  { value: "office", label: "Office / Commercial" },
  { value: "shop", label: "Shop" },
  { value: "pg", label: "PG / Hostel" },
];

const selectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (base, state) => ({
    ...base,
    minHeight: "2rem",
    width: "100%",
    maxWidth:'200px',
    border: state.isFocused ? "1.5px solid #2563EB" : "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.15)" : "none",
    cursor: "pointer",
    "&:hover": { borderColor: "#2563EB" },
  }),
  valueContainer: (base) => ({
    ...base,
    overflow: "hidden",
    paddingLeft: "0.75rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6B7280",
    fontWeight: 500,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontWeight: 500,
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow:
      "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    marginTop: "0.5rem",
    zIndex: 40,
  }),
  menuList: (base) => ({
    ...base,
    padding: "0.25rem",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "#2563EB"
      : state.isFocused
        ? "rgba(37, 99, 235, 0.1)"
        : "transparent",
    color: state.isSelected ? "#FFFFFF" : "#111827",
    "&:active": { backgroundColor: "rgba(37, 99, 235, 0.2)" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#2563EB" : "#6B7280",
    cursor: "pointer",
    "&:hover": { color: "#2563EB" },
  }),
};

export const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <section className="relative z-10 mx-auto -mt-28 w-full max-w-5xl px-6 sm:px-10">
      <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1 cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                activeTab === tab.value
                  ? "bg-primary text-white shadow-md"
                  : " text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <tab.Icon className="h-3 w-3" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="h-[0.5px] mt-4 w-full bg-gray-400"></div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              City
            </label>
            <Select<OptionType, false>
              options={cityOptions}
              styles={selectStyles}

              placeholder="Select city"
              isSearchable
              className="min-w-0"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              Locality
            </label>
            <Select<OptionType, false>
              options={localityOptions}
              styles={selectStyles}

              placeholder="Select locality"
              isSearchable
              className="min-w-0"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
              Budget
            </label>
            <Select<OptionType, false>
              options={budgetOptions}
              styles={selectStyles}

              placeholder="Select budget"
              isSearchable
              className="min-w-0"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-1.5 block text-xs font-light uppercase tracking-wide text-gray-500">
                Property Type
              </label>
              <Select<OptionType, false>
                options={propertyTypeOptions}
                styles={selectStyles}

                placeholder="Select type"
                isSearchable
                className="min-w-0"
              />
            </div>

          </div>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 self-end rounded-xl bg-gradient-to-r from-primary to-secondary px-6 font-semibold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-[1.02] lg:w-auto"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
            <LandPlot className="h-3.5 w-3.5 text-primary" />
            Popular:
          </span>
          {popularSearches.map((search) => (
            <button
              key={search}
              type="button"
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
