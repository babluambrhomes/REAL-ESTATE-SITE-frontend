"use client";

import { useState } from "react";
import {
  Eye,
  MessageSquare,
  MapPin,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Image as ImageIcon,
  FileText,
  FileQuestion,
  Tag,
  Calendar,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface PortalPerformanceDiagnosisProps {
  onBack?: () => void;
  onViewHealthScore?: () => void;
}

const ACTIVITIES_DATA = [
  { month: "JAN", views: 8, visits: 13 },
  { month: "FEB", views: 12, visits: 14 },
  { month: "MAR", views: 22, visits: 15 },
  { month: "APR", views: 28, visits: 16 },
  { month: "MAY", views: 22, visits: 14 },
  { month: "JUN", views: 12, visits: 13 },
  { month: "JUL", views: 18, visits: 18 }, // Highlight point in Figma
  { month: "AUG", views: 12, visits: 13 },
  { month: "SEP", views: 16, visits: 14 },
  { month: "OCT", views: 10, visits: 15 },
  { month: "NOV", views: 14, visits: 17 },
  { month: "DEC", views: 6, visits: 18 },
];

export const PortalPerformanceDiagnosis = ({
  onBack,
  onViewHealthScore,
}: PortalPerformanceDiagnosisProps) => {
  const [selectedYear, setSelectedYear] = useState("Year");

  return (
    <div className="space-y-6 font-poppins pb-12">
      {/* 1. Header with Breadcrumb */}
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
            Performance Diagnosis
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B]">
              Properties Performance Diagnosis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Understand how your property is performing, identify bottlenecks and get ai- powered suggestions to improve results.
            </p>
          </div>

          {onViewHealthScore && (
            <button
              type="button"
              onClick={onViewHealthScore}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1865F2] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              View Health Score ➔
            </button>
          )}
        </div>
      </div>

      {/* 2. 5 KPI Metric Cards (Figma 1:1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Views */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0">
            <Eye size={22} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              1,240
            </span>
            <span className="text-[11px] font-medium text-slate-400">Views</span>
          </div>
        </div>

        {/* Card 2: Enquires */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              128
            </span>
            <span className="text-[11px] font-medium text-slate-400">Enquires</span>
          </div>
        </div>

        {/* Card 3: Site Visits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              20
            </span>
            <span className="text-[11px] font-medium text-slate-400">Site Visits</span>
          </div>
        </div>

        {/* Card 4: Booking */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              20
            </span>
            <span className="text-[11px] font-medium text-slate-400">Booking</span>
          </div>
        </div>

        {/* Card 5: Avg. enquiry */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-11 h-11 rounded-2xl bg-blue-100/70 text-[#1865F2] flex items-center justify-center font-extrabold text-[11px] shrink-0">
            AVG
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#0B132B] tracking-tight">20</span>
              <span className="text-[10px] text-slate-400 font-medium">per/day</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Avg. enquiry</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Conversion Funnel + Activities Spline Chart (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Conversion Funnel (Span 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B132B]">
              Conversion Funnel
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              See where buyers drop off and what&apos;s limiting your conversions.
            </p>

            {/* Funnel Steps */}
            <div className="space-y-2.5 pt-4">
              {/* Step 1: Views 100% */}
              <div className="p-3 rounded-xl bg-blue-100/70 flex items-center justify-between text-xs text-slate-800 font-medium shadow-2xs">
                <div>
                  <span className="font-extrabold text-sm block">1,240</span>
                  <span className="text-[10px] text-slate-600">Property Views</span>
                </div>
                <span className="font-bold text-[#1865F2]">100%</span>
              </div>

              {/* Step 2: Enquiries 10.3% */}
              <div className="p-3 rounded-xl bg-emerald-100/70 flex items-center justify-between text-xs text-slate-800 font-medium shadow-2xs ml-4">
                <div>
                  <span className="font-extrabold text-sm block">128</span>
                  <span className="text-[10px] text-slate-600">Enquiries</span>
                </div>
                <span className="font-bold text-emerald-700">10.3%</span>
              </div>

              {/* Step 3: Site Visits 1.3% */}
              <div className="p-3 rounded-xl bg-rose-100/70 flex items-center justify-between text-xs text-slate-800 font-medium shadow-2xs ml-8">
                <div>
                  <span className="font-extrabold text-sm block">20</span>
                  <span className="text-[10px] text-slate-600">Site visits</span>
                </div>
                <span className="font-bold text-rose-700">1.3%</span>
              </div>

              {/* Step 4: Booking 0.13% */}
              <div className="p-3 rounded-xl bg-purple-100/70 flex items-center justify-between text-xs text-slate-800 font-medium shadow-2xs ml-12">
                <div>
                  <span className="font-extrabold text-sm block">2</span>
                  <span className="text-[10px] text-slate-600">Booking</span>
                </div>
                <span className="font-bold text-purple-700">0.13%</span>
              </div>
            </div>
          </div>

          {/* Warning Banner: High views, low enquiries */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-rose-800">
                High views, low enquiries
              </h5>
              <p className="text-[11px] text-rose-700/90 leading-tight mt-0.5">
                Your property is getting good visibility, but fewer buyers are enquiring compared to similar listings.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Activities Spline Chart (Span 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0B132B]">Activities</h3>

            <div className="flex items-center gap-4">
              {/* Legends */}
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38BDF8]" />
                  Property views
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-pink-400" />
                  Site visits
                </span>
              </div>

              {/* Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-8 px-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white shadow-2xs focus:outline-none cursor-pointer"
              >
                <option>Year</option>
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITIES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F472B6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F472B6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  ticks={[0, 5, 10, 15, 20, 25, 30]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0B132B] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                          {payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#38BDF8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#viewsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#F472B6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#visitsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Key Issues Identified (Figma 1:1) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#0B132B]">
          Key Issues Identified
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Issue 1: Photos */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-[#0B132B]">
              Photos are underperforming
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Listing with 10+ high-quality photos get 2.3x more enquiries.
            </p>
          </div>

          {/* Issue 2: Floor plan */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center">
              <FileQuestion size={20} />
            </div>
            <h4 className="text-xs font-bold text-[#0B132B]">
              No floor plan added
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Floor plans increase enquiries by 42%.
            </p>
          </div>

          {/* Issue 3: Description */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center">
              <FileText size={20} />
            </div>
            <h4 className="text-xs font-bold text-[#0B132B]">
              Description is short
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Top performing listings have 150+ word descriptions.
            </p>
          </div>

          {/* Issue 4: Price */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center">
              <Tag size={20} />
            </div>
            <h4 className="text-xs font-bold text-[#0B132B]">
              Price is 8% higher than similar listings
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Similar 3 bhk properties in sector 124.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
