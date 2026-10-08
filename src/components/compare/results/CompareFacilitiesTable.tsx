"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

interface PropertySummary {
  title: string;
  location: string;
  image: string;
}

interface CompareFacilitiesTableProps {
  prop1?: PropertySummary;
  prop2?: PropertySummary;
}

export const CompareFacilitiesTable = ({
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
}: CompareFacilitiesTableProps) => {
  const facilityRows = [
    { name: "AC", hasProp1: true, hasProp2: false },
    { name: "Bed", hasProp1: false, hasProp2: true },
    { name: "Lift", hasProp1: false, hasProp2: true },
    { name: "TV", hasProp1: false, hasProp2: false },
    { name: "Sofa", hasProp1: true, hasProp2: true },
    { name: "Refrigerator", hasProp1: true, hasProp2: false },
    { name: "Power Backup", hasProp1: true, hasProp2: false },
    { name: "Bathroom", hasProp1: true, hasProp2: true },
    { name: "Cabinet", hasProp1: false, hasProp2: false },
    { name: "Stove", hasProp1: true, hasProp2: true },
    { name: "Washing Machine", hasProp1: false, hasProp2: false },
    { name: "Dining Table", hasProp1: true, hasProp2: false },
    { name: "Microvave", hasProp1: true, hasProp2: false },
    { name: "GYM", hasProp1: true, hasProp2: false },
    { name: "Swimming Pool", hasProp1: false, hasProp2: false },
    { name: "Gas Pipeline", hasProp1: false, hasProp2: true },
    { name: "Parking", hasProp1: false, hasProp2: true },
    { name: "Children Park", hasProp1: true, hasProp2: true },
    { name: "Club House", hasProp1: true, hasProp2: false },
    { name: "7x24 Security", hasProp1: true, hasProp2: false },
    { name: "CCTV Surveillia...", hasProp1: true, hasProp2: true },
    { name: "Pipeline", hasProp1: true, hasProp2: true },
  ];

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 font-jakarta">
      <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Table Header Bar with Uniform #EFF4FA background & vertical divider lines */}
        <div className="bg-[#EFF4FA] px-4 sm:px-8 py-3.5 sm:py-4.5 grid grid-cols-12 items-center gap-0 border-b border-slate-200/80">
          
          {/* Col 1: Facilities Badge */}
          <div className="col-span-4 sm:col-span-3.5 flex items-center gap-2.5 pr-3 sm:pr-4">
            <div className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 shadow-2xs shrink-0">
              <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <span className="font-extrabold text-[#0B132B] text-xs sm:text-sm tracking-tight">
              Facilities
            </span>
          </div>

          {/* Col 2: Prop 1 Header with left vertical border */}
          <div className="col-span-4 sm:col-span-4.5 flex items-center gap-2.5 border-l border-slate-300/80 px-3 sm:px-6">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-2xs bg-slate-100">
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
              <p className="text-[9.5px] sm:text-[11px] text-slate-500 flex items-center gap-0.5 truncate font-medium">
                <MapPin className="w-2.5 h-2.5 text-slate-500 fill-slate-500 shrink-0" />
                <span className="truncate">{prop1.location}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Prop 2 Header with left vertical border */}
          <div className="col-span-4 sm:col-span-4 flex items-center gap-2.5 border-l border-slate-300/80 pl-3 sm:pl-6">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-2xs bg-slate-100">
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
              <p className="text-[9.5px] sm:text-[11px] text-slate-500 flex items-center gap-0.5 truncate font-medium">
                <MapPin className="w-2.5 h-2.5 text-slate-500 fill-slate-500 shrink-0" />
                <span className="truncate">{prop2.location}</span>
              </p>
            </div>
          </div>

        </div>

        {/* 22 Facilities Rows with Continuous Column 2 Highlight */}
        <div className="divide-y divide-slate-100">
          {facilityRows.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === facilityRows.length - 1;

            return (
              <div
                key={idx}
                className="px-4 sm:px-8 grid grid-cols-12 items-center gap-0 hover:bg-slate-50/30 transition-colors"
              >
                {/* Facility Name with 3-piece dash-dot-dash bullet */}
                <div className="col-span-4 sm:col-span-3.5 py-3 sm:py-3.5 flex items-center gap-2.5 pr-2">
                  <div className="flex items-center gap-1 shrink-0 opacity-60">
                    <span className="w-3 h-[1.5px] bg-[#94A3B8] rounded-full inline-block" />
                    <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full inline-block" />
                    <span className="w-3 h-[1.5px] bg-[#94A3B8] rounded-full inline-block" />
                  </div>
                  <span className="text-[12px] sm:text-[13.5px] font-bold text-[#0B132B] truncate">
                    {item.name}
                  </span>
                </div>

                {/* Prop 1 Value inside continuous Sky Blue Pill Column */}
                <div
                  className={`col-span-4 sm:col-span-4.5 py-3 sm:py-3.5 px-3 sm:px-6 bg-[#EBF3FE] flex items-center gap-2.5 ${
                    isFirst ? "rounded-t-[18px]" : ""
                  } ${isLast ? "rounded-b-[18px]" : ""}`}
                >
                  {item.hasProp1 ? (
                    <>
                      <div className="w-6 h-6 rounded-full border-2 border-[#10B981] flex items-center justify-center text-[#10B981] shrink-0 bg-white/40 shadow-2xs">
                        <svg className="w-3.5 h-3.5 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#334155]">Yes</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center text-[#DC2626] shrink-0 bg-white/40 shadow-2xs">
                        <svg className="w-3.5 h-3.5 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#475569]">No</span>
                    </>
                  )}
                </div>

                {/* Prop 2 Value */}
                <div className="col-span-4 sm:col-span-4 py-3 sm:py-3.5 pl-3 sm:pl-6 flex items-center gap-2.5">
                  {item.hasProp2 ? (
                    <>
                      <div className="w-6 h-6 rounded-full border-2 border-[#10B981] flex items-center justify-center text-[#10B981] shrink-0 bg-white shadow-2xs">
                        <svg className="w-3.5 h-3.5 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#334155]">Yes</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center text-[#DC2626] shrink-0 bg-white shadow-2xs">
                        <svg className="w-3.5 h-3.5 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#475569]">No</span>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
