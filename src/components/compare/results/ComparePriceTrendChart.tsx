"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DataPoint {
  year: string;
  quarter: string;
  location: string;
  rate: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 (top) to 100 (bottom)
}

export const ComparePriceTrendChart = () => {
  const [timeRange, setTimeRange] = useState("Last 5 Years");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState<number>(3); // Default to 2024 (matching Figma)

  const yLabels = [
    "₹64K", "₹60K", "₹56K", "₹52K", "₹48K", "₹44K",
    "₹40K", "₹36K", "₹32K", "₹24K", "₹16K", "₹8K", "₹4K"
  ];

  const dataPoints: DataPoint[] = [
    { year: "2021", quarter: "Jan-Mar, 2021", location: "SEC 103, Noida", rate: "₹4,200/ sqft", xPercent: 2.5, yPercent: 96 },
    { year: "2022", quarter: "Apr-Jun, 2022", location: "SEC 103, Noida", rate: "₹36,500/ sqft", xPercent: 22, yPercent: 58 },
    { year: "2023", quarter: "July-Sept, 2023", location: "SEC 103, Noida", rate: "₹32,000/ sqft", xPercent: 41.5, yPercent: 65 },
    { year: "2024", quarter: "July-Sept, 2023", location: "SEC 103, Noida", rate: "₹6,000/ sqft", xPercent: 60, yPercent: 51 },
    { year: "2025", quarter: "Jan-Mar, 2025", location: "SEC 103, Noida", rate: "₹42,000/ sqft", xPercent: 79, yPercent: 51 },
    { year: "2026", quarter: "Oct-Dec, 2026", location: "SEC 103, Noida", rate: "₹64,000/ sqft", xPercent: 98, yPercent: 6 },
  ];

  const activePoint = dataPoints[activePointIndex] || dataPoints[3];

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 font-jakarta">
      <div className="bg-white rounded-[26px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-7 relative overflow-hidden">
        
        {/* Top Header of Chart */}
        <div className="flex items-center justify-between pb-5 mb-2 border-b border-slate-100">
          <h3 className="text-xs sm:text-[13.5px] font-extrabold text-[#0B132B] uppercase tracking-wider">
            AVG. PROPERTY RATE
          </h3>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{timeRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 min-w-[130px] z-30 text-xs font-medium text-slate-700">
                {["Last 3 Years", "Last 5 Years", "Last 10 Years"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTimeRange(option);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer ${
                      timeRange === option ? "text-blue-600 font-bold bg-blue-50/50" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Visualization Area */}
        <div className="relative w-full pt-3 pb-2">
          
          {/* Main SVG Graphic Canvas */}
          <div className="relative w-full h-[280px] sm:h-[320px] flex">
            
            {/* Y-Axis Column */}
            <div className="flex flex-col justify-between pr-3 select-none text-[8.5px] sm:text-[10px] text-slate-400 font-medium w-11 sm:w-14 text-right shrink-0">
              {yLabels.map((val, idx) => (
                <span key={idx} className="leading-none">
                  {val}
                </span>
              ))}
            </div>

            {/* Chart Area with Grid and Bézier Curves */}
            <div className="relative flex-1 h-full">
              
              {/* Horizontal Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {yLabels.map((_, idx) => (
                  <div key={idx} className="w-full border-b border-slate-100/90" />
                ))}
              </div>

              {/* Vertical Year Grid Lines */}
              <div className="absolute inset-0 flex justify-between pointer-events-none px-4 sm:px-6">
                {dataPoints.map((_, idx) => (
                  <div key={idx} className="h-full border-r border-slate-100/70" />
                ))}
              </div>

              {/* SVG Price Paths */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 800 300"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Subtle Area Gradient under Curve */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area Fill */}
                <path
                  d="M 15 290 
                     C 80 230, 130 175, 175 175 
                     C 230 175, 270 200, 330 200 
                     C 400 200, 430 153, 480 153 
                     C 530 153, 580 153, 635 153 
                     C 700 120, 745 60, 785 18 
                     L 785 300 L 15 300 Z"
                  fill="url(#chartGradient)"
                />

                {/* Lower Accent Line (Dual line effect from Figma) */}
                <path
                  d="M 15 293 
                     C 80 233, 130 179, 175 179 
                     C 230 179, 270 204, 330 204 
                     C 400 204, 430 157, 480 157 
                     C 530 157, 580 157, 635 157 
                     C 700 124, 745 64, 785 22"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Main Upper Curve Line */}
                <path
                  d="M 15 288 
                     C 80 228, 130 172, 175 172 
                     C 230 172, 270 196, 330 196 
                     C 400 196, 430 150, 480 150 
                     C 530 150, 580 150, 635 150 
                     C 700 116, 745 56, 785 15"
                  fill="none"
                  stroke="#1865F2"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Vertical Guide Line to Active Marker */}
              <div
                className="absolute w-[1.5px] bg-[#3B82F6]/60 pointer-events-none transition-all duration-300"
                style={{
                  left: `${activePoint.xPercent}%`,
                  top: `${activePoint.yPercent}%`,
                  bottom: 0,
                }}
              />

              {/* Circular Hollow Pin Ring at Active Point */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#1865F2] bg-white shadow-xs z-10 transition-all duration-300"
                style={{
                  left: `${activePoint.xPercent}%`,
                  top: `${activePoint.yPercent}%`,
                }}
              />

              {/* Interactive Tooltip Card Floating Above Active Pin */}
              <div
                className="absolute -translate-x-1/2 bg-white rounded-xl shadow-[0_8px_30px_rgba(24,101,242,0.14)] border border-slate-200/90 p-2.5 sm:p-3 min-w-[145px] z-20 pointer-events-none transition-all duration-300"
                style={{
                  left: `${activePoint.xPercent}%`,
                  top: `${Math.max(6, activePoint.yPercent - 36)}%`,
                }}
              >
                <span className="text-[10.5px] font-bold text-[#1865F2] block leading-tight">
                  {activePoint.quarter}
                </span>
                <span className="text-[11.5px] font-extrabold text-[#0B132B] block leading-tight mt-0.5">
                  {activePoint.location}
                </span>
                <span className="text-[9.5px] text-slate-400 font-medium block mt-0.5">
                  {activePoint.rate}
                </span>
              </div>

              {/* Invisible Click/Hover Columns for Data Points */}
              <div className="absolute inset-0 flex">
                {dataPoints.map((_, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActivePointIndex(idx)}
                    onClick={() => setActivePointIndex(idx)}
                    className="flex-1 h-full cursor-pointer"
                  />
                ))}
              </div>

            </div>
          </div>

          {/* X-Axis Bottom Year Labels */}
          <div className="flex justify-between pl-11 sm:pl-14 pr-2 sm:pr-4 pt-3 text-[10.5px] sm:text-[12px] font-semibold text-slate-500 select-none">
            {dataPoints.map((dp, idx) => (
              <span
                key={idx}
                onClick={() => setActivePointIndex(idx)}
                className={`cursor-pointer transition-colors ${
                  activePointIndex === idx ? "text-[#1865F2] font-bold" : "hover:text-slate-800"
                }`}
              >
                {dp.year}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
