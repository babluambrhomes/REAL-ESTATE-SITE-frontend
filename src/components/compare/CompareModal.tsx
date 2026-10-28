"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Check,
  Plus,
  MapPin,
  Phone,
  Share2,
  Sparkles,
  ShieldCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Property } from "@/types";
import toast from "react-hot-toast";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperties: Property[];
  onAddProperty?: () => void;
  onRemoveProperty: (index: number) => void;
}

export const CompareModal = ({
  isOpen,
  onClose,
  selectedProperties,
  onAddProperty,
  onRemoveProperty,
}: CompareModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const comparisonAttributes = [
    { label: "Price", key: "price", render: (p: Property) => p.price },
    {
      label: "Original / List Price",
      key: "originalPrice",
      render: (p: Property) => p.originalPrice || "N/A",
    },
    { label: "Location", key: "location", render: (p: Property) => p.location },
    { label: "City", key: "city", render: (p: Property) => p.city || "Noida" },
    {
      label: "Configuration",
      key: "beds",
      render: (p: Property) => `${p.beds || "3"} BHK`,
    },
    { label: "Property Type", key: "type", render: (p: Property) => p.type || "Apartment" },
    {
      label: "Carpet Area",
      key: "area",
      render: (p: Property) => p.infoChips?.[0]?.value || "3,200 Sq.Ft",
    },
    {
      label: "Possession Status",
      key: "status",
      render: (p: Property) => p.infoChips?.[2]?.value || "Ready to Move",
    },
    {
      label: "Amenities Score",
      key: "amenities",
      render: (p: Property) => p.infoChips?.[1]?.value || "60%",
    },
    {
      label: "Verified Deal",
      key: "verified",
      render: () => (
        <span className="inline-flex items-center gap-1 text-[#00D084] font-bold text-xs">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified
        </span>
      ),
    },
    {
      label: "RERA Approved",
      key: "rera",
      render: () => (
        <span className="text-[#00D084] font-semibold text-xs flex items-center gap-1">
          <Check className="w-3.5 h-3.5" /> Yes (Registered)
        </span>
      ),
    },
    {
      label: "Swimming Pool",
      key: "pool",
      render: () => <Check className="w-4 h-4 text-emerald-600" />,
    },
    {
      label: "Clubhouse & Gym",
      key: "clubhouse",
      render: () => <Check className="w-4 h-4 text-emerald-600" />,
    },
    {
      label: "24/7 Power Backup",
      key: "power",
      render: () => <Check className="w-4 h-4 text-emerald-600" />,
    },
    {
      label: "Gated Security",
      key: "security",
      render: () => <Check className="w-4 h-4 text-emerald-600" />,
    },
    {
      label: "Dedicated Parking",
      key: "parking",
      render: () => <Check className="w-4 h-4 text-emerald-600" />,
    },
  ];

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Comparison link copied to clipboard!");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[1240px] max-h-[92vh] bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1865F2] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Side-by-Side Comparison
              </span>
              <span className="text-xs text-slate-400">
                • {selectedProperties.length} Properties
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] mt-0.5">
              Compare Properties
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Comparison Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-[700px]">
            {/* Top Cards Row */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-200">
              <div className="flex flex-col justify-end p-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Features &amp; Specifications
                </span>
                <p className="text-sm font-bold text-[#0B132B]">
                  Detailed Comparison Matrix
                </p>
              </div>

              {selectedProperties.map((prop, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[20px] bg-[#F8FAFC] border border-slate-200 p-3 flex flex-col justify-between shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => onRemoveProperty(idx)}
                    className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-red-50 hover:text-red-600 text-slate-400 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title="Remove Property"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative h-28 w-full rounded-[14px] overflow-hidden mb-2.5 bg-slate-200">
                    <Image
                      src={prop.images?.[0] || "/images/properties/villa-popular-figma.jpg"}
                      alt={prop.title || "Property"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#1865F2] uppercase tracking-wide">
                      {prop.chips?.[0] || "3 BHK"}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {prop.location}
                    </p>
                    <p className="text-xs font-extrabold text-[#0B132B] mt-1">
                      {prop.price}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add Slot Placeholder if < 3 */}
              {selectedProperties.length < 3 && onAddProperty && (
                <div
                  onClick={onAddProperty}
                  className="rounded-[20px] border-2 border-dashed border-blue-200 bg-blue-50/20 hover:bg-blue-50/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[160px]"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1865F2] flex items-center justify-center mb-2">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1865F2]">
                    Add Another Property
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Compare up to 3 side-by-side
                  </span>
                </div>
              )}
            </div>

            {/* Spec Attribute Rows */}
            <div className="divide-y divide-slate-100 pt-2">
              {comparisonAttributes.map((attr, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-4 py-3 items-center hover:bg-slate-50/60 transition-colors px-2 rounded-lg"
                >
                  <div className="text-[12.5px] font-semibold text-slate-600">
                    {attr.label}
                  </div>
                  {selectedProperties.map((prop, pIdx) => (
                    <div key={pIdx} className="text-[13px] font-medium text-slate-800">
                      {attr.render(prop)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Need personalized advisory? Call our verified expert at{" "}
            <span className="font-semibold text-slate-800">+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              href="/compare/side-by-side"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#1865F2] text-[#1865F2] hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Studio Page</span>
            </Link>
            <button
              type="button"
              onClick={handleShare}
              className="px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
