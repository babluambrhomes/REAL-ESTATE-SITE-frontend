"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, Plus, Diamond, Sparkles } from "lucide-react";

export const PricingHeroPlans = () => {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    toast.success(`Selected ${planName} Plan (${billingCycle})! Redirecting to post your property...`);
    setTimeout(() => {
      router.push(`/post-property?plan=${planName.toLowerCase()}&billing=${billingCycle}`);
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pt-28 sm:pt-32 md:pt-36 pb-24 font-poppins min-h-[900px]">
      
      {/* 1. Top Right Corner Curving Wave Lines (Figma Scaled Subtle 1:1) */}
      <div className="absolute top-4 sm:top-8 right-0 lg:right-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[380px] sm:h-[460px] md:h-[520px] pointer-events-none z-0 select-none opacity-85">
        <Image
          src="/images/premium/wave_lines_right.png"
          alt="Top Right decorative curving wave lines"
          fill
          className="object-contain object-right-top"
          sizes="(max-width: 768px) 200px, 280px"
          priority
        />
      </div>

      {/* 2. Bottom Left Corner Curving Wave Lines (Figma Scaled Subtle 1:1) */}
      <div className="absolute bottom-2 sm:bottom-6 left-0 lg:left-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[380px] sm:h-[460px] md:h-[520px] pointer-events-none z-0 select-none opacity-85">
        <Image
          src="/images/premium/wave_lines_left.png"
          alt="Bottom Left decorative curving wave lines"
          fill
          className="object-contain object-left-bottom"
          sizes="(max-width: 768px) 200px, 280px"
          priority
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0B132B] tracking-tight leading-tight">
            <span className="text-[#1865F2]">Premium</span> Visibility. Better Leads. Bigger Results.
          </h1>
          <p className="mt-3 text-xs sm:text-[14px] text-slate-600 font-medium max-w-2xl mx-auto">
            Put your properties in front of the right audience and grow with powerful Roofin solutions.
          </p>

          {/* Billing Switch Pill (Figma Exact 1:1) */}
          <div className="mt-6 inline-flex items-center gap-1.5 bg-[#0B132B] p-1.5 rounded-full shadow-md">
            <div className="px-3 py-1 bg-black text-[#10B981] text-[11px] font-black rounded-full tracking-wider border border-white/10">
              Save 20%
            </div>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Yearly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards Grid (Figma Exact 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch pt-2">
          
          {/* ----------------- CARD 1: FREE ----------------- */}
          <div className="relative rounded-[22px] bg-white border border-slate-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all">
            {/* Top Orange Border Line (Figma Exact) */}
            <div className="w-full h-[5px] bg-[#F59E0B]" />

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#1865F2] text-white flex items-center justify-center font-bold shadow-2xs">
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xl font-black text-[#0B132B]">Free</span>
                </div>

                {/* Price Block */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-[36px] font-black text-[#0B132B] tracking-tight">
                    ₹00
                  </span>
                  <div className="text-left">
                    <span className="text-xs line-through text-slate-400 font-medium block leading-none">
                      ₹450
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      /per week
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-6">
                  For solo entrepreneurs
                </p>

                {/* Features List */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Up to 3 Property Listings",
                    "Lead Enquiries",
                    "Basic CRM Access",
                    "Performance Insights",
                    "Premium Profile",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("Free")}
                  className="w-full py-3 bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:opacity-95 text-white text-xs font-bold rounded-lg shadow-[0_4px_14px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
                >
                  Start 7 day free trial
                </button>
              </div>
            </div>
          </div>

          {/* ----------------- CARD 2: BASIC ----------------- */}
          <div className="relative rounded-[22px] bg-white border border-slate-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all">
            {/* Top Teal Border Line (Figma Exact) */}
            <div className="w-full h-[5px] bg-[#10B981]" />

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-2xs">
                    <Diamond className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
                  </div>
                  <span className="text-xl font-black text-[#0B132B]">Basic</span>
                </div>

                {/* Price Block */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-[36px] font-black text-[#0B132B] tracking-tight">
                    {billingCycle === "monthly" ? "₹5,999" : "₹4,799"}
                  </span>
                  <div className="text-left">
                    <span className="text-xs line-through text-slate-400 font-medium block leading-none">
                      ₹7,500
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      /for 3 month
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-6">
                  For solo entrepreneurs
                </p>

                {/* Features List */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Everything in Free Trial",
                    "Up to 10 Property Listings",
                    "Qualified Leads",
                    "Advanced CRM",
                    "WhatsApp Integration",
                    "Profile Analytics",
                    "Email & Call Support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("Basic")}
                  className="w-full py-3 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:opacity-95 text-white text-xs font-bold rounded-lg shadow-[0_4px_14px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                >
                  Start 7 day free trial
                </button>
              </div>
            </div>
          </div>

          {/* ----------------- CARD 3: ADVANCED ----------------- */}
          <div className="relative rounded-[22px] bg-white border border-slate-200/90 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all">
            {/* Top Blue Border Line (Figma Exact) */}
            <div className="w-full h-[5px] bg-[#1865F2]" />

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#1865F2] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                    ✕
                  </div>
                  <span className="text-xl font-black text-[#0B132B]">Advanced</span>
                </div>

                {/* Price Block */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-[36px] font-black text-[#0B132B] tracking-tight">
                    {billingCycle === "monthly" ? "₹11,999" : "₹9,599"}
                  </span>
                  <div className="text-left">
                    <span className="text-xs line-through text-slate-400 font-medium block leading-none">
                      ₹15,000
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      /for 6 Month
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-6">
                  As your business scales
                </p>

                {/* Features List */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Up to 25 Property Listings",
                    "Everything in 3 Months",
                    "Priority Leads",
                    "Advanced Analytics",
                    "Premium Profile Visibility",
                    "Dedicated Account Manager",
                    "Priority Support",
                    "24/7 Priority Support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#1865F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("Advanced")}
                  className="w-full py-3 bg-[#1865F2] hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-[0_4px_14px_rgba(24,101,242,0.35)] transition-all cursor-pointer"
                >
                  Start 7 day free trial
                </button>
              </div>
            </div>
          </div>

          {/* ----------------- CARD 4: PLUS (HERO GRADIENT CARD) ----------------- */}
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#06B6D4] via-[#0284C7] to-[#1E40AF] text-white shadow-[0_16px_45px_rgba(2,132,199,0.35)] flex flex-col justify-between overflow-hidden border border-cyan-300/40 transform lg:translate-y-2 hover:scale-[1.02] transition-transform duration-300">
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xl font-black tracking-tight">Plus</span>
                </div>

                {/* Price Block */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-[36px] font-black tracking-tight">
                    {billingCycle === "monthly" ? "₹23,999" : "₹19,199"}
                  </span>
                  <div className="text-left">
                    <span className="text-xs line-through text-white/70 font-medium block leading-none">
                      ₹30,000
                    </span>
                    <span className="text-[11px] text-white/90 font-medium block">
                      /for 1 Year
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/80 font-medium mb-6">
                  For more complex businesses
                </p>

                {/* Features List */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Everything in 6 Months",
                    "Unlimited Property Listings",
                    "Premium Visibility",
                    "Builder/Agent Showcase",
                    "Project Promotion",
                    "Advanced Lead Management",
                    "Priority Lead Access",
                    "24/7 Priority Support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white font-medium">
                      <div className="w-4 h-4 rounded-full bg-white text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("Plus")}
                  className="w-full py-3 bg-white hover:bg-slate-50 text-[#0284C7] text-xs font-black rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all cursor-pointer"
                >
                  Start 7 day free trial
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
