"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface PropertyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

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
  title = "Property Video Tour",
}: PropertyVideoModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedSrc = parseVideoEmbedUrl(videoUrl);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold truncate max-w-[280px] sm:max-w-md">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
