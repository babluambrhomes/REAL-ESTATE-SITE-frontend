"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MapPin } from "lucide-react";

interface BuilderItem {
  id: string;
  name: string;
  location: string;
  logoSrc: string;
}

interface CompareByBuilderProps {
  onSelectBuilder?: (builderName: string) => void;
}

export const CompareByBuilder = ({ onSelectBuilder }: CompareByBuilderProps) => {
  const [selectedId, setSelectedId] = useState<string>("dlf-1");

  const builders: BuilderItem[] = [
    {
      id: "dlf-1",
      name: "DLF Building India",
      location: "Delhi NCR",
      logoSrc: "/compare/dlf_logo.png",
    },
    {
      id: "dlf-2",
      name: "DLF Building India",
      location: "Delhi NCR",
      logoSrc: "/compare/dlf_logo.png",
    },
    {
      id: "dlf-3",
      name: "DLF Building India",
      location: "Delhi NCR",
      logoSrc: "/compare/dlf_logo.png",
    },
    {
      id: "dlf-4",
      name: "DLF Building India",
      location: "Delhi NCR",
      logoSrc: "/compare/dlf_logo.png",
    },
    {
      id: "dlf-5",
      name: "DLF Building India",
      location: "Delhi NCR",
      logoSrc: "/compare/dlf_logo.png",
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
      {/* Title with cyan vertical line indicator */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-[3.5px] h-6 bg-[#00D084] rounded-full" />
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1865F2] tracking-wider uppercase">
          COMPARE BY BUILDER
        </h2>
      </div>

      {/* Horizontal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {builders.map((b) => {
          const isSelected = selectedId === b.id;
          return (
            <div
              key={b.id}
              onClick={() => {
                setSelectedId(b.id);
                onSelectBuilder?.(b.name);
              }}
              className={`rounded-[14px] p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer bg-white border ${
                isSelected
                  ? "border-[#1865F2] ring-2 ring-[#1865F2]/20 shadow-[0_6px_20px_rgba(24,101,242,0.12)]"
                  : "border-slate-200/90 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Circular Black DLF Logo with Verified check */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center overflow-hidden p-1 shadow-xs">
                  <Image
                    src={b.logoSrc}
                    alt={b.name}
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00D084] rounded-full border-2 border-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                </span>
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h4 className="text-[13.5px] font-bold text-[#1865F2] truncate leading-tight">
                  {b.name}
                </h4>
                <p className="text-[11.5px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-600 fill-slate-600 shrink-0" />
                  <span className="truncate">{b.location}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

