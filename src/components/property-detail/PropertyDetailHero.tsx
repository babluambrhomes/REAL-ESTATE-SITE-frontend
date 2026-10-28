"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Heart,
  Eye,
  Share2,
  MapPin,
  Play,
  ChevronDown,
  ArrowRight,
  Check,
  Plus,
  Calculator,
} from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { PropertyShareModal } from "./PropertyShareModal";
import { PropertyBrochureModal } from "./PropertyBrochureModal";
import { PropertyMapModal } from "@/components/card/PropertyMapModal";
import { PropertyEmiCalculatorModal } from "@/components/properties/PropertyEmiCalculatorModal";

interface PropertyDetailHeroProps {
  property: Property;
  onOpenGallery?: () => void;
  onOpenVideo?: () => void;
  onOpenCompare?: () => void;
}

// 1. Exact 13% OFF Ticket Badge Matching Screenshot 1
const DiscountTicketBadge = () => (
  <div className="relative inline-flex items-center h-7 rounded-sm bg-gradient-to-r from-[#1865F2] via-[#0284C7] to-[#00B4D8] text-white text-[11.5px] font-medium pl-2 pr-3.5 shadow-2xs select-none">
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
  onOpenCompare,
}: PropertyDetailHeroProps) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [configOpen, setConfigOpen] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(true);

  // Modals state
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);

  // Real Wishlist
  const { isSaved, toggle: toggleWishlist } = useWishlist();
  const propertyId = property.id !== undefined ? property.id : 0;
  const isPropertyLiked = isSaved(propertyId);

  // Real Comparison
  const { isCompared, toggle: toggleCompare } = useCompare();
  const isPropertyCompared = isCompared(propertyId);

  // Live Distance Calculation
  const [distanceText, setDistanceText] = useState<string>("Calculating...");

  useEffect(() => {
    // Property Target Coordinates (Default: Noida Sector 103 / 76 coordinates if not in property)
    const targetLat = property.coordinates?.[1] || 28.541;
    const targetLng = property.coordinates?.[0] || 77.382;

    const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (R * c).toFixed(1);
    };

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const d = calcDistance(pos.coords.latitude, pos.coords.longitude, targetLat, targetLng);
          setDistanceText(`${d} km Away`);
        },
        () => {
          setDistanceText("15.1 km Away");
        },
        { timeout: 1200, maximumAge: 300000 }
      );
    } else {
      setDistanceText("15.1 km Away");
    }
  }, [property.coordinates]);

  const fallbackGallery = [
    "/images/properties/max-estate-tower-figma.jpg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    "/images/properties/video-tour-living-room.jpg",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=85",
  ];

  const galleryImages =
    property.images && property.images.length > 0 ? property.images : fallbackGallery;

  const currentMainImage = galleryImages[activeImageIdx] || galleryImages[0] || fallbackGallery[0];

  const handleToggleWishlist = () => {
    const isNowSaved = toggleWishlist(propertyId, property);
    if (isNowSaved) {
      toast.success("Saved to your shortlisted properties!");
    } else {
      toast("Removed from wishlist", { icon: "🗑️" });
    }
  };

  const handleToggleCompare = () => {
    if (isPropertyCompared) {
      if (onOpenCompare) {
        onOpenCompare();
      } else {
        toast.success("Already added to comparison matrix!");
      }
    } else {
      toggleCompare(property);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-2">
      {/* ----------------- LEFT COLUMN: GALLERY (Span 7) ----------------- */}
      <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
        {/* Main Large Image Container */}
        <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[500px] md:min-h-[530px] rounded-[24px] border border-[#CDCDCD] shadow-sm bg-slate-900 group">
          {/* Clipped Inner Image Wrapper */}
          <div className="absolute inset-0 rounded-[24px] overflow-hidden">
            <Image
              src={currentMainImage}
              alt={property.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-101"
            />
          </div>

          {/* Top-Left DOWNLOAD BROCHURE Ribbon Badge with 3D Folded Ribbon Corner */}
          <div className="absolute top-6 -left-3 z-30 flex flex-col items-start drop-shadow-md">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="flex items-center gap-2 pl-4 pr-3.5 py-2 rounded-r-lg bg-[#0B132B] text-white text-[11px] font-bold tracking-wider uppercase shadow-xl cursor-pointer hover:bg-slate-900 transition-all hover:scale-102"
              title="Download verified property brochure"
            >
              <span>DOWNLOAD BROCHURE</span>
              <Download size={14} className="text-white stroke-[2.5]" />
            </button>
            {/* 3D Folded Ribbon Triangle under the protruding left tab matching Figma */}
            <div className="w-0 h-0 border-t-[9px] border-t-[#0074E8] border-l-[12px] border-l-transparent" />
          </div>

          {/* Top-Right Floating Interaction Badges */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Likes / Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className="flex items-center justify-center flex-col w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] hover:text-red-500 shadow-md transition-all cursor-pointer border border-slate-100"
              title={isPropertyLiked ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart
                size={15}
                className={isPropertyLiked ? "fill-red-500 text-red-500" : "text-[#1865F2]"}
              />
              <span className="text-[8.5px] font-bold text-[#0B132B] leading-none mt-0.5">
                {isPropertyLiked ? "Saved" : "Save"}
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
              onClick={() => setIsShareOpen(true)}
              className="flex items-center justify-center flex-col w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-[#1865F2] shadow-md transition-all cursor-pointer border border-slate-100 hover:scale-105"
              title="Share property details"
            >
              <Share2 size={14} className="text-[#1865F2]" />
              <span className="text-[8.5px] font-bold text-[#0B132B] leading-none mt-0.5">
                Share
              </span>
            </button>
          </div>

          {/* Bottom Left 1/25 Indicator */}
          <div className="absolute bottom-15 left-4 z-20 px-2.5 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-bold">
            {activeImageIdx + 1}/{galleryImages.length}
          </div>

          {/* Bottom Right View Photo Gallery Button */}
          <button
            onClick={onOpenGallery}
            className="absolute bottom-15 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-slate-50 text-[#0B132B] text-[11.5px] font-bold shadow-md transition-all cursor-pointer"
          >
            <Eye size={14} className="text-[#1865F2]" />
            <span>View Photo Gallery</span>
          </button>

          {/* Bottom Blue Bar with clean 1px border and centered vertical divider */}
          <div className="absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-[#1865F2] rounded-b-[24px] border-t border-white/30 z-20 shadow-xs flex items-center justify-between">
            {/* Left Half: Distance */}
            <div className="flex-1 flex items-center justify-center gap-2 px-3">
              <span className="text-[#00E5FF] font-bold text-sm sm:text-base select-none">↔</span>
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-wide">
                {distanceText}
              </span>
            </div>

            {/* Subtle Vertical White Divider Line matching Figma */}
            <div className="h-5 w-[1px] bg-white/70 shrink-0" />

            {/* Right Half: View on Map */}
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-3 text-white hover:bg-blue-600/40 transition-colors cursor-pointer group/map"
              title="Open interactive Google Map"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00E5FF] text-[#1865F2] shadow-2xs group-hover/map:scale-110 transition-transform">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#00E5FF" />
                  <circle cx="12" cy="10" r="3" fill="#1865F2" stroke="none" />
                </svg>
              </div>
              <span className="text-white text-xs sm:text-[13px] font-bold tracking-wide group-hover/map:underline">
                View on Map
              </span>
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
              src={galleryImages[0] || fallbackGallery[0]}
              alt="360 Tour"
              fill
              unoptimized
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
              src={galleryImages[1] || galleryImages[0] || fallbackGallery[1]}
              alt="Interior Photo"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Thumbnail 3: Video Tour with Play Button */}
          <div
            onClick={onOpenVideo}
            className="relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#1865F2] cursor-pointer group/vid"
          >
            <Image
              src={galleryImages[2] || galleryImages[0] || fallbackGallery[2]}
              alt="Video Tour"
              fill
              unoptimized
              className="object-cover transition-transform group-hover/vid:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="h-9 w-9 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform">
                <Play size={15} className="ml-0.5 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Thumbnail 4: +Photos Gallery */}
          <div
            onClick={onOpenGallery}
            className="relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#1865F2] cursor-pointer group/gal"
          >
            <Image
              src={galleryImages[3] || galleryImages[0] || fallbackGallery[3]}
              alt="More Photos"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-colors group-hover/gal:bg-black/50">
              <span className="text-[14px] font-bold leading-none">
                +{galleryImages.length}
              </span>
              <span className="text-[11px] font-medium mt-0.5">Photos</span>
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
              {property.chips?.[0] || `${property.beds || "3 BHK"} ${property.type || "Apartment"}`}
            </span>
            <span className="px-3.5 py-1 rounded-full border border-[#94B8FF] bg-white text-[#1865F2] text-[11.5px] font-medium">
              {property.chips?.[1] || property.type || "For Sale"}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[25px] sm:text-[27px] font-bold text-[#0B132B] tracking-tight leading-tight">
              {property.title}
            </h1>

            {/* Price & Discount Ticket Row */}
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              {property.originalPrice && (
                <span className="text-[13.5px] text-[#94A3B8] line-through font-normal">
                  MRP {property.originalPrice.includes("Cr") || property.originalPrice.includes("Lakh") ? property.originalPrice : `${property.originalPrice} Cr`}
                </span>
              )}
              <span className="text-[26px] sm:text-[28px] font-bold text-[#0B132B] leading-none">
                {property.price
                  ? property.price.includes("Cr") || property.price.includes("Lakh") || property.price.includes("Lac") || property.price.toLowerCase().includes("l")
                    ? property.price
                    : `${property.price} Cr`
                  : "₹1.25 Cr"}
              </span>

              {property.discount && <DiscountTicketBadge />}

              <button
                type="button"
                onClick={() => setIsEmiOpen(true)}
                className="text-[11.5px] font-bold text-[#1865F2] hover:bg-blue-100/80 flex items-center gap-1.5 cursor-pointer bg-blue-50/90 px-3 py-1.5 rounded-xl border border-blue-200/80 transition-colors shadow-2xs"
                title="Calculate monthly EMI & all-inclusive cost"
              >
                <Calculator size={13} className="text-[#1865F2]" />
                <span>Calculate EMI &amp; Costs</span>
              </button>
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
                  {property.location}
                </p>
                <p className="text-[10px] text-[#64748B] leading-tight mt-0.5 font-normal">
                  {property.city ? `${property.city}, India` : "Prime Location"}
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
                  {property.area || "1,200 Sq. Ft"}
                </span>
                <span className="text-[9px] text-[#64748B] font-normal">Total Area</span>
              </div>

              {/* Box 2: Ready to Move */}
              <div className="relative flex flex-col items-center justify-center p-2 pt-2.5 rounded-2xl bg-[#F4F8FE] text-center shadow-2xs">
                <HandHouseIcon />
                <span className="text-[9.5px] font-normal text-[#64748B] mt-0.5">Status</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[11.5px] font-bold text-[#0B132B] leading-tight">
                    {property.verifiedText || "Ready"}
                  </span>
                  <span className="text-[9px] text-[#64748B] font-normal">To Move</span>
                </div>
              </div>

              {/* Box 3: Floor number */}
              <div className="relative flex flex-col items-center justify-center p-2 pt-2.5 rounded-2xl bg-[#F4F8FE] text-center shadow-2xs">
                <FloorGridIcon />
                <span className="text-[9.5px] font-normal text-[#64748B] mt-0.5">Property Type</span>
                <span className="text-[11.5px] font-bold text-[#0B132B] mt-0.5 leading-tight truncate max-w-[80px]">
                  {property.type || "Apartment"}
                </span>
                <span className="text-[9px] text-[#64748B] font-normal">Category</span>
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
                  {property.beds || "3 Beds"}, {property.baths || 2} Bathrooms, {property.area || "1,200 sqft"}
                </span>
              </div>
              <span className={`text-[#1865F2] text-[10px] shrink-0 ml-2 transition-transform duration-200 ${configOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            {configOpen && (
              <div className="px-4 py-2.5 border-t border-slate-100 text-[11.5px] text-[#475569] space-y-1 bg-[#FAFBFD]">
                <p>• {property.beds || "3"} Master Bedrooms with attached washrooms</p>
                <p>• {property.baths || "2"} Premium Bathrooms &amp; Large Living Hall</p>
                <p>• Total Area: {property.area || "1,200 sqft"}</p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Interactive Map Card with Floating Popup */}
        <div className="relative w-full h-52 sm:h-56 rounded-2xl border border-slate-200 bg-[#E8F4EC] overflow-hidden shadow-2xs">
          {/* Map Graphic Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" viewBox="0 0 400 220">
            <rect x="0" y="0" width="400" height="220" fill="#E8F4EC" />
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

          {/* Region Badges */}
          <div className="absolute top-2 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-wider z-10 pointer-events-none">
            {property?.location?.split(",")?.[1]?.trim() || "Delhi / Haryana"}
          </div>

          <div className="absolute top-2 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0B132B] text-white text-[8.5px] font-medium shadow-md z-10 pointer-events-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <span>{property?.location?.split(",")?.[0]?.trim() || "Manipal Palam Vihar"}</span>
          </div>

          {/* Interactive Map Pin - Click to toggle card */}
          <button
            type="button"
            onClick={() => setShowMapPopup((prev) => !prev)}
            aria-label="Toggle property location card"
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            <div className="relative flex items-center justify-center h-7 w-7 rounded-full bg-[#1865F2] text-white shadow-md transition-transform group-hover:scale-110">
              <MapPin size={14} className="text-white fill-white" />
              <span className="absolute -bottom-0.5 h-1.5 w-1.5 rotate-45 bg-[#1865F2]" />
            </div>
            {!showMapPopup && (
              <span className="mt-1 px-1.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[8.5px] font-medium shadow-sm whitespace-nowrap animate-pulse">
                Click pin to view
              </span>
            )}
          </button>

          {/* Floating Card Popup - Placed directly BELOW the pin */}
          {showMapPopup && (
            <div className="absolute left-1/2 top-15 -translate-x-1/2 w-[165px] bg-white rounded-xl shadow-xl border border-slate-200/90 p-1.5 z-20 transition-all duration-150">
              <div className="relative h-[62px] w-full rounded-lg overflow-hidden bg-slate-900">
                <Image
                  src={property?.images?.[0] || "/images/properties/tower-popular-figma.jpg"}
                  alt={property?.title || "Property"}
                  fill
                  sizes="165px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setShowMapPopup(false)}
                  aria-label="Close"
                  className="absolute top-1 right-1 h-4 w-4 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center text-[8px] font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-1 pt-1.5 space-y-0.5">
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-medium bg-[#EFF6FF] text-[#1865F2] leading-none">
                  {property?.chips?.[0] || "2, 3 & 4 BHK Apartments"}
                </span>
                <h5 className="text-[10px] font-bold text-[#0B132B] truncate pt-0.5">
                  {property?.title || "The Terraces at Max Estate 361"}
                </h5>
                <div className="flex items-center gap-0.5 text-[8.5px] text-slate-500">
                  <MapPin size={9} className="text-[#1865F2] shrink-0" />
                  <span className="truncate">{property?.location || "Sector 76, Noida"}</span>
                </div>

                <Link
                  href={`/properties/${property?.id || ""}`}
                  className="w-full mt-1.5 py-1 rounded-md bg-[#1865F2] hover:bg-blue-700 text-white text-[9.5px] font-medium flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. Property Comparison */}
        <div className="space-y-1.5 shrink-0">
          <div>
            <h4 className="text-[14px] font-bold text-[#0B132B]">
              Property Comparison
            </h4>
            <p className="text-[11px] text-[#64748B] font-normal">
              Add up-to 3 Property to compare
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleCompare}
            className={`w-full py-2.5 rounded-xl text-white text-[13.5px] font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
              isPropertyCompared
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                : "bg-[#1865F2] hover:bg-blue-700 shadow-blue-500/20"
            }`}
          >
            {isPropertyCompared ? (
              <>
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Added to Compare (View Comparison)</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Add property</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real Interactive Modals */}
      <PropertyBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          city: property.city,
          type: property.type,
          beds: property.beds,
          description: property.description,
          reraNumber: property.reraNumber,
        }}
      />

      <PropertyShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          city: property.city,
        }}
      />

      <PropertyMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          city: property.city,
          image: property.images?.[0],
        }}
      />

      <PropertyEmiCalculatorModal
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
        propertyTitle={property.title}
        propertyLocation={property.location}
        initialPrice={property.price}
      />
    </div>
  );
};
