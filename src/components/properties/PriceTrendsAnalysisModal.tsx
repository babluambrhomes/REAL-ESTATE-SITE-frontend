"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  TrendingUp,
  Building,
  DollarSign,
  Percent,
  Calendar,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface PriceTrendsAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const detailedTrendData = [
  { period: "2021", avgPrice: 4800, rentalYield: 3.2 },
  { period: "2022", avgPrice: 5900, rentalYield: 3.4 },
  { period: "2023", avgPrice: 6850, rentalYield: 3.6 },
  { period: "2024", avgPrice: 7600, rentalYield: 3.7 },
  { period: "2025", avgPrice: 8450, rentalYield: 3.8 },
  { period: "2026 (Est.)", avgPrice: 9300, rentalYield: 4.1 },
];

const sectorComparisons = [
  { sector: "Sector 103 (Subject Locality)", price: "₹8,450/sq.ft", growth: "+9.2%", demand: "High" },
  { sector: "Sector 150 (Sports City)", price: "₹9,800/sq.ft", growth: "+11.4%", demand: "Very High" },
  { sector: "Sector 137 (Expressway Metro)", price: "₹7,950/sq.ft", growth: "+7.8%", demand: "High" },
  { sector: "Sector 76 (Central Noida)", price: "₹7,400/sq.ft", growth: "+6.5%", demand: "Moderate" },
  { sector: "Noida Extension (Greater Noida W)", price: "₹5,800/sq.ft", growth: "+8.9%", demand: "High" },
];

export const PriceTrendsAnalysisModal = ({
  isOpen,
  onClose,
}: PriceTrendsAnalysisModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Glow */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#1865F2] via-blue-400 to-[#00BA7A]" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1865F2]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Locality Real Estate Market Analysis</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
            Noida & Expressway Price Trends (2021 - 2026)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified historical transaction data across registered sub-registrar offices & market deals
          </p>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Top 3 KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
              <span className="text-[10px] font-bold uppercase text-slate-500">Current Avg Price</span>
              <p className="text-lg font-extrabold text-[#1865F2] mt-0.5">₹ 8,450</p>
              <span className="text-[10px] text-slate-500 font-medium">per sq.ft.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] font-bold uppercase text-slate-500">12-Month Growth</span>
              <p className="text-lg font-extrabold text-[#00BA7A] mt-0.5">+9.2%</p>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center">
                ▲ Above city avg
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <span className="text-[10px] font-bold uppercase text-slate-500">Gross Rental Yield</span>
              <p className="text-lg font-extrabold text-indigo-600 mt-0.5">3.8%</p>
              <span className="text-[10px] text-slate-500 font-medium">Avg ₹38K/mo</span>
            </div>
          </div>

          {/* Historical Graph */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">5-Year Price Appreciation Trajectory</span>
              <span className="text-[11px] font-medium text-[#1865F2]">+76% total growth since 2021</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={detailedTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1865F2" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#1865F2" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                  <XAxis dataKey="period" stroke="#94A3B8" tick={{ fontSize: 10, fill: "#64748B" }} />
                  <YAxis
                    domain={[4000, 10000]}
                    stroke="#94A3B8"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    tickFormatter={(v) => `₹${v / 1000}K`}
                  />
                  <Tooltip
                    formatter={(val: any) => [`₹ ${Number(val).toLocaleString("en-IN")}/sq.ft`, "Avg Rate"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgPrice"
                    stroke="#1865F2"
                    strokeWidth={2.5}
                    fill="url(#modalGradient)"
                    dot={{ r: 4, fill: "#FFFFFF", stroke: "#1865F2", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Micro-Market Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Micro-Market Sector Comparison
            </h4>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="py-2.5 px-3">Sector / Micro-Market</th>
                    <th className="py-2.5 px-3">Avg Rate</th>
                    <th className="py-2.5 px-3">1-Yr Change</th>
                    <th className="py-2.5 px-3">Buyer Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sectorComparisons.map((sec, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-blue-50/40 font-bold" : "hover:bg-slate-50/60"}>
                      <td className="py-2.5 px-3 text-slate-900">{sec.sector}</td>
                      <td className="py-2.5 px-3 font-medium text-[#1865F2]">{sec.price}</td>
                      <td className="py-2.5 px-3 font-medium text-[#00BA7A]">{sec.growth}</td>
                      <td className="py-2.5 px-3">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                          {sec.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
