"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Headphones,
  ChevronDown,
  ArrowRight,
  Star,
  User,
  Plus,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BANK_PARTNERS = [
  { name: "SBI", rate: "starts at 7.3%", icon: "/banks/sbi.png" },
  { name: "ICICI Bank", rate: "starts at 7.1%", icon: "/banks/icici.png" },
  { name: "Bank of Baroda", rate: "starts at 7.5%", icon: "/banks/bankofbaroda.png" },
  { name: "AXIS BANK", rate: "starts at 7.3%", icon: "/banks/axis.png" },
  { name: "HDFC BANK", rate: "starts at 7.1%", icon: "/banks/hdfc.png" },
  { name: "PNB Housing", rate: "starts at 7.5%", icon: "/banks/pnb.png" },
  { name: "YES BANK", rate: "starts at 7.1%", icon: "/banks/yesbank.png" },
  { name: "KOTAK", rate: "starts at 7.5%", icon: "/banks/kotak.png" },
];

const PRICE_TREND_DATA = [
  { year: "2021", rate: 16000 },
  { year: "2022", rate: 16200 },
  { year: "2023", rate: 17500 },
  { year: "2024", rate: 21000 },
  { year: "2025", rate: 23500 },
  { year: "2026", rate: 24500 },
];

const MARKET_METRICS = [
  { label: "Price Growth", score: "8/10", pct: 80 },
  { label: "Rental Demand", score: "6/10", pct: 60 },
  { label: "Connectivity", score: "7/10", pct: 70 },
  { label: "Future Potentials", score: "8/10", pct: 80 },
  { label: "Infrastructure Growth", score: "8/10", pct: 80 },
];

const RATING_BREAKDOWN = [
  { stars: "5 star", pct: 85 },
  { stars: "4 star", pct: 60 },
  { stars: "3 star", pct: 30 },
  { stars: "2 star", pct: 10 },
  { stars: "1 star", pct: 5 },
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Ritik Singh",
    date: "10/7/2023 1:10:37 AM",
    rating: 5,
    avatarBg: "bg-[#8B5CF6]",
    comment:
      "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
  },
  {
    id: 2,
    name: "Ritik Singh",
    date: "10/7/2023 1:10:37 AM",
    rating: 5,
    avatarBg: "bg-[#DC2626]",
    comment:
      "The Property Is Really Nice. I'm Staying Here Now, And My Experience Has Been Great. The Rooms Are Clean, The Surroundings Are Peaceful, And Everything Is Well Maintained.",
  },
  {
    id: 3,
    name: "Aman Verma",
    date: "09/15/2023 4:22:10 PM",
    rating: 5,
    avatarBg: "bg-[#059669]",
    comment:
      "Great amenities and active security staff. Gym and clubhouse are world class. Highly recommended for families looking for peaceful living.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    date: "08/20/2023 9:14:02 AM",
    rating: 4,
    avatarBg: "bg-[#D97706]",
    comment:
      "Excellent connectivity to metro station and schools. Water supply and backup power are 24x7 without any hassle.",
  },
];

export const PropertyDetailWhyRoofinAndBankOffers = () => {
  const [trendView, setTrendView] = useState<"locality" | "societies">("locality");
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="w-full my-6 flex flex-col gap-8">
      {/* ----------------- 1. WHY ROOFIN SECTION ----------------- */}
      <div id="why-roofin" className="space-y-4 scroll-mt-28">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
            WHY ROOFIN
          </h3>
        </div>

        {/* 3-Column Trust Items matching Figma 1:1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 py-1">
          {/* Card 1: Verified Properties */}
          <div className="flex items-center gap-4 py-2 sm:px-6">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/icon/verified.png"
                alt="Verified Properties"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#0B132B] leading-tight">
                Verified Properties
              </h4>
              <p className="text-[12.5px] text-[#475569] mt-1 font-normal leading-tight">
                All Properties Are Rera Verified
              </p>
            </div>
          </div>

          {/* Card 2: Best Price Promise */}
          <div className="flex items-center gap-4 py-2 sm:px-6">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/icon/best_price.png"
                alt="Best Price Promise"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#0B132B] leading-tight">
                Best Price Promise
              </h4>
              <p className="text-[12.5px] text-[#475569] mt-1 font-normal leading-tight">
                Get the best price with no hidden cost
              </p>
            </div>
          </div>

          {/* Card 3: After Sales Support */}
          <div className="flex items-center gap-4 py-2 sm:px-6">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/icon/support.png"
                alt="After Sales Support"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#0B132B] leading-tight">
                After Sales Support
              </h4>
              <p className="text-[12.5px] text-[#475569] mt-1 font-normal leading-tight">
                We&apos;re With You Always
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line below Why Roofin */}
      <div className="w-full border-t border-slate-200/80 my-1" />

      {/* ----------------- 2. BANK OFFERS SECTION ----------------- */}
      <div className="space-y-4">
        <div className="pl-2.5 border-l-4 border-[#00B4D8]">
          <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight">
            Bank Offers
          </h3>
        </div>

        {/* Bank Offers Container Banner with Full Image Background matching Figma 1:1 */}
        <div className="relative w-full rounded-2xl border border-[#D5E5FD] p-5 sm:p-7 shadow-2xs overflow-hidden min-h-[220px] flex items-center">
          {/* Full Banner Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/banner/banck_banner.png"
              alt="Bank Offers Background Banner"
              fill
              className="object-cover object-right"
              priority
            />
          </div>

          {/* Left Content over Background */}
          <div className="relative z-10 max-w-2xl space-y-3.5">
            <div>
              <h4 className="text-[22px] sm:text-[24px] font-bold text-[#1865F2] tracking-tight">
                Bank offers
              </h4>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#0B132B] font-medium mt-0.5">
                compare home loan offers from 40+ banks
              </p>

              {/* Interest Rates & Processing fee tags */}
              <div className="flex items-center gap-8 mt-2.5">
                <div>
                  <span className="text-[#1865F2] block text-[11.5px] font-semibold">Rate Start From</span>
                  <span className="text-[18px] sm:text-[20px] font-bold text-[#1865F2] leading-none">7.1%</span>
                </div>
                <div>
                  <span className="text-[#1865F2] block text-[11.5px] font-semibold">Processing Fee</span>
                  <span className="text-[18px] sm:text-[20px] font-bold text-[#1865F2] leading-none">0%</span>
                </div>
              </div>
            </div>

            {/* Banking Partners List */}
            <div>
              <p className="text-[11px] font-normal text-[#DC2626] mb-1.5">
                our banking partners
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {BANK_PARTNERS.map((bank, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center shrink-0"
                  >
                    <div className="bg-white rounded-lg px-2 py-1 shadow-2xs border border-slate-100 flex items-center justify-center h-8 w-15 sm:w-16 relative">
                      <Image
                        src={bank.icon}
                        alt={bank.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <span className="text-[9.5px] text-[#475569] font-normal text-center mt-1 whitespace-nowrap">
                      {bank.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line below Bank Offers */}
      <div className="w-full border-t border-slate-200/80 my-1" />

      {/* ----------------- 3. PRICE TREND SECTION ----------------- */}
      <div id="price-trends" className="space-y-4 scroll-mt-28">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="pl-2.5 border-l-4 border-[#00B4D8]">
              <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
                PRICE TREND
              </h3>
            </div>
            <p className="text-[12.5px] text-[#64748B] mt-1 font-normal">
              The Graph Shows The Quarterly Average Rates Of Properties.
            </p>
          </div>

          {/* Toggle Buttons: With Locality | With Societies matching Figma */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTrendView("locality")}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer border ${
                trendView === "locality"
                  ? "border-[#BFDBFE] text-[#1865F2] bg-[#F0F6FE] shadow-2xs"
                  : "border-slate-200/70 text-[#1865F2]/80 bg-white hover:bg-slate-50"
              }`}
            >
              With Locality
            </button>
            <button
              onClick={() => setTrendView("societies")}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer border ${
                trendView === "societies"
                  ? "border-[#BFDBFE] text-[#1865F2] bg-[#F0F6FE] shadow-2xs"
                  : "border-slate-200/70 text-[#1865F2]/80 bg-white hover:bg-slate-50"
              }`}
            >
              With Societies
            </button>
          </div>
        </div>

        {/* 2-Column Price Trend & Market Outlook Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: AVG. PROPERTY RATE Graph (Span 8) */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[14px] font-bold text-[#0B132B] uppercase tracking-wide">
                AVG. PROPERTY RATE
              </h4>
              <div className="flex items-center gap-1 text-[11.5px] text-slate-500 font-medium cursor-pointer hover:text-[#1865F2] transition-colors">
                <span>Last 5 Years</span>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Interactive Smooth Wave Chart with Callout Tooltip */}
            <div className="relative w-full h-64 sm:h-72">
              {/* Floating Tooltip Callout Card matching Figma 1:1 */}
              <div className="absolute top-8 left-[47%] -translate-x-1/2 z-20 bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-lg text-left pointer-events-none min-w-[130px]">
                <p className="text-[12.5px] font-semibold text-[#1865F2] leading-tight">
                  July-Sept, 2023
                </p>
                <p className="text-[12px] text-[#0B132B] font-semibold leading-tight mt-1">
                  SEC 103, Noida
                </p>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5">
                  ₹6,000/ sqft
                </p>
              </div>
              {/* Small anchor dot on wave curve */}
              <div className="absolute top-[88px] left-[47%] -translate-x-1/2 h-3 w-3 rounded-full bg-white border-2 border-[#1865F2] shadow-sm z-20 pointer-events-none" />

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PRICE_TREND_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1865F2" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#1865F2" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    domain={[0, 64000]}
                    ticks={[4000, 8000, 12000, 16000, 24000, 32000, 36000, 40000, 44000, 48000, 52000, 56000, 60000, 64000]}
                    tickFormatter={(val) => `₹${val / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`₹ ${Number(value).toLocaleString("en-IN")}/sqft`, "Avg Rate"]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "10px",
                      border: "1px solid #E2E8F0",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  />
                  <Area
                    type="natural"
                    dataKey="rate"
                    stroke="#1865F2"
                    strokeWidth={2.5}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Card: Market Outlook Score & Progress Bars (Span 4) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5">
                <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0B132B]">
                  Market Outlook
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#00C49F] font-semibold text-[11px]">
                  Positive
                </span>
              </div>

              {/* Investment Score */}
              <div className="mt-1">
                <span className="text-[11.5px] text-[#64748B] font-medium block">Investment Score</span>
                <div className="flex items-baseline gap-0.5 mt-0.5">
                  <span className="text-[32px] font-bold text-[#0B132B] leading-none">8.1</span>
                  <span className="text-[14px] text-[#64748B] font-medium leading-none">/10</span>
                </div>
              </div>

              {/* 5 Progress Bars */}
              <div className="space-y-3 mt-4">
                {MARKET_METRICS.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="text-[#334155] font-normal w-32 shrink-0">{metric.label}</span>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00C49F] rounded-full"
                        style={{ width: `${metric.pct}%` }}
                      />
                    </div>
                    <span className="text-[#0B132B] font-bold text-[11.5px] shrink-0 text-right w-8">{metric.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-5 py-2.5 rounded-xl bg-[#EAEAEA] hover:bg-slate-300 text-[#0B132B] text-[13px] font-semibold transition-colors text-center cursor-pointer">
              View Market Insights
            </button>
          </div>
        </div>

        {/* ----------------- 4. PERFORMANCE OF LOCALITIES TABLE ----------------- */}
        <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
          <div>
            <h4 className="text-[15px] font-bold text-[#0B132B]">
              Performance of Localities
            </h4>
            <p className="text-[12px] text-[#64748B] font-normal mt-0.5">
              check rates, appreciation and rental yield
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 text-[#64748B] text-[12px] font-medium">
                  <th className="pb-3 font-medium">Locality</th>
                  <th className="pb-3 font-medium">Avg.Rate</th>
                  <th className="pb-3 font-medium">1Y Change</th>
                  <th className="pb-3 font-medium">5Y Growth</th>
                  <th className="pb-3 font-medium">Rental Yield</th>
                  <th className="pb-3 font-medium text-right">Outlook</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-3.5 font-semibold text-[#0B132B]">Sector 150</td>
                  <td className="py-3.5 font-medium text-[#475569]">RS 12,450</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#E8F8F0] text-[#00C49F] font-semibold text-[11px]">
                      +10.8%
                    </span>
                  </td>
                  <td className="py-3.5 font-medium text-[#475569]">33.4%</td>
                  <td className="py-3.5 font-medium text-[#475569]">3.5%</td>
                  <td className="py-3.5 text-right">
                    <span className="px-3 py-0.5 rounded-md bg-[#EFF6FF] text-[#1865F2] font-semibold text-[11px]">
                      Positive
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feedback Row & More Price Details Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4 text-[15px] text-[#0B132B] font-medium">
            <span>Is this helpful?</span>
            <button
              onClick={() => setFeedback("yes")}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                feedback === "yes" ? "text-[#1865F2] font-bold" : "text-[#0B132B] hover:text-[#1865F2]"
              }`}
            >
              <span>Yes</span>
              <span className="text-[17px]">👍</span>
            </button>
            <button
              onClick={() => setFeedback("no")}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                feedback === "no" ? "text-[#1865F2] font-bold" : "text-[#0B132B] hover:text-[#1865F2]"
              }`}
            >
              <span>No</span>
              <span className="text-[17px]">👎</span>
            </button>
          </div>

          <button className="px-6 py-2.5 rounded-xl border border-[#1865F2] text-[#1865F2] bg-white hover:bg-[#1865F2] hover:text-white text-[13.5px] font-semibold transition-all shadow-2xs cursor-pointer">
            Click for More Price Details
          </button>
        </div>

        {/* ----------------- 5. BOTTOM PROMOTIONAL BANNER MATCHING FIGMA 1:1 ----------------- */}
        <div className="relative w-full rounded-2xl border border-[#D5E5FD] p-6 sm:p-8 shadow-2xs overflow-hidden mt-4 min-h-[190px] sm:min-h-[210px] flex items-center">
          {/* Full Banner Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/banner/price_trends.png"
              alt="Property Rates & Trends Banner"
              fill
              className="object-cover object-right"
              priority
            />
          </div>

          {/* Left Content over Background */}
          <div className="relative z-10 max-w-xl space-y-2.5">
            <h4 className="text-[18px] sm:text-[22px] font-bold text-[#1865F2] leading-tight tracking-tight">
              Property Rates &amp; Trends For Every Sector Listed On Roofin
            </h4>
            <p className="text-[14px] sm:text-[15px] text-[#0B132B] font-medium">
              Stay Updated, Invest Smart With Accurate Data.
            </p>
            <div className="pt-1.5">
              <button className="px-5 py-2.5 rounded-lg bg-[#1865F2] hover:bg-blue-700 text-white text-[13px] font-semibold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer group">
                <span>View Sector By Gaph</span>
                <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={13} className="text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ----------------- 6. SOCIETY REVIEW SECTION (MATCHING FIGMA 1:1) ----------------- */}
        <div id="society-review" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="pl-2.5 border-l-4 border-[#00B4D8]">
              <h3 className="text-[16px] font-bold text-[#1865F2] tracking-tight uppercase">
                Society Review
              </h3>
            </div>

            <button className="px-4 py-2 rounded-xl border border-[#1865F2] text-[#1865F2] bg-white hover:bg-blue-50 text-[12.5px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer">
              <Plus size={15} />
              <span>Review your society/ locality</span>
            </button>
          </div>

          {/* Society Review Container Card */}
          <div className="rounded-2xl border border-[#D5E5FD] bg-white p-6 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-start divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Overall Rating Summary (Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center pr-0 lg:pr-6">
              <div className="flex items-baseline gap-1">
                <span className="text-[36px] sm:text-[40px] font-bold text-[#1865F2] leading-none">4.5</span>
                <span className="text-[18px] text-slate-400 font-medium leading-none">/5</span>
              </div>

              {/* 5 Yellow Stars (4 filled, 1 empty) */}
              <div className="flex items-center gap-1 mt-2 text-amber-400">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <Star size={18} className="text-slate-300 stroke-[1.5]" />
              </div>

              <p className="text-[13px] font-bold text-[#0B132B] uppercase tracking-wider mt-2.5">
                GOOD RATING
              </p>
              <p className="text-[12px] text-[#64748B] font-normal mt-0.5">
                (200 Total Reviews)
              </p>

              {/* Star Rating Breakdown Bars */}
              <div className="w-full space-y-2 mt-5 text-[11.5px] text-slate-500">
                {RATING_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1865F2] rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-left shrink-0 text-slate-600 font-normal text-[11px]">
                      {item.stars}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-5 px-4 py-2 rounded-xl border border-[#D5E5FD] text-[#1865F2] hover:bg-blue-50 text-[12px] font-semibold transition-colors cursor-pointer">
                See how ratings are calculated
              </button>
            </div>

            {/* Right Column: ALL Reviews (Span 8) */}
            <div className="lg:col-span-8 pt-4 lg:pt-0 pl-0 lg:pl-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-[14px] font-bold text-[#1865F2]">
                  ALL Reviews ({REVIEWS_DATA.length})
                </h4>
                <button className="text-[12.5px] font-semibold text-[#1865F2] hover:underline cursor-pointer">
                  View All
                </button>
              </div>

              {/* Scrollable Review Cards List with Blue Custom Scrollbar */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-3.5 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#1865F2_#F1F5F9] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#1865F2] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#124bbf]">
                {REVIEWS_DATA.map((rev) => (
                  <div key={rev.id} className="space-y-2 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-9 w-9 rounded-full ${rev.avatarBg} text-white flex items-center justify-center shrink-0 font-bold shadow-2xs mt-0.5`}
                      >
                        <User size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="text-[13.5px] font-bold text-[#0B132B]">
                            {rev.name}
                          </h5>
                          {/* 4 Stars filled, 1 empty */}
                          <div className="flex items-center gap-0.5 text-amber-400">
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <Star size={12} className="text-slate-300 stroke-[1.5]" />
                          </div>
                          <span className="text-[11px] text-[#64748B] font-normal">
                            {rev.date}
                          </span>
                        </div>

                        <p className="text-[12.5px] text-[#334155] leading-relaxed mt-1 font-normal">
                          {rev.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
