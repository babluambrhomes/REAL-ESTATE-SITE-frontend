"use client";

import Image from "next/image";

export const ContactHero = () => {
  const avatars = [
    // 1. Top-left avatar (man sitting)
    {
      id: "av-1",
      src: "/agents/agent_photo_1.png",
      alt: "Team Member 1",
      className: "top-[48%] left-[28%] sm:left-[29%] w-10 h-10 sm:w-12 sm:h-12",
    },
    // 2. Far left avatar (girl with laptop)
    {
      id: "av-2",
      src: "/agents/nearby/grid_avatar_2.png",
      alt: "Team Member 2",
      className: "top-[54%] left-[24%] sm:left-[25%] md:left-[26%] w-11 h-11 sm:w-13 sm:h-13",
    },
    // 3. Center-left Main Large Avatar (guy with glasses, sitting directly on the wave curve)
    {
      id: "av-3-center",
      src: "/agents/agent_photo_3.png",
      alt: "Team Member 3",
      className: "bottom-[12%] left-[32%] sm:left-[34%] md:left-[35%] w-16 h-16 sm:w-20 sm:h-20 md:w-[86px] md:h-[86px] border-4 border-white shadow-xl z-30",
    },
    // 4. Top-right avatar (bearded man)
    {
      id: "av-4",
      src: "/agents/nearby/grid_avatar_4.png",
      alt: "Team Member 4",
      className: "top-[44%] right-[29%] sm:right-[31%] w-10 h-10 sm:w-12 sm:h-12",
    },
    // 5. Mid-right avatar (man in suit)
    {
      id: "av-5",
      src: "/agents/agent_photo_2.png",
      alt: "Team Member 5",
      className: "top-[50%] right-[25%] sm:right-[26%] w-11 h-11 sm:w-13 sm:h-13",
    },
    // 6. Lower-right avatar (woman in blue)
    {
      id: "av-6",
      src: "/agents/nearby/grid_avatar_6.png",
      alt: "Team Member 6",
      className: "bottom-[16%] right-[28%] sm:right-[30%] w-12 h-12 sm:w-14 sm:h-14 z-20",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#E6F5FD] via-[#E6FAF2] to-white pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28 min-h-[520px] sm:min-h-[580px] flex flex-col justify-between font-jakarta">
      
      {/* 1. Exact Figma Mint-Teal Ambient Gradient Glow behind heading and search bar */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[95vw] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.45)_0%,rgba(45,212,191,0.30)_35%,rgba(96,165,250,0.12)_65%,transparent_75%)] pointer-events-none blur-3xl z-0" />

      {/* Subtle secondary turquoise glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[450px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_70%)] pointer-events-none blur-2xl z-0" />

      {/* Decorative soft white translucent circles on wave (Figma Ellipse 52304 & 52303) */}
      <div className="absolute bottom-16 left-[20%] w-32 h-32 rounded-full border border-white/60 bg-white/20 blur-xs pointer-events-none" />
      <div className="absolute bottom-20 right-[35%] w-24 h-24 rounded-full border border-white/60 bg-white/20 blur-xs pointer-events-none" />

      {/* 2. Floating Team Avatars */}
      {avatars.map((av) => (
        <div
          key={av.id}
          className={`absolute ${av.className} rounded-full border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden bg-white hover:scale-110 transition-transform duration-300 z-10`}
        >
          <Image
            src={av.src}
            alt={av.alt}
            fill
            className="object-cover"
            sizes="90px"
          />
        </div>
      ))}

      {/* 3. Center Heading & Subtitle */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mt-2 sm:mt-4 mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-[#1865F2] tracking-tight mb-3 drop-shadow-2xs leading-tight">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base md:text-[17px] font-semibold text-[#0B132B] max-w-xl mx-auto tracking-normal">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* 4. Exact Figma Wavy Bottom Curve Divider with Multi-color Stroke (Blue to Emerald) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="relative block w-full h-20 sm:h-28 text-white"
        >
          <defs>
            {/* Linear Gradient for the Wave Stroke Line matching Figma */}
            <linearGradient id="waveStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#2563EB" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#10B981" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Solid White Fill below the wave */}
          <path
            d="M0,95 C220,135 360,145 520,135 C680,125 780,85 920,80 C1080,75 1220,110 1440,85 L1440,160 L0,160 Z"
            fill="#FFFFFF"
          />

          {/* Primary Crisp Smooth Wave Stroke Line */}
          <path
            d="M0,95 C220,135 360,145 520,135 C680,125 780,85 920,80 C1080,75 1220,110 1440,85"
            fill="none"
            stroke="url(#waveStrokeGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secondary Soft Translucent Accent Curve */}
          <path
            d="M0,110 C240,145 380,152 540,142 C700,130 800,92 940,88 C1100,84 1240,118 1440,95"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>
      </div>
    </section>
  );
};
