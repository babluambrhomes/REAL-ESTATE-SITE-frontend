"use client";

import React from "react";

// Helper function to create exact SVG annular sector path (doughnut slice)
function getAnnularSectorPath(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  startDeg: number,
  endDeg: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const sRad = toRad(startDeg);
  const eRad = toRad(endDeg);

  const x1 = cx + rOut * Math.cos(sRad);
  const y1 = cy + rOut * Math.sin(sRad);
  const x2 = cx + rOut * Math.cos(eRad);
  const y2 = cy + rOut * Math.sin(eRad);

  const x3 = cx + rIn * Math.cos(eRad);
  const y3 = cy + rIn * Math.sin(eRad);
  const x4 = cx + rIn * Math.cos(sRad);
  const y4 = cy + rIn * Math.sin(sRad);

  const angleDiff = endDeg - startDeg;
  const largeArc = angleDiff > 180 ? 1 : 0;

  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2.toFixed(
    2
  )} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(
    2
  )} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

export const PostPropertyHub = () => {
  // Center coordinates and radii for the Hub Circle in 1380x490 wide coordinate space
  const cx = 1060;
  const cy = 245;
  const rOut = 162;
  const rIn = 135;

  // Exact segmented arcs math matching the Figma reference:
  // 1. Top Blue: 236° to 268.5°
  const pathTopBlue = getAnnularSectorPath(cx, cy, rIn, rOut, 236, 268.5);
  // 2. Emerald Green: 191° to 233.5°
  const pathEmeraldGreen = getAnnularSectorPath(cx, cy, rIn, rOut, 191, 233.5);
  // 3. Middle Blue: 149° to 188.5°
  const pathMiddleBlue = getAnnularSectorPath(cx, cy, rIn, rOut, 149, 188.5);
  // 4. Dark Green: 105° to 146.5°
  const pathDarkGreen = getAnnularSectorPath(cx, cy, rIn, rOut, 105, 146.5);
  // 5. Bottom Blue: 71.5° to 102.5°
  const pathBottomBlue = getAnnularSectorPath(cx, cy, rIn, rOut, 71.5, 102.5);

  // Right Grey Arc: from 271.5° clockwise to 68.5° (split in 2 halves for flawless SVG rendering)
  const pathRightGrey1 = getAnnularSectorPath(cx, cy, rIn, rOut, 271.5, 360);
  const pathRightGrey2 = getAnnularSectorPath(cx, cy, rIn, rOut, 0, 68.5);

  return (
    <section className="relative py-14 sm:py-24 bg-white overflow-hidden font-jakarta select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          EXACT 8 BACKGROUND LINES (Lines 4 & 5 Converge and Touch at the Center)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 500"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Top 4 Lines - Curving Inwards and Bending Upward */}
          <path d="M -50 60 C 550 170, 850 238, 1500 -30" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 110 C 550 195, 850 241, 1500 20" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 160 C 550 220, 850 243, 1500 70" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 210 C 550 243, 850 245, 1500 120" stroke="#E5EAF2" strokeWidth="1.2" />

          {/* Bottom 4 Lines - Curving Inwards and Bending Downward */}
          <path d="M -50 280 C 550 247, 850 245, 1500 370" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 330 C 550 270, 850 247, 1500 420" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 380 C 550 295, 850 249, 1500 470" stroke="#E5EAF2" strokeWidth="1.2" />
          <path d="M -50 430 C 550 320, 850 252, 1500 520" stroke="#E5EAF2" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Desktop & Tablet: Wide Exact Vector SVG Hub Diagram */}
        <div className="hidden md:block relative w-full aspect-[1380/490]">
          
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1380 490"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Silver to Medium Grey Gradient for the Right Arc */}
              <linearGradient id="greyArcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E5E7EB" />
                <stop offset="45%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>

              {/* Bottom Right Inner Shadow Ribbon Gradient */}
              <linearGradient id="greyShadowOverlay" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#64748B" stopOpacity="0.5" />
              </linearGradient>

              {/* Soft Drop Shadow for Hub Center Circle */}
              <filter id="hubCircleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.06" />
              </filter>

              {/* Pill Drop Shadow */}
              <filter id="pillShadow" x="-10%" y="-20%" width="120%" height="150%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1865F2" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* ─────────────────────────────────────────────────────────────
                1. EXACT ANNULAR SECTOR MULTI-COLORED HUB CIRCLE (LAYER 1)
               ───────────────────────────────────────────────────────────── */}
            {/* Center Background Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={rIn}
              fill="#FFFFFF"
              filter="url(#hubCircleShadow)"
            />

            {/* Right Silver-to-Slate Grey Gradient Arc */}
            <path d={pathRightGrey1} fill="url(#greyArcGrad)" />
            <path d={pathRightGrey2} fill="url(#greyArcGrad)" />

            {/* Bottom-Right Crescent Shadow Detail */}
            <path
              d={`M ${cx} ${cy - rOut} A ${rOut} ${rOut} 0 0 1 ${cx + rOut} ${cy} L ${cx + rIn} ${cy} A ${rIn} ${rIn} 0 0 0 ${cx} ${cy - rIn} Z`}
              fill="#E5E7EB"
              opacity="0.4"
            />
            <path
              d={`M ${cx + rOut} ${cy} A ${rOut} ${rOut} 0 0 1 ${cx} ${cy + rOut} L ${cx} ${cy + rIn} A ${rIn} ${rIn} 0 0 0 ${cx + rIn} ${cy} Z`}
              fill="url(#greyShadowOverlay)"
            />

            {/* Left Segment 1: Royal Blue Top Arc */}
            <path d={pathTopBlue} fill="#1865F2" />

            {/* Left Segment 2: Emerald Green Arc */}
            <path d={pathEmeraldGreen} fill="#00A859" />

            {/* Left Segment 3: Royal Blue Middle Arc */}
            <path d={pathMiddleBlue} fill="#1865F2" />

            {/* Left Segment 4: Dark Green Arc */}
            <path d={pathDarkGreen} fill="#087F3B" />

            {/* Left Segment 5: Royal Blue Bottom Arc */}
            <path d={pathBottomBlue} fill="#1865F2" />


            {/* ─────────────────────────────────────────────────────────────
                2. INSIDE CIRCLE TYPOGRAPHY
               ───────────────────────────────────────────────────────────── */}
            {/* Title Line 1: Buy, Sell & Rent – */}
            <text
              x={cx}
              y={cy - 52}
              fill="#00B368"
              fontSize="24"
              fontWeight="800"
              fontFamily="inherit"
              textAnchor="middle"
              letterSpacing="-0.02em"
            >
              Buy, Sell &amp; Rent –
            </text>

            {/* Title Line 2: All in One Place */}
            <text
              x={cx}
              y={cy - 22}
              fill="#00B368"
              fontSize="24"
              fontWeight="800"
              fontFamily="inherit"
              textAnchor="middle"
              letterSpacing="-0.02em"
            >
              All in One Place
            </text>

            {/* Paragraph Description */}
            <text
              x={cx}
              y={cy + 14}
              fill="#1E293B"
              fontSize="13.2"
              fontWeight="500"
              fontFamily="inherit"
              textAnchor="middle"
            >
              <tspan x={cx} dy="0">Roofin brings buyers, sellers,</tspan>
              <tspan x={cx} dy="20">tenants, agents and brokers</tspan>
              <tspan x={cx} dy="20">together on a single platform to</tspan>
              <tspan x={cx} dy="20">make real estate simple,</tspan>
              <tspan x={cx} dy="20">transparent and successful.</tspan>
            </text>


            {/* ─────────────────────────────────────────────────────────────
                3. BLACK CONNECTOR CIRCUITS & JUNCTION DOTS (CLEAN GAPS, NEVER OVERLAPPING)
               ───────────────────────────────────────────────────────────── */}
            {/* Line 1: Buy Properties */}
            <path
              d="M 850 84 L 950 84"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="850" cy="84" r="5" fill="#000000" />
            <circle cx="950" cy="84" r="5" fill="#000000" />

            {/* Line 2: Rent with Confidence */}
            <path
              d="M 375 150 L 880 150 L 910 120"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="375" cy="150" r="5" fill="#000000" />
            <circle cx="910" cy="120" r="5" fill="#000000" />

            {/* Line 3: Sell Faster (With a clear gap before the middle blue arc) */}
            <path
              d="M 680 236 L 860 236"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="680" cy="236" r="5" fill="#000000" />
            <circle cx="860" cy="236" r="5" fill="#000000" />

            {/* Line 4: Broker Profiles */}
            <path
              d="M 220 322 L 875 322 L 895 350"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="220" cy="322" r="5" fill="#000000" />
            <circle cx="895" cy="350" r="5" fill="#000000" />

            {/* Line 5: Verified Agents */}
            <path
              d="M 510 400 L 935 400"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="510" cy="400" r="5" fill="#000000" />
            <circle cx="935" cy="400" r="5" fill="#000000" />


            {/* ─────────────────────────────────────────────────────────────
                4. THE 5 FLOATING WHITE PILLS (SPACIOUS WIDE HORIZONTAL SPREAD)
               ───────────────────────────────────────────────────────────── */}
            {/* Pill 1: Buy Properties */}
            <g className="cursor-pointer transition-all duration-200 hover:opacity-95">
              <rect
                x="690"
                y="59"
                width="180"
                height="50"
                rx="25"
                fill="#FFFFFF"
                stroke="#1865F2"
                strokeWidth="2"
                filter="url(#pillShadow)"
              />
              <text
                x="760"
                y="90"
                fill="#0F172A"
                fontSize="16"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Buy Properties
              </text>
              <circle cx="850" cy="84" r="5" fill="#000000" />
            </g>

            {/* Pill 2: Rent with Confidence */}
            <g className="cursor-pointer transition-all duration-200 hover:opacity-95">
              <rect
                x="210"
                y="117"
                width="185"
                height="66"
                rx="28"
                fill="#FFFFFF"
                stroke="#1865F2"
                strokeWidth="2"
                filter="url(#pillShadow)"
              />
              <text
                x="285"
                y="144"
                fill="#0F172A"
                fontSize="15.5"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Rent with
              </text>
              <text
                x="285"
                y="165"
                fill="#0F172A"
                fontSize="15.5"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Confidence
              </text>
              <circle cx="375" cy="150" r="5" fill="#000000" />
            </g>

            {/* Pill 3: Sell Faster */}
            <g className="cursor-pointer transition-all duration-200 hover:opacity-95">
              <rect
                x="520"
                y="211"
                width="180"
                height="50"
                rx="25"
                fill="#FFFFFF"
                stroke="#1865F2"
                strokeWidth="2"
                filter="url(#pillShadow)"
              />
              <text
                x="590"
                y="242"
                fill="#0F172A"
                fontSize="16"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Sell Faster
              </text>
              <circle cx="680" cy="236" r="5" fill="#000000" />
            </g>

            {/* Pill 4: Broker Profiles */}
            <g className="cursor-pointer transition-all duration-200 hover:opacity-95">
              <rect
                x="60"
                y="297"
                width="180"
                height="50"
                rx="25"
                fill="#FFFFFF"
                stroke="#1865F2"
                strokeWidth="2"
                filter="url(#pillShadow)"
              />
              <text
                x="130"
                y="328"
                fill="#0F172A"
                fontSize="16"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Broker Profiles
              </text>
              <circle cx="220" cy="322" r="5" fill="#000000" />
            </g>

            {/* Pill 5: Verified Agents */}
            <g className="cursor-pointer transition-all duration-200 hover:opacity-95">
              <rect
                x="350"
                y="375"
                width="180"
                height="50"
                rx="25"
                fill="#FFFFFF"
                stroke="#1865F2"
                strokeWidth="2"
                filter="url(#pillShadow)"
              />
              <text
                x="420"
                y="406"
                fill="#0F172A"
                fontSize="16"
                fontWeight="700"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Verified Agents
              </text>
              <circle cx="510" cy="400" r="5" fill="#000000" />
            </g>

          </svg>

        </div>


        {/* Mobile View: Clean Responsive Card Layout */}
        <div className="block md:hidden">
          
          {/* Mobile Hub Card */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center mb-8 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#1865F2] via-[#00A859] to-[#087F3B]" />
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#00B368] mb-3 leading-snug">
              Buy, Sell &amp; Rent – <br /> All in One Place
            </h3>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Roofin brings buyers, sellers, tenants, agents and brokers together on a single platform to make real estate simple, transparent and successful.
            </p>
          </div>

          {/* Mobile Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Buy Properties",
              "Rent with Confidence",
              "Sell Faster",
              "Broker Profiles",
              "Verified Agents",
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-5 py-3.5 bg-white rounded-full border-2 border-[#1865F2] shadow-sm text-[#0F172A] font-bold text-sm"
              >
                <span>{pill}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#000000]" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
