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
        
        {/* Background Building Image Blended on Right with Sunset Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden">
          <Image
            src="/images/properties/tower-popular-figma.jpg"
            alt="Tower background"
            fill
            className="object-cover object-center opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0B1528]/70 via-30% to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Text & CTA Button */}
          <div className="lg:col-span-5 space-y-3">
            
            <div className="inline-block px-3 py-1 rounded-md bg-white text-[#0B132B] text-[11.5px] font-bold tracking-wide shadow-xs">
              Ready To Explore
            </div>

            <h2 className="text-[20px] sm:text-[25px] lg:text-[28px] xl:text-[30px] font-bold text-white tracking-tight leading-tight whitespace-nowrap">
              Compare. Decide. Move Forward.
            </h2>

            <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 font-normal">
              Your Next Home Deserve A Closer Look.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onStartComparing}
                className="px-6 py-2.5 rounded-lg bg-[#1865F2] hover:bg-[#1254D0] active:scale-95 text-white font-bold text-[13px] sm:text-[13.5px] shadow-[0_4px_16px_rgba(24,101,242,0.4)] transition-all cursor-pointer tracking-wide"
              >
                Start Comparing Now
              </button>
            </div>

          </div>

          {/* Center: Floating ATS Knightsbridge Card with Increased Height & Low Radius */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div 
              className="relative rounded-[10px] p-4 sm:p-4.5 min-h-[140px] sm:min-h-[150px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] flex items-center gap-4 max-w-[390px] w-full border border-white"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 75%, #F0F7FF 100%)",
              }}
            >
              {/* Thumbnail with Video Play Button */}
              <div className="relative w-28 sm:w-32 h-24 sm:h-28 rounded-[8px] overflow-hidden shrink-0 bg-slate-900 shadow-xs">
                <Image
                  src="/images/properties/video-tour-living-room.jpg"
                  alt="ATS Knightsbridge"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white/95 shadow-md flex items-center justify-center">
                    <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-[#1865F2] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white leading-none">
                  01:10
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-1.5 flex-1">
                <h4 className="text-[17px] sm:text-[18px] font-bold text-[#0B132B] leading-tight tracking-tight">
                  ATS Knightsbridge
                </h4>
                <div className="flex items-center gap-1.5 text-[12.5px] text-slate-600 font-medium">
                  <MapPin className="w-4 h-4 text-[#334155] shrink-0" />
                  <span>Sector 124, Noida</span>
                </div>
                <div className="pt-1">
                  <span className="inline-block px-3 py-1 rounded-[6px] bg-[#DCFCE7] text-[#059669] font-bold text-[12px]">
                    Ready To Move
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Empty space so the background sunset tower shines through */}
          <div className="hidden lg:block lg:col-span-3" />

        </div>
      </div>
    </section>
  );
};
