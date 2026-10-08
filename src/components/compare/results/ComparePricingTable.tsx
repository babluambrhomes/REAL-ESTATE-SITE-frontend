"use client";

import Image from "next/image";
import { Tag, MapPin } from "lucide-react";

interface PropertySummary {
  title: string;
  location: string;
  image: string;
}

interface ComparePricingTableProps {
  prop1?: PropertySummary;
  prop2?: PropertySummary;
}

export const ComparePricingTable = ({
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
}: ComparePricingTableProps) => {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-14 font-jakarta">
      <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Table Header Bar */}
        <div className="bg-[#EFF4FA] px-4 sm:px-8 py-3.5 sm:py-4 grid grid-cols-12 items-center gap-2 sm:gap-4 border-b border-slate-200/80">
          {/* Col 1: Pricings Com Badge */}
          <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-2xs">
              <Tag className="w-3.5 h-3.5 text-slate-700" />
            </div>
            <span className="font-extrabold text-[#0B132B] text-xs sm:text-sm truncate">
              Pricings Com
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

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          
          {/* Row 1: Avg Price/ Sq.ft */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Avg Price/ Sq.ft</span>
            </div>
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-bold text-[#1E293B]">
              ₹1000
            </div>
            <div className="col-span-4 sm:col-span-5 text-[12px] sm:text-[13.5px] font-bold text-[#1E293B]">
              ₹12000
            </div>
          </div>

          {/* Row 2: Price */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Price</span>
            </div>
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-bold text-[#1E293B]">
              ₹1.25 <span className="text-[10px] text-slate-400">*</span>Cr
            </div>
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-bold text-[#1E293B]">
              ₹1.27 <span className="text-[10px] text-slate-400">*</span>Cr
            </div>
          </div>

          {/* Row 3: Price Discount */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Price Discount</span>
            </div>
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-bold text-[#1E293B]">
              ₹10<span className="text-[10px] text-slate-400">*</span>Lakh
            </div>
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 text-[12.5px] sm:text-[14px] font-bold text-[#1E293B]">
              ₹20<span className="text-[10px] text-slate-400">*</span>Lakh
            </div>
          </div>

          {/* Row 4: Market outlook */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Market outlook</span>
            </div>
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#E6F8F0] text-[#059669] font-bold text-[11px]">
                Positive
              </span>
            </div>
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FEECEC] text-[#DC2626] font-bold text-[11px]">
                Negative
              </span>
            </div>
          </div>

          {/* Row 5: Price growth */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Price growth</span>
            </div>
            {/* Prop 1 Progress */}
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">8/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
            {/* Prop 2 Progress */}
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">4/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[40%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
          </div>

          {/* Row 6: Rental demand */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Rental demand</span>
            </div>
            {/* Prop 1 Progress */}
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">9/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[90%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
            {/* Prop 2 Progress */}
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">5/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[50%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
          </div>

          {/* Row 7: Future potentials */}
          <div className="px-5 sm:px-8 py-4 sm:py-4.5 grid grid-cols-12 items-center gap-3 sm:gap-4 hover:bg-slate-50/40 transition-colors">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
              <div className="flex items-center gap-1 opacity-70 select-none shrink-0">
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-[1.5px] bg-slate-300 rounded-full" />
              </div>
              <span className="text-[12.5px] sm:text-[14px] font-bold text-[#0B132B]">Future potentials</span>
            </div>
            {/* Prop 1 Progress */}
            <div className="col-span-4 sm:col-span-4 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">8/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
            {/* Prop 2 Progress */}
            <div className="col-span-4 sm:col-span-5 pl-3 sm:pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 block text-right pr-2">6/10</span>
              <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
