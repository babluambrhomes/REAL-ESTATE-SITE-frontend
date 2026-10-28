"use client";

import Image from "next/image";
import { ArrowLeftRight, X, Sparkles, Plus, Trash2 } from "lucide-react";
import { useCompare } from "@/lib/compare";

interface FloatingCompareBarProps {
  onOpenCompareModal: () => void;
}

export const FloatingCompareBar = ({
  onOpenCompareModal,
}: FloatingCompareBarProps) => {
  const { comparedList, count, maxLimit, remove, clearAll } = useCompare();

  if (count === 0) return null;

  const canCompare = count >= 2;

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 mx-auto w-[94%] max-w-2xl animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-3xl sm:rounded-full border border-blue-200/90 bg-white/95 backdrop-blur-md p-2.5 sm:px-4 sm:py-2.5 shadow-[0_12px_40px_rgba(24,101,242,0.22)]">
        {/* Left Side: Selected Property Thumbnails & Slots */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto py-0.5">
          <div className="flex items-center gap-1.5 shrink-0 pr-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1865F2] text-white">
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </span>
            <div className="leading-tight hidden md:block">
              <p className="text-[11px] font-bold text-slate-800">Compare</p>
              <p className="text-[9.5px] font-semibold text-[#1865F2]">
                {count}/{maxLimit} Selected
              </p>
            </div>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2">
            {comparedList.map((prop, idx) => (
              <div
                key={String(prop.id || prop.title || idx)}
                className="group relative flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 pl-1 pr-2 py-1 shadow-2xs transition-all hover:border-blue-300"
              >
                <div className="relative h-7 w-7 overflow-hidden rounded-full shrink-0 border border-white bg-slate-200">
                  <Image
                    src={prop.images?.[0] || "/images/properties/villa-popular-figma.jpg"}
                    alt={prop.title || "Property"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="max-w-[80px] sm:max-w-[100px] truncate leading-none">
                  <p className="text-[10px] font-bold text-slate-800 truncate">
                    {prop.title}
                  </p>
                  <p className="text-[9px] font-medium text-[#1865F2] truncate mt-0.5">
                    {prop.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(prop.id || prop.title)}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 hover:bg-red-500 hover:text-white text-slate-500 transition-colors cursor-pointer shrink-0"
                  title="Remove from comparison"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            ))}

            {/* Empty Slot Placeholder if < maxLimit */}
            {count < maxLimit && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-white/60 px-3 py-1.5 text-[10px] font-medium text-slate-400">
                <Plus className="h-3 w-3" />
                <span>Add 1 more</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={onOpenCompareModal}
            disabled={!canCompare}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-md ${
              canCompare
                ? "bg-gradient-to-r from-[#1E6BFF] to-[#1865F2] hover:from-[#1865F2] hover:to-[#1250C4] shadow-blue-500/25 hover:scale-103"
                : "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
            }`}
            title={canCompare ? "Open comparison matrix" : "Select at least 2 properties to compare"}
          >
            <Sparkles className="h-3 w-3" />
            <span>{canCompare ? `Compare (${count})` : "Select 2 to Compare"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
