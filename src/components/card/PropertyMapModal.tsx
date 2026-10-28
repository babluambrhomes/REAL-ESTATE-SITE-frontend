"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  MapPin,
  ExternalLink,
  Navigation,
  Compass,
  Train,
  HeartPulse,
  GraduationCap,
} from "lucide-react";

interface PropertyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title?: string;
    location?: string;
    city?: string;
    price?: string;
    image?: string;
  };
}

export const PropertyMapModal = ({
  isOpen,
  onClose,
  property,
}: PropertyMapModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const fullLocation = `${property.title || "Property"}, ${property.location || "Noida"}, ${property.city || "India"}`;
  const encodedQuery = encodeURIComponent(fullLocation);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Glow */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#1865F2] via-blue-400 to-[#00BA7A]" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 hover:bg-slate-100 text-slate-700 shadow-md transition-colors cursor-pointer border border-slate-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="min-w-0 pr-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1865F2]">
              <MapPin className="h-3.5 w-3.5" />
              <span>Location & Landmark View</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">
              {property.title || "Property Location"}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {property.location || "Noida, Uttar Pradesh"}
            </p>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100 border-b border-slate-200">
          <iframe
            src={embedMapUrl}
            title={property.title || "Property Map"}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Directions Badge */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#1865F2] hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-lg transition-transform hover:scale-105"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 ml-0.5" />
          </a>
        </div>

        {/* Nearby Key Landmarks */}
        <div className="p-5 overflow-y-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            Key Landmarks & Connectivity
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#1865F2]">
                <Train className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">Metro Station</p>
                <p className="text-[11px] font-bold text-slate-800 truncate">1.2 km Away</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#00BA7A]">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">Expressway</p>
                <p className="text-[11px] font-bold text-slate-800 truncate">0.8 km Away</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-500">
                <HeartPulse className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">Hospital</p>
                <p className="text-[11px] font-bold text-slate-800 truncate">2.4 km Away</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-slate-400">Top School</p>
                <p className="text-[11px] font-bold text-slate-800 truncate">1.5 km Away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
