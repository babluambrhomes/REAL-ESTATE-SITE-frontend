"use client";

import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

interface SectorPair {
  id: string;
  prop1: {
    title: string;
    location: string;
    status: string;
    image: string;
  };
  prop2: {
    title: string;
    location: string;
    status: string;
    image: string;
  };
}

interface CompareSectorPairsProps {
  onComparePair?: (pair: SectorPair) => void;
}

export const CompareSectorPairs = ({ onComparePair }: CompareSectorPairsProps) => {
  const pairs: SectorPair[] = [
    {
      id: "pair-1",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/villa-popular-figma.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/tower-popular-figma.jpg",
      },
    },
    {
      id: "pair-2",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/luxury-living-room.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/modern-white-penthouse.jpg",
      },
    },
    {
      id: "pair-3",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/ambr-aspire-figma.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/night-tower-figma.jpg",
      },
    },
    {
      id: "pair-4",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/max-estate-tower-figma.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/villa-popular-figma.jpg",
      },
    },
    {
      id: "pair-5",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/luxury-living-room.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/tower-popular-figma.jpg",
      },
    },
    {
      id: "pair-6",
      prop1: {
        title: "The Terraces at Max ...",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/ambr-aspire-figma.jpg",
      },
      prop2: {
        title: "ATS Knightsbridge",
        location: "Sector 124, Noida",
        status: "Ready To Move",
        image: "/images/properties/modern-white-penthouse.jpg",
      },
    },
  ];

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 font-jakarta">
      
      {/* Section Title with Cyan Vertical Pipe */}
      <div className="flex items-center gap-2.5 mb-8">
        <span className="w-1 h-6 bg-[#00D1FF] rounded-full inline-block" />
        <h3 className="text-base sm:text-lg font-extrabold text-[#1865F2] uppercase tracking-wide">
          COMPARE SECTOR 124 & 120
        </h3>
      </div>

      {/* 2-Column x 3-Row Comparison Pair Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
        {pairs.map((pair) => (
          <div
            key={pair.id}
            className="bg-white rounded-[32px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all"
          >
            {/* Dual Properties Area with Soft Sky Blue Backdrop */}
            <div className="relative rounded-[24px] pt-4 pb-4 px-2 sm:px-3 mb-4">
              
              {/* Soft Sky Blue Backdrop in Lower Area */}
              <div className="absolute left-0 right-0 bottom-0 top-[28%] bg-[#EBF3FE] rounded-[24px] pointer-events-none" />

              {/* 2 Property Columns Side by Side */}
              <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6">
                
                {/* Prop 1 Card */}
                <div className="bg-white rounded-[24px] p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-2.5">
                  <div className="relative w-full h-[120px] sm:h-[145px] rounded-[20px] overflow-hidden bg-slate-100">
                    <Image
                      src={pair.prop1.image}
                      alt={pair.prop1.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>
                  <div className="space-y-1.5 pt-0.5">
                    <h5 className="text-[13px] sm:text-[14.5px] font-extrabold text-[#0B132B] truncate leading-snug">
                      {pair.prop1.title}
                    </h5>
                    <p className="text-[11px] sm:text-[12px] text-slate-500 font-medium flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-700 fill-slate-700 shrink-0" />
                      <span className="truncate">{pair.prop1.location}</span>
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#D1FAE5] text-[#059669] font-extrabold text-[10px] sm:text-[10.5px]">
                        {pair.prop1.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prop 2 Card */}
                <div className="bg-white rounded-[24px] p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-2.5">
                  <div className="relative w-full h-[120px] sm:h-[145px] rounded-[20px] overflow-hidden bg-slate-100">
                    <Image
                      src={pair.prop2.image}
                      alt={pair.prop2.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>
                  <div className="space-y-1.5 pt-0.5">
                    <h5 className="text-[13px] sm:text-[14.5px] font-extrabold text-[#0B132B] truncate leading-snug">
                      {pair.prop2.title}
                    </h5>
                    <p className="text-[11px] sm:text-[12px] text-slate-500 font-medium flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-700 fill-slate-700 shrink-0" />
                      <span className="truncate">{pair.prop2.location}</span>
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#D1FAE5] text-[#059669] font-extrabold text-[10px] sm:text-[10.5px]">
                        {pair.prop2.status}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Compare ↗ Full-Width Button */}
            <button
              type="button"
              onClick={() => onComparePair?.(pair)}
              className="w-full py-3 sm:py-3.5 bg-[#EBF3FE] hover:bg-[#DCEBFE] text-[#1865F2] font-bold text-sm sm:text-[15px] rounded-[18px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-[1.01]"
            >
              <span>Compare</span>
              <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};
