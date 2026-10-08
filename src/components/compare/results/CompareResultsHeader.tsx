"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, MoreVertical, X, Check, MapPin } from "lucide-react";
import { Property } from "@/types";

interface PropertyItem {
  id?: string;
  title: string;
  location: string;
  status: string;
  image: string;
}

interface CompareResultsHeaderProps {
  properties?: PropertyItem[];
  onAddProperty?: () => void;
  onChangeProperty?: (index: number) => void;
  onRemoveProperty?: (index: number) => void;
}

export const CompareResultsHeader = ({
  properties,
  onAddProperty,
  onChangeProperty,
  onRemoveProperty,
}: CompareResultsHeaderProps) => {
  const [activeEditMenu, setActiveEditMenu] = useState<number | null>(null);

  const selectedProperties: PropertyItem[] = properties || [
    {
      id: "prop-1",
      title: "The Terraces at Max Estate 361",
      location: "Sector 124, Noida",
      status: "Ready To Move",
      image: "/images/properties/villa-popular-figma.jpg",
    },
    {
      id: "prop-2",
      title: "ATS Knightsbridge",
      location: "Sector 124, Noida",
      status: "Ready To Move",
      image: "/images/properties/tower-popular-figma.jpg",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-38 pb-10 font-jakarta">
      {/* Main Heading with Wavy Blue Brush Stroke under Property */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#0B132B] tracking-tight leading-[1.18] inline-block text-center relative">
          Compare{" "}
          <span className="relative inline-block">
            Property
            {/* Exact Blue Chalk/Crayon Brush Stroke from Figma */}
            <div className="absolute -bottom-2.5 sm:-bottom-3 -right-8 sm:-right-12 w-[130px] sm:w-[155px] h-[14px] sm:h-[18px] pointer-events-none select-none">
              <Image
                src="/compare/property_wavy_brush.png"
                alt="Wavy stroke"
                width={160}
                height={20}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </span>
          <br />
          Side By Side
        </h1>
      </div>

      {/* 3 Top Slots Grid (Property 1 = Property 2 = Add Another Property) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 max-w-[1100px] mx-auto">
        
        {/* Slot 1: Property 1 */}
        <div className="w-full md:w-[320px] bg-white rounded-[26px] p-3 sm:p-3.5 border border-slate-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.04)] relative">
          <div className="relative w-full h-[180px] sm:h-[195px] rounded-[20px] overflow-hidden bg-slate-100 mb-3 shadow-2xs">
            <Image
              src={selectedProperties[0].image}
              alt={selectedProperties[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 320px, 340px"
            />
            {/* Edit / 360 icon badge in top right */}
            <button
              type="button"
              onClick={() => setActiveEditMenu(activeEditMenu === 0 ? null : 0)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:bg-white shadow-xs transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-700" />
            </button>

            {/* Edit Tooltip Popover for Slot 0 */}
            {activeEditMenu === 0 && (
              <div className="absolute top-10 right-2.5 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-slate-200 text-xs space-y-1.5 min-w-[170px] animate-scale-up">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px]">Edit</span>
                  <X
                    className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    onClick={() => setActiveEditMenu(null)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChangeProperty?.(0);
                    setActiveEditMenu(null);
                  }}
                  className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium text-[11px] truncate block"
                >
                  Change {selectedProperties[0]?.title.slice(0, 15)}...
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRemoveProperty?.(0);
                    setActiveEditMenu(null);
                  }}
                  className="w-full text-left py-1 px-1.5 rounded hover:bg-red-50 text-slate-700 hover:text-red-600 font-medium text-[11px] truncate block"
                >
                  Remove {selectedProperties[0]?.title.slice(0, 15)}...
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 text-center sm:text-left px-1">
            <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
              {selectedProperties[0].title}
            </h4>
            <p className="text-[11.5px] text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-600 fill-slate-600 shrink-0" />
              <span>{selectedProperties[0].location}</span>
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-0.5 rounded-md bg-[#D1FAE5] text-[#059669] font-semibold text-[10.5px]">
                {selectedProperties[0].status}
              </span>
            </div>
          </div>
        </div>

        {/* Equals Sign Separator 1 (Double rounded grey pills from Figma) */}
        <div className="hidden md:flex flex-col gap-2 items-center justify-center select-none shrink-0">
          <div className="w-9 h-2.5 bg-slate-200/90 rounded-full" />
          <div className="w-9 h-2.5 bg-slate-200/90 rounded-full" />
        </div>

        {/* Slot 2: Property 2 */}
        <div className="w-full md:w-[320px] bg-white rounded-[26px] p-3 sm:p-3.5 border border-slate-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.04)] relative">
          <div className="relative w-full h-[180px] sm:h-[195px] rounded-[20px] overflow-hidden bg-slate-100 mb-3 shadow-2xs">
            <Image
              src={selectedProperties[1].image}
              alt={selectedProperties[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 320px, 340px"
            />
            {/* Edit / 360 icon badge in top right */}
            <button
              type="button"
              onClick={() => setActiveEditMenu(activeEditMenu === 1 ? null : 1)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:bg-white shadow-xs transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-700" />
            </button>

            {/* Edit Tooltip Popover if open */}
            {activeEditMenu === 1 && (
              <div className="absolute top-10 right-2.5 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-slate-200 text-xs space-y-1.5 min-w-[170px] animate-scale-up">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px]">Edit</span>
                  <X
                    className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    onClick={() => setActiveEditMenu(null)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChangeProperty?.(1);
                    setActiveEditMenu(null);
                  }}
                  className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium text-[11px] truncate block"
                >
                  Change {selectedProperties[1]?.title.slice(0, 15)}...
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRemoveProperty?.(1);
                    setActiveEditMenu(null);
                  }}
                  className="w-full text-left py-1 px-1.5 rounded hover:bg-red-50 text-slate-700 hover:text-red-600 font-medium text-[11px] truncate block"
                >
                  Remove {selectedProperties[1]?.title.slice(0, 15)}...
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 text-center sm:text-left px-1">
            <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0B132B] truncate leading-tight">
              {selectedProperties[1].title}
            </h4>
            <p className="text-[11.5px] text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-600 fill-slate-600 shrink-0" />
              <span>{selectedProperties[1].location}</span>
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-0.5 rounded-md bg-[#D1FAE5] text-[#059669] font-semibold text-[10.5px]">
                {selectedProperties[1].status}
              </span>
            </div>
          </div>
        </div>

        {/* Equals Sign Separator 2 (Double rounded grey pills from Figma) */}
        <div className="hidden md:flex flex-col gap-2 items-center justify-center select-none shrink-0">
          <div className="w-9 h-2.5 bg-slate-200/90 rounded-full" />
          <div className="w-9 h-2.5 bg-slate-200/90 rounded-full" />
        </div>

        {/* Slot 3: Add Another Property */}
        <div className="w-full md:w-[320px] flex flex-col items-center">
          <div
            onClick={onAddProperty}
            className="w-full h-[180px] sm:h-[195px] bg-[#FAFCFF] rounded-[28px] border-2 border-dashed border-slate-300/80 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer shadow-2xs group"
          >
            <div className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-800 group-hover:scale-110 group-hover:border-blue-500 group-hover:text-blue-600 transition-all shadow-xs">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[12px] font-extrabold text-[#0B132B] tracking-wider uppercase text-center px-4 leading-tight">
              ADD ANOTHER<br />PROPERTY
            </span>
          </div>

          {/* Skeleton Placeholder Bars below Card 3 */}
          <div className="w-full space-y-2 mt-4 px-3 flex flex-col items-center">
            <div className="w-[180px] h-3 bg-slate-200/70 rounded-full" />
            <div className="w-[120px] h-2.5 bg-slate-200/70 rounded-full" />
            <div className="w-[80px] h-2.5 bg-slate-200/70 rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
};
