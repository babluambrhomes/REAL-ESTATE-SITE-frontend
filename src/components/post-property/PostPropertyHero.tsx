"use client";

import Image from "next/image";
import { PostPropertyQuickForm } from "./PostPropertyQuickForm";
import { PostPropertyStats } from "./PostPropertyStats";

export const PostPropertyHero = () => {
  const checkPoints = [
    "Free Property Listing",
    "Verified Buyer & Tenant Leads",
    "Dedicated Builder & Agent Dashboard",
    "Unlimited Property Listings",
    "Instant Listing Approval",
    "Easy Lead Management",
    "Mobile & Email Verification",
  ];

  return (
    <section 
      className="relative pt-24 sm:pt-28 pb-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(196, 214, 255, 0.30) 0%, rgba(126, 188, 245, 0.00) 100%)",
      }}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Value Checklist */}
          <div className="lg:col-span-5 space-y-4">
            <h1 className="text-[28px] sm:text-[34px] xl:text-[38px] font-bold text-[#1865F2] leading-[1.2] tracking-tight font-jakarta">
              <span className="block whitespace-nowrap">
                One Platform For Selling &amp; Renting
              </span>
              <span className="block mt-1 whitespace-nowrap">
                Properties{" "}
                <span className="relative inline-block text-[#00D084]">
                  With Roofin.Com
                  {/* Blue Crayon / Chalk Underline placed snuggly under the letters */}
                  <span className="absolute bottom-[2px] sm:bottom-[3px] left-0 w-full flex pointer-events-none select-none">
                    <Image
                      src="/post-property/blue_brush_stroke.png"
                      alt=""
                      width={218}
                      height={18}
                      className="w-full h-[8px] sm:h-[10px] object-contain"
                      priority
                    />
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed max-w-[420px] font-medium">
              Join Thousands Of Builders, Brokers, And Agents Who Trust Roofin To
              Connect With Genuine Buyers And Tenants.
            </p>

            {/* Checklist with verified style checkmark boxes */}
            <div className="space-y-2 pt-1">
              {checkPoints.map((text, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.8px] border-[#1865F2] bg-white text-[#1865F2] shrink-0 shadow-2xs">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13 4.5L6.5 11.5L3 8"
                        stroke="#1865F2"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-700">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: High-Res 3D Laptop + Spaced Out Floating Badges + Arrow */}
          <div className="lg:col-span-3 xl:col-span-3 flex items-center justify-center relative py-6">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px] xl:max-w-[360px] flex items-center justify-center">
              
              {/* Soft Radial Backdrop Glow */}
              <div className="absolute inset-0 bg-blue-100/40 rounded-full blur-2xl -z-10 scale-110 pointer-events-none" />

              {/* Curved Indicator Arrow pointing to laptop */}
              <svg 
                className="absolute -top-6 right-[-10px] sm:right-[0px] w-14 h-24 pointer-events-none z-10" 
                viewBox="0 0 60 100" 
                fill="none"
              >
                <path
                  d="M 50 85 C 62 35, 25 5, 8 16"
                  stroke="url(#arrowGrad)"
                  strokeWidth="1.8"
                  fill="none"
                />
                <polygon points="6,10 2,18 10,18" fill="#1865F2" />
                <defs>
                  <linearGradient id="arrowGrad" x1="1" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#00D084" />
                    <stop offset="100%" stopColor="#1865F2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Badge 1: New Lead Received (Spaced Top-Left) */}
              <div className="absolute -top-6 sm:-top-7 left-[-32px] sm:left-[-42px] xl:left-[-50px] bg-white rounded-[14px] p-2 sm:p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100/80 flex items-center gap-2 z-20 transform hover:scale-105 transition-transform duration-200 select-none">
                <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">New Lead Received!</div>
                  <div className="text-[9px] sm:text-[9.5px] text-slate-500 font-medium leading-tight mt-0.5">3 BHK Apartment</div>
                  <div className="text-[8.5px] sm:text-[9px] text-slate-400 leading-tight">Sector 62, Noida</div>
                </div>
              </div>

              {/* Center 3D Laptop Image */}
              <div className="relative w-full z-10">
                <Image
                  src="/post-property/hero_laptop_3d.png"
                  alt="Roofin Property Selling Platform"
                  width={380}
                  height={310}
                  className="w-full h-auto object-contain drop-shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
              </div>

              {/* Floating Badge 2: Verified Seller (Spaced Bottom-Left) */}
              <div className="absolute bottom-[10%] sm:bottom-[12%] left-[-26px] sm:left-[-36px] xl:left-[-44px] bg-white rounded-[14px] px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100/80 flex items-center gap-2 z-20 select-none transform hover:scale-105 transition-transform duration-200">
                <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-emerald-100/70 border border-emerald-500 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11.5px] sm:text-[12px] font-bold text-slate-800 leading-none">Verified</div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-500 font-medium leading-none mt-1">Seller</div>
                </div>
              </div>

              {/* Floating Badge 3: Leads This Month (Spaced Bottom-Center) */}
              <div className="absolute -bottom-7 sm:-bottom-8 left-[18%] sm:left-[22%] bg-white rounded-[14px] pt-2 px-3 pb-1 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100/80 z-20 min-w-[125px] select-none transform hover:scale-105 transition-transform duration-200">
                <div className="text-[9.5px] sm:text-[10px] text-slate-600 font-medium">Leads This Month</div>
                <div className="text-[13.5px] sm:text-[14px] font-extrabold text-[#00D084] leading-tight">+35.6%</div>
                <svg className="w-full h-4 sm:h-5 mt-0.5" viewBox="0 0 100 24" fill="none">
                  <path d="M0 18 Q 25 22 45 14 T 85 8 T 100 4 L 100 24 L 0 24 Z" fill="url(#waveGradHero)" />
                  <path d="M0 18 Q 25 22 45 14 T 85 8 T 100 4" stroke="#93C5FD" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="waveGradHero" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Badge 4: Luxury Villa (Spaced Right) */}
              <div className="absolute top-[22%] sm:top-[26%] right-[-34px] sm:right-[-44px] xl:right-[-52px] bg-white rounded-[14px] p-2 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100/80 z-20 w-[116px] sm:w-[122px] select-none transform hover:scale-105 transition-transform duration-200">
                <div className="w-full h-[44px] sm:h-[48px] rounded-[6px] overflow-hidden relative mb-1.5 bg-slate-100">
                  <Image
                    src="/post-property/villa_thumb.png"
                    alt="Luxury Villa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 truncate">Luxury Villa</div>
                <div className="text-[8px] sm:text-[8.5px] text-slate-500 flex items-center gap-0.5 truncate mt-0.5">
                  <span className="text-[#1865F2]">📍</span> Sector 103, Noida Ext
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[7px] sm:text-[7.5px] text-slate-400 line-through">₹1.58 Cr</span>
                  <span className="text-[9px] sm:text-[9.5px] font-bold text-[#1865F2]">₹1.25* Cr</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Quick Post Property Form (Shifted further down) */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end pt-6 sm:pt-10">
            <PostPropertyQuickForm />
          </div>

        </div>

        {/* 4 Stats Cards Bar */}
        <PostPropertyStats />
      </div>
    </section>
  );
};
