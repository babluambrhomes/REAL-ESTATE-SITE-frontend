"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyTypeItem {
  id: string;
  type: string;
  subtitle: string;
  image: string;
}

export const ExpertsByPropertyType = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const types: PropertyTypeItem[] = [
    {
      id: "pt-1",
      type: "Residential",
      subtitle: "Home buying",
      image: "/builders/figma_photo_noida.png",
    },
    {
      id: "pt-2",
      type: "Commercial",
      subtitle: "Office report",
      image: "/builders/figma_photo_gurgaon.png",
    },
    {
      id: "pt-3",
      type: "Plot & Land",
      subtitle: "Land investment",
      image: "/builders/figma_photo_delhi.png",
    },
    {
      id: "pt-4",
      type: "Rental",
      subtitle: "Find rental Expert",
      image: "/builders/figma_photo_greaternoida.png",
    },
    {
      id: "pt-5",
      type: "Investment",
      subtitle: "Find Expert",
      image: "/builders/figma_photo_ghaziabad.png",
    },
    {
      id: "pt-6",
      type: "New project",
      subtitle: "Expert",
      image: "/builders/figma_photo_faridabad.png",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 font-jakarta">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-6 bg-[#00D1FF] rounded-full inline-block" />
          <h2 className="text-base sm:text-lg font-extrabold text-[#0B132B] tracking-tight">
            Find An Expert <span className="text-[#1865F2]">By Property Type</span>
          </h2>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="w-8 h-8 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next"
            className="w-8 h-8 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of 6 Property Type Cards */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
      >
        {types.map((item) => (
          <div
            key={item.id}
            className="w-[185px] sm:w-[195px] shrink-0 bg-white rounded-[14px] border border-slate-100 p-2 shadow-[0_8px_22px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="relative w-full h-[110px] sm:h-[118px] rounded-[10px] overflow-hidden bg-slate-100 mb-2">
              <Image
                src={item.image}
                alt={item.type}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="200px"
              />
            </div>
            <div className="px-1 pb-1">
              <h3 className="text-xs sm:text-[13px] font-extrabold text-[#0B132B]">
                {item.type}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
