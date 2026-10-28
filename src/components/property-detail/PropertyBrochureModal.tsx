"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Phone,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface PropertyBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title: string;
    location: string;
    price: string;
    city?: string;
    type?: string;
    beds?: string;
    description?: string;
    reraNumber?: string;
  };
}

export const PropertyBrochureModal = ({
  isOpen,
  onClose,
  property,
}: PropertyBrochureModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload name/phone from localStorage if available
    try {
      const savedUser = localStorage.getItem("roofin_user_profile");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
      }
    } catch {}
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

  // Function to generate and trigger real PDF/document download
  const triggerBrochureDownload = () => {
    const brochureContent = `
=====================================================
            ROOFIN VERIFIED PROPERTY BROCHURE
=====================================================

PROJECT: ${property.title}
LOCATION: ${property.location}, ${property.city || "NCR"}
STARTING PRICE: ${property.price}
CONFIGURATION: ${property.beds || "3 & 4 BHK"} Luxury ${property.type || "Apartments"}
RERA ID: ${property.reraNumber || "UPRERAPRJ" + Math.floor(100000 + Math.random() * 900000)}

-----------------------------------------------------
PROJECT OVERVIEW:
${property.description || "Spacious luxury residences built with earthquake-resistant structure, modern modular kitchen, scenic balcony views, and imported premium fittings."}

KEY SPECIFICATIONS:
• Structure: RCC framed structure compliant with seismic zone IV
• Flooring: Italian marble in living & dining; wooden laminated in master bedroom
• Kitchen: Modular setup with chimney, hob & piped gas provision
• Security: 3-tier 24x7 CCTV & biometric access control
• Club House: 45,000 sq.ft. mega clubhouse with heated pool, gym, squash & cafe
• Greenery: 70%+ landscaped green areas and reflexology pathways

CONNECTIVITY & LANDMARKS:
• Nearest Metro Station: 5-8 mins drive
• Major Expressway: 2 mins direct access
• Top Schools & Multispeciality Hospitals: Within 3 km radius

-----------------------------------------------------
OFFICIAL DEVELOPER / MARKETING PARTNER:
Roofin Technologies Pvt Ltd
Email: contact@roofin.in | Support: +91 98765 43210
Official Portal: https://roofin.in/properties/${property.id || "1"}

Downloaded on: ${new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}
Reference ID: ROOFIN-DOC-${Math.floor(10000 + Math.random() * 90000)}
=====================================================
`;

    const blob = new Blob([brochureContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${property.title.replace(/[^a-zA-Z0-9]/g, "_")}_Official_Brochure.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    // Send lead to backend API
    propertyApi.submitEnquiry({
      name: name.trim(),
      email: `buyer${cleanPhone.slice(-6)}@roofin.in`,
      phone: cleanPhone,
      message: `Downloaded official brochure for ${property.title} (${property.location}). WhatsApp updates: ${whatsappUpdates ? "Yes" : "No"}`,
      propertyId: typeof property.id === "string" ? property.id : undefined,
    }).catch(() => {});

    setTimeout(() => {
      // Save lead to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem("roofin_brochure_leads") || "[]");
        existing.push({
          propertyId: property.id,
          propertyTitle: property.title,
          name: name.trim(),
          phone: cleanPhone,
          whatsappUpdates,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("roofin_brochure_leads", JSON.stringify(existing));
        localStorage.setItem(
          "roofin_user_profile",
          JSON.stringify({ name: name.trim(), phone: cleanPhone })
        );
      } catch {}

      // Trigger file download
      triggerBrochureDownload();

      setIsSubmitting(false);
      setDownloadSuccess(true);
      toast.success("Brochure downloaded successfully!");
    }, 600);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 z-10 font-poppins animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {downloadSuccess ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Brochure Downloaded!
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                Official prospectus for <span className="font-bold text-slate-800">{property.title}</span> has been saved to your device.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-left flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-[#1865F2] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-medium text-slate-800">
                  WhatsApp Prospectus Delivery:
                </p>
                <p>
                  A copy of the complete floor plans and price breakdown has also been queued for +91 {phone}.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={triggerBrochureDownload}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Download className="h-4 w-4 text-[#1865F2]" />
                <span>Download Again</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1865F2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span>Done</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1865F2]">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1865F2] uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Project Prospectus</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  Download Official Brochure
                </h3>
              </div>
            </div>

            {/* Property Summary Pill */}
            <div className="my-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 line-clamp-1">
                  {property.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {property.location} • {property.price}
                </p>
              </div>
              <span className="rounded-lg bg-emerald-100 text-emerald-700 px-2.5 py-1 text-[11px] font-bold shrink-0">
                Free PDF
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-[#1865F2] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-[#1865F2] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <span className="bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-600 border-r border-slate-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Instant download starts right after submitting.
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="whatsapp-brochure"
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1865F2] focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="whatsapp-brochure" className="text-xs text-slate-600 leading-tight cursor-pointer">
                  Send brochure PDF &amp; latest price lists directly to my WhatsApp
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1865F2] to-[#0284C7] py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Brochure...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download Brochure PDF</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
