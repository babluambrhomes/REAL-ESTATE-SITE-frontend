"use client";

import Image from "next/image";

interface BuilderHeroBannerProps {
  onGetExpert?: () => void;
}

export const BuilderHeroBanner = ({ onGetExpert }: BuilderHeroBannerProps) => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 font-jakarta">
      <div className="relative w-full aspect-[1024/240] min-h-[220px] sm:min-h-[270px] md:min-h-[300px] rounded-[24px] overflow-hidden shadow-[0_6px_28px_rgba(24,101,242,0.06)] border border-[#D5E6FA]">
        
        {/* Exact Master Figma Hero Banner */}
        <Image
          src="/builders/figma_hero_banner_master.png"
          alt="Find The Right Property Expert For Your Next Move"
          fill
          priority
          className="object-cover object-center pointer-events-none"
          sizes="(max-width: 1360px) 100vw, 1360px"
        />

        {/* Interactive Overlay Button 1: Left "Get Right Expert" */}
        <button
          type="button"
          onClick={onGetExpert}
          aria-label="Get Right Expert"
          className="absolute left-[4.5%] bottom-[13%] w-[15.5%] min-w-[110px] max-w-[155px] h-[16%] min-h-[36px] max-h-[46px] rounded-xl hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer z-20"
        />

        {/* Interactive Overlay Button 2: Right Card "Get Right Expert ->" */}
        <button
          type="button"
          onClick={onGetExpert}
          aria-label="Get Right Expert Lead"
          className="absolute right-[21.5%] top-[58%] w-[10%] min-w-[85px] max-w-[120px] h-[14%] min-h-[30px] max-h-[40px] rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer z-20"
        />

      </div>
    </div>
  );
};
