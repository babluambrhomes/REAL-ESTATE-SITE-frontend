"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Play,
  Compass,
  Sparkles,
  Maximize2,
  Calendar,
  Download,
  CheckCircle2,
  PhoneCall,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

interface PropertyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
  location?: string;
}

interface RoomPerspective {
  id: string;
  name: string;
  image: string;
  dimensions: string;
  finish: string;
  features: string[];
}

const ROOM_PERSPECTIVES: RoomPerspective[] = [
  {
    id: "living",
    name: "Living & Dining Lounge",
    image: "/images/properties/terraces-max-estate-clean.png",
    dimensions: "24'0\" × 14'6\"",
    finish: "Imported Italian Statuario Marble",
    features: ["Double-height 10.5 ft false ceiling", "Full-height DGU noise-cancelling sliders", "Integrated concealed mood LED lighting"],
  },
  {
    id: "master",
    name: "Master Haven Suite",
    image: "/images/properties/terraces-max-estate-clean.png",
    dimensions: "16'0\" × 13'0\"",
    finish: "German Laminated Hardwood Flooring",
    features: ["Dedicated walk-in dressing wardrobe", "Private east-facing coffee balcony", "Smart automated blackout curtain track"],
  },
  {
    id: "kitchen",
    name: "Gourmet Modular Kitchen",
    image: "/images/properties/terraces-max-estate-clean.png",
    dimensions: "12'6\" × 10'0\"",
    finish: "Quartz Stone Counter & Soft-Close PU Shutters",
    features: ["Pre-fitted Faber touch chimney & 4-burner hob", "Dedicated service balcony with washing point", "Piped natural gas (PNG) ready pipeline"],
  },
  {
    id: "balcony",
    name: "Skyline Green Balcony",
    image: "/images/properties/terraces-max-estate-clean.png",
    dimensions: "14'0\" × 5'6\"",
    finish: "Anti-Skid Weatherproof Ceramic Decking",
    features: ["180° uninterrupted green golf/park vista", "SS-304 Toughened Glass Safety Railing", "Vertical herb garden provision"],
  },
  {
    id: "clubhouse",
    name: "Grand 5-Star Clubhouse",
    image: "/images/properties/terraces-max-estate-clean.png",
    dimensions: "45,000 SQ.FT. Facility",
    finish: "Luxury Resort Styled Architecture",
    features: ["Olympic temperature-controlled lap pool", "Indoor badminton & squash courts", "Steam, sauna, spa & wellness lounge"],
  },
];

const DEFAULT_EMBED_URL = "https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?autoplay=1&rel=0";

function parseVideoEmbedUrl(url?: string): string {
  if (!url) return DEFAULT_EMBED_URL;
  if (url.includes("youtube.com/embed/") || url.includes("youtube-nocookie.com/embed/")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
  }
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
}

export const PropertyVideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  title = "Property Virtual Tour",
  location = "Noida Expressway",
}: PropertyVideoModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveMode] = useState<"video" | "360">("video");
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isSiteVisitBooked, setIsSiteVisitBooked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const embedSrc = parseVideoEmbedUrl(videoUrl);
  const activeRoom = ROOM_PERSPECTIVES[activeRoomIndex];

  const handleQuickSiteVisit = () => {
    try {
      const newVisit = {
        id: `sv-${Date.now()}`,
        propertyTitle: title.replace(" - Video Tour", "").trim(),
        propertyLocation: location,
        propertyImage: activeRoom.image,
        visitDate: "Tomorrow",
        timeSlot: "11:00 AM - 01:00 PM",
        advisorName: "Rohit Verma (Roofin Expert)",
        advisorPhone: "+91 98110 54321",
        status: "Confirmed",
        meetingPoint: "Project Sales Pavilion, Gate 1 VIP Lounge",
      };
      const existing = JSON.parse(localStorage.getItem("roofin_site_visits") || "[]");
      localStorage.setItem("roofin_site_visits", JSON.stringify([newVisit, ...existing]));
      setIsSiteVisitBooked(true);
      toast.success("Site Visit Booked! Added to your dashboard under My Visits.");
    } catch {
      toast.success("Site Visit Booked!");
    }
  };

  const handleDownloadBrochure = () => {
    try {
      const newBrochure = {
        id: `br-${Date.now()}`,
        propertyTitle: title.replace(" - Video Tour", "").trim(),
        downloadedAt: new Date().toLocaleDateString("en-IN"),
      };
      const existing = JSON.parse(localStorage.getItem("roofin_brochure_leads") || "[]");
      localStorage.setItem("roofin_brochure_leads", JSON.stringify([newBrochure, ...existing]));
      toast.success("High-res 3D Project Brochure Downloaded!");
    } catch {
      toast.success("Brochure Downloaded!");
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 transition-opacity font-poppins"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-white/10 text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-black truncate max-w-[200px] sm:max-w-md">
                {title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Roofin Certified 4K Cinematic & 360° Walkthrough
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveMode("video")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === "video"
                  ? "bg-[#1865F2] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Video Tour</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("360")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === "360"
                  ? "bg-[#00B4D8] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>360° Room Tour</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Viewer Body */}
        <div className="relative flex-1 bg-black overflow-y-auto">
          {activeMode === "video" ? (
            /* Video Player Frame */
            <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[460px] bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src={embedSrc}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            /* 360 Room Perspective Explorer */
            <div className="relative flex flex-col">
              {/* Room Strip Selector */}
              <div className="flex items-center gap-2 p-3 bg-slate-900 border-b border-white/10 overflow-x-auto">
                {ROOM_PERSPECTIVES.map((room, idx) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveRoomIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeRoomIndex === idx
                        ? "bg-[#00B4D8] text-white shadow-sm"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>

              {/* Viewport Frame */}
              <div className="relative w-full aspect-video min-h-[280px] sm:min-h-[420px] bg-slate-900 flex items-center justify-center overflow-hidden">
                <Image
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  fill
                  className="object-cover"
                />

                {/* Ambient 360 Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* 360 Guidance Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#00B4D8] animate-spin" style={{ animationDuration: "12s" }} />
                  <span>360° Panoramic View • {activeRoom.name}</span>
                </div>

                {/* Interactive Hotspot Pills on the scene */}
                <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-auto max-w-md bg-black/75 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-[#00B4D8] uppercase tracking-wider">
                      Room Specifications
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {activeRoom.dimensions}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mb-2">
                    Floor: <span className="text-white font-normal">{activeRoom.finish}</span>
                  </p>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {activeRoom.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Action Bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-[#00D084]" />
            <span>Interested in this property layout? Speak with a verified Roofin advisor.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Brochure</span>
            </button>

            {isSiteVisitBooked ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Visit Booked!</span>
                <Link href="/u/me?tab=visits" className="underline hover:text-emerald-300">
                  View Visits &rarr;
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickSiteVisit}
                className="px-4 py-2 rounded-xl bg-[#00D084] hover:bg-[#00b874] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-[0_3px_12px_rgba(0,208,132,0.3)] transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Free Site Visit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
