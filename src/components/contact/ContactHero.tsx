"use client";

import Image from "next/image";

export const ContactHero = () => {
  const avatars = [
    // 1. Top-left avatar (man sitting in navy shirt)
    {
      id: "av-1",
      src: "/agents/agent_photo_1.png",
      alt: "Team Member 1",
      className: "hidden sm:block top-[38%] left-[17%] md:left-[18%] w-11 h-11 md:w-12 md:h-12",
    },
    // 2. Mid-left avatar (girl with glasses & laptop)
    {
      id: "av-2",
      src: "/agents/nearby/grid_avatar_2.png",
      alt: "Team Member 2",
      className: "hidden sm:block top-[50%] left-[11%] md:left-[12%] w-12 h-12 md:w-14 md:h-14",
    },
    // 3. Center-left Main Large Avatar (curly hair guy with glasses, sitting directly on the wave curve)
    {
      id: "av-3-center",
      src: "/agents/agent_photo_3.png",
      alt: "Featured Real Estate Specialist",
      className: "bottom-[4%] sm:bottom-[8%] left-[23%] sm:left-[24%] md:left-[25%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] z-30",
    },
    // 4. Top-right avatar (bearded man smiling)
    {
      id: "av-4",
      src: "/agents/nearby/grid_avatar_4.png",
      alt: "Team Member 4",
      className: "hidden sm:block top-[36%] right-[23%] md:right-[24%] w-11 h-11 md:w-12 md:h-12",
    },
    // 5. Far right avatar (man in dark suit)
    {
      id: "av-5",
      src: "/agents/agent_photo_2.png",
      alt: "Team Member 5",
      className: "hidden sm:block top-[45%] right-[13%] md:right-[14%] w-12 h-12 md:w-14 md:h-14",
    },
    // 6. Lower-right avatar (woman in blue blazer)
    {
      id: "av-6",
      src: "/agents/nearby/grid_avatar_6.png",
      alt: "Team Member 6",
      className: "hidden sm:block top-[60%] right-[20%] md:right-[21%] w-12 h-12 md:w-14 md:h-14 z-20",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eaf6fe] via-[#eafbf6] to-white pt-36 sm:pt-40 md:pt-44 pb-20 sm:pb-28 min-h-[500px] sm:min-h-[560px] flex flex-col justify-between font-poppins">
      
      {/* Ambient background glow */}
      <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[95vw] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.40)_0%,rgba(45,212,191,0.28)_35%,rgba(96,165,250,0.12)_65%,transparent_75%)] pointer-events-none blur-3xl z-0" />

      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[480px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_70%)] pointer-events-none blur-2xl z-0" />

      {/* Decorative background shapes */}
      <div className="absolute bottom-[20%] left-[6%] w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/80 bg-white/10 blur-[0.5px] pointer-events-none z-10" />
      <div className="absolute top-[35%] left-[16%] w-12 h-12 rounded-full border border-white/60 bg-white/10 pointer-events-none z-10" />
      <div className="absolute bottom-[16%] right-[28%] w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/80 bg-white/10 blur-[0.5px] pointer-events-none z-10" />
      <div className="absolute top-[38%] right-[11%] w-14 h-14 rounded-full border border-white/50 bg-white/10 pointer-events-none z-10" />

      {/* Floating team avatars */}
      {avatars.map((av) => (
        <div
          key={av.id}
          className={`absolute ${av.className} rounded-full border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.10)] overflow-hidden bg-white hover:scale-110 transition-transform duration-300 z-10`}
        >
          <Image
            src={av.src}
            alt={av.alt}
            fill
            className="object-cover"
            sizes="120px"
            priority={av.id === "av-3-center"}
          />
        </div>
      ))}

      {/* Heading */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mt-2 sm:mt-4 mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#1865F2] tracking-tight mb-3 drop-shadow-2xs leading-tight">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base md:text-[17px] font-medium text-[#0B132B] max-w-xl mx-auto tracking-normal">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="relative block w-full h-24 sm:h-32 text-white"
        >
          <defs>
            <linearGradient id="heroWaveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#2563EB" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#06B6D4" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Solid White Fill below the wave */}
          <path
            d="M0,90 C220,135 340,140 500,125 C660,110 760,65 920,60 C1080,55 1240,95 1440,75 L1440,160 L0,160 Z"
            fill="#FFFFFF"
          />

          {/* Smooth Wave Stroke Line */}
          <path
            d="M0,90 C220,135 340,140 500,125 C660,110 760,65 920,60 C1080,55 1240,95 1440,75"
            fill="none"
            stroke="url(#heroWaveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secondary Soft Translucent Accent Line */}
          <path
            d="M0,105 C240,145 360,148 520,133 C680,118 780,73 940,68 C1100,63 1260,103 1440,85"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.2"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
};
