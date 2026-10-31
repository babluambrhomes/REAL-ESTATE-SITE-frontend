"use client";

import Image from "next/image";

export const ContactMapBanner = () => {
  return (
    <section className="relative w-full overflow-hidden my-2 sm:my-6 font-poppins">
      {/* Top Smooth Wave Curve Mask */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mb-[2px] pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20 text-white fill-current"
        >
          <path d="M0,0 L1440,0 L1440,20 Q720,75 0,20 Z" />
        </svg>
      </div>

      {/* Satellite Map Container */}
      <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/contact/contact_map_satellite.jpg"
          alt="Roofin Real Estate Locality Satellite Map"
          fill
          className="object-cover object-center brightness-95 contrast-105"
          sizes="100vw"
          priority
        />

        {/* Soft subtle overlay for map contrast */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* Bottom Smooth Wave Curve Mask */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mt-[2px] pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20 text-white fill-current"
        >
          <path d="M0,80 L1440,80 L1440,60 Q720,5 0,60 Z" />
        </svg>
      </div>
    </section>
  );
};
