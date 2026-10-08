"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Heart, Share2, Eye, ArrowRight, Star } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  units: string[];
  mrp: string;
  price: string;
  discount: string;
  description: string;
  image: string;
  status: "Under Construction" | "Ready to move" | "Upcoming";
  statusColor: string;
  statusBorder: string;
  imagePosition: "left" | "right";
  likes: number;
}

export const BuilderProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterTabs = ["All", "Under Construction", "Ready to move", "Upcoming"];

  const projects: ProjectItem[] = [
    {
      id: "max-estate-1",
      title: "The Terraces at Max Estate 361",
      location: "Sector 108, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25* Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4 bedrooms, 4 bathrooms, 4 balconies with modular kitchen, smart automation, club access and panoramic greens.",
      image: "/images/properties/max-estate-tower-figma.jpg",
      status: "Under Construction",
      statusColor: "text-rose-500 bg-rose-50 border-rose-200",
      statusBorder: "border-rose-400",
      imagePosition: "left",
      likes: 72,
    },
    {
      id: "max-estate-2",
      title: "The Terraces at Max Estate 361",
      location: "Sector 108, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25* Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4 bedrooms, 4 bathrooms, 4 balconies with modular kitchen, private terrace deck and premium Italian marble.",
      image: "/images/properties/night-tower-figma.jpg",
      status: "Ready to move",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      statusBorder: "border-emerald-400",
      imagePosition: "right",
      likes: 85,
    },
    {
      id: "max-estate-3",
      title: "The Terraces at Max Estate 361",
      location: "Sector 108, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25* Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4 bedrooms, 4 bathrooms, 4 balconies with modular kitchen, lush landscaped central garden and 3-tier security.",
      image: "/images/properties/ambr-aspire-figma.jpg",
      status: "Upcoming",
      statusColor: "text-sky-600 bg-sky-50 border-sky-200",
      statusBorder: "border-sky-400",
      imagePosition: "left",
      likes: 94,
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <div className="w-full space-y-4 font-jakarta">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <h2 className="text-lg sm:text-xl font-black text-[#0B132B] tracking-tight">
          Our Projects <span className="text-[#1865F2] font-extrabold">(25)</span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1865F2] text-white shadow-[0_3px_10px_rgba(24,101,242,0.3)]"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 2. Project Horizontal Cards List */}
      <div className="space-y-4">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="group relative bg-white rounded-[22px] border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(24,101,242,0.08)] hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col md:flex-row items-stretch"
            >
              {/* Left or Right Image */}
              <div
                className={`relative w-full md:w-[260px] lg:w-[280px] h-[180px] md:h-auto shrink-0 overflow-hidden ${
                  proj.imagePosition === "right" ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
                {/* Popular Star Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B132B]/90 backdrop-blur-xs text-white text-[9.5px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>POPULAR</span>
                </div>
              </div>

              {/* Content Center */}
              <div
                className={`flex-1 p-4 sm:p-5 flex flex-col justify-between ${
                  proj.imagePosition === "right" ? "md:order-1" : "md:order-2"
                }`}
              >
                <div>
                  {/* Unit Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {proj.units.map((unit) => (
                      <span
                        key={unit}
                        className="px-2 py-0.5 rounded bg-blue-50 text-[#1865F2] text-[10px] font-bold"
                      >
                        {unit}
                      </span>
                    ))}
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-base sm:text-lg font-black text-[#0B132B] tracking-tight group-hover:text-[#1865F2] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {proj.location}
                  </p>

                  {/* Pricing Row with Discount */}
                  <div className="flex items-center gap-2.5 mt-2">
                    <span className="text-[11px] font-medium text-slate-400 line-through">
                      {proj.mrp}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#1865F2]">
                      {proj.price}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black uppercase shadow-2xs">
                      {proj.discount}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Bottom Stats Bar & View Details CTA */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{proj.likes} Like</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-[#1865F2] transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Views</span>
                    </span>
                  </div>

                  <Link
                    href={`/properties/${encodeURIComponent(proj.title)}`}
                    className="px-4 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-[0_3px_10px_rgba(24,101,242,0.3)] transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Vertical Status Label Ribbon (Figma 1:1) */}
              <div className="hidden lg:flex items-center justify-center w-8 bg-slate-50 border-l border-slate-100 shrink-0">
                <span className={`text-[10px] font-black uppercase tracking-widest -rotate-90 whitespace-nowrap ${proj.statusColor.split(" ")[0]}`}>
                  {proj.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. View All Projects Button */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full py-3 bg-white hover:bg-slate-50 text-[#1865F2] border border-[#BFDBFE] font-bold text-xs sm:text-[13px] rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          View All Projects
        </button>
      </div>
    </div>
  );
};
