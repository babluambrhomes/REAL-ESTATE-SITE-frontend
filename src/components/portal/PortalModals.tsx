"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Smartphone,
  Globe,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Zap,
  Snowflake,
  UploadCloud,
  FileText,
  User,
  Info,
} from "lucide-react";

/* =========================================================================
   1. PREVIEW AS SELLER MODAL (Figma 1:1)
   ========================================================================= */
interface PreviewAsSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPreview?: (mode: "desktop" | "mobile") => void;
  property?: {
    title: string;
    specs: string;
    price: string;
    views: string;
    leads: number;
    visits: number;
    image: string;
    status: string;
  };
}

export const PreviewAsSellerModal = ({
  isOpen,
  onClose,
  onOpenPreview,
  property = {
    title: "The Terraces At Max Estate 361",
    specs: "3 BHK . Apartment . Sector 124, Noida",
    price: "₹ 1.2 Cr",
    views: "1.2k Views",
    leads: 128,
    visits: 20,
    image: "/images/properties/tower-popular-figma.jpg",
    status: "On Going",
  },
}: PreviewAsSellerModalProps) => {
  const [selectedMode, setSelectedMode] = useState<"desktop" | "mobile">("desktop");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 font-jakarta">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              Preview As Seller
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              See How Your Property Appears On The Roofin Portal And Explore Different View Option
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mini Property Card */}
        <div className="flex items-center gap-4 p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
          <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as any).src = "/images/properties/tower-popular-figma.jpg";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-[#0B132B] truncate">
                {property.title}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold shrink-0">
                {property.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {property.specs}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="font-extrabold text-[#1865F2]">{property.price}</span>
              <span className="text-[11px] text-slate-400">{property.views}</span>
              <span className="text-[11px] text-slate-400">{property.leads} Leads</span>
              <span className="text-[11px] text-slate-400">{property.visits} Visits</span>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div>
          <span className="block text-xs font-bold text-slate-800 mb-3">
            Choose Preview Mode
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Property Detail Page (Selected) */}
            <div
              onClick={() => setSelectedMode("desktop")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between min-h-[120px] ${
                selectedMode === "desktop"
                  ? "border-[#1865F2] bg-blue-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-[#1865F2] flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMode === "desktop"
                      ? "border-[#1865F2] bg-[#1865F2] text-white"
                      : "border-slate-300"
                  }`}
                >
                  {selectedMode === "desktop" && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Property Detail Page</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  View the full property page as buyers see it.
                </p>
              </div>
            </div>

            {/* 2. Empty / Secondary slot */}
            <div
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col items-center justify-center text-center opacity-60"
            >
              <span className="text-[11px] font-medium text-slate-400">Desktop View</span>
            </div>

            {/* 3. Mobile View */}
            <div
              onClick={() => setSelectedMode("mobile")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between min-h-[120px] ${
                selectedMode === "mobile"
                  ? "border-[#1865F2] bg-blue-50/40 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-[#1865F2] flex items-center justify-center">
                  <Smartphone size={20} />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMode === "mobile"
                      ? "border-[#1865F2] bg-[#1865F2] text-white"
                      : "border-slate-300"
                  }`}
                >
                  {selectedMode === "mobile" && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Mobile View</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Preview the mobile experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live preview notice */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-[#1865F2]">
          <Info size={15} className="shrink-0" />
          <span className="text-[11px] font-medium">
            This is a live preview. Changes you make in your listing will reflect here in real time.
          </span>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenPreview?.(selectedMode);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <span>Open Preview</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. LEADS PRIORITY MODAL (Figma 1:1)
   ========================================================================= */
interface LeadsPriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: {
    name: string;
    phone: string;
    priority: "Hot" | "Warm" | "Cold" | "Medium";
  };
  currentPriority?: string;
  onSave?: (newPriority: string) => void;
  onSelectPriority?: (newPriority: string) => void;
}

export const LeadsPriorityModal = ({
  isOpen,
  onClose,
  lead = {
    name: "Arti Sharma",
    phone: "+91 6424452322",
    priority: "Hot",
  },
  currentPriority,
  onSave,
  onSelectPriority,
}: LeadsPriorityModalProps) => {
  const [priority, setPriority] = useState<string>(currentPriority || lead.priority || "Hot");

  if (!isOpen) return null;

  const PRIORITY_OPTIONS = [
    {
      id: "Hot",
      label: "Hot",
      icon: "🔥",
      desc: "High intention to buy/rent (0-30 Days)",
      color: "border-rose-200 bg-rose-50/50 text-rose-700",
      badgeColor: "bg-rose-100 text-rose-700",
    },
    {
      id: "Warm",
      label: "Warm",
      icon: "⚡",
      desc: "Moderate interest (1-3 Month)",
      color: "border-amber-200 bg-amber-50/40 text-amber-800",
      badgeColor: "bg-amber-100 text-amber-700",
    },
    {
      id: "Cold",
      label: "Cold",
      icon: "❄",
      desc: "Moderate interest (1-3 Month)",
      color: "border-indigo-200 bg-indigo-50/40 text-indigo-800",
      badgeColor: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "Medium",
      label: "Medium",
      icon: "📊",
      desc: "Moderate interest (1-3 Month)",
      color: "border-sky-200 bg-sky-50/40 text-sky-800",
      badgeColor: "bg-sky-100 text-sky-700",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 font-jakarta">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-[#0B132B]">
            Leads Priority
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Lead Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1865F2] font-bold text-sm flex items-center justify-center">
            {lead.name[0]}
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0B132B]">{lead.name}</h4>
            <p className="text-[11px] text-slate-400">{lead.phone}</p>
          </div>
        </div>

        {/* Priority Options */}
        <div>
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2.5">
            Lead Priority (Customer Interest)
          </span>

          <div className="space-y-2">
            {PRIORITY_OPTIONS.map((opt) => {
              const isSelected = priority === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPriority(opt.id)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? `${opt.color} ring-1 ring-[#1865F2]/20`
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-[#1865F2] bg-[#1865F2] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check size={10} strokeWidth={3} />}
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${opt.badgeColor}`}>
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </span>

                  <span className="text-[11px] text-slate-600 font-medium">
                    {opt.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave?.(priority);
              onSelectPriority?.(priority);
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. ADD NOTE MODAL (Figma 1:1)
   ========================================================================= */
interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (note: { type: string; details: string }) => void;
}

export const AddNoteModal = ({ isOpen, onClose, onSave }: AddNoteModalProps) => {
  const [noteType, setNoteType] = useState("Call summary");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const NOTE_TYPES = [
    "General",
    "Call summary",
    "Follow up",
    "Requirement",
    "Site Visit",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 font-jakarta">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0B132B]">Add note</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Note Type Pills */}
        <div>
          <span className="block text-xs font-bold text-slate-700 mb-2">Note Type</span>
          <div className="flex flex-wrap gap-2">
            {NOTE_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setNoteType(t)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                  noteType === t
                    ? "bg-[#0B132B] text-white border-[#0B132B]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Note Details Textarea */}
        <div>
          <span className="block text-xs font-bold text-slate-700 mb-1.5">Note Details</span>
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Type your notes here..."
            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2] resize-none"
          />
        </div>

        {/* Add File */}
        <div>
          <span className="block text-xs font-bold text-slate-700 mb-1.5">Add File (optional)</span>
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#1865F2] bg-slate-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
            <UploadCloud size={20} className="text-slate-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-700">
              Drag &amp; drop files or <span className="text-[#1865F2]">browse</span>
            </p>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Pdf, images, document(Max 10MB)
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave?.({ type: noteType, details });
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. SCHEDULE SITE VISIT MODAL (Figma 1:1)
   ========================================================================= */
interface ScheduleSiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const ScheduleSiteVisitModal = ({
  isOpen,
  onClose,
  onSave,
}: ScheduleSiteVisitModalProps) => {
  const [date, setDate] = useState("22 Jun 2026");
  const [timeSlot, setTimeSlot] = useState("2:00 PM - 3:00 PM");
  const [visitType, setVisitType] = useState("Site visit");
  const [duration, setDuration] = useState("30 Minutes");
  const [meetingPoint, setMeetingPoint] = useState(
    "Tower A, NBCC Aspire Silicon City, Sector 76, Noida"
  );
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 font-jakarta">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-[#0B132B]">
            Schedule Site Visit
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Visit Details */}
        <div className="space-y-3">
          <span className="block text-xs font-bold text-slate-800">Visit Details</span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Calendar size={14} className="absolute left-3 text-slate-400" />
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 pl-8 pr-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                >
                  <option>22 Jun 2026</option>
                  <option>23 Jun 2026</option>
                  <option>24 Jun 2026</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Time slot <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Clock size={14} className="absolute left-3 text-slate-400" />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full h-10 pl-8 pr-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                >
                  <option>2:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 4:00 PM</option>
                  <option>4:00 PM - 5:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Visit Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option>Site visit</option>
                <option>Virtual visit</option>
                <option>Office meeting</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Duration <span className="text-rose-500">*</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
              >
                <option>30 Minutes</option>
                <option>45 Minutes</option>
                <option>1 Hour</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Meeting Point / Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={meetingPoint}
                onChange={(e) => setMeetingPoint(e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1865F2]"
              />
              {meetingPoint && (
                <button
                  type="button"
                  onClick={() => setMeetingPoint("")}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <span className="block text-xs font-bold text-slate-800 mb-2">
            Send Notification to Customer
          </span>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyWhatsapp}
                onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <span className="font-semibold">WhatsApp (Recommended)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <span>SMS</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <span>Email</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave?.({
                date,
                timeSlot,
                visitType,
                duration,
                meetingPoint,
              });
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. BULK ASSIGN LEADS MODAL (Figma 1:1 - Screenshots 1 to 5)
   ========================================================================= */
interface BulkAssignLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeadCount?: number;
  selectedCount?: number;
  onAssign?: (data: any) => void;
}

export const BulkAssignLeadsModal = ({
  isOpen,
  onClose,
  selectedLeadCount = 245,
  selectedCount,
  onAssign,
}: BulkAssignLeadsModalProps) => {
  const [chooseMode, setChooseMode] = useState<"number" | "filter">("number");
  const effectiveCount = selectedCount ?? selectedLeadCount ?? 245;
  const [leadsCount, setLeadsCount] = useState(effectiveCount);
  const [assignmentType, setAssignmentType] = useState<"equal" | "custom">("equal");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([
    "Rohit Sharma",
    "Priya Singh",
    "Arti Sharma",
  ]);
  const [note, setNote] = useState("");
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  if (!isOpen) return null;

  const toggleMember = (name: string) => {
    setSelectedMembers((prev) =>
      prev.includes(name)
        ? prev.length > 1
          ? prev.filter((m) => m !== name)
          : prev
        : [...prev, name]
    );
  };

  // Distribution Math calculation
  const memberCount = selectedMembers.length || 1;
  const baseCount = Math.floor(leadsCount / memberCount);
  const remainder = leadsCount % memberCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 font-jakarta overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              Bulk Assign Leads
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Assign multiple leads to your team members quickly using count or filters.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Choose Leads (Figma 1:1) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              1
            </span>
            <span className="text-xs font-bold text-slate-800">Choose Leads</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option 1: Assign by Number */}
            <div
              onClick={() => setChooseMode("number")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                chooseMode === "number"
                  ? "border-[#1865F2] bg-blue-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                  chooseMode === "number"
                    ? "border-[#1865F2] bg-[#1865F2] text-white"
                    : "border-slate-300"
                }`}
              >
                {chooseMode === "number" && <Check size={10} strokeWidth={3} />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Assign by Number</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Enter the total number of leads to assign
                </p>
              </div>
            </div>

            {/* Option 2: Assign by Filter */}
            <div
              onClick={() => setChooseMode("filter")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                chooseMode === "filter"
                  ? "border-[#1865F2] bg-blue-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                  chooseMode === "filter"
                    ? "border-[#1865F2] bg-[#1865F2] text-white"
                    : "border-slate-300"
                }`}
              >
                {chooseMode === "filter" && <Check size={10} strokeWidth={3} />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Assign by Filter (Optional)</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Assign leads based on filters (location, source, etc.)
                </p>
              </div>
            </div>
          </div>

          {/* Number input & Lead Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Number of Leads to Assign
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden h-10 shadow-2xs">
                <input
                  type="number"
                  value={leadsCount}
                  onChange={(e) => setLeadsCount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 text-xs font-bold text-slate-800 focus:outline-none"
                />
                <span className="px-3 text-xs text-slate-400 bg-slate-50 border-l border-slate-200 h-full flex items-center">
                  leads
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                You can assign up to 10,000 leads at a time.
              </span>
            </div>

            {/* Lead Preview Box */}
            <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Lead Preview ⓘ
              </span>
              <div className="flex items-center gap-2 my-1">
                <span className="text-lg">👥</span>
                <span className="text-lg font-black text-[#1865F2]">{leadsCount}</span>
                <span className="text-xs text-slate-600 font-medium">Leads to be assigned</span>
              </div>
              <p className="text-[10px] text-blue-600 bg-blue-50/80 p-1.5 rounded-lg border border-blue-100 flex items-center gap-1">
                <Info size={11} className="shrink-0" />
                <span>Leads will be picked from your selected criteria or latest unassigned leads.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Assignment Type (Figma 1:1) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-bold text-slate-800">Assignment Type</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Equal Distribution */}
            <div
              onClick={() => setAssignmentType("equal")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                assignmentType === "equal"
                  ? "border-[#1865F2] bg-blue-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                  assignmentType === "equal"
                    ? "border-[#1865F2] bg-[#1865F2] text-white"
                    : "border-slate-300"
                }`}
              >
                {assignmentType === "equal" && <Check size={10} strokeWidth={3} />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Equal Distribution</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Automatically divide leads equally among selected members
                </p>
              </div>
            </div>

            {/* Custom Distribution */}
            <div
              onClick={() => setAssignmentType("custom")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                assignmentType === "custom"
                  ? "border-[#1865F2] bg-blue-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                  assignmentType === "custom"
                    ? "border-[#1865F2] bg-[#1865F2] text-white"
                    : "border-slate-300"
                }`}
              >
                {assignmentType === "custom" && <Check size={10} strokeWidth={3} />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0B132B]">Custom Distribution</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Manually set number of leads for each member
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Assign To (Figma 1:1) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-bold text-slate-800">Assign To</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
              <option>Choose a team member</option>
              <option>Rohit Sharma</option>
              <option>Priya Singh</option>
              <option>Arti Sharma</option>
            </select>

            <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
              <option>Search team members...</option>
              <option>Sales Team Noida</option>
              <option>Floor Managers</option>
            </select>
          </div>

          {/* Selected Member Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { name: "Rohit Sharma", avatar: "R", color: "bg-blue-100 text-[#1865F2]" },
              { name: "Priya Singh", avatar: "P", color: "bg-rose-100 text-rose-600" },
              { name: "Arti Sharma", avatar: "A", color: "bg-purple-100 text-purple-600" },
            ].map((m) => {
              const isChecked = selectedMembers.includes(m.name);
              return (
                <div
                  key={m.name}
                  onClick={() => toggleMember(m.name)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                    isChecked
                      ? "border-[#1865F2] bg-blue-50/60 shadow-2xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 rounded text-[#1865F2]"
                  />
                  <span className={`w-5 h-5 rounded-full ${m.color} text-[10px] font-bold flex items-center justify-center`}>
                    {m.avatar}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{m.name}</span>
                  <span className="text-slate-400 hover:text-slate-600 text-xs">✕</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Distribution Preview (Figma Screenshot 5 1:1) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              4
            </span>
            <span className="text-xs font-bold text-slate-800">Distribution Preview</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              {selectedMembers.map((m, idx) => {
                const count = idx < remainder ? baseCount + 1 : baseCount;
                const pct = leadsCount > 0 ? ((count / leadsCount) * 100).toFixed(1) : 0;

                return (
                  <div
                    key={m}
                    className="p-3 rounded-xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs"
                  >
                    <span className="block text-xs font-bold text-slate-800 truncate">
                      {m}
                    </span>
                    <span className="block text-sm font-black text-[#1865F2]">
                      {count} leads
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      ({pct}%)
                    </span>
                  </div>
                );
              })}

              {/* Total Summary */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-center space-y-1">
                <span className="block text-[11px] font-bold text-slate-500 uppercase">
                  Total Leads
                </span>
                <span className="block text-lg font-black text-[#1865F2]">
                  {leadsCount}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  to be assigned
                </span>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-500 flex items-center gap-1.5 pt-1">
              <Info size={12} className="text-[#1865F2] shrink-0" />
              <span>
                Leads will be distributed equally. If not divisible, extra lead(s) will be given to the first member(s).
              </span>
            </p>
          </div>
        </div>

        {/* 5. Add a Note (Optional) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              5
            </span>
            <span className="text-xs font-bold text-slate-800">Add a Note (Optional)</span>
          </div>
          <div className="relative border border-slate-200 rounded-xl p-3 bg-white shadow-2xs">
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for the assignee (e.g. campaign name, follow-up instructions, etc.)"
              className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
            />
            <span className="block text-right text-[10px] text-slate-400">
              {note.length}/500
            </span>
          </div>
        </div>

        {/* 6. Notify Assignee */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1865F2] text-white text-[11px] font-bold flex items-center justify-center">
              6
            </span>
            <span className="text-xs font-bold text-slate-800">Notify Assignee</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyInApp}
                onChange={(e) => setNotifyInApp(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <div>
                <span className="font-bold block text-slate-800">In-app notification</span>
                <span className="text-[10px] text-slate-400">Notify inside the platform</span>
              </div>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyWhatsapp}
                onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <div>
                <span className="font-bold block text-slate-800">WhatsApp notification</span>
                <span className="text-[10px] text-slate-400">Send assignment details on WhatsApp</span>
              </div>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="w-4 h-4 rounded text-[#1865F2]"
              />
              <div>
                <span className="font-bold block text-slate-800">Email notification</span>
                <span className="text-[10px] text-slate-400">Send assignment details via email</span>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onAssign?.({
                leadsCount,
                assignmentType,
                selectedMembers,
                note,
              });
              onClose();
            }}
            className="px-8 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-98"
          >
            Assign {leadsCount} Leads
          </button>
        </div>
      </div>
    </div>
  );
};
