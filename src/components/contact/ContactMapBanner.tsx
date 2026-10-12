"use client";

import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";

export const ContactMapBanner = () => {
  return (
    <section className="relative w-full overflow-hidden my-4 sm:my-8 font-jakarta">
      {/* Top Wave Curve */}
      <div className="w-full overflow-hidden leading-none -mb-1 relative z-10">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 text-[#F0F6FF]"
        >
          <path
            d="M0,0 C300,50 600,10 1200,45 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/contact/contact_map_satellite.jpg"
          alt="Office Location Map Satellite View"
          fill
          className="object-cover object-center brightness-95 contrast-105"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* Floating Center Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* Tooltip Card */}
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-white/60 mb-2 flex items-center gap-2 animate-bounce">
            <Navigation className="w-3.5 h-3.5 text-[#1865F2]" />
            <span className="text-xs font-black text-[#0B132B]">
              Roofin Headquarters
            </span>
          </div>

          {/* Animated Glowing Pin */}
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#1865F2]/40 animate-ping absolute" />
            <div className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-lg border-2 border-white relative z-10">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Floating Quick Action Directions */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-[#1865F2] text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Bottom Wave Curve */}
      <div className="w-full overflow-hidden leading-none -mt-1 relative z-10">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 text-[#F0F6FF]"
        >
          <path
            d="M0,60 C400,10 800,50 1200,15 L1200,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
