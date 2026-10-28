"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  MoreVertical,
  Pencil,
  ChevronRight,
  Building,
  DollarSign,
  MapPin,
  CheckCircle,
  Calendar,
  Clock,
  UserCheck,
  Plus,
  RefreshCw,
  Share2,
} from "lucide-react";
import {
  LeadsPriorityModal,
  AddNoteModal,
  ScheduleSiteVisitModal,
  BulkAssignLeadsModal,
} from "./PortalModals";
import toast from "react-hot-toast";
import { propertyApi } from "@/lib/features/property/propertyApi";

interface PortalLeadDetailProps {
  onBack?: () => void;
  onScheduleVisit?: () => void;
  onAddNote?: () => void;
  onChangePriority?: () => void;
}

export const PortalLeadDetail = ({
  onBack,
  onScheduleVisit,
  onAddNote,
  onChangePriority,
}: PortalLeadDetailProps) => {
  const [internalNoteModalOpen, setInternalNoteModalOpen] = useState(false);
  const [internalVisitModalOpen, setInternalVisitModalOpen] = useState(false);
  const [internalPriorityModalOpen, setInternalPriorityModalOpen] = useState(false);
  const [internalReassignModalOpen, setInternalReassignModalOpen] = useState(false);
  const [leadPriority, setLeadPriority] = useState("Hot");
  return (
    <div className="space-y-6 font-jakarta pb-12">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-[#1865F2] cursor-pointer transition-colors"
        >
          Leads
        </button>
        <ChevronRight size={13} />
        <span className="text-slate-700 font-semibold truncate">
          Arti Sharma
        </span>
      </div>

      {/* 2. Top Lead Profile Card (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Avatar & Identity */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1865F2] shrink-0">
              <Image
                src="/images/properties/luxury-living-room.jpg"
                alt="Arti Sharma"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as any).src = "/images/properties/villa-popular-figma.jpg";
                }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0B132B]">
                  Arti Sharma
                </h3>
                <button
                  type="button"
                  onClick={onChangePriority || (() => setInternalPriorityModalOpen(true))}
                  className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-extrabold flex items-center gap-1 cursor-pointer hover:bg-rose-200 transition-colors"
                >
                  <span>🔥</span>
                  <span>{leadPriority}</span>
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <Pencil size={13} />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-slate-400" />
                  +91 6424452322
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-slate-400" />
                  +91 6424452322
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <a
              href="tel:+916424452322"
              className="px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Phone size={13} />
              <span>Call</span>
            </a>

            <a
              href="https://wa.me/916424452322"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageSquare size={13} />
              <span>Whatsapp</span>
            </a>

            <button
              type="button"
              className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Lead Source, Created On, Assigned To Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Lead Source</span>
            <span className="font-bold text-slate-800">website</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Created On</span>
            <span className="font-bold text-slate-800">15 Oct 2026</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Assigned To</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1865F2] text-[10px] font-bold flex items-center justify-center">
                  A
                </div>
                <span className="font-bold text-slate-800">Arti Sharma</span>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
            >
              Reassign
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Left Details + Right Timeline (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Requirement */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <h4 className="text-sm font-bold text-[#0B132B]">
              Customer Requirement
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium">Property Type</span>
                <span className="font-bold text-slate-800">3 BHK Apartment</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium">Budget</span>
                <span className="font-bold text-slate-800">₹1.2 - 1.5 Cr</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium">Preferred Location</span>
                <span className="font-bold text-slate-800">Noida sector 124</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium">Property Status</span>
                <span className="font-bold text-slate-800">Ready to move</span>
              </div>
            </div>

            {/* Requirement Details Note */}
            <div>
              <span className="block text-[11px] font-bold text-slate-700 mb-1">Requirement details</span>
              <div className="h-20 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-600 leading-relaxed">
                Looking for east facing 3BHK flat on 2nd to 5th floor with park view and modular kitchen.
              </div>
            </div>
          </div>

          {/* Interested Properties (3) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#0B132B]">
                Interested Properties (3)
              </h4>
              <button
                type="button"
                className="text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "1",
                  title: "NBCC Aspire Silicon City",
                  loc: "Sector 76, Noida",
                  type: "2,3 & 4 BHK Apartments",
                  price: "₹1.25* Cr",
                  oldPrice: "₹1.58 Cr",
                  off: "Up to 33L off",
                  tag: "Viewed",
                  tagBg: "bg-blue-50 text-[#1865F2] border-blue-200",
                },
                {
                  id: "2",
                  title: "NBCC Aspire Silicon City",
                  loc: "Sector 76, Noida",
                  type: "2,3 & 4 BHK Apartments",
                  price: "₹1.25* Cr",
                  oldPrice: "₹1.58 Cr",
                  off: "Up to 33L off",
                  tag: "Liked",
                  tagBg: "bg-blue-50 text-[#1865F2] border-blue-200",
                },
              ].map((prop) => (
                <div
                  key={prop.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs group flex flex-col justify-between"
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src="/images/properties/tower-popular-figma.jpg"
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold">
                      {prop.type}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div>
                      <h5 className="text-xs font-bold text-[#0B132B]">
                        {prop.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        📍 {prop.loc}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-[#0B132B]">
                            {prop.price}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through">
                            {prop.oldPrice}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 block">
                          %{prop.off}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-lg border text-xs font-bold ${prop.tagBg}`}
                      >
                        {prop.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note & Comment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#0B132B]">
                Note &amp; Comment
              </h4>
              <button
                type="button"
                onClick={onAddNote}
                className="text-xs font-bold text-[#1865F2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Note</span>
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1865F2] font-bold text-[10px] flex items-center justify-center">
                        A
                      </div>
                      <span className="text-xs font-bold text-[#0B132B]">
                        Arti sharma
                      </span>
                      <span className="text-[10px] text-slate-400">Today , 1:40 pm</span>
                    </div>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Customer is very interested in nbcc aspire, shared 3 options and will call tommarow for final discustion
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-[#0B132B]">Quick Actions</h4>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onScheduleVisit || (() => setInternalVisitModalOpen(true))}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1865F2] hover:bg-blue-50/40 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Calendar size={18} className="text-[#1865F2]" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  Schedule follow-up
                </span>
              </button>

              <button
                type="button"
                onClick={onScheduleVisit || (() => setInternalVisitModalOpen(true))}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1865F2] hover:bg-blue-50/40 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Building size={18} className="text-[#1865F2]" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  Schedule Site Visit
                </span>
              </button>

              <button
                type="button"
                onClick={() => setInternalReassignModalOpen(true)}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1865F2] hover:bg-blue-50/40 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Share2 size={18} className="text-[#1865F2]" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  Assign/Reassign
                </span>
              </button>

              <button
                type="button"
                onClick={onAddNote || (() => setInternalNoteModalOpen(true))}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#1865F2] hover:bg-blue-50/40 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Plus size={18} className="text-[#1865F2]" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  + Add Notes
                </span>
              </button>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-[#0B132B]">Recent Activity</h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {[
                {
                  title: "Call Made",
                  time: "Today 12:30 PM",
                  icon: Phone,
                  color: "bg-blue-500",
                },
                {
                  title: "Whatsapp Message Sent",
                  time: "Today 1:30 PM",
                  icon: MessageSquare,
                  color: "bg-emerald-500",
                },
                {
                  title: "Follow-up Scheduled",
                  time: "Today 1:35 PM",
                  icon: RefreshCw,
                  color: "bg-purple-500",
                },
                {
                  title: "Notes Added",
                  time: "Today 1:40 PM",
                  icon: Plus,
                  color: "bg-amber-500",
                },
                {
                  title: "Status Changed",
                  time: "Today 1:45 PM",
                  icon: CheckCircle,
                  color: "bg-rose-500",
                },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="relative flex items-start justify-between gap-2">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full ${act.color} text-white flex items-center justify-center text-[10px] ring-4 ring-white shadow-xs`}
                    >
                      <Icon size={11} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 leading-tight">
                        {act.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {act.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Follow Up Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0B132B]">Next Follow up</h4>
              <button
                type="button"
                onClick={() => setInternalVisitModalOpen(true)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <Pencil size={13} />
              </button>
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#1865F2] shrink-0 font-bold text-xs">
                ⏰
              </div>
              <span className="text-xs font-bold text-rose-600">Today 4 PM</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Call the customer for what they are intrested for.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <AddNoteModal
        isOpen={internalNoteModalOpen}
        onClose={() => setInternalNoteModalOpen(false)}
        onSave={(note: any) => {
          if (note?.details) {
            propertyApi
              .submitEnquiry({
                name: "Arti Sharma",
                email: "arti.sharma@gmail.com",
                phone: "+91 6424452322",
                message: `${note.type || "Note"}: ${note.details}`,
              })
              .catch(() => {});
          }
          setInternalNoteModalOpen(false);
          toast.success("Note added to customer profile!");
        }}
      />

      <ScheduleSiteVisitModal
        isOpen={internalVisitModalOpen}
        onClose={() => setInternalVisitModalOpen(false)}
        onSave={(data: any) => {
          propertyApi
            .bookSiteVisit({
              visitDate: new Date().toISOString().slice(0, 10),
              startTime: data?.timeSlot ? data.timeSlot.split(" - ")[0] : "14:00",
              name: "Arti Sharma",
              phone: "+91 6424452322",
              message: data?.meetingPoint || "Site Visit Scheduled via Portal",
            })
            .catch(() => {});
          setInternalVisitModalOpen(false);
          toast.success("Site visit scheduled successfully!");
        }}
      />

      <LeadsPriorityModal
        isOpen={internalPriorityModalOpen}
        onClose={() => setInternalPriorityModalOpen(false)}
        currentPriority={leadPriority}
        onSelectPriority={(p: string) => {
          setLeadPriority(p);
          setInternalPriorityModalOpen(false);
          toast.success(`Lead priority updated to ${p}!`);
        }}
      />

      <BulkAssignLeadsModal
        isOpen={internalReassignModalOpen}
        onClose={() => setInternalReassignModalOpen(false)}
        selectedCount={1}
        onAssign={(agent) => {
          setInternalReassignModalOpen(false);
          toast.success(`Lead reassigned to ${agent}!`);
        }}
      />
    </div>
  );
};
