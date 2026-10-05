"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, MapPin, X } from "lucide-react";

interface ThumbnailItem {
  id: string;
  image: string;
  title: string;
  bhk: string;
  location: string;
  project: string;
  width: string; // custom width for natural staggered look
  extraMargin?: string; // random spacing / gap between images
  hasPlayIcon?: boolean;
  videoUrl?: string;
}

const ROW_1_ITEMS: ThumbnailItem[] = [
  {
    id: "r1-1",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    title: "Luxury Pool Villa",
    bhk: "3 BHK Apartments",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[110px] sm:w-[135px]",
  },
  {
    id: "r1-2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    title: "Modern Drawing Room",
    bhk: "3 BHK Premium Lounge",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[135px] sm:w-[165px]",
    extraMargin: "mr-12 sm:mr-24 lg:mr-32", // large gap (1 image space)
  },
  {
    id: "r1-3",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
    title: "Executive Conference",
    bhk: "3 BHK Clubhouse",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[100px] sm:w-[125px]",
  },
  {
    id: "r1-4",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80",
    title: "Facade & Towers",
    bhk: "3 BHK Tower View",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[140px] sm:w-[170px]",
    extraMargin: "mr-8 sm:mr-16", // half image gap
  },
  {
    id: "r1-5",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
    title: "Gold Accent Hall",
    bhk: "3 BHK Luxury Suites",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[105px] sm:w-[130px]",
    hasPlayIcon: true,
  },
  {
    id: "r1-6",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80",
    title: "Twilight Pool",
    bhk: "3 BHK Sunset Villa",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[125px] sm:w-[155px]",
    extraMargin: "mr-10 sm:mr-20",
  },
];

const ROW_2_ITEMS: ThumbnailItem[] = [
  {
    id: "r2-1",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=500&q=80",
    title: "Lakeside Deck",
    bhk: "3 BHK Apartments",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[135px] sm:w-[165px]",
  },
  {
    id: "r2-2",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=80",
    title: "Warm Interior",
    bhk: "3 BHK Dining Area",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[95px] sm:w-[120px]",
    extraMargin: "mr-6 sm:mr-12",
  },
  {
    id: "r2-3",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80",
    title: "Open Lounge",
    bhk: "3 BHK Modern Hall",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[130px] sm:w-[160px]",
    extraMargin: "mr-14 sm:mr-28 lg:mr-36", // large gap (1 image space)
  },
  {
    id: "r2-4",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80",
    title: "Poolside Resort",
    bhk: "3 BHK Garden View",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[100px] sm:w-[125px]",
  },
  {
    id: "r2-5",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80",
    title: "Master Suite",
    bhk: "3 BHK Royal Bedroom",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[95px] sm:w-[115px]",
    extraMargin: "mr-8 sm:mr-16",
  },
  {
    id: "r2-6",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80",
    title: "Modern Glass Villa",
    bhk: "3 BHK Glasshouse",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[110px] sm:w-[135px]",
  },
];

const ROW_3_ITEMS: ThumbnailItem[] = [
  {
    id: "r3-1",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80",
    title: "Skyline Highrise",
    bhk: "3 BHK Highrise",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[130px] sm:w-[160px]",
  },
  {
    id: "r3-2",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80",
    title: "Classic Salon",
    bhk: "3 BHK Artistic Living",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[95px] sm:w-[120px]",
    extraMargin: "mr-14 sm:mr-28 lg:mr-36", // large gap (1 full image space)
  },
  {
    id: "r3-3",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    title: "Villa Lagoon",
    bhk: "3 BHK Lagoon Homes",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[130px] sm:w-[160px]",
  },
  {
    id: "r3-4",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    title: "Modern Residence",
    bhk: "3 BHK Premium Flats",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[105px] sm:w-[130px]",
    extraMargin: "mr-8 sm:mr-16", // half image gap
  },
  {
    id: "r3-5",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
    title: "Evening Deck",
    bhk: "3 BHK Penthouse",
    project: "NBCC Aspire Silicon City",
    location: "Sector 76, Noida",
    width: "w-[135px] sm:w-[165px]",
  },
];

export const VideoSlider = () => {
  const [hoveredItem, setHoveredItem] = useState<ThumbnailItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ThumbnailItem | null>(null);

  const displayBhk = hoveredItem ? hoveredItem.bhk : "3 BHK Apartments";
  const displayProject = hoveredItem ? hoveredItem.project : "NBCC Aspire Silicon City";
  const displayLocation = hoveredItem ? hoveredItem.location : "Sector 76, Noida";

  // Duplicate arrays for smooth infinite seamless scrolling
  const fullRow1 = [...ROW_1_ITEMS, ...ROW_1_ITEMS, ...ROW_1_ITEMS];
  const fullRow2 = [...ROW_2_ITEMS, ...ROW_2_ITEMS, ...ROW_2_ITEMS];
  const fullRow3 = [...ROW_3_ITEMS, ...ROW_3_ITEMS, ...ROW_3_ITEMS];

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-10 sm:py-14 overflow-hidden">
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 32s linear infinite;
        }
        .marquee-right {
          display: flex;
          width: max-content;
          animation: scrollRight 36s linear infinite;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Centered Header */}
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight text-[#0B132B]">
          Explore Projects Through <span className="text-[#1865F2]">Video</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#64748B] font-normal max-w-xl mx-auto">
          Watch detailed property videos and explore every project before making your investment decision.
        </p>
      </div>

      {/* 3 Auto-Running Rows Container */}
      <div className="marquee-container flex flex-col gap-5 sm:gap-6 lg:gap-7 w-full">
        {/* ROW 1: Fixed Left Dynamic BHK Label + Auto-scrolling Row */}
        <div className="flex items-center gap-4 sm:gap-6 w-full">
          {/* Left Title: Dynamic BHK Title on hover/click */}
          <div className="shrink-0 w-36 sm:w-48 lg:w-56 text-left pl-2 sm:pl-4">
            <h3 className="text-[17px] sm:text-[20px] lg:text-[22px] font-semibold text-[#0B132B] tracking-tight transition-all duration-200">
              {displayBhk}
            </h3>
          </div>

          {/* Auto-scrolling Row 1 images */}
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-left flex items-center gap-3 sm:gap-3.5">
              {fullRow1.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedVideo(item)}
                  className={`group relative h-[72px] sm:h-[86px] lg:h-[92px] ${item.width} ${item.extraMargin || ""} overflow-hidden rounded-[18px] sm:rounded-[22px] bg-slate-100 shadow-xs transition-transform duration-300 hover:scale-105 cursor-pointer shrink-0`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                  {item.hasPlayIcon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#1865F2] text-white shadow-md backdrop-blur-xs transition-transform group-hover:scale-115">
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Full-width Auto-scrolling Row */}
        <div className="relative w-full overflow-hidden">
          <div className="marquee-right flex items-center gap-3 sm:gap-3.5">
            {fullRow2.map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedVideo(item)}
                className={`group relative h-[72px] sm:h-[86px] lg:h-[92px] ${item.width} ${item.extraMargin || ""} overflow-hidden rounded-[18px] sm:rounded-[22px] bg-slate-100 shadow-xs transition-transform duration-300 hover:scale-105 cursor-pointer shrink-0`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* ROW 3: Left Auto-scrolling Row + Fixed Right Dynamic Project & Location Details */}
        <div className="flex items-center gap-4 sm:gap-6 w-full">
          {/* Left Auto-scrolling Row */}
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-left flex items-center gap-3 sm:gap-3.5">
              {fullRow3.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedVideo(item)}
                  className={`group relative h-[72px] sm:h-[86px] lg:h-[92px] ${item.width} ${item.extraMargin || ""} overflow-hidden rounded-[18px] sm:rounded-[22px] bg-slate-100 shadow-xs transition-transform duration-300 hover:scale-105 cursor-pointer shrink-0`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Details: Dynamic Project Name & Location on hover/click */}
          <div className="shrink-0 w-44 sm:w-60 lg:w-68 text-right pr-2 sm:pr-4">
            <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-[#0B132B] tracking-tight leading-snug transition-all duration-200">
              {displayProject}
            </h3>
            <p className="mt-1 flex items-center justify-end gap-1.5 text-[12.5px] sm:text-[14px] text-[#64748B] font-normal transition-all duration-200">
              <span>{displayLocation}</span>
              <MapPin className="h-4 w-4 text-[#1865F2] shrink-0" />
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal Player on Click */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[24px] bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={`${selectedVideo.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}?autoplay=1`}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-slate-900 text-white">
              <h4 className="text-base font-semibold">{selectedVideo.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedVideo.project} • {selectedVideo.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
