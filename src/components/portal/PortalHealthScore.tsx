"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Calendar,
  Eye,
  Check,
  AlertTriangle,
  Building,
  TrendingUp,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  Layers,
  Home,
} from "lucide-react";

interface PortalHealthScoreProps {
  onBack?: () => void;
  onViewDiagnosis?: () => void;
}

export const PortalHealthScore = ({
  onBack,
  onViewDiagnosis,
}: PortalHealthScoreProps) => {
  const [timeFilter, setTimeFilter] = useState("Last 7 days");

  return (
    <div className="space-y-6 font-poppins pb-12">
      {/* 1. Breadcrumb & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-[#1865F2] cursor-pointer transition-colors"
          >
            Properties
          </button>
          <ChevronRight size={13} />
          <span className="text-slate-700 font-medium truncate">
            The terraces at max estate 361
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B]">
              Properties health score
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              See how your listing is performing and what you can do to get more views, leads and enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onViewDiagnosis}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1865F2] text-xs font-bold transition-colors cursor-pointer"
            >
              Performance Diagnosis ➔
            </button>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-2xs">
              <Calendar size={14} className="text-slate-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Row: Property Summary Card + Buyer Ready Score (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Property Overview (Span 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row gap-5">
          {/* Property Image with Badge */}
          <div className="relative w-full md:w-56 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 border border-slate-100">
            <Image
              src="/images/properties/tower-popular-figma.jpg"
              alt="The Terraces At Max Estate 361"
              fill
              className="object-cover"
            />
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
              On Going
            </span>
            <button
              type="button"
              className="absolute bottom-2.5 left-2.5 right-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Eye size={13} />
              <span>View on portal</span>
            </button>
          </div>

          {/* Details & Specs */}
          <div className="flex-1 space-y-3 min-w-0">
            <div>
              <h3 className="text-base font-bold text-[#0B132B] truncate">
                The Terraces At Max Estate 361
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <span className="text-[#1865F2]">📍</span>
                <span>3 BHK . Apartment . Sector 124, Noida</span>
              </p>
            </div>

            {/* 6 Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-sm">₹</span>
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">₹ 1.2 Cr</span>
                  <span className="text-[10px] text-slate-400">Starting Price</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Maximize2 size={14} className="text-slate-500" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">3,200-4,500 Sq. Ft</span>
                  <span className="text-[10px] text-slate-400">Area</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Building size={14} className="text-slate-500" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">Ready to move</span>
                  <span className="text-[10px] text-slate-400">Status</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Layers size={14} className="text-slate-500" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">2 floors</span>
                  <span className="text-[10px] text-slate-400">Floor number</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Home size={14} className="text-slate-500" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">3 BHK</span>
                  <span className="text-[10px] text-slate-400">Configuration</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck size={14} className="text-emerald-500" />
                <div>
                  <span className="font-bold text-slate-800 block text-[11.5px]">Rera approved</span>
                  <span className="text-[10px] text-slate-400">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Buyer Ready Score 82% (Span 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#0B132B]">Buyer Ready Score</h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              Last Updated 2 Hours Ago <span className="w-2 h-2 rounded-full border border-slate-300 inline-block" />
            </span>
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* Circular Gauge 82% */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#00C49F"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-[#0B132B]">82%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Buyer Ready</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-xs text-slate-700 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <span className="font-medium text-slate-800 text-[11.5px]">Basic</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <span className="font-medium text-slate-800 text-[11.5px]">Location</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                  !
                </div>
                <span className="font-medium text-slate-800 text-[11.5px]">Details (Recommended)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300" />
                <span className="text-[11.5px]">Price (Recommended)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300" />
                <span className="text-[11.5px]">Amenities (Recommended)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300" />
                <span className="text-[11.5px]">Media (Recommended)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300" />
                <span className="text-[11.5px]">Preview (recommended)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Section Wise Completion (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#0B132B]">
              Section Wise Completion
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete All Sections To Get Maximum Visibility And Better Leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600">
              3 out of 16 completed
            </span>
            <div className="w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[70%] h-full bg-[#1865F2]" />
            </div>
            <span className="text-xs font-bold text-[#0B132B]">70%</span>
          </div>
        </div>

        {/* 6 Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            {
              id: "basic",
              title: "Basic Details",
              pct: 100,
              icon: "📋",
              action: "READD",
              isAdd: false,
            },
            {
              id: "details",
              title: "Details",
              pct: 100,
              icon: "📑",
              action: "READD",
              isAdd: false,
            },
            {
              id: "amenities",
              title: "Amenities",
              pct: 100,
              icon: "🏊",
              action: "READD",
              isAdd: false,
            },
            {
              id: "location",
              title: "Location",
              pct: 0,
              icon: "📍",
              action: "ADD",
              isAdd: true,
            },
            {
              id: "price",
              title: "Price",
              pct: 0,
              icon: "🏷️",
              action: "ADD",
              isAdd: true,
            },
            {
              id: "media",
              title: "Media",
              pct: 0,
              icon: "📷",
              action: "ADD",
              isAdd: true,
            },
          ].map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center text-lg shrink-0">
                  {sec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-[#0B132B] truncate">
                      {sec.title}
                    </h5>
                    <span
                      className={`text-[11px] font-bold ${
                        sec.pct > 0 ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {sec.pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${
                        sec.pct > 0 ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                      style={{ width: `${sec.pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-[#1865F2] hover:text-[#1865F2] text-[11px] font-bold text-slate-600 flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              >
                <span>{sec.action}</span>
                <Plus size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Row: Benefits + Recommendations (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Benefits Of A Higher Health Score (Span 6) */}
        <div className="lg:col-span-6 rounded-2xl border border-emerald-200/70 bg-[#E8F8F2] p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-[#0B132B]">
              Benefits Of A Higher Health Score
            </h4>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Eye size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">More Visibility</h5>
                  <p className="text-[11px] text-slate-600">Appear Higher In Search Results</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">Better Leads</h5>
                  <p className="text-[11px] text-slate-600">Get Genuine And Serious Enquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">Fast Deals</h5>
                  <p className="text-[11px] text-slate-600">Well Optimised Properties Sell/Rent Quicker</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Modern building illustration with green growth arrow */}
          <div className="relative w-44 h-36 self-end -mt-8 opacity-90">
            <Image
              src="/banner/price_trends.png"
              alt="Growth"
              fill
              className="object-contain"
              onError={(e) => {
                (e.target as any).src = "/post-property/property_submitted_success.png";
              }}
            />
          </div>
        </div>

        {/* Right: Recommendation to improve your score (Span 6) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3.5">
          <h4 className="text-base font-bold text-[#0B132B]">
            Recommendation to improve your score
          </h4>

          <div className="space-y-3">
            {[
              {
                id: "photo",
                icon: "🖼️",
                title: "Add high quality interior photo",
                desc: "Properties with 15+ photos get 2x more views.",
                btn: "Add photo",
                pct: "+15%",
                badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
              },
              {
                id: "price",
                icon: "🏷️",
                title: "Update price and availability",
                desc: "Keep your pricing updated to attract serious buyers.",
                btn: "Add photo",
                pct: "+10%",
                badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
              },
              {
                id: "floor",
                icon: "📐",
                title: "Upload floor plan",
                desc: "Floor plans help buyers understand the space better.",
                btn: "Add photo",
                pct: "+5%",
                badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
              },
            ].map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{rec.icon}</span>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#0B132B] truncate">
                      {rec.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">
                      {rec.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl border border-[#1865F2] hover:bg-blue-50 text-[#1865F2] text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    {rec.btn}
                  </button>
                  <span
                    className={`px-2 py-1 rounded-lg border text-[11px] font-extrabold ${rec.badgeColor}`}
                  >
                    {rec.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
