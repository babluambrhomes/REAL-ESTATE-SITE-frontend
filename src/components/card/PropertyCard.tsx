"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  MapPin,
  PhoneCall,
  Share2,
  FileText,
  Zap,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn, formatPropertyChip } from "@/lib/utils";
import type { Property } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/auth\/?$/, "") ?? "";

// Custom Spec Icons using user's saved Figma assets
const AreaBlueprintIcon = () => (
  <Image
    src="/icon/location.png"
    alt="Sq. Ft"
    width={26}
    height={22}
    className="h-5.5 w-6 shrink-0 object-contain"
    unoptimized
  />
);

const AmenitiesClipboardIcon = () => (
  <Image
    src="/icon/Frame.svg"
    alt="Amenities"
    width={26}
    height={26}
    className="h-5.5 w-5.5 shrink-0 object-contain"
    unoptimized
  />
);

const ReadyToMoveIcon = () => (
  <Image
    src="/icon/Group.svg"
    alt="Ready To Move"
    width={26}
    height={22}
    className="h-5.5 w-6 shrink-0 object-contain"
    unoptimized
  />
);

const DiscountBadgeIcon = () => (
  <svg
    className="h-5 w-5 shrink-0 text-[#00BA7A]"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10.87 2.47a1.5 1.5 0 012.26 0l.94 1.05a1.5 1.5 0 001.37.45l1.39-.23a1.5 1.5 0 011.69 1.23l.3 1.38a1.5 1.5 0 001 1.05l1.32.48a1.5 1.5 0 01.91 1.89l-.5 1.32a1.5 1.5 0 00.46 1.37l1.05.94a1.5 1.5 0 010 2.26l-1.05.94a1.5 1.5 0 00-.46 1.37l.5 1.32a1.5 1.5 0 01-.91 1.89l-1.32.48a1.5 1.5 0 00-1 1.05l-.3 1.38a1.5 1.5 0 01-1.69 1.23l-1.39-.23a1.5 1.5 0 00-1.37.45l-.94 1.05a1.5 1.5 0 01-2.26 0l-.94-1.05a1.5 1.5 0 00-1.37-.45l-1.39.23a1.5 1.5 0 01-1.69-1.23l-.3-1.38a1.5 1.5 0 00-1-1.05l-1.32-.48a1.5 1.5 0 01-.91-1.89l.5-1.32a1.5 1.5 0 00-.46-1.37l-1.05-.94a1.5 1.5 0 010-2.26l1.05-.94a1.5 1.5 0 00.46-1.37l-.5-1.32a1.5 1.5 0 01.91-1.89l1.32-.48a1.5 1.5 0 001-1.05l.3-1.38a1.5 1.5 0 011.69-1.23l1.39.23a1.5 1.5 0 001.37-.45l.94-1.05z"
      fill="#00BA7A"
    />
    <path
      d="M9.5 9.5a1 1 0 100-2 1 1 0 000 2zm5 7a1 1 0 100-2 1 1 0 000 2zm-6 0l7-7"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PropertyCard = ({
  id,
  images = [],
  verifiedText = "VERIFIED DEAL",
  chips = ["2, 3 & 4 BHK Apartments"],
  title,
  phone = "+91 9876543210",
  location,
  price,
  originalPrice,
  description = "",
  layout = "vertical",
  infoChips,
  nearby = [],
  index,
}: Property) => {
  const [liked, setLiked] = useState(false);

  const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return "/images/properties/villa-popular-figma.jpg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("/")) {
      return imagePath;
    }
    const cleanBase = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
    return `${cleanBase}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const propertyImage = getImageUrl(images[0]);
  const propertyUrl = id ? `/property/${id}` : `/properties/${encodeURIComponent(title || "details")}`;

  if (layout === "horizontal") {
    const rawPrice = price ? price.replace("Cr", "").trim() : "₹1.25";

    return (
      <div className="group relative flex flex-col lg:flex-row rounded-[32px] sm:rounded-[36px] border border-slate-200/90 bg-white shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-6px_rgba(24,101,242,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06)] w-full">
        {/* Top-Right Soft Blue Ambient Gradient Glow (Figma 1:1) */}
        <div className="absolute top-0 right-0 w-[380px] h-[300px] rounded-tr-[36px] bg-[radial-gradient(ellipse_at_top_right,rgba(216,234,255,0.75)_0%,rgba(235,244,255,0.45)_45%,transparent_75%)] pointer-events-none z-0" />

        {/* Bottom Grey Depth Shade (Figma 1:1) */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] rounded-b-[36px] bg-gradient-to-r from-transparent via-slate-200/60 to-transparent pointer-events-none z-0" />

        {/* Left Side: Property Image & Floating Badges */}
        <div className="relative w-full md:w-[390px] lg:w-[430px] xl:w-[460px] shrink-0 flex flex-col justify-between self-stretch z-10">
          {/* Top-Left: Folded Ribbon Popular Badge (Matches User Screenshot 1:1) */}
          <div className="absolute top-5 -left-3 z-30 flex flex-col items-start pointer-events-none">
            <div className="relative flex items-center gap-1.5 uppercase rounded-r-[8px] rounded-tl-[6px] rounded-bl-none bg-[#0B0D17] px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white shadow-md">
              <Zap className="h-3.5 w-3.5 fill-white text-white shrink-0" />
              <span>POPULAR</span>
            </div>
            {/* Blue triangular fold underneath hugging the outer card boundary */}
            <div className="w-0 h-0 border-t-[9px] border-t-[#1865F2] border-l-[12px] border-l-transparent" />
          </div>

          <div className="relative flex-1 min-h-[250px] sm:min-h-[265px] w-full overflow-hidden rounded-t-[32px] lg:rounded-t-none lg:rounded-tl-[32px] lg:rounded-tr-[26px] bg-slate-900">
            <Image
              src={propertyImage}
              alt={title || "Property"}
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />

            {/* Top-Right: 3 Action Badges */}
            <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-center gap-2">
              <button
                type="button"
                aria-label="Wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  setLiked((prev) => !prev);
                }}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 cursor-pointer"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    liked ? "fill-red-500 text-red-500" : "text-[#1865F2]"
                  )}
                  strokeWidth={2.2}
                />
              </button>
              <button
                type="button"
                aria-label="Share"
                onClick={(e) => e.preventDefault()}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 cursor-pointer"
              >
                <svg
                  className="h-4 w-4 text-[#1865F2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 14 5-5-5-5" />
                  <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Verified"
                onClick={(e) => e.preventDefault()}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 cursor-pointer"
              >
                <svg
                  className="h-4.5 w-4.5 text-[#1865F2]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Blue Bar across Image */}
          <div className="h-[40px] shrink-0 bg-[#1865F2] flex items-center justify-between px-3 text-white rounded-b-[32px] lg:rounded-b-none lg:rounded-bl-[32px] lg:rounded-br-[26px]">
            <div className="flex items-center justify-center gap-1.5 text-[12px] font-semibold flex-1">
              <span className="text-[#00E599] text-base leading-none font-bold">⟷</span>
              <span className="tracking-wide">15 km Away</span>
            </div>
            <div className="h-4 w-[1px] bg-white/40 shrink-0" />
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 text-[12px] font-semibold hover:opacity-90 cursor-pointer flex-1"
            >
              <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white/80 bg-white/10">
                <MapPin className="h-2.5 w-2.5 text-white fill-white" />
              </div>
              <span className="tracking-wide">View on Map</span>
            </button>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-6 gap-2.5">
          {/* Row 1: BHK Tags, Count & Phone Call Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#1865F2] px-4 py-1.5 text-xs font-bold text-white shadow-2xs">
                {chips?.[0] || "3 BHK Apartments"}
              </span>
              <span className="rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-4 py-1.5 text-xs font-bold text-[#1865F2]">
                {chips?.[1] || "4 BHK Apartments"}
              </span>
              <span className="flex h-6 min-w-[24px] px-1.5 items-center justify-center rounded-full border border-[#BFDBFE] bg-white text-xs font-bold text-[#1865F2]">
                {typeof index === "number" ? index + 1 : 1}
              </span>
            </div>

            <a
              href={`tel:${phone}`}
              aria-label="Call Agent"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1865F2] hover:bg-[#1250C4] text-white shadow-md shadow-blue-500/25 transition-transform hover:scale-105 cursor-pointer"
            >
              <PhoneCall className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* Row 2: Title with left blue bar, and Location */}
          <div className="mt-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-[3.5px] h-6 bg-[#1865F2] rounded-full shrink-0" />
              <h3 className="text-[21px] sm:text-[23px] font-bold text-[#0B132B] tracking-tight line-clamp-1">
                {title || "The Terraces at Max Estate 361"}
              </h3>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#475569] font-normal pl-3.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#1865F2] fill-[#1865F2]" />
              <span className="truncate">{location || "Sector 103 , Noida Ext"}</span>
            </p>
          </div>

          {/* Row 3: 3 Specs Feature Box */}
          <div className="mt-3 rounded-[12px] border border-[#CFE2FE] bg-gradient-to-r from-[#F3F8FF] via-[#F8FBFF] to-[#EBF4FE] py-3.5 sm:py-4 px-4 sm:px-6 shadow-[0_2px_10px_rgba(24,101,242,0.06)]">
            <div className="flex items-center justify-between">
              {/* 1. Sq. Ft */}
              <div className="flex items-center gap-2.5 min-w-0">
                <AreaBlueprintIcon />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                    {infoChips?.[0]?.value || "3,200-4,500"}
                  </p>
                  <span className="text-[10.5px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                    {infoChips?.[0]?.label || "Sq. Ft"}
                  </span>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-[#93C5FD]/60 shrink-0 mx-2" />

              {/* 2. Amenities */}
              <div className="flex items-center gap-2.5 min-w-0">
                <AmenitiesClipboardIcon />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                    {infoChips?.[1]?.value || "60%"}
                  </p>
                  <span className="text-[10.5px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                    {infoChips?.[1]?.label || "Amenites"}
                  </span>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-[#93C5FD]/60 shrink-0 mx-2" />

              {/* 3. Ready To Move */}
              <div className="flex items-center gap-2.5 min-w-0">
                <ReadyToMoveIcon />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                    {infoChips?.[2]?.value || "Ready"}
                  </p>
                  <span className="text-[10.5px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                    {infoChips?.[2]?.label || "To Move"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Dealer & Nearby */}
          <div className="mt-3.5 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                  alt="Dealer"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#0B132B] uppercase tracking-wide leading-tight truncate">
                  GOYAL ASSAR
                </p>
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#1865F2] to-[#00C48C] text-white text-[9px] font-bold px-3 py-1.5 rounded-[6px] uppercase mt-1 tracking-wider leading-none shadow-xs">
                  FEATURED DEALER
                </span>
              </div>
            </div>

            <div className="h-7 w-[1px] bg-slate-200 hidden sm:block shrink-0 mx-1" />

            <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
              <span className="text-[11.5px] text-gray-500 font-medium shrink-0">Nearby :</span>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-2.5 py-0.5 text-[10.5px] font-medium text-[#1865F2] whitespace-nowrap">
                  FNG Expressway
                </span>
                <span className="rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-2.5 py-0.5 text-[10.5px] font-medium text-[#1865F2] whitespace-nowrap">
                  APEX Multispeciality...
                </span>
              </div>
            </div>
          </div>

          {/* Row 5: Configurations accordion pill */}
          <div className="mt-3.5 flex items-center justify-between rounded-full border border-slate-200/90 bg-white px-5 py-2.5 text-[12px] text-[#475569] shadow-2xs">
            <span className="truncate">
              Comes with 4bedrooms, 4bedrooms, 4balconies ...
            </span>
            <span className="text-[#1865F2] text-[10px] shrink-0 ml-2 font-bold">▼</span>
          </div>

          {/* Row 6: Pricing & View Details CTA */}
          <div className="mt-3.5 flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100">
            <div className="min-w-0">
              <div className="flex items-baseline">
                <span className="text-[24px] sm:text-[26px] font-extrabold text-[#0B132B] tracking-tight leading-none">
                  {rawPrice}
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-[#0B132B] ml-0.5">*Cr</span>
                <span className="ml-2.5 text-[12.5px] font-bold text-[#00BA7A] line-through">
                  {originalPrice || "₹1.58 Cr"}
                </span>
              </div>
              <span className="block text-[11px] text-[#64748B] font-normal mt-0.5">
                Get upto 33L Off on this property
              </span>
            </div>

            <Link
              href={propertyUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#1865F2] hover:from-[#1865F2] hover:to-[#1250C4] px-7 sm:px-8 py-2.5 sm:py-3 text-[13.5px] font-bold text-white shadow-[0_4px_14px_rgba(24,101,242,0.32)] transition-all hover:gap-2.5 cursor-pointer shrink-0"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Card Layout (Matches Reference Design 1:1 Exactly: 408px x 527px)
  if (layout === "vertical") {
    return (
      <div className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-gradient-to-b from-white via-white to-[#F0F5FF]/70 p-3 sm:p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_20px_38px_-4px_rgba(24,101,242,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_28px_48px_-4px_rgba(24,101,242,0.30)] hover:border-blue-300/80 h-[527px] w-full">
        {/* Top Image & Floating Badges (Figma Rectangle 746) */}
        <div className="relative h-[224px] w-full overflow-hidden rounded-[20px] bg-slate-100 shrink-0">
          <Image
            src={propertyImage}
            alt={title || "Property"}
            fill
            sizes="(max-width: 768px) 100vw, 408px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 z-10">
            {/* Verified Deal Green Pill Badge (#05A579) */}
            <span className="flex items-center gap-1.5 rounded-full bg-[#05A579] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md">
              <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{verifiedText || "VERIFIED DEAL"}</span>
            </span>

            {/* Top Right 3 Round White Action Buttons */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                aria-label="Wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  setLiked((prev) => !prev);
                }}
                className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
              >
                {liked ? (
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                ) : (
                  <Image
                    src="/icon/Group (1).png"
                    alt="Wishlist"
                    width={16}
                    height={14}
                    className="h-4 w-4 object-contain"
                    unoptimized
                  />
                )}
              </button>
              <button
                type="button"
                aria-label="Share"
                onClick={(e) => e.preventDefault()}
                className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
              >
                <Image
                  src="/icon/Group.png"
                  alt="Share"
                  width={15}
                  height={13}
                  className="h-3.5 w-3.5 object-contain"
                  unoptimized
                />
              </button>
              <button
                type="button"
                aria-label="Brochure"
                onClick={(e) => e.preventDefault()}
                className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
              >
                <Image
                  src="/icon/Frame.png"
                  alt="Brochure"
                  width={15}
                  height={17}
                  className="h-4 w-4 object-contain"
                  unoptimized
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className="p-1 pt-3.5 flex flex-col justify-between flex-1">
          {/* BHK Pill Tag */}
          <div>
            <div className="inline-block rounded-full bg-[#EEF5FF] border border-[#BFDBFE] px-3 py-0.5 text-[11.5px] font-medium text-[#1865F2]">
              {formatPropertyChip(chips)}
            </div>

            {/* Title & Phone Call Button */}
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0B132B] tracking-tight truncate">
                {title || "NBCC Aspire Silicon City"}
              </h3>
              <a
                href={`tel:${phone}`}
                aria-label="Call Agent"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1865F2] text-white shadow-md shadow-blue-500/25 transition-transform hover:scale-105 hover:bg-blue-700 cursor-pointer"
              >
                <PhoneCall className="h-4.5 w-4.5 text-white" />
              </a>
            </div>

            {/* Location */}
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#64748B] font-normal">
              <svg className="h-4 w-4 shrink-0 text-[#1865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="truncate">{location || "Sector 76, Noida"}</span>
            </p>

            {/* 3 Spec Features Box (Matches Reference Design 1:1 with soft blue shadow) */}
            <div className="mt-3.5 rounded-[12px] border border-[#BFDBFE] bg-gradient-to-b from-[#F8FAFF] to-[#EDF4FE] py-3 px-3.5 shadow-[0_4px_14px_-2px_rgba(24,101,242,0.12)]">
              <div className="flex items-center justify-between">
                {/* 1. Sq. Ft */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <AreaBlueprintIcon />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                      {infoChips?.[0]?.value || "3,200-4,500"}
                    </p>
                    <span className="text-[10px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                      {infoChips?.[0]?.label || "Sq. Ft"}
                    </span>
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="h-7.5 w-[1px] bg-[#3B82F6]/60 shrink-0 mx-1.5" />

                {/* 2. Amenities */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <AmenitiesClipboardIcon />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                      {infoChips?.[1]?.value || "60%"}
                    </p>
                    <span className="text-[10px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                      {infoChips?.[1]?.label || "Amenites"}
                    </span>
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="h-7.5 w-[1px] bg-[#3B82F6]/60 shrink-0 mx-1.5" />

                {/* 3. Ready To Move */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <ReadyToMoveIcon />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-[#0B132B] leading-tight whitespace-nowrap">
                      {infoChips?.[2]?.value || "Ready"}
                    </p>
                    <span className="text-[10px] text-[#64748B] font-normal block leading-tight mt-0.5 whitespace-nowrap">
                      {infoChips?.[2]?.label || "To Move"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price, Discount & View Details Button */}
          <div className="mt-4 flex items-center justify-between gap-1.5 pt-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline">
                <span className="text-[22px] sm:text-[25px] font-semibold text-[#0B132B] tracking-tight leading-none">
                  {price || "₹1.25* Cr"}
                </span>
                {originalPrice && (
                  <span className="text-[13px] sm:text-[14px] text-[#94A3B8] line-through font-normal ml-2">
                    {originalPrice}
                  </span>
                )}
              </div>
              <div className="mt-1.5">
                <div className="flex items-center gap-1.5">
                  <DiscountBadgeIcon />
                  <p className="text-[13px] sm:text-[13.5px] font-bold text-[#05A579] leading-none whitespace-nowrap">
                    Up to 33L off
                  </p>
                </div>
                <span className="block text-[10.5px] sm:text-[11px] text-[#64748B] font-normal mt-1 whitespace-nowrap truncate">
                  Get upto 13% discount on this property
                </span>
              </div>
            </div>

            <Link
              href={propertyUrl}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[14px] bg-gradient-to-r from-[#1E6BFF] to-[#1865F2] hover:from-[#1865F2] hover:to-[#1250C4] px-4 sm:px-4.5 py-2.5 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:gap-2.5 cursor-pointer shrink-0"
            >
              <span className="whitespace-nowrap">View Details</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Map card layout (Matches Map Popover)
  return (
    <div className="overflow-hidden w-[230px] rounded-2xl bg-white p-2 shadow-xl border border-slate-100">
      <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={propertyImage}
          alt={title || "Property"}
          fill
          sizes="230px"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-1.5 flex justify-center items-center gap-1 z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-xs" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
      </div>

      <div className="p-2 pt-2.5">
        <div className="inline-block rounded-full bg-blue-50/90 border border-blue-200 px-2 py-0.5 text-[9.5px] font-semibold text-[#2563EB]">
          {chips?.[0] || "2, 3 & 4 BHK Apartments"}
        </div>
        <h3 className="mt-1 text-xs font-semibold text-slate-900 truncate">
          {title || "The Terraces at Max Estate 361"}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-slate-500 font-medium">
          <MapPin className="h-3 w-3 shrink-0 text-[#2563EB]" />
          <span className="truncate">{location || "Sector 76, Noida"}</span>
        </p>
        <Link
          href={propertyUrl}
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
        >
          <span>View Details</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

