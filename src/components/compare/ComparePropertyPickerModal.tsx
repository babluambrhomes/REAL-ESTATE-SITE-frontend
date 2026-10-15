"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search, MapPin, Check, Plus } from "lucide-react";
import { Property } from "@/types";

interface ComparePropertyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  selectedIds: string[];
}

export const ComparePropertyPickerModal = ({
  isOpen,
  onClose,
  properties = [],
  onSelectProperty,
  selectedIds = [],
}: ComparePropertyPickerModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredProperties = properties.filter((prop) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      prop.title.toLowerCase().includes(q) ||
      prop.location.toLowerCase().includes(q) ||
      prop.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in font-jakarta">
      <div className="relative w-full max-w-[620px] max-h-[90vh] bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        {/* Modal Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div>
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0B132B]">
              Select Property to Compare
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose another home to see side-by-side specs, price and features
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white shadow-2xs focus-within:border-[#1865F2]">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by property title, sector, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Properties List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No matching properties found. Try a different search term.
            </div>
          ) : (
            filteredProperties.map((prop, idx) => {
              const isAlreadySelected = selectedIds.includes(prop.title);
              const displayImage =
                prop.images?.[0] || "/images/properties/villa-popular-figma.jpg";

              return (
                <div
                  key={prop.id || idx}
                  className={`rounded-2xl border p-3.5 flex items-center justify-between gap-3.5 transition-all ${
                    isAlreadySelected
                      ? "border-emerald-200 bg-emerald-50/40"
                      : "border-slate-200 hover:border-[#1865F2] hover:shadow-xs bg-white cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isAlreadySelected) {
                      onSelectProperty(prop);
                      onClose();
                    }
                  }}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={displayImage}
                        alt={prop.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold text-[#0B132B] truncate">
                        {prop.title}
                      </h4>
                      <p className="text-[11.5px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#1865F2] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-semibold text-[#1865F2] bg-blue-50 px-2 py-0.5 rounded-md">
                          {prop.beds || "3"} BHK
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {prop.infoChips?.[0]?.value || prop.area || "1,200 sqft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Select Button */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[15px] font-extrabold text-[#0B132B]">
                      {prop.price}
                    </span>

                    {isAlreadySelected ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>In Compare</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            {properties.length} total properties available to compare
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
