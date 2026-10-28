"use client";

import { useState } from "react";
import Image from "next/image";
import { Rocket, Check, Sparkles, Zap, ShieldCheck, Flame, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface PortalBoostPropertyProps {
  onBack: () => void;
}

const BOOST_PLANS = [
  {
    id: "plan-7",
    name: "Starter Rocket",
    tagline: "Great for quick visibility",
    duration: "7 Days",
    multiplier: "3x Leads",
    price: "₹ 999",
    features: [
      "Top 5 placement in area search",
      "Featured badge on card",
      "SMS alerts to 25 verified buyers",
      "Performance report after 7 days",
    ],
    popular: false,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "plan-30",
    name: "Pro Growth",
    tagline: "Best value for genuine sellers",
    duration: "30 Days",
    multiplier: "5x Leads",
    price: "₹ 2,499",
    features: [
      "Top banner placement across portals",
      "Verified Seller checkmark",
      "WhatsApp broadcast to 150+ buyers",
      "Dedicated buyer enquiry manager",
      "Priority customer support",
    ],
    popular: true,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "plan-vip",
    name: "VIP Spotlight",
    tagline: "Maximum reach for premium homes",
    duration: "60 Days",
    multiplier: "10x Leads",
    price: "₹ 4,999",
    features: [
      "Guaranteed #1 placement in locality",
      "Professional 3D Tour promotion",
      "Direct calls forwarded to you",
      "Unlimited buyer matching alerts",
      "Free legal & documentation support",
    ],
    popular: false,
    color: "from-amber-500 to-rose-600",
  },
];

export const PortalBoostProperty = ({ onBack }: PortalBoostPropertyProps) => {
  const [selectedPlan, setSelectedPlan] = useState("plan-30");
  const [selectedProperty, setSelectedProperty] = useState("prop-1");

  const handleActivateBoost = (planName: string) => {
    toast.success(`${planName} activated successfully! Your listing is now boosted.`);
  };

  return (
    <div className="space-y-6 font-poppins pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1865F2] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Rocket size={12} />
              Boost Property
            </span>
          </div>
          <h2 className="text-[22px] font-bold text-[#0B132B]">
            Get Up to 10x More Genuine Buyer Leads
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Boosted properties sell 3x faster with top search ranking and buyer alerts.
          </p>
        </div>

        {/* Property Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">
            Select Property:
          </label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white shadow-2xs focus:outline-none focus:border-[#1865F2]"
          >
            <option value="prop-1">3 BHK Apartment • Sector 124, Noida</option>
            <option value="prop-2">3 BHK Villa • Noida Extension</option>
            <option value="prop-3">4 BHK Penthouse • Sector 150</option>
          </select>
        </div>
      </div>

      {/* Boost Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BOOST_PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`rounded-2xl border transition-all p-6 bg-white flex flex-col justify-between relative cursor-pointer ${
                isSelected
                  ? "border-2 border-[#1865F2] shadow-md ring-2 ring-blue-100"
                  : "border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1865F2] text-white font-bold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Flame size={12} />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {plan.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold text-xs">
                    {plan.multiplier}
                  </span>
                </div>

                <div>
                  <h3 className="text-[19px] font-bold text-[#0B132B]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{plan.tagline}</p>
                </div>

                <div className="pt-2 pb-1 border-y border-slate-100">
                  <span className="text-2xl font-black text-[#0B132B]">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    / {plan.duration}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivateBoost(plan.name);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-[#1865F2] hover:bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  <Zap size={14} />
                  <span>Activate {plan.name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Notice */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={28} className="text-[#1865F2] shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-[#0B132B]">
              100% Genuine Buyer Guarantee
            </h4>
            <p className="text-[11px] text-slate-500">
              All leads generated through Boost campaigns are OTP-verified phone numbers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
        >
          Back to Properties
        </button>
      </div>
    </div>
  );
};
