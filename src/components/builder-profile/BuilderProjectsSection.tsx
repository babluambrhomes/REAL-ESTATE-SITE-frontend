"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Heart, Share2, Eye, ArrowRight, Zap, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/lib/wishlist";

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
  status: "Under Construction" | "Ready to Move" | "Upcoming";
  statusColor: string;
  imagePosition: "left" | "right";
  badgeType: "zap" | "star";
  likes: number;
}

export const BuilderProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { isSaved, toggle: toggleWishlist } = useWishlist();

  const toggleLike = (proj: ProjectItem) => {
    const isCurrentlySaved = isSaved(proj.id || proj.title);
    toggleWishlist(proj.id || proj.title, {
      id: proj.id,
      title: proj.title,
      location: proj.location,
      price: proj.price,
      originalPrice: proj.mrp,
      images: [proj.image],
      chips: proj.units,
      verifiedText: "BUILDER VERIFIED",
      phone: "+91 98765 43210",
      city: "Noida",
      type: "Apartment",
      beds: proj.units[0] || "3 BHK",
    });
    toast.success(
      isCurrentlySaved
        ? `Removed "${proj.title}" from your wishlist`
        : `Saved "${proj.title}" to your wishlist!`
    );
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
      location: "Sector 103 , Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13 % OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, smart automation, club access and panoramic greens...",
      image: "/builders/builder_cover_modern_building.jpg",
      status: "Under Construction",
      statusColor: "text-[#10B981] border-[#10B981]",
      imagePosition: "left",
      badgeType: "zap",
      likes: 72,
    },
    {
      id: "max-estate-2",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13 % OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, private terrace deck and premium Italian marble...",
      image: "/images/properties/night-tower-figma.jpg",
      status: "Ready to Move",
      statusColor: "text-[#EF4444] border-[#EF4444]",
      imagePosition: "right",
      badgeType: "star",
      likes: 72,
    },
    {
      id: "max-estate-3",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      units: ["3 BHK Apartments", "4 BHK Apartments"],
      mrp: "MRP ₹1.58 Cr",
      price: "₹1.25*Cr",
      discount: "13 % OFF!",
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, lush landscaped central garden and 3-tier security...",
      image: "/images/properties/ambr-aspire-figma.jpg",
      status: "Upcoming",
      statusColor: "text-[#10B981] border-[#10B981]",
      imagePosition: "left",
      badgeType: "zap",
      likes: 72,
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.status.toLowerCase() === activeFilter.toLowerCase() ||
            (activeFilter === "Ready to move" && p.status === "Ready to Move")
        );

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
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1865F2] text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}

          <button
            type="button"
            className="px-5 py-1.5 rounded-full text-xs font-bold bg-white text-[#1865F2] border border-[#BFDBFE] flex items-center gap-1.5 hover:bg-blue-50/50 shadow-2xs cursor-pointer"
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
              className="group relative bg-white rounded-[20px] border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(24,101,242,0.08)] hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col md:flex-row items-center p-3 sm:p-4 gap-4"
            >
              {/* Image Block with Inner Rounded Radius (Exact Figma 1:1) */}
              <div
                className={`relative w-full md:w-[250px] lg:w-[270px] h-[190px] shrink-0 rounded-[16px] overflow-hidden ${
                  proj.imagePosition === "right" ? "md:order-3" : "md:order-1"
                }`}
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[16px]"
                  sizes="(max-width: 768px) 100vw, 270px"
                />
                
                {/* Popular Badge (Figma 1:1: zap on left or star on right) */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B132B]/90 backdrop-blur-xs text-white text-[9.5px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  {proj.badgeType === "zap" ? (
                    <>
                      <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>POPULAR</span>
                    </>
                  ) : (
                    <>
                      <span>POPULAR</span>
                      <span className="text-amber-400 font-bold">✦</span>
                    </>
                  )}
                </div>
              </div>

              {/* Vertical Ribbon (Exact Figma 1:1: Pill without parentheses) */}
              <div
                className={`hidden lg:flex items-center justify-center shrink-0 self-stretch px-1 ${
                  proj.imagePosition === "right" ? "md:order-2" : "md:order-3"
                }`}
              >
                <div className="h-full flex items-center justify-center">
                  <span
                    className={`text-[10px] font-bold -rotate-90 whitespace-nowrap tracking-wider py-1.5 px-3 rounded-full border ${proj.statusColor} bg-white shadow-2xs`}
                  >
                    {proj.status}
                  </span>
                </div>
              </div>

              {/* Content Center */}
              <div
                className={`flex-1 flex flex-col justify-between py-1 min-w-0 ${
                  proj.imagePosition === "right" ? "md:order-1" : "md:order-2"
                }`}
              >
                <div>
                  {/* Unit Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {proj.units.map((unit) => (
                      <span
                        key={unit}
                        className="px-3 py-1 rounded-full bg-[#1865F2] text-white text-[11px] font-semibold shadow-2xs"
                      >
                        {unit}
                      </span>
                    ))}
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0B132B] tracking-tight group-hover:text-[#1865F2] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1865F2] shrink-0" />
                    <span>{proj.location}</span>
                  </p>

                  {/* Pricing Row with Discount */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs font-normal text-slate-400 line-through">
                      {proj.mrp}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0B132B]">
                      {proj.price}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00D1FF] text-white text-[10.5px] font-black tracking-tight flex items-center gap-1 shadow-2xs">
                      <span>%</span>
                      <span>{proj.discount}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-normal mt-2 leading-relaxed">
                    <p className="line-clamp-1">{proj.description}</p>
                    <span className="text-slate-400 text-[10px] ml-1 shrink-0">▼</span>
                  </div>
                </div>

                {/* Bottom Stats Bar & View Details CTA */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <button
                      type="button"
                      onClick={() => toggleLike(proj)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        isSaved(proj.id || proj.title) ? "text-rose-500 font-bold" : "hover:text-rose-500"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isSaved(proj.id || proj.title) ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                      <span>
                        {proj.likes + (isSaved(proj.id || proj.title) ? 1 : 0)} Like
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
                      <span>views</span>
                    </span>
                  </div>

                  <Link
                    href={`/properties/${encodeURIComponent(proj.title)}`}
                    className="px-4 py-1.5 bg-[#1865F2] hover:bg-[#1250C4] text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-[0_3px_10px_rgba(24,101,242,0.3)] transition-all cursor-pointer"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[10px] font-black">
                      1
                    </span>
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
