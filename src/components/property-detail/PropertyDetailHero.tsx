"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Heart,
  Eye,
  Share2,
  MapPin,
  Play,
  ChevronDown,
} from "lucide-react";
import { Property } from "@/types";

interface PropertyDetailHeroProps {
  property: Property;
  onOpenGallery?: () => void;
  onOpenVideo?: () => void;
}

// 1. Exact 13% OFF Ticket Badge Matching Screenshot 1
const DiscountTicketBadge = () => (
  <div className="relative inline-flex items-center h-7 rounded-sm bg-gradient-to-r from-[#1865F2] via-[#0284C7] to-[#00B4D8] text-white text-[11.5px] font-semibold pl-2 pr-3.5 shadow-2xs select-none">
    {/* Left Icon: White Rosette with % */}
    <div className="relative mr-1.5 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="shrink-0">
        <path d="M12 2l1.9 2.2 2.9-.6 1.1 2.8 2.8 1.1-.6 2.9 2.2 1.9-2.2 1.9.6 2.9-2.8 1.1-1.1 2.8-2.9-.6-1.9 2.2-1.9-2.2-2.9.6-1.1-2.8-2.8-1.1.6-2.9-2.2-1.9 2.2-1.9-.6-2.9 2.8-1.1 1.1-2.8 2.9.6z" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[#1865F2] text-[9.5px] font-bold">
        %
      </span>
    </div>

    {/* Text */}
    <span className="font-bold tracking-wider whitespace-nowrap">13 % OFF!</span>

    {/* Right Scalloped Perforated Edge */}
    <div className="absolute -right-1 top-0 bottom-0 flex flex-col justify-between py-0.5">
      <div className="w-1 h-1 rounded-full bg-white" />
      <div className="w-1 h-1 rounded-full bg-white" />
      <div className="w-1 h-1 rounded-full bg-white" />
    </div>
  </div>
);

// 2. Custom Area Map Icon with Pin Matching Screenshot 2
const AreaMapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <path
      d="M8 12L16 8L24 12L32 8V28L24 32L16 28L8 32V12Z"
      stroke="#1865F2"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="#EFF6FF"
    />
    <path d="M16 8V28" stroke="#1865F2" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M24 12V32" stroke="#1865F2" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="24" cy="14" r="4" fill="#00C9A7" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="24" cy="14" r="1.5" fill="#FFFFFF" />
  </svg>
);

// 3. Custom Hand Holding House Icon Matching Screenshot 2
const HandHouseIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <circle cx="20" cy="20" r="18" stroke="#00B4D8" strokeWidth="1.5" fill="#FFFFFF" />
    <path d="M14 19L20 14L26 19V24H14V19Z" fill="#1865F2" />
    <path d="M19 24V20H21V24H19Z" fill="#FFFFFF" />
    <path d="M13 19L20 13L27 19" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M11 23H17L21 26H28"
      stroke="#1865F2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 4. Custom 3D Floor Tiles Icon Matching Screenshot 2
const FloorGridIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="shrink-0">
    <g transform="translate(4, 8)">
      <polygon points="16,0 32,8 16,16 0,8" fill="#D5E5FD" stroke="#1865F2" strokeWidth="1.5" />
      <polygon points="16,4 28,10 16,16 4,10" fill="#1865F2" opacity="0.8" />
      <line x1="16" y1="0" x2="16" y2="16" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="0" y1="8" x2="32" y2="8" stroke="#FFFFFF" strokeWidth="1" />
    </g>
  </svg>
);

// 5. Custom Clipboard Configuration Icon Matching Screenshot 2
const ClipboardConfigIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <rect x="4" y="4" width="16" height="17" rx="3" fill="#EFF6FF" stroke="#1865F2" strokeWidth="1.8" />
    <path d="M9 2H15V5H9V2Z" fill="#00C9A7" stroke="#00C9A7" strokeWidth="1.5" />
    <path d="M8 10H16" stroke="#1865F2" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 14H13" stroke="#1865F2" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3.5" fill="#00C9A7" />
    <path d="M14.5 16L15.5 17L17.5 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PropertyDetailHero = ({
  property,
  onOpenGallery,
  onOpenVideo,
}: PropertyDetailHeroProps) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  const galleryImages = [
    "/images/properties/max-estate-tower-figma.jpg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    "/images/properties/video-tour-living-room.jpg",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=85",
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-2">
      {/* ----------------- LEFT COLUMN: GALLERY (Span 7) ----------------- */}
      <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
        {/* Main Large Image Container */}
        <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[500px] md:min-h-[530px] rounded-[24px] border border-[#CDCDCD] shadow-sm bg-slate-900 group overflow-hidden">
          {/* Clipped Image Wrapper */}
          <div className="relative w-full h-full">
            <Image
              src={galleryImages[activeImageIdx]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-101"
            />
          </div>

          {/* Top-Left DOWN LOAD BROCHURE Ribbon Badge */}
          <div className="absolute top-5 -left-2 z-30 flex flex-col items-start">
            <button
              onClick={() => alert("Downloading Brochure...")}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-r-md bg-black text-white text-[11px] font-bold tracking-wider uppercase shadow-xl cursor-pointer hover:bg-black/90 transition-all"
            >
              <span>DOWN LOAD BROCHURE</span>
              <Download size={13} className="text-white stroke-[2.5]" />
            </button>
            <div className="w-0 h-0 border-t-[8px] border-t-[#1865F2] border-l-[10px] border-l-transparent" />
          </div>

          {/* Top-Right Floating Interaction Badges */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Likes */}
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center justify-center flex-col w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] hover:text-red-500 shadow-md transition-all cursor-pointer border border-slate-100"
            >
              <Heart
                size={15}
                className={liked ? "fill-red-500 text-red-500" : "text-[#1865F2]"}
              />
              <span className="text-[8.5px] font-bold text-[#0B132B] leading-none mt-0.5">
                {liked ? "10.1k" : "10k"}
              </span>
            </button>

            {/* Views */}
            <button className="flex items-center justify-center flex-col w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] shadow-md transition-all cursor-pointer border border-slate-100">
              <Eye size={15} className="text-[#1865F2]" />
              <span className="text-[8.5px] font-bold text-[#0B132B] leading-none mt-0.5">
                8k
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => alert("Link copied to clipboard!")}
              className="flex items-center justify-center flex-col w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] shadow-md transition-all cursor-pointer border border-slate-100"
            >
              <Share2 size={14} className="text-[#1865F2]" />
              <span className="text-[8.5px] font-bold text-[#0B132B] leading-none mt-0.5">
                5k
              </span>
            </button>
          </div>

          {/* Bottom Left 1/25 Indicator */}
          <div className="absolute bottom-13 left-4 z-20 px-2.5 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-bold">
            {activeImageIdx + 1}/25
          </div>

          {/* Bottom Right View Photo Gallery Button */}
          <button
            onClick={onOpenGallery}
            className="absolute bottom-13 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-slate-50 text-[#0B132B] text-[11.5px] font-bold shadow-md transition-all cursor-pointer"
          >
            <Eye size={14} className="text-[#1865F2]" />
            <span>View Photo Gallery</span>
          </button>

          {/* Bottom Blue Bar */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-[#1865F2] text-white flex items-center justify-around text-[12.5px] font-bold tracking-wide z-20 shadow-xs">
            <span className="flex items-center gap-1.5">
              <span className="text-[#00E5FF] font-bold">↔</span> 15 km Away
            </span>
            <div className="h-4 w-[1px] bg-white/30" />
            <button className="flex items-center gap-1.5 hover:underline cursor-pointer font-bold">
              <MapPin size={14} className="text-[#00E5FF] fill-[#00E5FF]" />
              <span>View on Map</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Media Thumbnails Row */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {/* Thumbnail 1: 360° TOUR */}
          <div
            onClick={() => setActiveImageIdx(0)}
            className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
              activeImageIdx === 0
                ? "border-[#1865F2] shadow-sm"
                : "border-slate-200 hover:border-[#1865F2]/60"
            }`}
          >
            <Image
              src={galleryImages[0]}
              alt="360 Tour"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center p-1">
              <span className="text-[10px] font-bold text-[#0B132B] tracking-wider bg-white/95 px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1865F2]" />
                360° TOUR
              </span>
            </div>
          </div>

          {/* Thumbnail 2: Interior Photo */}
          <div
            onClick={() => setActiveImageIdx(1)}
            className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
              activeImageIdx === 1
                ? "border-[#1865F2] shadow-sm"
                : "border-slate-200 hover:border-[#1865F2]/60"
            }`}
          >
            <Image
              src={galleryImages[1]}
              alt="Interior Photo"
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail 3: Video Tour with Play Button */}
          <div
            onClick={onOpenVideo}
            className="relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#1865F2] cursor-pointer group/vid"
          >
            <Image
              src={galleryImages[2]}
              alt="Video Tour"
              fill
              className="object-cover transition-transform group-hover/vid:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="h-9 w-9 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform">
                <Play size={15} className="ml-0.5 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Thumbnail 4: +28 Photos Gallery */}
          <div
            onClick={onOpenGallery}
            className="relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#1865F2] cursor-pointer group/gal"
          >
            <Image
              src={galleryImages[3]}
              alt="More Photos"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-colors group-hover/gal:bg-black/50">
              <span className="text-[14px] font-bold leading-none">
                +28
              </span>
              <span className="text-[11px] font-semibold mt-0.5">Photos</span>
            </div>
          </div>
        </div>

        {/* Blue Active Thumbnail Indicator Bar Matching Screenshot Exactly */}
        <div className="w-full flex items-center shrink-0">
          <div className="h-1 w-28 bg-[#1865F2] rounded-full" />
        </div>
      </div>

      {/* ----------------- RIGHT COLUMN: SPECS, MAP & COMPARISON (Span 5) ----------------- */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
        {/* 1. Top Specs Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-3">
          {/* Apartment Chips */}
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#1865F2] text-white text-[11.5px] font-bold shadow-2xs">
              3 BHK Apartments
            </span>
            <span className="px-3.5 py-1 rounded-full border border-[#94B8FF] bg-white text-[#1865F2] text-[11.5px] font-semibold">
              4 BHK Apartments
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[25px] sm:text-[27px] font-bold text-[#0B132B] tracking-tight leading-tight">
              The Terraces at Max<br />Estate 361
            </h1>

            {/* Price & 13% OFF Ticket Row */}
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              <span className="text-[13.5px] text-[#94A3B8] line-through font-normal">
                MRP ₹1.58 Cr
              </span>
              <span className="text-[26px] sm:text-[28px] font-bold text-[#0B132B] leading-none">
                ₹1.25<sup className="text-[16px] font-bold text-[#0B132B] ml-0.5">*</sup><span className="text-[20px] font-bold ml-0.5">Cr</span>
              </span>

              <DiscountTicketBadge />
            </div>
          </div>

          {/* Location Ticket Bar */}
          <div className="relative overflow-hidden rounded-xl bg-[#F0F6FE] py-2 px-5 flex items-center justify-between">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border border-slate-200/80" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border border-slate-200/80" />

            <div className="flex items-center gap-3 pl-1">
              <div className="h-6 w-6 rounded-full bg-[#1865F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin size={13} className="fill-white" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#0B132B] leading-tight">
                  Sector 103 , Noida Ext
                </p>
                <p className="text-[10px] text-[#64748B] leading-tight mt-0.5 font-normal">
                  gdshkasaskshvja...
                </p>
              </div>
            </div>
          </div>

          {/* Teal / Green Dashed Separator Line */}
          <div className="w-full border-b border-dashed border-[#00C9A7]/60" />

          {/* Property Essentials Section */}
          <div className="flex items-center gap-3">
            <div className="w-20 shrink-0">
              <h4 className="text-[13px] font-bold text-[#0B132B] leading-snug">
                Property<br />Essentials
              </h4>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-2">
              {/* Box 1: Area */}
              <div className="relative flex flex-col items-center justify-center p-2 pt-2.5 rounded-2xl border-[1.5px] border-[#1865F2] bg-white text-center shadow-2xs">
                <AreaMapIcon />
                <span className="text-[9.5px] font-normal text-[#64748B] mt-0.5">Area</span>
                <span className="text-[11.5px] font-bold text-[#0B132B] mt-0.5 leading-tight">
                  3,200-4,500
                </span>
                <span className="text-[9px] text-[#64748B] font-normal">Sq. Ft</span>
              </div>

              {/* Box 2: Ready to Move */}
              <div className="relative flex flex-col items-center justify-center p-2 pt-2.5 rounded-2xl bg-[#F4F8FE] text-center shadow-2xs">
                <HandHouseIcon />
                <span className="text-[9.5px] font-normal text-[#64748B] mt-0.5">Property</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[11.5px] font-bold text-[#0B132B] leading-tight">Ready</span>
                  <span className="text-[9px] text-[#64748B] font-normal">To Move</span>
                </div>
              </div>

              {/* Box 3: Floor number */}
              <div className="relative flex flex-col items-center justify-center p-2 pt-2.5 rounded-2xl bg-[#F4F8FE] text-center shadow-2xs">
                <FloorGridIcon />
                <span className="text-[9.5px] font-normal text-[#64748B] mt-0.5">Floor number</span>
                <span className="text-[11.5px] font-bold text-[#0B132B] mt-0.5 leading-tight">
                  2 Floors
                </span>
                <span className="text-[9px] text-[#64748B] font-normal">Floor Number</span>
              </div>
            </div>
          </div>

          {/* Configuration Box */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all">
            <button
              onClick={() => setConfigOpen(!configOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-[12px] text-[#0B132B] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <ClipboardConfigIcon />
                <span className="font-bold text-[#0B132B] text-[11.5px]">Configuration</span>
                <div className="h-3.5 border-r border-dashed border-[#00C9A7] mx-1" />
                <span className="text-[#475569] text-[11px] font-normal truncate">
                  3 Bedrooms, 2 Bathrooms, 3 Balconies, Pool...
                </span>
              </div>
              <span className={`text-[#1865F2] text-[10px] shrink-0 ml-2 transition-transform duration-200 ${configOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            {configOpen && (
              <div className="px-4 py-2.5 border-t border-slate-100 text-[11.5px] text-[#475569] space-y-1 bg-[#FAFBFD]">
                <p>• 3 Master Bedrooms with Attached Washrooms</p>
                <p>• 1 Large Living &amp; Dining Hall with Balcony</p>
                <p>• Modular Kitchen with European Chimney</p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Interactive Map Card with Floating Popup */}
        <div className="relative w-full h-46 sm:h-48 rounded-2xl border border-slate-200 bg-[#E8F4EC] overflow-hidden shadow-2xs">
          {/* Map Graphic Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" viewBox="0 0 400 200">
            <rect x="0" y="0" width="400" height="200" fill="#E8F4EC" />
            <path d="M-20 60 Q120 40 220 90 T420 120" stroke="#FFFFFF" strokeWidth="10" fill="none" />
            <path d="M-20 60 Q120 40 220 90 T420 120" stroke="#CBD5E1" strokeWidth="6" fill="none" />
            <path d="M80 -20 Q140 100 200 220" stroke="#FFFFFF" strokeWidth="8" fill="none" />
            <path d="M80 -20 Q140 100 200 220" stroke="#CBD5E1" strokeWidth="4" fill="none" />
            <path d="M260 -20 L300 220" stroke="#FFFFFF" strokeWidth="7" fill="none" />
            <path d="M260 -20 L300 220" stroke="#CBD5E1" strokeWidth="4" fill="none" />
            <path d="M0 160 Q180 140 400 180" stroke="#FFFFFF" strokeWidth="8" fill="none" />
            <path d="M0 160 Q180 140 400 180" stroke="#CBD5E1" strokeWidth="4" fill="none" />
            <rect x="20" y="20" width="70" height="35" rx="4" fill="#C8E6C9" opacity="0.6" />
            <rect x="290" y="30" width="80" height="40" rx="4" fill="#D7CCC8" opacity="0.5" />
          </svg>

          <div className="absolute top-2.5 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
            Delhi / Haryana
          </div>

          <div className="absolute top-2.5 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0B132B] text-white text-[9px] font-semibold shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <span>Manipal Palam Vihar</span>
          </div>

          <div className="absolute bottom-2.5 right-6 flex items-center justify-center h-6 w-6 rounded-full bg-[#0B132B] text-white shadow-md">
            <MapPin size={12} className="text-[#00B4D8]" />
          </div>

          {/* Floating Card Popup */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86%] max-w-[260px] bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 z-10">
            <div className="relative h-16 w-full rounded-lg overflow-hidden bg-slate-900">
              <Image
                src="/images/properties/tower-popular-figma.jpg"
                alt="The Terraces"
                fill
                className="object-cover"
              />
              <button className="absolute top-1 right-1 h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[8.5px] font-bold hover:bg-black transition-colors cursor-pointer">
                ✕
              </button>
            </div>

            <div className="pt-1.5 space-y-0.5">
              <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#EFF6FF] text-[#1865F2]">
                2, 3 &amp; 4 BHK Apartments
              </span>
              <h5 className="text-[11px] font-bold text-[#0B132B] truncate pt-0.5">
                The Terraces at Max Estate 361
              </h5>
              <div className="flex items-center gap-1 text-[9px] text-slate-500">
                <MapPin size={9} className="text-[#1865F2]" />
                <span>Sector 76, Noida</span>
              </div>

              <button className="w-full mt-1 py-1 rounded-md bg-[#1865F2] hover:bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer">
                <span>View Details</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Property Comparison */}
        <div className="space-y-1.5 shrink-0">
          <div>
            <h4 className="text-[13.5px] font-bold text-[#0B132B]">
              Property Comparison
            </h4>
            <p className="text-[10.5px] text-[#64748B] font-normal">
              Add up-to 3 Property to compare
            </p>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] via-[#0096E6] to-[#0074E8] hover:opacity-95 text-white text-[13.5px] font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
            <span className="text-[17px] leading-none font-normal">+</span>
            <span>Add property</span>
          </button>
        </div>
      </div>
    </div>
  );
};
