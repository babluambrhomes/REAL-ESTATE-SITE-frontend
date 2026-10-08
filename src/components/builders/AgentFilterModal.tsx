"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface AgentFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: any) => void;
}

export const AgentFilterModal = ({
  isOpen,
  onClose,
  onApply,
}: AgentFilterModalProps) => {
  const [location, setLocation] = useState("Noida");
  const [expertise, setExpertise] = useState("Mohan Sharma");
  const [propertyType, setPropertyType] = useState("Residential");
  const [experience, setExperience] = useState("2 year");

  if (!isOpen) return null;

  const handleResetAll = () => {
    setLocation("Noida");
    setExpertise("Mohan Sharma");
    setPropertyType("Residential");
    setExperience("2 year");
  };

  return (
    <div className="absolute right-4 sm:right-6 lg:right-8 top-full mt-2 w-[280px] sm:w-[300px] bg-white rounded-[18px] border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.14)] p-4 sm:p-5 z-50 font-jakarta animate-in fade-in zoom-in-95 duration-150">
      
      {/* Top Handle / Close */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-slate-500">Filter by:</h4>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3.5">
        
        {/* 1. Location */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800 text-[11.5px]">Location</span>
            <button
              type="button"
              onClick={() => setLocation("Delhi NCR")}
              className="text-[10px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full appearance-none bg-slate-50/80 border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#1865F2] cursor-pointer"
            >
              <option value="Noida">🟢 Noida</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Greater Noida">Greater Noida</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Expertise */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800 text-[11.5px]">Expertise</span>
            <button
              type="button"
              onClick={() => setExpertise("All")}
              className="text-[10px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="relative">
            <select
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="w-full appearance-none bg-slate-50/80 border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#1865F2] cursor-pointer"
            >
              <option value="Mohan Sharma">Mohan Sharma</option>
              <option value="Amit Sharma">Amit Sharma</option>
              <option value="Jitendra Singh">Jitendra Singh</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Property Type */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800 text-[11.5px]">Property Type</span>
            <button
              type="button"
              onClick={() => setPropertyType("All")}
              className="text-[10px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full appearance-none bg-slate-50/80 border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#1865F2] cursor-pointer"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot & Land">Plot & Land</option>
              <option value="Rental">Rental</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Experience */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800 text-[11.5px]">Experience</span>
            <button
              type="button"
              onClick={() => setExperience("1 year")}
              className="text-[10px] font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="relative">
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full appearance-none bg-slate-50/80 border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#1865F2] cursor-pointer"
            >
              <option value="2 year">2 year</option>
              <option value="5 year">5 year</option>
              <option value="8 year">8 year</option>
              <option value="10+ year">10+ year</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleResetAll}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={() => {
              onApply?.({ location, expertise, propertyType, experience });
              onClose();
            }}
            className="w-full py-2 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Apply Filters(3)
          </button>
        </div>

      </div>

    </div>
  );
};
