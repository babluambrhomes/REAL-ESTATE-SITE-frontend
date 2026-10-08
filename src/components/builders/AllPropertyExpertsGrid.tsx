"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExpertGridItem {
  id: string;
  company: string;
  agent: string;
  avatarSrc: string;
}

export const AllPropertyExpertsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Avatar photos extracted from Figma
  const avatarPool = [
    "/agents/nearby/grid_avatar_1.png",
    "/agents/nearby/grid_avatar_2.png",
    "/agents/nearby/grid_avatar_3.png",
    "/agents/nearby/grid_avatar_4.png",
    "/agents/nearby/grid_avatar_5.png",
    "/agents/nearby/grid_avatar_6.png",
    "/agents/nearby/grid_avatar_7.png",
    "/agents/nearby/grid_avatar_8.png",
    "/agents/nearby/grid_avatar_9.png",
    "/agents/nearby/grid_avatar_10.png",
    "/agents/nearby/grid_avatar_11.png",
    "/agents/nearby/grid_avatar_12.png",
    "/agents/nearby/grid_avatar_13.png",
    "/agents/nearby/grid_avatar_14.png",
    "/agents/nearby/grid_avatar_15.png",
  ];

  // 15 expert items (3 rows of 5 columns) matching Figma Screenshot 2
  const experts: ExpertGridItem[] = Array.from({ length: 15 }, (_, i) => ({
    id: `grid-exp-${i + 1}`,
    company: "E-BUILDER",
    agent: "Smiriti Singh",
    avatarSrc: avatarPool[i % avatarPool.length],
  }));

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-5 bg-[#00D1FF] rounded-full inline-block" />
            <h2 className="text-base sm:text-[18px] font-black text-[#0B132B] tracking-tight">
              All Property Expert
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-0.5 ml-3.5">
            Showing 1-15 Of 224 Expert
          </p>
        </div>

        {/* Carousel / Page Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            aria-label="Previous"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Next"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-[#1865F2] hover:text-[#1250C4] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {experts.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#EEF4FF] rounded-[22px] border border-[#DCE8FC] p-3.5 flex flex-col items-center justify-between text-center shadow-[0_4px_16px_rgba(24,101,242,0.06)] hover:shadow-[0_8px_24px_rgba(24,101,242,0.12)] hover:-translate-y-0.5 transition-all"
          >
            {/* Circular Avatar Photo */}
            <div className="w-[78px] h-[78px] rounded-full overflow-hidden relative shadow-sm border-2 border-white bg-white mx-auto mt-1 shrink-0">
              <Image
                src={exp.avatarSrc}
                alt={exp.agent}
                fill
                className="object-cover"
                sizes="78px"
              />
            </div>

            {/* Middle Card Strip */}
            <div className="w-full bg-white rounded-[12px] p-2 flex items-center justify-center gap-2 mt-3 shadow-2xs border border-slate-100/80">
              <div className="w-5 h-5 rounded-md bg-amber-400 flex items-center justify-center text-slate-950 font-black text-[8px] shrink-0">
                eB
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[10.5px] font-black text-slate-900 tracking-tight leading-none truncate">
                  {exp.company}
                </p>
                <p className="text-[9px] text-slate-500 font-semibold truncate mt-0.5">
                  {exp.agent}
                </p>
              </div>
            </div>

            {/* Solid Blue View Profile Button */}
            <Link
              href="/broker"
              className="w-full mt-2.5 py-2 bg-[#1865F2] hover:bg-[#1250C4] text-white text-[11px] font-bold rounded-xl transition-all shadow-2xs cursor-pointer text-center"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
