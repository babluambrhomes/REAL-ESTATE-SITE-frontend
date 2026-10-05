"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search, Plus, Check, MapPin } from "lucide-react";
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
  properties,
  onSelectProperty,
  selectedIds,
}: ComparePropertyPickerModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in font-jakarta">
      <div className="relative w-full max-w-[800px] max-h-[85vh] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              Select Property to Compare
            </h3>
            <p className="text-xs text-slate-500">
              Choose from verified listings across Delhi NCR
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project name, location or builder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] focus:ring-1 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No matching properties found.
            </div>
          ) : (
            filteredProperties.map((prop, idx) => {
              const isAlreadySelected = selectedIds.includes(prop.title);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={prop.images?.[0] || "/images/properties/villa-popular-figma.jpg"}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13.5px] font-bold text-[#0B132B] truncate">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#1865F2] shrink-0" />
                        <span>{prop.location}</span>
                      </p>
                      <div className="text-[13px] font-extrabold text-[#1865F2] mt-0.5">
                        {prop.price}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isAlreadySelected}
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      isAlreadySelected
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-[#1865F2] hover:bg-blue-600 text-white shadow-xs"
                    }`}
                  >
                    {isAlreadySelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
