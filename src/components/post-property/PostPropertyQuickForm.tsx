"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type UserType = "owner" | "broker";
type ListingMode = "post" | "import";
type PropertyCategory = "residential" | "commercial";
type IntentType = "rent" | "sell" | "pg";

export const PostPropertyQuickForm = () => {
  const [userType, setUserType] = useState<UserType>("owner");
  const [listingMode, setListingMode] = useState<ListingMode>("post");
  const [category, setCategory] = useState<PropertyCategory>("residential");
  const [intent, setIntent] = useState<IntentType>("rent");
  const [subType, setSubType] = useState<string>("Flat/Apartment");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    toast.success("Verification code sent! Proceeding with listing...");
  };

  return (
    <div 
      className="relative w-full max-w-[379px] font-jakarta"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(59, 130, 246, 0.28))",
      }}
    >
      {/* White Card Shell with custom top stepped shape */}
      <div className="relative w-full bg-white rounded-[28px] overflow-hidden border border-slate-100">
        
        {/* 1. Header Section: Owner + Attached Slanted Broker/Builder Block */}
        <div className="relative w-full h-[52px] bg-white flex items-center">
          
          {/* Owner Tab Area (Left) */}
          <button
            type="button"
            onClick={() => setUserType("owner")}
            className="h-full pl-6 pr-4 flex items-center z-10 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className={`text-[18px] font-extrabold tracking-tight transition-colors ${userType === "owner" ? "text-[#00D084]" : "text-slate-400"}`}>
              Owner
            </span>
          </button>

          {/* Attached Slanted Broker/Builder Block (Teal-to-Blue Gradient with chamfered top-right) */}
          <div 
            className="absolute top-0 bottom-0 left-[110px] right-0 flex items-center justify-center pl-6 pr-5 z-20 cursor-pointer transition-all duration-200"
            onClick={() => setUserType("broker")}
            style={{
              background: userType === "broker"
                ? "linear-gradient(110deg, #00D084 0%, #00B894 15%, #1865F2 40%, #1250CF 100%)"
                : "linear-gradient(110deg, #00D084 0%, #00B894 15%, #1865F2 40%, #1250CF 100%)",
              clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <span className="text-[15px] font-bold text-white tracking-tight pl-2 whitespace-nowrap">
              Broker/Builder
            </span>
          </div>
        </div>

        {/* 2. Main Form Content Body */}
        <div className="px-5 sm:px-6 pt-3 pb-5 space-y-3.5">
          
          {/* Subtitle */}
          <p className="text-[12px] leading-snug text-slate-800 font-medium">
            Create Your Property Listing with Roofin-
            <span className="font-bold text-black">Simple. Fast. Free.</span>
          </p>

          {/* Tabs: Post listing vs Import listing */}
          <div className="relative border-b border-slate-200 pb-2 flex items-center gap-6 text-[13.5px]">
            <button
              type="button"
              onClick={() => setListingMode("post")}
              className={`font-semibold pb-1 cursor-pointer transition-colors ${
                listingMode === "post"
                  ? "text-[#1865F2]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Post listing
              {listingMode === "post" && (
                <span className="absolute bottom-[-1px] left-0 w-[80px] h-[2px] bg-[#1865F2]" />
              )}
            </button>

            <div className="flex items-center gap-1.5 text-slate-600 select-none">
              <span className="font-normal text-slate-600 text-[13.5px]">Import listing</span>
              <span className="text-[9.5px] font-semibold bg-[#FEF3C7] text-[#92400E] px-2 py-0.2 rounded-[4px] border border-[#FDE68A]">
                Coming
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Section 1: Property Type */}
            <div>
              <label className="block text-[12px] text-slate-600 mb-1.5 font-normal">
                Property Type
              </label>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setCategory("residential");
                    setSubType("Flat/Apartment");
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-[10px] text-[13px] transition-all cursor-pointer ${
                    category === "residential"
                      ? "bg-gradient-to-r from-[#B9E5E8]/80 to-[#DCEBFE] text-[#1865F2] font-semibold border border-[#93C5FD]/60 shadow-2xs"
                      : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                  }`}
                >
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("commercial");
                    setSubType("Commercial Office");
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-[10px] text-[13px] transition-all cursor-pointer ${
                    category === "commercial"
                      ? "bg-gradient-to-r from-[#B9E5E8]/80 to-[#DCEBFE] text-[#1865F2] font-semibold border border-[#93C5FD]/60 shadow-2xs"
                      : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Section 2: you 're looking to.. */}
            <div>
              <label className="block text-[12px] text-slate-600 mb-1.5 font-normal">
                you &apos;re looking to..
              </label>
              <div className="flex gap-2">
                {(["rent", "sell", "pg"] as IntentType[]).map((type) => {
                  const labelMap = {
                    rent: "Rent",
                    sell: "Sell",
                    pg: "PG/Co-living",
                  };
                  const isSelected = intent === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setIntent(type)}
                      className={`flex-1 py-1.5 px-2 rounded-[10px] text-[13px] transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#B9E5E8]/80 to-[#DCEBFE] text-[#1865F2] font-semibold border border-[#93C5FD]/60 shadow-2xs"
                          : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                      }`}
                    >
                      {labelMap[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: And it's a.. (Subtype Pills) */}
            <div>
              <label className="block text-[12px] text-slate-600 mb-1.5 font-normal">
                And it&apos;s a..
              </label>
              <div className="space-y-1.5">
                {/* Row 1 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubType("Flat/Apartment")}
                    className={`py-1.5 px-3.5 rounded-full text-[12px] transition-all cursor-pointer ${
                      subType === "Flat/Apartment"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Flat/Apartment
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType("Independent House/Villa")}
                    className={`flex-1 py-1.5 px-3.5 rounded-full text-[12px] transition-all cursor-pointer text-center truncate ${
                      subType === "Independent House/Villa"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Independent House/Villa
                  </button>
                </div>

                {/* Row 2 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubType("Builder Floor")}
                    className={`py-1.5 px-3.5 rounded-full text-[12px] transition-all cursor-pointer ${
                      subType === "Builder Floor"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Builder Floor
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType("Serviced Apartment")}
                    className={`flex-1 py-1.5 px-3.5 rounded-full text-[12px] transition-all cursor-pointer text-center truncate ${
                      subType === "Serviced Apartment"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Serviced Apartment
                  </button>
                </div>

                {/* Row 3 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubType("Farmhouse")}
                    className={`py-1.5 px-4 rounded-full text-[12px] transition-all cursor-pointer ${
                      subType === "Farmhouse"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Farmhouse
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType("Other")}
                    className={`py-1.5 px-5 rounded-full text-[12px] transition-all cursor-pointer ${
                      subType === "Other"
                        ? "bg-[#DCEBFE] text-[#1865F2] border border-[#1865F2]/50 font-semibold"
                        : "bg-white text-slate-800 border border-slate-300 hover:border-slate-400 font-normal"
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>
            </div>

            {/* Section 4: Mobile number */}
            <div className="pt-0.5">
              <label className="block text-[12px] text-slate-600 mb-1 font-normal">
                Mobile number
              </label>
              <div className="flex items-center rounded-[8px] border border-slate-300 bg-white px-2.5 py-1.5 focus-within:border-[#1865F2] focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                <span className="text-[12.5px] text-slate-800 pr-2 border-r border-slate-300 select-none font-normal flex items-center gap-1">
                  +91 <span className="text-[9px] text-slate-500">▼</span>
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Enter your number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-transparent pl-2.5 text-[12.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none font-normal"
                />
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-slate-800">
                  Are you a registered user?{" "}
                  <Link href="/login" className="font-semibold text-[#1865F2] hover:underline">
                    Login
                  </Link>
                </span>
              </div>
            </div>

            {/* Section 5: Proceed Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-[10px] bg-[#00D084] text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(0,208,132,0.35)] hover:bg-[#00BA76] active:scale-[0.99] transition-all cursor-pointer tracking-wide"
            >
              Proceed
            </button>
          </form>

          {/* Section 6: Footer WhatsApp Option */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
            <span>Need another way?</span>
            <div className="flex items-center gap-1.5 text-slate-800 font-normal">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] text-white text-[9px] font-bold">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                </svg>
              </span>
              <span className="text-[11px]">Post property via Whatsapp</span>
              <span className="text-[9.5px] font-semibold bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.2 rounded-[4px] border border-[#FDE68A] ml-0.5">
                Coming
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
