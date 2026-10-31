"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Heart, Share2, Eye, ArrowRight, Star, MapPin } from "lucide-react";
import toast from "react-hot-toast";

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
  imagePosition: "left" | "right";
  likes: number;
}

export const BuilderProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [likedProjectIds, setLikedProjectIds] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, title: string) => {
    setLikedProjectIds((prev) => {
      const isLiked = !prev[id];
      toast.success(
        isLiked ? `Saved "${title}" to your favorites!` : `Removed from favorites`
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const handleShare = (title: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success(`Link for "${title}" copied to clipboard!`);
    } else {
      toast.success("Link copied!");
    }
  };

  const filterTabs = ["All", "Under Construction", "Ready to move", "Upcoming"];

  const projects: ProjectItem[] = [
    {
      id: "max-estate-1",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, smart automation, club access and panoramic greens.",
      image: "/builders/builder_cover_modern_building.jpg",
      status: "Under Construction",
      statusColor: "text-[#10B981]",
      imagePosition: "left",
      likes: 72,
    },
    {
      id: "max-estate-2",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, private terrace deck and premium Italian marble.",
      image: "/images/properties/night-tower-figma.jpg",
      status: "Ready to move",
      statusColor: "text-[#EF4444]",
      imagePosition: "right",
      likes: 72,
    },
    {
      id: "max-estate-3",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103, Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13% OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, lush landscaped central garden and 3-tier security.",
      image: "/images/properties/ambr-aspire-figma.jpg",
      status: "Upcoming",
      statusColor: "text-[#EF4444]",
      imagePosition: "left",
      likes: 72,
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <div className="w-full space-y-4 font-poppins">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <h2 className="text-lg sm:text-xl font-black text-[#0B132B] tracking-tight">
          Our Projects<span className="text-[#1865F2] font-black">(25)</span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1865F2] text-white shadow-[0_3px_10px_rgba(24,101,242,0.3)]"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}

          <button
            type="button"
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#1865F2] border border-[#BFDBFE] flex items-center gap-1.5 hover:bg-blue-50/50 shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1865F2]" />
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
              className="group relative bg-white rounded-[24px] border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(24,101,242,0.08)] hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col md:flex-row items-stretch"
            >
              {/* Image Block */}
              <div
                className={`relative w-full md:w-[250px] lg:w-[270px] h-[190px] md:h-auto shrink-0 overflow-hidden ${
                  proj.imagePosition === "right" ? "md:order-3" : "md:order-1"
                }`}
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 270px"
                />
                {/* Popular Star Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B132B]/90 backdrop-blur-xs text-white text-[9.5px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>POPULAR</span>
                  <span className="text-amber-400">✦</span>
                </div>
              </div>

              {/* Vertical Ribbon (Placed between or on right according to position) */}
              <div
                className={`hidden lg:flex items-center justify-center w-7 shrink-0 ${
                  proj.imagePosition === "right" ? "md:order-2 border-r border-slate-100 bg-slate-50/50" : "md:order-3 border-l border-slate-100 bg-slate-50/50"
                }`}
              >
                <span
                  className={`text-[9.5px] font-bold -rotate-90 whitespace-nowrap ${proj.statusColor}`}
                >
                  ( {proj.status} )
                </span>
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
                        className="px-2.5 py-0.5 rounded-full bg-[#1865F2] text-white text-[10px] font-bold shadow-2xs"
                      >
                        {unit}
                      </span>
                    ))}
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-base sm:text-[17px] font-black text-[#0B132B] tracking-tight group-hover:text-[#1865F2] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1865F2] shrink-0" />
                    <span>{proj.location}</span>
                  </p>

                  {/* Pricing Row with Discount */}
                  <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                    <span className="text-[11px] font-medium text-slate-400 line-through">
                      {proj.mrp}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#0B132B]">
                      {proj.price}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#00D1FF] text-white text-[10px] font-black uppercase shadow-2xs">
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
                  <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                    <button
                      type="button"
                      onClick={() => toggleLike(proj.id, proj.title)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        likedProjectIds[proj.id] ? "text-rose-500 font-bold" : "hover:text-rose-500"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedProjectIds[proj.id] ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                      <span>
                        {proj.likes + (likedProjectIds[proj.id] ? 1 : 0)} Like
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare(proj.title)}
                      className="flex items-center gap-1 hover:text-[#1865F2] transition-colors cursor-pointer"
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
                    className="px-4 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-[0_3px_10px_rgba(24,101,242,0.3)] transition-all cursor-pointer"
                  >
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">1</span>
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. View All Projects Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            setActiveFilter("All");
            window.scrollTo({ top: 400, behavior: "smooth" });
          }}
          className="w-full py-3 bg-white hover:bg-slate-50 text-[#1865F2] border border-[#BFDBFE] font-bold text-xs sm:text-[13px] rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          View All Projects
        </button>
      </div>
    </div>
  );
};
