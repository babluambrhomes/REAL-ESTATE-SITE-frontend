"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check, Minus, Plus, MapPin, Phone, Download, Share2, Sparkles, Building, ShieldCheck } from "lucide-react";
import { Property } from "@/types";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperties: Property[];
  onAddProperty: () => void;
  onRemoveProperty: (index: number) => void;
}

export const CompareModal = ({
  isOpen,
  onClose,
  selectedProperties,
  onAddProperty,
  onRemoveProperty,
}: CompareModalProps) => {
  if (!isOpen) return null;

  const comparisonAttributes = [
    { label: "Price", key: "price", render: (p: Property) => p.price },
    { label: "Original / List Price", key: "originalPrice", render: (p: Property) => p.originalPrice || "N/A" },
    { label: "Location", key: "location", render: (p: Property) => p.location },
    { label: "City", key: "city", render: (p: Property) => p.city || "Delhi NCR" },
    { label: "Configuration", key: "beds", render: (p: Property) => `${p.beds || "3"} BHK` },
    { label: "Property Type", key: "type", render: (p: Property) => p.type || "Apartment" },
    { label: "Carpet Area", key: "area", render: (p: Property) => p.infoChips?.[0]?.value || "3,200 Sq.Ft" },
    { label: "Possession Status", key: "status", render: (p: Property) => p.infoChips?.[2]?.value || "Ready to Move" },
    { label: "Amenities Score", key: "amenities", render: (p: Property) => p.infoChips?.[1]?.value || "60%" },
    { label: "Verified Deal", key: "verified", render: (p: Property) => (
      <span className="inline-flex items-center gap-1 text-[#00D084] font-bold text-xs">
        <ShieldCheck className="w-3.5 h-3.5" /> Verified
      </span>
    )},
    { label: "RERA Approved", key: "rera", render: () => (
      <span className="text-[#00D084] font-semibold text-xs flex items-center gap-1">
        <Check className="w-3.5 h-3.5" /> Yes (Registered)
      </span>
    )},
    { label: "Swimming Pool", key: "pool", render: () => <Check className="w-4 h-4 text-emerald-600" /> },
    { label: "Clubhouse & Gym", key: "clubhouse", render: () => <Check className="w-4 h-4 text-emerald-600" /> },
    { label: "24/7 Power Backup", key: "power", render: () => <Check className="w-4 h-4 text-emerald-600" /> },
    { label: "Gated Security", key: "security", render: () => <Check className="w-4 h-4 text-emerald-600" /> },
    { label: "Dedicated Parking", key: "parking", render: () => <Check className="w-4 h-4 text-emerald-600" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-fade-in font-jakarta">
      <div className="relative w-full max-w-[1240px] max-h-[92vh] bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1865F2] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Side-by-Side Comparison
              </span>
              <span className="text-xs text-slate-400">• {selectedProperties.length} Properties</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] mt-0.5">
              Compare Properties
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Comparison Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-[700px]">
            
            {/* Top Cards Row */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-200">
              <div className="flex flex-col justify-end p-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Features &amp; Specifications
                </span>
                <p className="text-sm font-bold text-[#0B132B]">
                  Detailed Comparison Matrix
                </p>
              </div>

              {selectedProperties.map((prop, idx) => (
                <div key={idx} className="relative rounded-[20px] bg-[#F8FAFC] border border-slate-200 p-3 flex flex-col justify-between shadow-2xs">
                  <button
                    type="button"
                    onClick={() => onRemoveProperty(idx)}
                    className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative w-full h-[120px] rounded-xl overflow-hidden mb-2.5 bg-slate-200">
                    <Image
                      src={prop.images?.[0] || "/images/properties/villa-popular-figma.jpg"}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[13.5px] font-bold text-[#0B132B] truncate">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#1865F2] shrink-0" />
                      <span>{prop.location}</span>
                    </p>
                    <div className="text-[15px] font-extrabold text-[#1865F2] pt-0.5">
                      {prop.price}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Property Slot */}
              {selectedProperties.length < 3 && (
                <div
                  onClick={onAddProperty}
                  className="rounded-[20px] border-2 border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50 p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1865F2]">
                    Add Another Property
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Compare up to 3 side-by-side
                  </span>
                </div>
              )}
            </div>

            {/* Spec Attribute Rows */}
            <div className="divide-y divide-slate-100 pt-2">
              {comparisonAttributes.map((attr, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-4 py-3 items-center hover:bg-slate-50/60 transition-colors px-2 rounded-lg">
                  <div className="text-[12.5px] font-semibold text-slate-600">
                    {attr.label}
                  </div>
                  {selectedProperties.map((prop, pIdx) => (
                    <div key={pIdx} className="text-[13px] font-medium text-slate-800">
                      {attr.render(prop)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Need personalized advisory? Call our verified expert at <span className="font-semibold text-slate-800">+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                alert("Comparison link copied to clipboard!");
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Comparison</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
