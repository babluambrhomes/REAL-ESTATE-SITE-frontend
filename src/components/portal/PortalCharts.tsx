"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Calendar, MoreHorizontal, TrendingUp } from "lucide-react";

const LEADS_CHART_DATA = [
  { date: "1 Jun", terraces: 22, ats: 30 },
  { date: "5 Jun", terraces: 35, ats: 42 },
  { date: "10 Jun", terraces: 45, ats: 58 },
  { date: "13 Jun", terraces: 38, ats: 60 },
  { date: "15 Jun", terraces: 50, ats: 95 },
  { date: "20 Jun", terraces: 42, ats: 120 },
  { date: "25 Jun", terraces: 55, ats: 75 },
  { date: "30 Jun", terraces: 30, ats: 45 },
];

const PIPELINE_DATA = [
  {
    stage: "New",
    count: 86,
    pillBg: "bg-[#EAF2FF]",
    pillText: "text-[#1865F2]",
    barColor: "bg-[#1865F2]",
    width: "65%",
  },
  {
    stage: "Contacted",
    count: 62,
    pillBg: "bg-[#F3E8FF]",
    pillText: "text-[#9333EA]",
    barColor: "bg-[#9333EA]",
    width: "50%",
  },
  {
    stage: "Interested",
    count: 30,
    pillBg: "bg-[#DCFCE7]",
    pillText: "text-[#16A34A]",
    barColor: "bg-[#16A34A]",
    width: "35%",
  },
  {
    stage: "Site Visit",
    count: 20,
    pillBg: "bg-[#FFEDD5]",
    pillText: "text-[#EA580C]",
    barColor: "bg-[#EA580C]",
    width: "25%",
  },
  {
    stage: "Closed",
    count: 10,
    pillBg: "bg-[#CCFBF1]",
    pillText: "text-[#0D9488]",
    barColor: "bg-[#0D9488]",
    width: "14%",
  },
];

export const PortalCharts = () => {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-jakarta">
      {/* 1. Leads Performance Card (Span 8) */}
      <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-[17px] font-bold text-[#0B132B]">
            leads Performance
          </h3>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="h-8 pl-3 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer focus:outline-none shadow-2xs font-medium"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
              <Calendar size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <button
              type="button"
              className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
            >
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* Total leads stat & Legends Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          {/* Left: Total Leads Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center">
              <TrendingUp size={16} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[18px] font-bold text-[#0B132B] block leading-none">
                86
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Total leads
              </span>
            </div>
          </div>

          {/* Right: Legends matching Figma 1:1 */}
          <div className="flex items-center gap-4 text-[11.5px] text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#CBD5E1]" />
              <span>The Terraces at Max Estate 361</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1865F2]" />
              <span>ATS Knightsbridge</span>
            </span>
          </div>
        </div>

        {/* Area Chart Container */}
        <div className="relative w-full h-[250px] pt-4">
          {/* Active Tooltip Badge matching Figma 1:1 pinned at 13 June */}
          <div className="absolute left-[41%] top-0 z-10 hidden sm:flex flex-col items-center pointer-events-none">
            <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-lg text-center min-w-[105px]">
              <span className="text-[10px] text-slate-400 block font-medium leading-tight">
                13 June
              </span>
              <span className="text-[14px] font-bold text-[#0B132B] block leading-tight mt-0.5">
                60 Leads
              </span>
              <span className="text-[9.5px] text-slate-400 block font-normal leading-tight mt-0.5">
                ATS Knightsbridge
              </span>
            </div>
            {/* Dashed connector line */}
            <div className="w-px h-20 border-l border-dashed border-[#1865F2] mt-0.5" />
            {/* Blue dot on line */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#1865F2] border-2 border-white -mt-1 shadow-xs" />
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={LEADS_CHART_DATA}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="portalAtsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1865F2" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#1865F2" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                domain={[0, 200]}
                ticks={[0, 50, 100, 200]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2E8F0",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
              {/* Max Estate smooth spline (gray line) */}
              <Area
                type="natural"
                dataKey="terraces"
                stroke="#94A3B8"
                strokeWidth={2}
                fillOpacity={0}
              />
              {/* ATS Knightsbridge area gradient spline (blue) */}
              <Area
                type="natural"
                dataKey="ats"
                stroke="#1865F2"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#portalAtsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Leads Pipeline Card (Span 4) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
        <h3 className="text-[17px] font-bold text-[#0B132B] pb-3">
          leads Pipeline
        </h3>

        <div className="py-2 space-y-4 my-auto">
          {PIPELINE_DATA.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {/* Pill badge with count matching Figma */}
              <span
                className={`w-9 text-center text-[12px] font-bold px-2 py-0.5 rounded-md ${item.pillBg} ${item.pillText} shrink-0`}
              >
                {item.count}
              </span>

              {/* Stage label */}
              <span className="w-24 text-[13px] font-medium text-slate-700 shrink-0">
                {item.stage}
              </span>

              {/* Progress bar container */}
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom padding spacer matching Figma card height */}
        <div className="pt-2" />
      </div>
    </div>
  );
};

