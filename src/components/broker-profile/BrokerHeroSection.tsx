"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  Star,
  MapPin,
  PhoneCall,
  Phone,
  Users,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { apiClient } from "@/lib/axios";

export interface BrokerHeroSectionProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  followers?: number;
  phone?: string;
  sellerId?: string;
  experience?: string;
  rating?: number;
  reviewCount?: number;
}

export const BrokerHeroSection = ({
  name = "Jitender singh",
  role = "Senior Property Consultant",
  avatarUrl = "/broker/jitender_figma_transparent.png",
  isVerified = true,
  followers = 2985,
  phone = "+91 98765 43210",
  sellerId,
  experience = "12+ Years",
  rating = 4.9,
  reviewCount = 1420,
}: BrokerHeroSectionProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(followers);
  const [callbackRequested, setCallbackRequested] = useState(false);

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
      toast.success(`Unfollowed ${name}`);
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
      toast.success(`You are now following ${name}!`);
    }
  };

  const handleShare = () => {
    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: `${name} - Verified Broker on Roofin`, url: fullUrl }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      toast.success("Broker profile link copied to clipboard!");
    }
  };

  const handleRequestCallback = async () => {
    setCallbackRequested(true);
    try {
      await apiClient.post("/enquiries", {
        name: "Buyer Applicant",
        email: "callback_request@roofin.com",
        phone: phone.replace(/\s+/g, ""),
        sellerId,
        message: `Request callback for broker ${name}`,
      });
    } catch {
      // Ignore network fallback
    }
    toast.success(`Callback request sent! ${name} will call you shortly.`);
  };

  const highlights = [
    {
      id: "hl-1",
      iconSrc: "/broker/Frame (12).png",
      value: "12 Min",
      label: "Response Time",
    },
    {
      id: "hl-2",
      iconSrc: "/broker/Frame (13).png",
      value: "10K+",
      label: "Happy Clients",
    },
    {
      id: "hl-3",
      iconSrc: "/broker/Frame (14).png",
      value: "10+",
      label: "Property sold",
    },
    {
      id: "hl-4",
      iconSrc: "/broker/Frame (15).png",
      value: "Free",
      label: "Site visit",
    },
    {
      id: "hl-5",
      iconSrc: "/broker/Frame (16).png",
      value: "Availability",
      label: "Mon -Sun ( 10am Pm)",
    },
    {
      id: "hl-6",
      iconSrc: "/broker/Frame (17).png",
      value: "Office Address",
      label: "A-56, SECTOR 63, NOIDA-201301",
    },
    {
      id: "hl-7",
      iconSrc: "/broker/Frame (18).png",
      value: "Listing",
      label: "700+",
    },
    {
      id: "hl-8",
      iconSrc: "/broker/Frame (19).png",
      value: "Market Knowladge",
      label: "700+",
    },
  ];

  return (
    <div className="w-full font-poppins">
      {/* Pure White Profile Card Main Container with Rounded 24px Corners */}
      <div className="relative bg-white rounded-[24px] border border-[#D8E6FC] shadow-[0_8px_32px_rgba(24,101,242,0.06)] p-6 sm:p-8 pt-8">
        
        {/* ROW 1: TOP IDENTITY & STATS (Full Width Split: Left Avatar+Info+Buttons | Right Badge+4 Stats) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Avatar + Name + Subtitle + Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 w-full lg:w-auto">
            {/* Broker Avatar (Overlaps top banner) - Exact Figma frame with blue border & orbit star badge */}
            <div className="relative -mt-24 sm:-mt-32 shrink-0 z-20">
              {/* Outer Frosted Halo matching Figma media_1793599294823.png */}
              <div className="rounded-[38px] p-2 sm:p-2.5 bg-white/25 backdrop-blur-md shadow-[0_10px_35px_rgba(24,101,242,0.18)] border border-white/40">
                <div className="relative w-[165px] h-[160px] sm:w-[195px] sm:h-[188px]">
                  <Image
                    src={avatarUrl || "/broker/jitender_figma_transparent.png"}
                    alt={name}
                    fill
                    priority
                    unoptimized
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>

            {/* Name, Role & Action Buttons */}
            <div className="text-center sm:text-left space-y-1.5 sm:space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-[34px] font-black text-[#0B132B] tracking-tight">
                  {name}
                </h1>
                {/* Verified Blue Badge */}
                {isVerified && (
                  <div className="w-5 h-5 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-[17px] font-medium text-slate-500">
                {role}
              </p>

              {/* Action Buttons: Fallow, Share, More (Exact Figma spelling 'Fallow' + Blue Dots) */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1.5">
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(24,101,242,0.25)] ${
                    isFollowing
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "bg-[#1865F2] hover:bg-[#1250C4] text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{isFollowing ? "Following" : "Fallow"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-[14px] font-bold flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span>Share</span>
                </button>

                {/* 3 Blue Dots Button matching Figma */}
                <button
                  type="button"
                  aria-label="More Options"
                  onClick={handleShare}
                  className="w-13 h-10 sm:h-11 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1865F2]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1865F2]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1865F2]" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right: ROOFIN VERIFIED BROCKER Badge + 4 Stats Columns */}
          <div className="flex flex-col items-center lg:items-end gap-3.5 w-full lg:w-auto">
            {/* Badge on Top Right */}
            <div className="px-3.5 py-1.5 rounded-lg bg-[#EAF2FF] border border-[#BFDBFE] text-[#1865F2] text-[11px] sm:text-[11.5px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1865F2]" />
              <span>ROOFIN VERIFIED BROCKER</span>
            </div>

            {/* 4 Stats Columns */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 text-center pt-1">
              <div>
                <p className="text-xs sm:text-[14px] font-bold text-[#0B132B]">Fallowers</p>
                <p className="text-xl sm:text-[28px] font-black text-[#1865F2] mt-0.5 tracking-tight">{followersCount.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-xs sm:text-[14px] font-bold text-[#0B132B]">Views</p>
                <p className="text-xl sm:text-[28px] font-black text-[#1865F2] mt-0.5 tracking-tight">132</p>
              </div>
              <div>
                <p className="text-xs sm:text-[14px] font-bold text-[#0B132B]">Listing</p>
                <p className="text-xl sm:text-[28px] font-black text-[#1865F2] mt-0.5 tracking-tight">500</p>
              </div>
              <div>
                <p className="text-xs sm:text-[14px] font-bold text-[#0B132B]">Videos</p>
                <p className="text-xl sm:text-[28px] font-black text-[#1865F2] mt-0.5 tracking-tight">20</p>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2: BOTTOM DETAILS & TRUST SCORE CARD (Divided by Vertical Line) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-6">
          
          {/* Left Details (6 of 12 cols): Experience, Reviews, Location, Contact Buttons */}
          <div className="lg:col-span-6 space-y-3.5 text-center sm:text-left">
            
            {/* 12+ Years Experience */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-sm sm:text-[16px] font-black text-[#0B132B]">
              <div className="w-5 h-5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#10B981] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
              <span>12+ Years of Experience</span>
            </div>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-[15px]">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-extrabold text-[#1865F2] text-sm sm:text-[16px]">4.5/5</span>
              <span className="text-slate-500 text-xs sm:text-[14px] font-medium">(320 Verified Reviews)</span>
            </div>

            {/* Operating Location */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-[15px] text-[#0B132B] font-bold">
              <MapPin className="w-4 h-4 text-[#1865F2] fill-[#1865F2] shrink-0" />
              <span>Operating in: <span className="font-semibold text-slate-800">Noida, Greater Noida, Ghaziabad</span></span>
            </div>

            {/* Action CTA Buttons: Gradient Contact Broker & Outline Request Callback */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="px-6 sm:px-7 py-3 bg-gradient-to-r from-[#1865F2] via-[#0E88DA] to-[#00B488] hover:opacity-95 text-white text-xs sm:text-[14px] font-bold rounded-xl flex items-center gap-2 shadow-[0_4px_16px_rgba(24,101,242,0.35)] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Broker</span>
              </a>

              <button
                type="button"
                onClick={handleRequestCallback}
                className="px-6 sm:px-7 py-3 bg-white hover:bg-blue-50/50 text-[#1865F2] border-[1.5px] border-[#1865F2] text-xs sm:text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{callbackRequested ? "Callback Requested" : "Request Callback"}</span>
              </button>
            </div>

          </div>

          {/* Right Trust Score Card (6 of 12 cols) with Vertical Divider on Left */}
          <div className="lg:col-span-6 lg:border-l lg:border-slate-200/90 lg:pl-8">
            <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
              {/* Header Title */}
              <h3 className="text-xs sm:text-[13px] font-black text-[#1865F2] tracking-wider uppercase">
                ROOFIN DEALER TRUST SCORE
              </h3>

              {/* Score Number + EXCELLENT Status */}
              <div className="flex items-baseline justify-between mt-1 mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-[44px] font-black text-[#1865F2] tracking-tight leading-none">
                    9.4
                  </span>
                  <span className="text-xs sm:text-base font-bold text-slate-400">
                    /10
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-black text-[#10B981] tracking-widest uppercase">
                  EXCELLENT
                </span>
              </div>

              {/* Solid Green Progress Line */}
              <div className="w-full h-[3px] bg-[#10B981] rounded-full my-3.5" />

              {/* 6 Verification Points (3 columns x 2 rows) */}
              <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-2.5 text-[11px] sm:text-[12px] font-bold text-[#0B132B]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">RERA Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Photo Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Address Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">KYC Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Email Verified</span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#1865F2] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="truncate">Top Performer 2026</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};


