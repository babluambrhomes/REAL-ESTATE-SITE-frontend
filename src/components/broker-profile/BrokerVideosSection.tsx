"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Calendar, X } from "lucide-react";

export const BrokerVideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    image: string;
  } | null>(null);

  const videos = [
    {
      id: "vid-1",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_noida.png",
    },
    {
      id: "vid-2",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_gurgaon.png",
    },
    {
      id: "vid-3",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/thumb_noida_luxury.png",
    },
    {
      id: "vid-4",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_noida.png",
    },
    {
      id: "vid-5",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_gurgaon.png",
    },
    {
      id: "vid-6",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/thumb_noida_luxury.png",
    },
    {
      id: "vid-7",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_noida.png",
    },
    {
      id: "vid-8",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/figma_photo_gurgaon.png",
    },
    {
      id: "vid-9",
      title: "DLF Park Walkthrough Luxury 4 BHK Apartments",
      views: "2.1K Views",
      time: "2 weeks ago",
      duration: "3:10",
      image: "/builders/thumb_noida_luxury.png",
    },
  ];

  return (
    <div className="w-full space-y-6 font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-[17px] font-black text-[#0B132B] tracking-tight">
          Vedios
        </h2>
        <Link
          href="/properties"
          className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* 3x3 Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="bg-white rounded-[12px] border border-slate-200/90 overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_26px_rgba(24,101,242,0.12)] hover:-translate-y-1 transition-all p-2.5 flex flex-col justify-between cursor-pointer group"
          >
            {/* Thumbnail + Overlay + Play Button */}
            <div className="relative w-full h-[155px] rounded-[10px] overflow-hidden bg-slate-900 mb-2.5">
              <Image
                src={vid.image}
                alt={vid.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Centered Circular Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/40 border-2 border-white text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1865F2] group-hover:border-[#1865F2] transition-all pl-0.5">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9.5px] font-bold tracking-wider backdrop-blur-xs">
                {vid.duration}
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5 text-left px-0.5">
              <h3 className="text-xs sm:text-[12.5px] font-black text-[#0B132B] line-clamp-2 leading-snug group-hover:text-[#1865F2] transition-colors">
                {vid.title}
              </h3>
              <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-semibold pt-0.5">
                <span>{vid.views}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{vid.time}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner: "Find your next property with confidence" */}
      <div
        className="w-full rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        style={{
          background:
            "linear-gradient(90deg, #ADC8F8 0%, #E8DFD8 50%, #F5DEC9 100%)",
        }}
      >
        {/* Left Text & CTA */}
        <div className="space-y-3 z-10 text-left max-w-xl">
          <h3 className="text-xl sm:text-2xl font-black text-[#0B132B] tracking-tight">
            Find your next property with confidence
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-[13px] font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block" />
              Trusted advice
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block" />
              Verified listings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block" />
              Personalized assistance
            </span>
          </div>

          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-block px-7 py-2.5 bg-white hover:bg-slate-50 text-[#1865F2] font-black text-xs sm:text-[13px] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Buy Home
            </Link>
          </div>
        </div>

        {/* Right Villa Image */}
        <div className="relative w-full md:w-[320px] h-[140px] sm:h-[160px] shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/40">
          <Image
            src="/images/properties/villa-popular-figma.jpg"
            alt="Find property with confidence"
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-slate-900 flex items-center justify-center text-white relative">
              <Image
                src={selectedVideo.image}
                alt={selectedVideo.title}
                fill
                className="object-cover opacity-40"
              />
              <div className="text-center p-6 space-y-3 z-10">
                <div className="w-16 h-16 rounded-full bg-[#1865F2] flex items-center justify-center mx-auto shadow-lg pl-1 animate-pulse">
                  <Play className="w-8 h-8 fill-white text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto font-medium">
                  High definition 4K walkthrough and drone footage captured by
                  Jitender Singh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
