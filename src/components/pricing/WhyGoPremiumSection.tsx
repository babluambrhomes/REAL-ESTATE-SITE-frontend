"use client";

import Image from "next/image";

export const WhyGoPremiumSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#F0F9FF] to-white py-16 sm:py-24 font-jakarta">
      {/* Figma Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] max-w-[95vw] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22)_0%,rgba(45,212,191,0.14)_45%,transparent_75%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title (Figma 1:1) */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-[#1865F2] bg-clip-text text-transparent tracking-tight">
            Why Go Premium?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Exact Figma 3D House Keychain with "Chosen" & Blue-Green Petals */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square drop-shadow-[0_25px_45px_rgba(24,101,242,0.18)] hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              
              {/* Keychain Base Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/premium/keychain_base.png"
                  alt="Chosen Premium Real Estate 3D Keychain"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />

                {/* "Chosen" Embossed Text inside House Face */}
                <div className="absolute top-[57%] left-[54%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                  <span className="text-white/95 font-bold tracking-wider text-base sm:text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-sans">
                    Chosen
                  </span>
                </div>

                {/* Stylized Blue & Emerald Leaf Petals at Bottom (Figma 1:1) */}
                <div className="absolute bottom-[8%] left-[24%] pointer-events-none">
                  <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
                    <path
                      d="M10,90 C10,50 50,15 90,15 C90,55 50,90 10,90 Z"
                      fill="url(#bluePetalGrad)"
                    />
                    <path
                      d="M40,95 C40,65 70,35 100,35 C100,65 70,95 40,95 Z"
                      fill="url(#tealPetalGrad)"
                      opacity="0.9"
                    />
                    <defs>
                      <linearGradient id="bluePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                      <linearGradient id="tealPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Copy & Floating Glass Card Frame */}
          <div className="lg:col-span-7 space-y-6">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl md:text-[36px] font-black text-[#0B132B] tracking-tight leading-tight">
                Because Being Seen Is Not Enough. <br />
                <span className="text-[#1865F2]">Being Chosen Matters.</span>
              </h3>

              <div className="mt-4 space-y-2">
                <p className="text-base sm:text-lg font-bold text-slate-800">
                  Your Investment Should Work For You
                </p>
                <p className="text-sm sm:text-base font-semibold text-slate-500 italic">
                  Paisa wahi lagao, jahan se business aage badhe.
                </p>
              </div>
            </div>

            {/* Overlapping Sleek Frosted Card Frame with Teal Border (Figma Rectangle 8183) */}
            <div className="relative mt-8 pt-4">
              <div className="w-full max-w-[460px] h-[260px] sm:h-[300px] rounded-[32px] border-4 border-[#34D399] bg-white/80 backdrop-blur-md shadow-[0_16px_45px_rgba(52,211,153,0.16)] p-7 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500 transition-all">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#34D399]/15 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase tracking-wider">
                    High Conversion Advantage
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-[#0B132B]">
                    Top-Tier Visibility & Buyer Trust
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Premium listings receive up to 5x more verified buyer enquiries, verified blue badges, and direct call connections.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#1865F2]">Verified Partner Benefits</span>
                  <span className="text-xs font-bold text-emerald-600">5x Faster Sales →</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
