"use client";

import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";

interface PropertySummary {
  title: string;
  location: string;
  image: string;
}

interface CompareHighlightsTableProps {
  prop1?: PropertySummary;
  prop2?: PropertySummary;
}

export const CompareHighlightsTable = ({
  prop1 = {
    title: "The Terraces at Max Estate 361",
    location: "Sector 124, Noida",
    image: "/images/properties/villa-popular-figma.jpg",
  },
  prop2 = {
    title: "ATS Knightsbridge",
    location: "Sector 124, Noida",
    image: "/images/properties/tower-popular-figma.jpg",
  },
}: CompareHighlightsTableProps) => {
  const rows = [
    { label: "Property Type", val1: "Apartment", val2: "Apartment" },
    { label: "Configuration", val1: "3 BHK", val2: "4 BHK" },
    { label: "Super Area", val1: "1,621 sq.ft", val2: "2,450 sq.ft" },
    { label: "Status", val1: "Ready to move", val2: "Ready to move" },
    { label: "Floor", val1: "3rd Floor", val2: "2nd Floor" },
    { label: "Builder", val1: "ATS", val2: "M3M" },
  ];

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-14 font-jakarta">
      <div className="bg-white rounded-[26px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Table Header Bar */}
        <div className="bg-[#EFF4FA] px-5 sm:px-8 py-3.5 sm:py-4 grid grid-cols-12 items-center gap-3 sm:gap-4 border-b border-slate-200/80">
          
          {/* Col 1: Highlights Badge */}
          <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#059669] shadow-2xs shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#059669]" />
            </div>
            <span className="font-extrabold text-[#0B132B] text-xs sm:text-[14.5px] tracking-tight">
              Highlights
            </span>
          </div>

          {/* Col 2: Prop 1 Header with Left Divider */}
          <div className="col-span-4 sm:col-span-4 flex items-center gap-3 pl-3 sm:pl-4 border-l border-slate-300/70">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs bg-slate-100">
              <Image
                src={prop1.image}
                alt={prop1.title}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11.5px] sm:text-[13.5px] font-bold text-[#0B132B] truncate leading-snug">
                {prop1.title}
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500 fill-slate-500 shrink-0" />
                <span className="truncate">{prop1.location}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Prop 2 Header with Left Divider */}
          <div className="col-span-4 sm:col-span-5 flex items-center gap-3 pl-3 sm:pl-4 border-l border-slate-300/70">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs bg-slate-100">
              <Image
                src={prop2.image}
                alt={prop2.title}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11.5px] sm:text-[13.5px] font-bold text-[#0B132B] truncate leading-snug">
                {prop2.title}
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500 fill-slate-500 shrink-0" />
                <span className="truncate">{prop2.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors"
            >
              {/* Feature Name with subtle dash-dot-dash bullet */}
              <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
                <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                  <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                </div>
                <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">
                  {row.label}
                </span>
              </div>

              {/* Property 1 Value */}
              <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-semibold text-[#1E293B]">
                {row.val1}
              </div>

              {/* Property 2 Value */}
              <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-semibold text-[#1E293B]">
                {row.val2}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
