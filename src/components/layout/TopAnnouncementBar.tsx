"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TopAnnouncementBarProps {
  onClose?: () => void;
  isFixed?: boolean;
}

export const TopAnnouncementBar = ({ onClose, isFixed = true }: TopAnnouncementBarProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      aria-label="Announcement"
      className={`w-full bg-[#1656DC] text-white py-2 px-4 text-[11.5px] sm:text-xs font-semibold tracking-wide z-50 overflow-hidden ${
        isFixed ? "fixed top-0 left-0 right-0 h-[44px] sm:h-[48px] flex items-center" : "relative"
      }`}
    >
      <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between gap-4 font-jakarta">
        <div className="flex-1 text-center truncate text-[11px] sm:text-xs">
          <span>Find Your Dream Home</span>
          <span className="mx-2 text-white/50">•</span>
          <span>Trusted Real Estate Experts</span>
          <span className="mx-2 text-white/50">•</span>
          <span>Verified Listings</span>
          <span className="mx-2 text-white/50">•</span>
          <span>Exclusive Offers</span>
          <span className="mx-2 text-white/50">•</span>
          <span className="hover:underline cursor-pointer">Book Your Site Visit Today</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="text-white/80 hover:text-white transition-colors cursor-pointer shrink-0 p-1 hover:bg-white/10 rounded"
          aria-label="Close Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
