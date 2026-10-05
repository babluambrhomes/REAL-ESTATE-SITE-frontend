"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface PostPropertyTopAnnouncementProps {
  onClose?: () => void;
}

export const PostPropertyTopAnnouncement = ({ onClose }: PostPropertyTopAnnouncementProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-[#1865F2] text-white py-2 px-4 text-[12px] sm:text-[13px] font-medium transition-all duration-300 relative z-50">
      <div className="max-w-[1380px] mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-jakarta tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Find Your Dream Home</span>
          <span className="mx-2 opacity-60">•</span>
          <span>Trusted Real Estate Experts</span>
          <span className="mx-2 opacity-60">•</span>
          <span>Verified Listings</span>
          <span className="mx-2 opacity-60">•</span>
          <span>Exclusive Offers</span>
          <span className="mx-2 opacity-60">•</span>
          <span className="font-semibold text-white underline underline-offset-2 cursor-pointer hover:opacity-90">
            Book Your Site Visit Today
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          aria-label="Dismiss Announcement"
          className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-2 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
