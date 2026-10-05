"use client";

import Image from "next/image";

const AGENTS_BUILDERS = [
  {
    type: "agent",
    name: "JITENDRA SINGH",
    designation: "Director Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bgCircle: "bg-[#EEF1F6]",
  },
  {
    type: "agent",
    name: "JITENDRA SINGH",
    designation: "Director Sales",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bgCircle: "bg-[#EAE5DF]",
  },
  {
    type: "builder",
    name: "Smiriti Singh",
    company: "E-BUILDER",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    bgCircle: "bg-[#F5E8D8]",
  },
  {
    type: "builder",
    name: "Smiriti Singh",
    company: "E-BUILDER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bgCircle: "bg-[#F8BABA]",
  },
  {
    type: "builder",
    name: "Smiriti Singh",
    company: "E-BUILDER",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bgCircle: "bg-[#E2E8F0]",
  },
];

export const TopAgents = () => {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-10 sm:py-12">
      {/* Header (Matches Figma Screenshot) */}
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-[#0B132B]">
          Meet Our <span className="text-[#1865F2]">Trusted Agents & Builder</span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] font-normal">
          Meet our team of trusted real estate professionals dedicated to your property needs.
        </p>
      </div>

      {/* 5 Cards Row matching screenshot 1:1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5 sm:gap-5">
        {AGENTS_BUILDERS.map((person, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-between rounded-[28px] sm:rounded-[32px] bg-[#F5F6FB] border-b-[8px] border-b-[#1865F2] p-5 pt-7 pb-6 text-center transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Circular Profile Avatar Container */}
            <div
              className={`relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ${person.bgCircle} shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner`}
            >
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="150px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Info Area */}
            <div className="mt-4.5 flex flex-col items-center justify-center w-full min-h-[50px]">
              {person.type === "agent" ? (
                <>
                  <h3 className="text-[15.5px] sm:text-[16.5px] font-bold uppercase tracking-tight text-[#0B132B] truncate w-full leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#627D98] font-medium mt-1 leading-tight">
                    {person.designation}
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full">
                  {/* e-Builder Logo from saved Figma asset */}
                  <div className="relative h-11 w-16 sm:w-18 shrink-0">
                    <Image
                      src="/icon/e-builder.png"
                      alt="e-Builder"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Vertical Blue-tinted Divider */}
                  <div className="h-8.5 w-[1.5px] bg-[#1865F2]/50 shrink-0 mx-1" />

                  {/* Company & Representative */}
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] sm:text-[13.5px] font-bold uppercase tracking-tight text-[#0B132B] leading-tight">
                      {person.company}
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] text-[#627D98] font-medium leading-tight mt-0.5">
                      {person.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
