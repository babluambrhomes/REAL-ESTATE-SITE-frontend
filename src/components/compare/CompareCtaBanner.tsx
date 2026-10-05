"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

interface CompareCtaBannerProps {
  onStartComparing: () => void;
}

export const CompareCtaBanner = ({ onStartComparing }: CompareCtaBannerProps) => {
  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 font-jakarta">
      <div className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gradient-to-r from-[#0B1528] via-[#0F1E38] to-[#0A162B] text-white p-6 sm:p-8 lg:p-9 shadow-[0_16px_40px_rgba(11,21,40,0.35)]">
        
        {/* Background Building Image Blended on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 lg:w-2/5 opacity-35 sm:opacity-50 pointer-events-none overflow-hidden">
          <Image
            src="/images/properties/max-estate-tower-figma.jpg"
            alt="Tower background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0F1E38]/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-7 space-y-3">
            
            <div className="inline-block px-3 py-1 rounded-md bg-white text-[#0B132B] text-[11.5px] font-semibold tracking-wide shadow-xs">
              Ready To Explore
            </div>

            <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-white tracking-tight leading-tight">
              Compare. Decide. Move Forward.
            </h2>

            <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 font-normal">
              Your Next Home Deserve A Closer Look.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onStartComparing}
                className="px-5 sm:px-6 py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-95 text-white font-semibold text-[13px] sm:text-[13.5px] shadow-[0_4px_16px_rgba(24,119,242,0.4)] transition-all cursor-pointer"
              >
                Start Comparing Now
              </button>
            </div>

          </div>

          {/* Right: Floating White ATS Knightsbridge Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative bg-white text-slate-900 rounded-[18px] p-3 shadow-2xl flex items-center gap-3.5 max-w-[340px] w-full border border-white/90">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src="/images/properties/video-tour-living-room.jpg"
                  alt="ATS Knightsbridge"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#0B132B] leading-tight">
                  ATS Knightsbridge
                </h4>
                <div className="flex items-center gap-1 text-[11.5px] text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                  <span>Sector 124, Noida</span>
                </div>
                <div className="pt-0.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] font-bold text-[10.5px]">
                    Ready To Move
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
