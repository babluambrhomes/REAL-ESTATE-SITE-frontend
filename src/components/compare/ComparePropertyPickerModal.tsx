"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search, ChevronDown, ChevronRight, MapPin, Plus, Check, SlidersHorizontal, Home, Sparkles } from "lucide-react";
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
  const [selectedUnit1, setSelectedUnit1] = useState<number>(0);
  const [selectedUnit2, setSelectedUnit2] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");

  if (!isOpen) return null;

  const unitOptions = [
    { bhk: "2 BHK", area: "1,621 sq.ft", price: "₹1.25* Cr" },
    { bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25* Cr" },
    { bhk: "3 BHK", area: "1,621 sq.ft", price: "₹1.25* Cr" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in font-jakarta">
      <div className="relative w-full max-w-[580px] max-h-[92vh] bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="p-5 pb-3 flex items-center justify-between shrink-0">
          <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0B132B]">
            Your Selections
          </h3>

          <div className="flex items-center gap-2.5">
            {/* City Dropdown Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50/70 text-[12px] font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedCity}</span>
              <MapPin className="w-3.5 h-3.5 text-slate-800 fill-slate-800 ml-0.5" />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
          
          {/* Search Bar with Sparkle Search Icon */}
          <div className="relative flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white shadow-2xs focus-within:border-[#1865F2]">
            <input
              type="text"
              placeholder="Select House"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Pills Row (Filter, Price Range, BHK) */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[12px] font-semibold text-slate-700 shadow-2xs cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>Filter</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[12px] font-semibold text-slate-700 shadow-2xs cursor-pointer transition-colors"
            >
              <span>₹ Price Range</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[12px] font-semibold text-slate-700 shadow-2xs cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-slate-800 fill-slate-800" />
              <span>BHK</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Project Block 1: ATS Knightsbridge */}
          <div className="rounded-2xl border border-slate-200/90 p-3.5 space-y-3 bg-white shadow-2xs">
            {/* Project Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                    alt="ATS Knightsbridge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[14px] font-bold text-[#0B132B] truncate">
                    ATS Knightsbridge
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-600 fill-slate-600 shrink-0" />
                    <span className="truncate">Sector 124, Noida</span>
                  </p>
                  <span className="inline-block mt-0.5 px-2 py-0.2 rounded-md bg-[#D1FAE5] text-[#059669] font-semibold text-[9.5px]">
                    Ready To Move
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="text-[11.5px] font-bold text-[#1865F2] hover:underline whitespace-nowrap cursor-pointer"
              >
                Change Project
              </button>
            </div>

            {/* Unit Selection Options */}
            <div className="space-y-2 pt-1">
              {unitOptions.map((unit, uIdx) => {
                const isSelected = selectedUnit1 === uIdx;
                return (
                  <div
                    key={uIdx}
                    onClick={() => setSelectedUnit1(uIdx)}
                    className={`rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-2 border-[#1865F2] bg-[#F4F8FF] shadow-xs"
                        : "border border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#1865F2] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[13px] font-bold text-[#0B132B]">
                        {unit.bhk}
                      </span>
                    </div>

                    <div className="text-[12px] text-slate-500 font-medium">
                      {unit.area}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-extrabold text-[#0B132B]">
                        {unit.price}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Block 2: ATS Knightsbridge */}
          <div className="rounded-2xl border border-slate-200/90 p-3.5 space-y-3 bg-white shadow-2xs">
            {/* Project Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80"
                    alt="ATS Knightsbridge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[14px] font-bold text-[#0B132B] truncate">
                    ATS Knightsbridge
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-600 fill-slate-600 shrink-0" />
                    <span className="truncate">Sector 124, Noida</span>
                  </p>
                  <span className="inline-block mt-0.5 px-2 py-0.2 rounded-md bg-[#D1FAE5] text-[#059669] font-semibold text-[9.5px]">
                    Ready To Move
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="text-[11.5px] font-bold text-[#1865F2] hover:underline whitespace-nowrap cursor-pointer"
              >
                Change Project
              </button>
            </div>

            {/* Unit Selection Options */}
            <div className="space-y-2 pt-1">
              {unitOptions.map((unit, uIdx) => {
                const isSelected = selectedUnit2 === uIdx;
                return (
                  <div
                    key={uIdx}
                    onClick={() => setSelectedUnit2(uIdx)}
                    className={`rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-2 border-[#1865F2] bg-[#F4F8FF] shadow-xs"
                        : "border border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#1865F2] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[13px] font-bold text-[#0B132B]">
                        {unit.bhk}
                      </span>
                    </div>

                    <div className="text-[12px] text-slate-500 font-medium">
                      {unit.area}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-extrabold text-[#0B132B]">
                        {unit.price}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom "Your Selections" Row */}
          <div className="space-y-2 pt-1">
            <h4 className="text-[13.5px] font-bold text-[#0B132B]">
              Your Selections
            </h4>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Slot 1 */}
              <div className="rounded-xl border border-slate-200 p-2 flex items-center gap-2 bg-white shadow-2xs">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                    alt="ATS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h6 className="text-[11px] font-bold text-[#0B132B] truncate">
                    ATS Knights...
                  </h6>
                  <p className="text-[9.5px] text-slate-400 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span>Noida</span>
                  </p>
                </div>
              </div>

              {/* Slot 2 */}
              <div className="rounded-xl border border-slate-200 p-2 flex items-center gap-2 bg-white shadow-2xs">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=200&q=80"
                    alt="ATS"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h6 className="text-[11px] font-bold text-[#0B132B] truncate">
                    ATS Knights...
                  </h6>
                  <p className="text-[9.5px] text-slate-400 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span>Noida</span>
                  </p>
                </div>
              </div>

              {/* Slot 3 (Add 3rd Property) */}
              <div className="rounded-xl border border-dashed border-[#BFDBFE] bg-[#F0F6FE] p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-100/60 transition-colors">
                <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-600 mb-0.5 shadow-2xs">
                  <Plus className="w-3 h-3" />
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 leading-tight">
                  Add 3rd Property<br />To Compare
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white shrink-0">
          <button
            type="button"
            onClick={() => {
              setSelectedUnit1(0);
              setSelectedUnit2(0);
              setSearchQuery("");
            }}
            className="px-8 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13.5px] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => {
              if (properties.length > 0) {
                onSelectProperty(properties[0]);
              }
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#1865F2] hover:text-white text-[#1865F2] font-bold text-[14px] text-center transition-all cursor-pointer shadow-2xs"
          >
            Compare 2 Property
          </button>
        </div>

      </div>
    </div>
  );
};


