"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Heart,
  Send,
  Eye,
  ChevronDown,
  ArrowRight,
  Zap,
  Check,
} from "lucide-react";

export const BrokerPostedProperties = () => {
  const [likes, setLikes] = useState<Record<string, number>>({
    "prop-1": 72,
    "prop-2": 72,
    "prop-3": 72,
    "prop-4": 72,
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUserLiked((prev) => {
      const isLiked = !prev[id];
      setLikes((likePrev) => ({
        ...likePrev,
        [id]: !isLiked ? (likePrev[id] || 1) - 1 : (likePrev[id] || 0) + 1,
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const handleShare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/properties#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const properties = [
    {
      id: "prop-1",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      mrp: "₹1.58 Cr",
      price: "₹1.25 *Cr",
      discount: "13 % OFF!",
      tags: [
        { label: "3 BHK Apartments", isPrimary: true },
        { label: "4 BHK Apartments", isPrimary: false },
      ],
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, Italian marble flooring, and smart home automation.",
      image: "/images/properties/max-estate-tower-figma.jpg",
      isImageLeft: true,
    },
    {
      id: "prop-2",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      mrp: "₹1.58 Cr",
      price: "₹1.25 *Cr",
      discount: "13 % OFF!",
      tags: [
        { label: "3 BHK Apartments", isPrimary: true },
        { label: "4 BHK Apartments", isPrimary: false },
      ],
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, private terrace garden, and Olympic-sized clubhouse.",
      image: "/builders/figma_photo_delhi.png",
      isImageLeft: false, // Image on right
    },
    {
      id: "prop-3",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      mrp: "₹1.58 Cr",
      price: "₹1.25 *Cr",
      discount: "13 % OFF!",
      tags: [
        { label: "3 BHK Apartments", isPrimary: true },
        { label: "4 BHK Apartments", isPrimary: false },
      ],
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, 100% power backup, and 3-tier high-security surveillance.",
      image: "/images/properties/commercial-office-figma.jpg",
      isImageLeft: true,
    },
    {
      id: "prop-4",
      title: "The Terraces at Max Estate 361",
      location: "Sector 103 , Noida Ext",
      mrp: "₹1.58 Cr",
      price: "₹1.25 *Cr",
      discount: "13 % OFF!",
      tags: [
        { label: "3 BHK Apartments", isPrimary: true },
        { label: "4 BHK Apartments", isPrimary: false },
      ],
      description:
        "Comes with 4bedrooms, 4bedrooms, 4balconies with modular kitchen, dual covered car parking, and EV charging points.",
      image: "/images/properties/commercial-office-figma.jpg",
      isImageLeft: false, // Image on right
    },
  ];

  return (
    <div className="w-full space-y-4 font-jakarta relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-[18px] font-black text-[#0B132B] tracking-tight">
          Properties Listed
        </h2>
        <Link
          href="/properties"
          className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Copy Toast Alert */}
      {copiedId && (
        <div className="absolute top-0 right-20 z-20 px-3 py-1.5 bg-[#0B132B] text-white text-[11px] font-bold rounded-lg shadow-lg flex items-center gap-1.5 animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Property link copied!</span>
        </div>
      )}

      {/* 4 Alternating Property Cards */}
      <div className="space-y-4 sm:space-y-5">
        {properties.map((prop) => {
          const isLiked = !!userLiked[prop.id];
          const isExpanded = !!expandedDesc[prop.id];

          return (
            <div
              key={prop.id}
              className="bg-white rounded-[24px] border border-[#D8E6FC] overflow-visible shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(24,101,242,0.08)] transition-all p-4 sm:p-5 relative"
            >
              <div
                className={`flex flex-col ${
                  prop.isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                } gap-5 lg:gap-6 items-stretch`}
              >
                {/* Image Container with Folded Popular Badge */}
                <div className="relative w-full md:w-[280px] lg:w-[320px] h-[200px] sm:h-[220px] md:h-auto min-h-[200px] rounded-[18px] overflow-hidden bg-slate-900 shrink-0 group">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />

                  {/* Overhanging Folded Popular Ribbon Badge */}
                  {prop.isImageLeft ? (
                    <div className="absolute top-3 -left-1 z-10 flex flex-col items-start drop-shadow-md">
                      <div className="bg-[#0B0D1B] text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-r-md rounded-tl-sm flex items-center gap-1.5">
                        <Zap className="w-3 h-3 fill-white text-white" />
                        <span>POPULAR</span>
                      </div>
                      <div className="w-0 h-0 border-t-[4px] border-t-[#05060D] border-l-[4px] border-l-transparent" />
                    </div>
                  ) : (
                    <div className="absolute top-3 -right-1 z-10 flex flex-col items-end drop-shadow-md">
                      <div className="bg-[#0B0D1B] text-white text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-l-md rounded-tr-sm flex items-center gap-1.5">
                        <span>POPULAR</span>
                        <Zap className="w-3 h-3 fill-white text-white" />
                      </div>
                      <div className="w-0 h-0 border-t-[4px] border-t-[#05060D] border-r-[4px] border-r-transparent" />
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0 space-y-2.5 py-0.5 text-left">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {prop.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-1 rounded-full font-bold text-xs ${
                            tag.isPrimary
                              ? "bg-[#1865F2] text-white shadow-2xs"
                              : "bg-[#EBF3FE] border border-[#BFDBFE] text-[#1865F2]"
                          }`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-[20px] font-black text-[#0B132B] tracking-tight truncate">
                      {prop.title}
                    </h3>

                    {/* Location Pin */}
                    <p className="text-xs sm:text-[13px] text-slate-600 font-semibold flex items-center gap-1.5 mt-1">
                      <span className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0">
                        <MapPin className="w-2.5 h-2.5 fill-white text-white" />
                      </span>
                      <span>{prop.location}</span>
                    </p>

                    {/* Pricing Row with Teal Gradient Badge */}
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                        MRP {prop.mrp}
                      </span>
                      <span className="text-xl sm:text-[23px] font-black text-[#0B132B]">
                        {prop.price}
                      </span>

                      {/* 13% OFF Ribbon Flag Tag */}
                      <div
                        className="px-3 py-1 text-white font-black text-[11px] tracking-tight flex items-center gap-1.5 shadow-2xs"
                        style={{
                          background:
                            "linear-gradient(90deg, #1865F2 0%, #00BFA5 100%)",
                          clipPath:
                            "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
                        }}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-white text-[#1865F2] flex items-center justify-center text-[9px] font-black">
                          %
                        </span>
                        <span className="pr-2">13 % OFF!</span>
                      </div>
                    </div>

                    {/* Description Full-Width Rounded Box */}
                    <div
                      onClick={() =>
                        setExpandedDesc((prev) => ({
                          ...prev,
                          [prop.id]: !prev[prop.id],
                        }))
                      }
                      className="mt-3 px-4 py-2 rounded-full border border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500 font-medium cursor-pointer hover:border-slate-300 transition-colors"
                    >
                      <span
                        className={
                          isExpanded
                            ? "leading-relaxed break-words"
                            : "truncate"
                        }
                      >
                        {prop.description}
                      </span>
                      <span className="text-[#1865F2] text-[10px] ml-2 shrink-0">
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#0B132B] mt-1">
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Like */}
                      <button
                        type="button"
                        onClick={(e) => toggleLike(e, prop.id)}
                        className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-[#1865F2]"
                          }`}
                        />
                        <span>{likes[prop.id]} Like</span>
                      </button>

                      {/* Share */}
                      <button
                        type="button"
                        onClick={(e) => handleShare(e, prop.id)}
                        className="flex items-center gap-1.5 hover:text-[#1865F2] transition-colors cursor-pointer text-[#0B132B]"
                      >
                        <Send className="w-4 h-4 text-[#1865F2]" />
                        <span>Share</span>
                      </button>

                      {/* Views */}
                      <span className="flex items-center gap-1.5 text-[#0B132B]">
                        <Eye className="w-4 h-4 text-[#1865F2]" />
                        <span>views</span>
                      </span>
                    </div>

                    {/* View Details Pill Button */}
                    <Link
                      href="/properties"
                      className="px-4 py-2 bg-[#1865F2] hover:bg-[#1250C4] text-white font-bold text-xs sm:text-[13px] rounded-full flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#00D26A] text-white flex items-center justify-center text-[10.5px] font-black shadow-2xs">
                        1
                      </span>
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
