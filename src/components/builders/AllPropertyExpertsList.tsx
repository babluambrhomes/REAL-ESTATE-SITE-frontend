"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MoreVertical, ChevronLeft, ChevronRight, User } from "lucide-react";

interface ExpertItem {
  id: string;
  company: string;
  agent: string;
  location: string;
  rating: number;
  reviews: number;
  specialty: string;
  experience: string;
  listings: string;
  expertise: string;
  operatesIn: string;
  available: boolean;
  responseTime: string;
  logoText: string;
}

export const AllPropertyExpertsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const baseExpert = {
    company: "Gaursons India",
    agent: "Amit Sharma",
    location: "Noida • Delhi NCR",
    rating: 4.8,
    reviews: 124,
    specialty: "Specialist In Residential Properties And New Launches",
    experience: "8 Years",
    listings: "120 Listing",
    expertise: "3 BHK, 4 BHK, Villas, New Launches",
    operatesIn: "Sector 104, Sector 107",
    available: true,
    responseTime: "Responds In ~ 10 Min",
    logoText: "GAURS\nyour own world",
  };

  // 11 identical expert items as requested
  const experts: ExpertItem[] = Array.from({ length: 11 }, (_, i) => ({
    id: `exp-${i + 1}`,
    ...baseExpert,
  }));

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-6 bg-[#00D1FF] rounded-full inline-block" />
            <h2 className="text-base sm:text-lg font-black text-[#0B132B] tracking-tight">
              All Property Expert
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 ml-3.5">
            Showing 1-15 Of 224 Expert
          </p>
        </div>

        {/* Carousel Arrow Buttons */}
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

      {/* Vertical Stack of Expert Cards */}
      <div className="space-y-4 sm:space-y-5">
        {experts.map((exp) => (
          <div
            key={exp.id}
            className="relative bg-white rounded-[16px] border border-slate-100 p-5 sm:p-6 shadow-[0_6px_22px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
          >
            {/* Top-Right 3-Dots Menu Button */}
            <button
              type="button"
              className="absolute top-4 right-4 w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Left Column: Logo + Main Details */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0 max-w-[480px]">
              
              {/* Circular Logo with Verified Badge at bottom right */}
              <div className="relative w-[90px] h-[90px] sm:w-[96px] sm:h-[96px] shrink-0">
                <Image
                  src="/builders/logo_gaurs_verified.png"
                  alt={exp.company}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>

              {/* Company & Agent Info */}
              <div className="space-y-0.5 min-w-0 text-left">
                <h3 className="text-[15px] sm:text-base font-black text-[#1865F2] tracking-tight truncate">
                  {exp.company}
                </h3>
                <p className="text-xs sm:text-[13px] font-bold text-slate-800 truncate">
                  {exp.agent}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {exp.location}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold pt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-slate-800 text-[11px] font-extrabold ml-0.5">
                    {exp.rating}
                  </span>
                  <span className="text-slate-400 text-[10.5px] font-medium">
                    ({exp.reviews} Review)
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 font-medium truncate pt-0.5">
                  {exp.specialty}
                </p>

                {/* Badges */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[9.5px]">
                    {exp.experience}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[9.5px]">
                    {exp.listings}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Column: Expertise & Operates In */}
            <div className="hidden md:block space-y-2.5 px-4 min-w-[220px]">
              <div>
                <h4 className="text-xs sm:text-[13px] font-extrabold text-[#0B132B]">
                  Expertise
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                  {exp.expertise}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-[13px] font-extrabold text-[#0B132B]">
                  Operates In
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {exp.operatesIn}
                </p>
              </div>
            </div>

            {/* Right Action Column: Status, Response, View Profile, Connect (shifted left) */}
            <div className="flex flex-col items-start gap-1.5 shrink-0 w-full lg:w-[160px] lg:mr-6 xl:mr-10 pt-2 lg:pt-0">
              
              {/* Availability Status with User icon (left aligned) */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]">
                <User className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]" />
                <span>Available Now</span>
              </div>

              <p className="text-[10px] text-slate-500 font-medium">
                {exp.responseTime}
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2 pt-1.5">
                <Link
                  href="/broker"
                  className="w-full py-1.5 bg-white hover:bg-blue-50 text-[#1865F2] border border-[#1865F2] text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs block text-center"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  className="w-full py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Connect
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
