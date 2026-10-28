"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Mail,
  Send,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

interface PropertyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title: string;
    location: string;
    price: string;
    city?: string;
  };
}

export const PropertyShareModal = ({
  isOpen,
  onClose,
  property,
}: PropertyShareModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and ESC key
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this property on Roofin: ${property.title} in ${property.location} - Starting at ${property.price}!\n${currentUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Property on Roofin: ${property.title}`);
    const body = encodeURIComponent(shareText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} in ${property.location} on Roofin`,
          url: currentUrl,
        });
        toast.success("Shared successfully!");
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 z-10 font-poppins animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#1865F2]">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Share Property</h3>
              <p className="text-xs text-slate-500 line-clamp-1">{property.title}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Share Buttons Grid */}
        <div className="grid grid-cols-3 gap-3 py-5">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-emerald-700 hover:bg-emerald-100/70 transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold">WhatsApp</span>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={handleEmailShare}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-sky-100 bg-sky-50/60 p-3.5 text-sky-700 hover:bg-sky-100/70 transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1865F2] text-white shadow-sm">
              <Mail className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold">Email</span>
          </button>

          {/* Native / More */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-slate-700 hover:bg-slate-100 transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white shadow-sm">
              <Send className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold">More Options</span>
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div className="pt-2">
          <label className="text-xs font-medium text-slate-600 block mb-1.5">
            Or copy shareable link
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-[#1865F2] focus-within:bg-white transition-colors">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent px-2.5 text-xs font-medium text-slate-700 outline-none select-all truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-[#1865F2] hover:bg-blue-700"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-[11px] text-slate-400">
          Sharing verified details directly from Roofin Portal
        </p>
      </div>
    </div>,
    document.body
  );
};
