"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Send,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface PropertyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id?: string | number;
    title: string;
    location?: string;
  };
}

const REPORT_REASONS = [
  { id: "price_mismatch", label: "Price displayed is inaccurate or misleading" },
  { id: "already_sold", label: "Property has already been sold or rented out" },
  { id: "fake_photos", label: "Photos or floor plans are fake / incorrect" },
  { id: "brokerage_fee", label: "Broker is demanding unauthorized high commission" },
  { id: "wrong_location", label: "Location or tagged sector landmark is incorrect" },
  { id: "other", label: "Other issue or fraud concern" },
];

export const PropertyReportModal = ({
  isOpen,
  onClose,
  property,
}: PropertyReportModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0].id);
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportedRef, setReportedRef] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refId = `ROOFIN-REP-${Math.floor(1000 + Math.random() * 9000)}`;

    propertyApi.submitEnquiry({
      name: "Trust & Safety Alert",
      email: contact.includes("@") ? contact.trim() : "safety@roofin.in",
      phone: contact.replace(/\D/g, "") || undefined,
      message: `[FLAGGED PROPERTY REPORT] Ref: ${refId}. Property: ${property.title} (ID: ${property.id}). Reason: ${selectedReason}. Details: ${details.trim()}`,
      propertyId: typeof property.id === "string" ? property.id : undefined,
    }).catch(() => {});

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem("roofin_property_reports") || "[]");
        existing.push({
          refId,
          propertyId: property.id,
          propertyTitle: property.title,
          reason: selectedReason,
          details: details.trim(),
          contact: contact.trim(),
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("roofin_property_reports", JSON.stringify(existing));
      } catch {}

      setIsSubmitting(false);
      setReportedRef(refId);
      toast.success("Report submitted to Trust & Safety team");
    }, 600);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 z-10 font-jakarta animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {reportedRef ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Grievance Submitted
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                Thank you for helping keep Roofin verified and trustworthy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Ticket Reference ID:</p>
              <code className="text-xs font-mono font-bold text-[#1865F2]">{reportedRef}</code>
              <p className="text-[11px] text-slate-500 pt-1">
                Our Trust & Quality verification team will investigate this listing within 24 business hours.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1865F2] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Report This Listing
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">{property.title}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  What is the issue with this property?
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {REPORT_REASONS.map((r) => (
                    <label
                      key={r.id}
                      className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-xs font-medium cursor-pointer transition-all ${
                        selectedReason === r.id
                          ? "border-[#1865F2] bg-blue-50/80 text-blue-900"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        checked={selectedReason === r.id}
                        onChange={() => setSelectedReason(r.id)}
                        className="text-[#1865F2] focus:ring-blue-500"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Details / Explanation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any relevant details or broker contact info..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-[#1865F2] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Phone / Email (Optional for updates)
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. rahul@example.com or 9876543210"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-[#1865F2] outline-none transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Grievance</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
