"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { School, Cross, ShoppingBag, Plane, Landmark, Train } from "lucide-react";
import { properties } from "@/data/properties";

// 🗺️ Dynamic interactive MapLibre map from homepage hero
const ViewMap = dynamic(() => import("@/components/common/ViewMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span>Loading Interactive Map...</span>
      </div>
    </div>
  ),
});

export const CompareLocationMap = () => {
  const compareProperties = properties.slice(0, 2);

  const amenities = [
    { label: "Metro Station", icon: Train, bg: "bg-[#1E293B]", text: "text-white" },
    { label: "School", icon: School, bg: "bg-[#2563EB]", text: "text-white" },
    { label: "Hospital", icon: Cross, bg: "bg-[#EF4444]", text: "text-white" },
    { label: "Mall", icon: ShoppingBag, bg: "bg-[#06B6D4]", text: "text-white" },
    { label: "Airport", icon: Plane, bg: "bg-[#475569]", text: "text-white" },
    { label: "Bank", icon: Landmark, bg: "bg-[#F59E0B]", text: "text-white" },
  ];

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-14 font-jakarta">
      <div className="bg-white rounded-[26px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-3 sm:p-4 overflow-hidden relative">
        
        {/* Real Interactive Map Container */}
        <div className="relative w-full h-[480px] sm:h-[560px] rounded-[20px] overflow-hidden bg-slate-100">
          
          {/* Interactive MapLibre GL Map with real tiles and markers */}
          <div className="w-full h-full relative z-0">
            <ViewMap height="100%" properties={compareProperties} />
          </div>

          {/* Right Floating Nearby Amenities Legend Box */}
          <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200/90 space-y-2.5 min-w-[145px] pointer-events-auto">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full ${item.bg} ${item.text} flex items-center justify-center shrink-0 shadow-2xs`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
