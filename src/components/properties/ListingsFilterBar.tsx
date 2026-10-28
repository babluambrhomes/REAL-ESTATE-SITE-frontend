"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  IndianRupee,
  Home,
  Clock,
  UserCheck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetPreset {
  label: string;
  min?: number; // in Lakhs
  max?: number; // in Lakhs
}

const BUDGET_PRESETS: BudgetPreset[] = [
  { label: "Any Budget" },
  { label: "Under ₹50 Lac", max: 50 },
  { label: "₹50 Lac - ₹1 Cr", min: 50, max: 100 },
  { label: "₹1 Cr - ₹1.5 Cr", min: 100, max: 150 },
  { label: "₹1.5 Cr - ₹3 Cr", min: 150, max: 300 },
  { label: "₹3 Cr - ₹5 Cr", min: 300, max: 500 },
  { label: "Above ₹5 Cr", min: 500 },
];

const MIN_PRICES = [
  { label: "Min (₹0)", value: 0 },
  { label: "₹20 Lac", value: 20 },
  { label: "₹40 Lac", value: 40 },
  { label: "₹60 Lac", value: 60 },
  { label: "₹80 Lac", value: 80 },
  { label: "₹1.00 Cr", value: 100 },
  { label: "₹1.50 Cr", value: 150 },
  { label: "₹2.00 Cr", value: 200 },
  { label: "₹3.00 Cr", value: 300 },
];

const MAX_PRICES = [
  { label: "Max (Any)", value: 10000 },
  { label: "₹50 Lac", value: 50 },
  { label: "₹75 Lac", value: 75 },
  { label: "₹1.00 Cr", value: 100 },
  { label: "₹1.50 Cr", value: 150 },
  { label: "₹2.00 Cr", value: 200 },
  { label: "₹3.00 Cr", value: 300 },
  { label: "₹5.00 Cr", value: 500 },
  { label: "₹10.00 Cr", value: 1000 },
];

const BHK_OPTIONS = [
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "5+ BHK", value: "5" },
];

const PROPERTY_TYPES = [
  { label: "All Property Types", value: "" },
  { label: "Apartments / Flats", value: "apartment" },
  { label: "Villas & Houses", value: "villa" },
  { label: "Builder Floors", value: "builder" },
  { label: "Plots & Land", value: "plot" },
  { label: "Commercial", value: "commercial" },
];

const POSSESSION_STATUSES = [
  { label: "All Possession", value: "" },
  { label: "Ready to Move", value: "ready" },
  { label: "Under Construction", value: "under_construction" },
  { label: "New Launch", value: "new_launch" },
];

const POSTED_BY_OPTIONS = [
  { label: "All Listed By", value: "" },
  { label: "Builders / Developers", value: "builder" },
  { label: "Verified Dealers", value: "dealer" },
  { label: "Direct Owners", value: "owner" },
];

export const ListingsFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active dropdown popovers state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // References for outside click detection
  const budgetRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const postedByRef = useRef<HTMLDivElement>(null);

  // Parse current URL params
  const currentBhk = searchParams.get("bhk") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentBudget = searchParams.get("budget") || "";
  const currentType = searchParams.get("type") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentPostedBy = searchParams.get("postedBy") || "";

  // Selected BHKs set
  const selectedBhks = useMemo(() => {
    if (!currentBhk) return new Set<string>();
    return new Set(currentBhk.split(",").map((s) => s.trim()).filter(Boolean));
  }, [currentBhk]);

  // Temporary custom budget state while dropdown is open
  const [tempMin, setTempMin] = useState<number>(() => {
    if (currentMinPrice) {
      const n = Number(currentMinPrice);
      return n > 10000 ? Math.round(n / 100000) : n;
    }
    return 0;
  });
  const [tempMax, setTempMax] = useState<number>(() => {
    if (currentMaxPrice) {
      const n = Number(currentMaxPrice);
      return n > 10000 ? Math.round(n / 100000) : n;
    }
    return 10000;
  });

  // Sync temp budget when URL changes
  useEffect(() => {
    if (currentMinPrice) {
      const n = Number(currentMinPrice);
      setTempMin(n > 10000 ? Math.round(n / 100000) : n);
    } else {
      setTempMin(0);
    }

    if (currentMaxPrice) {
      const n = Number(currentMaxPrice);
      setTempMax(n > 10000 ? Math.round(n / 100000) : n);
    } else {
      setTempMax(10000);
    }
  }, [currentMinPrice, currentMaxPrice]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (openDropdown === "budget" && budgetRef.current?.contains(target)) ||
        (openDropdown === "type" && typeRef.current?.contains(target)) ||
        (openDropdown === "status" && statusRef.current?.contains(target)) ||
        (openDropdown === "postedBy" && postedByRef.current?.contains(target))
      ) {
        return;
      }
      setOpenDropdown(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  // Helper to push updated params cleanly without scroll jump
  const updateQuery = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === "all") {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });

    // Reset page to 1 whenever filters change
    next.delete("page");

    router.push(`/properties?${next.toString()}`, { scroll: false });
  };

  // Toggle BHK chip
  const handleToggleBhk = (bhkVal: string) => {
    const nextSet = new Set(selectedBhks);
    if (nextSet.has(bhkVal)) {
      nextSet.delete(bhkVal);
    } else {
      nextSet.add(bhkVal);
    }

    const nextArr = Array.from(nextSet);
    updateQuery({
      bhk: nextArr.length > 0 ? nextArr.join(",") : null,
    });
  };

  // Apply Budget Preset
  const handleApplyPreset = (preset: BudgetPreset) => {
    const updates: Record<string, string | null> = {
      budget: null,
      minPrice: null,
      maxPrice: null,
    };

    if (preset.min !== undefined && preset.min > 0) {
      updates.minPrice = String(preset.min * 100000);
      setTempMin(preset.min);
    } else {
      setTempMin(0);
    }

    if (preset.max !== undefined && preset.max < 10000) {
      updates.maxPrice = String(preset.max * 100000);
      setTempMax(preset.max);
    } else {
      setTempMax(10000);
    }

    updateQuery(updates);
    setOpenDropdown(null);
  };

  // Apply Custom Min/Max Price
  const handleApplyCustomBudget = () => {
    const updates: Record<string, string | null> = {
      budget: null,
    };

    if (tempMin > 0) {
      updates.minPrice = String(tempMin * 100000);
    } else {
      updates.minPrice = null;
    }

    if (tempMax < 10000) {
      updates.maxPrice = String(tempMax * 100000);
    } else {
      updates.maxPrice = null;
    }

    updateQuery(updates);
    setOpenDropdown(null);
  };

  // Clear all in-page filters
  const handleResetFilters = () => {
    const next = new URLSearchParams(searchParams.toString());
    const filterKeys = ["bhk", "minPrice", "maxPrice", "budget", "type", "status", "postedBy"];
    filterKeys.forEach((k) => next.delete(k));
    next.delete("page");
    router.push(`/properties?${next.toString()}`, { scroll: false });
  };

  // Total applied filters count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBhks.size > 0) count += 1;
    if (currentMinPrice || currentMaxPrice || currentBudget) count += 1;
    if (currentType) count += 1;
    if (currentStatus) count += 1;
    if (currentPostedBy) count += 1;
    return count;
  }, [selectedBhks, currentMinPrice, currentMaxPrice, currentBudget, currentType, currentStatus, currentPostedBy]);

  // Compute readable budget label
  const budgetLabel = useMemo(() => {
    if (currentBudget) {
      const found = BUDGET_PRESETS.find((p) => p.label.toLowerCase().includes(currentBudget));
      if (found) return found.label;
    }
    if (currentMinPrice || currentMaxPrice) {
      const minL = currentMinPrice ? (Number(currentMinPrice) >= 10000000 ? `${(Number(currentMinPrice) / 10000000).toFixed(1)} Cr` : `${(Number(currentMinPrice) / 100000).toFixed(0)} L`) : "₹0";
      const maxL = currentMaxPrice ? (Number(currentMaxPrice) >= 10000000 ? `${(Number(currentMaxPrice) / 10000000).toFixed(1)} Cr` : `${(Number(currentMaxPrice) / 100000).toFixed(0)} L`) : "Any";
      return `${minL} - ${maxL}`;
    }
    return "Budget";
  }, [currentBudget, currentMinPrice, currentMaxPrice]);

  // Compute readable type label
  const typeLabel = useMemo(() => {
    if (!currentType) return "Property Type";
    const found = PROPERTY_TYPES.find((t) => t.value === currentType);
    return found ? found.label.split("/")[0].trim() : currentType;
  }, [currentType]);

  // Compute readable status label
  const statusLabel = useMemo(() => {
    if (!currentStatus) return "Possession";
    const found = POSSESSION_STATUSES.find((s) => s.value === currentStatus);
    return found ? found.label : currentStatus;
  }, [currentStatus]);

  // Compute readable postedBy label
  const postedByLabel = useMemo(() => {
    if (!currentPostedBy) return "Listed By";
    const found = POSTED_BY_OPTIONS.find((p) => p.value === currentPostedBy);
    return found ? found.label : currentPostedBy;
  }, [currentPostedBy]);

  return (
    <div className="mb-6 rounded-[24px] border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-jakarta transition-all">
      {/* Top Row: Refine Title, BHK Pills & Reset Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Left: Section Label & BHK Multi-Select Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 tracking-wider uppercase pr-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#1865F2]" />
            <span>Refine BHK:</span>
          </div>

          {/* BHK Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {BHK_OPTIONS.map((opt) => {
              const isSelected = selectedBhks.has(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleToggleBhk(opt.value)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer border shadow-2xs",
                    isSelected
                      ? "bg-[#1865F2] text-white border-[#1865F2] shadow-sm scale-102 ring-2 ring-blue-100"
                      : "bg-slate-50 text-slate-600 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300"
                  )}
                  title={`Filter by ${opt.label}`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Filters Counter and Clear Button */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 text-[#1865F2] px-2.5 py-0.5 text-xs font-bold border border-blue-200">
              {activeFiltersCount} Active
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Row: Dropdown Filters (Budget, Type, Status, PostedBy) */}
      <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3">
        {/* 1. BUDGET DROPDOWN */}
        <div ref={budgetRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "budget" ? null : "budget")}
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs",
              (currentMinPrice || currentMaxPrice || currentBudget)
                ? "bg-blue-50/80 border-[#1865F2] text-[#1865F2]"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            )}
          >
            <IndianRupee className="h-3.5 w-3.5 text-[#1865F2]" />
            <span>{budgetLabel}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                openDropdown === "budget" && "rotate-180"
              )}
            />
          </button>

          {/* Budget Popover */}
          {openDropdown === "budget" && (
            <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white p-4 shadow-2xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Select Budget Range
                </span>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(null)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Presets */}
              <div className="py-3">
                <p className="text-[11px] font-semibold text-slate-500 mb-2 uppercase">
                  Popular Presets
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {BUDGET_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1865F2] transition-colors border border-transparent hover:border-blue-100"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Min / Max Selectors */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2 uppercase">
                  Or Custom Range (₹ Lakhs / Cr)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Minimum</label>
                    <select
                      value={tempMin}
                      onChange={(e) => setTempMin(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs font-semibold text-slate-800 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                    >
                      {MIN_PRICES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Maximum</label>
                    <select
                      value={tempMax}
                      onChange={(e) => setTempMax(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs font-semibold text-slate-800 focus:border-[#1865F2] focus:bg-white focus:outline-none"
                    >
                      {MAX_PRICES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-3.5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTempMin(0);
                      setTempMax(10000);
                      updateQuery({ minPrice: null, maxPrice: null, budget: null });
                      setOpenDropdown(null);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Clear Budget
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyCustomBudget}
                    className="rounded-xl bg-[#1865F2] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. PROPERTY TYPE DROPDOWN */}
        <div ref={typeRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs",
              currentType
                ? "bg-blue-50/80 border-[#1865F2] text-[#1865F2]"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            )}
          >
            <Home className="h-3.5 w-3.5 text-[#1865F2]" />
            <span>{typeLabel}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                openDropdown === "type" && "rotate-180"
              )}
            />
          </button>

          {openDropdown === "type" && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-2xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    updateQuery({ type: t.value || null });
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                    currentType === t.value
                      ? "bg-[#1865F2] text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#1865F2]"
                  )}
                >
                  <span>{t.label}</span>
                  {currentType === t.value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. POSSESSION STATUS DROPDOWN */}
        <div ref={statusRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs",
              currentStatus
                ? "bg-blue-50/80 border-[#1865F2] text-[#1865F2]"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            )}
          >
            <Clock className="h-3.5 w-3.5 text-[#1865F2]" />
            <span>{statusLabel}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                openDropdown === "status" && "rotate-180"
              )}
            />
          </button>

          {openDropdown === "status" && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-2xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150">
              {POSSESSION_STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    updateQuery({ status: s.value || null });
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                    currentStatus === s.value
                      ? "bg-[#1865F2] text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#1865F2]"
                  )}
                >
                  <span>{s.label}</span>
                  {currentStatus === s.value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. POSTED BY DROPDOWN */}
        <div ref={postedByRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "postedBy" ? null : "postedBy")}
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs",
              currentPostedBy
                ? "bg-blue-50/80 border-[#1865F2] text-[#1865F2]"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            )}
          >
            <UserCheck className="h-3.5 w-3.5 text-[#1865F2]" />
            <span>{postedByLabel}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                openDropdown === "postedBy" && "rotate-180"
              )}
            />
          </button>

          {openDropdown === "postedBy" && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-2xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150">
              {POSTED_BY_OPTIONS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    updateQuery({ postedBy: p.value || null });
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                    currentPostedBy === p.value
                      ? "bg-[#1865F2] text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#1865F2]"
                  )}
                >
                  <span>{p.label}</span>
                  {currentPostedBy === p.value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
