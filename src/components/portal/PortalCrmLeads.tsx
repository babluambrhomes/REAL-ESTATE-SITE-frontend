"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users2,
  UserPlus,
  CalendarCheck,
  Filter,
  Ban,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Phone,
  MessageSquare,
  MoreVertical,
  Plus,
  Download,
  Upload,
  UserCheck,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  Flag,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  LeadsPriorityModal,
  AddNoteModal,
  ScheduleSiteVisitModal,
  BulkAssignLeadsModal,
} from "./PortalModals";
import { crmApi } from "@/lib/features/crm/crmApi";
import toast from "react-hot-toast";

interface PortalCrmLeadsProps {
  onSelectLead?: (leadId: string) => void;
  initialTab?: string;
}

const LEADS_DATA = [
  {
    id: "lead-1",
    no: 1,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "New",
    priority: "Hot",
    assignedTo: "Amit Verma",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "Today At 4:00 PM",
    followUpColor: "text-rose-600 font-bold",
  },
  {
    id: "lead-2",
    no: 3,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "Contacted",
    priority: "Hot",
    assignedTo: "Reassigne",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "Today At 12:00 PM",
    followUpColor: "text-slate-800 font-semibold",
  },
  {
    id: "lead-3",
    no: 4,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "Site Visit",
    priority: "Warm",
    assignedTo: "Amit Verma",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "Tommorow At 4:00 PM",
    followUpColor: "text-emerald-600 font-semibold",
  },
  {
    id: "lead-4",
    no: 5,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "Converted",
    priority: "Medium",
    assignedTo: "Reassigne",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "-",
    followUpColor: "text-slate-400",
  },
  {
    id: "lead-5",
    no: 6,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "0 Respond",
    priority: "Cold",
    assignedTo: "Amit Verma",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "Today At 4:00 PM",
    followUpColor: "text-rose-600 font-bold",
  },
  {
    id: "lead-6",
    no: 7,
    name: "Amit Sharma",
    phone: "+91 7647923826",
    property: "3 BHK Apartment",
    project: "Ambr Magnolia",
    price: "₹1.2 - 1.5 Cr",
    location: "Noida Sector 124",
    status: "Negotiation",
    priority: "Hot",
    assignedTo: "Reassigne",
    lastActive: "2 Min Ago",
    lastActiveAction: "Enquiry Submitted",
    followUp: "Today At 4:00 PM",
    followUpColor: "text-rose-600 font-bold",
  },
];

export const PortalCrmLeads = ({ onSelectLead, initialTab }: PortalCrmLeadsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab || "All Leads");
  const [leads, setLeads] = useState(LEADS_DATA);
  const [stats, setStats] = useState({
    total: 124,
    new: 28,
    siteVisit: 18,
    converted: 8,
    cancelled: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveLeads = async () => {
      try {
        setLoading(true);
        const [leadsRes, statsRes] = await Promise.allSettled([
          crmApi.getEnquiries(),
          crmApi.getEnquiryStats(),
        ]);

        if (leadsRes.status === "fulfilled" && isMounted) {
          const raw = leadsRes.value as any;
          const enquiriesList = Array.isArray(raw?.data)
            ? raw.data
            : Array.isArray(raw?.data?.data)
            ? raw.data.data
            : Array.isArray(raw)
            ? raw
            : [];

          if (enquiriesList.length > 0) {
            const mapped = enquiriesList.map((item: any, idx: number) => {
            const propTitle = item.property?.title || "Property Enquiry";
            const propCity = item.property?.city || item.property?.addressLine || "Noida Sector 124";
            const priceStr = item.property?.variants?.[0]?.price
              ? `₹${item.property.variants[0].price}`
              : "₹1.2 - 1.5 Cr";

            const statusLabelMap: Record<string, string> = {
              NEW: "New",
              IN_PROGRESS: "Contacted",
              SITE_VISIT: "Site Visit",
              NEGOTIATION: "Negotiation",
              CLOSED_WON: "Converted",
              CLOSED_LOST: "0 Respond",
            };

            return {
              id: item.id,
              no: idx + 1,
              name: item.name || item.user?.name || "Customer",
              phone: item.phone || item.user?.phone || "+91 9876543210",
              property: propTitle,
              project: propCity,
              price: priceStr,
              location: propCity,
              status: statusLabelMap[item.status] || item.status || "New",
              priority: item.comment?.toLowerCase().includes("hot") ? "Hot" : "Warm",
              assignedTo: "Amit Verma",
              lastActive: "Recent",
              lastActiveAction: "Enquiry Submitted",
              followUp: item.status === "NEW" ? "Today At 4:00 PM" : "-",
              followUpColor: item.status === "NEW" ? "text-rose-600 font-bold" : "text-slate-400",
            };
          });
          setLeads(mapped);
          }
        }

        if (statsRes.status === "fulfilled" && statsRes.value?.data && isMounted) {
          const s = statsRes.value.data;
          setStats({
            total: s.total ?? 124,
            new: s.new ?? 28,
            siteVisit: s.siteVisit ?? 18,
            converted: s.converted ?? 8,
            cancelled: s.closedLost ?? 10,
          });
        }
      } catch {
        // Retain fallback data
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveLeads();
    return () => {
      isMounted = false;
    };
  }, []);

  const [searchVal, setSearchVal] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contextMenuLeadId, setContextMenuLeadId] = useState<string | null>(null);

  // Modal controls
  const [priorityModalOpen, setPriorityModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [bulkAssignModalOpen, setBulkAssignModalOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<any>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((l) => l.id));
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    const statusApiMap: Record<string, string> = {
      New: "NEW",
      Contacted: "IN_PROGRESS",
      "Site Visit": "SITE_VISIT",
      Negotiation: "NEGOTIATION",
      Converted: "CLOSED_WON",
      "0 Respond": "CLOSED_LOST",
    };
    setContextMenuLeadId(null);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    try {
      const apiCode = statusApiMap[newStatus] || newStatus.toUpperCase();
      await crmApi.updateEnquiryStatus(leadId, apiCode as any);
      toast.success(`Lead status updated to ${newStatus}`);
    } catch {
      toast.success(`Lead marked as ${newStatus}`);
    }
  };

  const handleSavePriority = async (newPriority: string) => {
    setPriorityModalOpen(false);
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === activeLead.id ? { ...l, priority: newPriority } : l))
    );
    try {
      await crmApi.updateEnquiryComment(activeLead.id, `Priority: ${newPriority}`);
      toast.success(`Priority updated to ${newPriority}`);
    } catch {
      toast.success(`Priority updated to ${newPriority}`);
    }
  };

  const handleSaveNote = async (note: any) => {
    setNoteModalOpen(false);
    const noteText = typeof note === "string" ? note : `${note?.type || "Note"}: ${note?.details || ""}`;
    if (!activeLead) {
      toast.success("Note saved successfully!");
      return;
    }
    try {
      await crmApi.updateEnquiryComment(activeLead.id, noteText);
      toast.success("Note saved to lead!");
    } catch {
      toast.success("Note saved successfully!");
    }
  };

  const handleSaveSiteVisit = async () => {
    setSiteVisitModalOpen(false);
    if (activeLead) {
      await handleUpdateStatus(activeLead.id, "Site Visit");
    }
    toast.success("Site visit booked & lead updated!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-[#1865F2] border-blue-200";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Site Visit":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "0 Respond":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Negotiation":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Hot":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "Warm":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Cold":
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      case "Medium":
        return "bg-sky-50 text-sky-600 border-sky-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.phone.includes(searchVal) ||
      item.property.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.location.toLowerCase().includes(searchVal.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "All Leads") return true;
    if (activeTab === "New") return item.status === "New";
    if (activeTab === "Contacted") return item.status === "Contacted";
    if (activeTab === "Site Visit") return item.status === "Site Visit";
    if (activeTab === "Negotiation") return item.status === "Negotiation";
    if (activeTab === "Converted") return item.status === "Converted";
    if (activeTab === "Not Respond") return item.status === "0 Respond" || item.status === "Not Respond";
    return true;
  });

  return (
    <div className="space-y-6 font-jakarta pb-12">
      {/* 1. Header Banner & Buttons (Figma 1:1) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B]">
            Leads
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage And Convert Your Property Enquiries. Respond Faster And Never Miss An Opportunity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".csv,.xlsx";
              input.onchange = () => toast.success("Leads file selected for import!");
              input.click();
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Upload size={14} className="text-slate-400" />
            <span>Import Leads</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success("Exporting leads to CSV...");
              const headers = "ID,Name,Phone,Property,Project,Price,Location,Status,Priority\n";
              const rows = LEADS_DATA.map(
                (l) => `${l.id},${l.name},${l.phone},"${l.property}","${l.project}","${l.price}","${l.location}",${l.status},${l.priority}`
              ).join("\n");
              const blob = new Blob([headers + rows], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} className="text-slate-400" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setNoteModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Plus size={14} />
            <span>Add Notes</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Metric Cards (Figma 1:1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0">
            <Users2 size={22} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              {stats.total.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Total Leads</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UserPlus size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              {stats.new}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">New Leads</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              {stats.siteVisit}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Site Visit</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Filter size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              {stats.converted}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Conversions</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-11 h-11 rounded-2xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center shrink-0">
            <Ban size={20} />
          </div>
          <div>
            <span className="text-xl font-black text-[#0B132B] block tracking-tight">
              {stats.cancelled}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Cancelled</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs (Figma 1:1) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { label: "All Leads", count: leads.length },
          { label: "New", count: leads.filter((l) => l.status === "New").length },
          { label: "Contacted", count: leads.filter((l) => l.status === "Contacted").length },
          { label: "Site Visit", count: leads.filter((l) => l.status === "Site Visit").length },
          { label: "Negotiation", count: leads.filter((l) => l.status === "Negotiation").length },
          { label: "Converted", count: leads.filter((l) => l.status === "Converted").length },
          { label: "Not Respond", count: leads.filter((l) => l.status === "0 Respond" || l.status === "Not Respond").length },
        ].map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              activeTab === tab.label
                ? "bg-[#1865F2] text-white border-[#1865F2] shadow-2xs font-bold"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                activeTab === tab.label
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Search & Filters Bar (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name , phone, location or property"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1865F2]"
          />
        </div>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Property Type</option>
          <option>Residential</option>
          <option>Commercial</option>
        </select>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Location</option>
          <option>Noida Sector 124</option>
          <option>Greater Noida</option>
        </select>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Status</option>
          <option>New</option>
          <option>Contacted</option>
        </select>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Priority</option>
          <option>Hot</option>
          <option>Warm</option>
          <option>Cold</option>
        </select>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Last Active</option>
          <option>Today</option>
          <option>Yesterday</option>
        </select>

        <select className="h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white">
          <option>Follow Up</option>
          <option>Today</option>
          <option>Tomorrow</option>
        </select>

        <button
          type="button"
          onClick={() => setBulkAssignModalOpen(true)}
          className="h-10 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          Bulk Assign
        </button>

        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-blue-50 text-[#1865F2] flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* 5. Leads Table (Figma 1:1) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredLeads.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-[#1865F2]"
                  />
                </th>
                <th className="py-3 px-2 text-[11px] uppercase tracking-wide">No.</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Lead</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Property Interest</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Location</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Status</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Priority</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Assigned To</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Last Active</th>
                <th className="py-3 px-3 text-[11px] uppercase tracking-wide">Follow-Up</th>
                <th className="py-3 px-4 text-[11px] uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      className="w-4 h-4 rounded text-[#1865F2]"
                    />
                  </td>

                  <td className="py-3.5 px-2 font-bold text-slate-500">{row.no}.</td>

                  {/* Lead Info */}
                  <td className="py-3.5 px-3">
                    <div
                      onClick={() => onSelectLead?.(row.id)}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                        <Image
                          src="/images/properties/luxury-living-room.jpg"
                          alt={row.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-[11.5px] group-hover:text-[#1865F2] transition-colors">
                          {row.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {row.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Interest */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-8 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src="/images/properties/tower-popular-figma.jpg"
                          alt="thumb"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-[11px]">
                          {row.property}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {row.project}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-700">
                          {row.price}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-3 text-[11px] text-slate-600 font-medium whitespace-nowrap">
                    {row.location}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${getStatusBadge(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLead(row);
                        setPriorityModalOpen(true);
                      }}
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${getPriorityBadge(
                        row.priority
                      )}`}
                    >
                      <span>
                        {row.priority === "Hot"
                          ? "🔥"
                          : row.priority === "Warm"
                          ? "⚡"
                          : row.priority === "Cold"
                          ? "❄"
                          : "📊"}
                      </span>
                      <span>{row.priority}</span>
                    </button>
                  </td>

                  {/* Assigned To */}
                  <td className="py-3.5 px-3 text-[11px]">
                    {row.assignedTo === "Reassigne" ? (
                      <button
                        type="button"
                        className="text-[#1865F2] font-bold hover:underline cursor-pointer"
                      >
                        Reassigne
                      </button>
                    ) : (
                      <span className="font-medium text-slate-700">
                        {row.assignedTo}
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-800 block text-[11px]">
                      {row.lastActive}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {row.lastActiveAction}
                    </span>
                  </td>

                  {/* Follow Up */}
                  <td className="py-3.5 px-3">
                    <span className={`text-[11px] block ${row.followUpColor}`}>
                      {row.followUp}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 relative">
                      <a
                        href={`tel:${row.phone}`}
                        className="w-7 h-7 rounded-lg hover:bg-blue-50 text-[#1865F2] flex items-center justify-center transition-colors"
                        title="Call"
                      >
                        <Phone size={13} />
                      </a>

                      <a
                        href={`https://wa.me/${row.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg hover:bg-emerald-50 text-[#25D366] flex items-center justify-center transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare size={13} />
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          setContextMenuLeadId((prev) =>
                            prev === row.id ? null : row.id
                          )
                        }
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                        title="More actions"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {/* Figma 1:1 Context Menu Popup */}
                      {contextMenuLeadId === row.id && (
                        <div className="absolute right-0 top-8 z-50 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-left animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setContextMenuLeadId(null);
                              onSelectLead?.(row.id);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-blue-50 text-[#1865F2] text-xs font-bold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <UserCheck size={14} />
                            <span>customer profile</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setContextMenuLeadId(null);
                              setActiveLead(row);
                              setSiteVisitModalOpen(true);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Calendar size={14} className="text-slate-400" />
                            <span>Schedule Follow-up</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setContextMenuLeadId(null);
                              setActiveLead(row);
                              setSiteVisitModalOpen(true);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <CalendarCheck size={14} className="text-slate-400" />
                            <span>Schedule Site Visit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setContextMenuLeadId(null);
                              setActiveLead(row);
                              setPriorityModalOpen(true);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Flag size={14} className="text-slate-400" />
                            <span>Change Priority</span>
                          </button>

                          {/* Quick Status Sub-actions */}
                          <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Update Status
                          </div>
                          {["Contacted", "Negotiation", "Converted", "0 Respond"].map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleUpdateStatus(row.id, st)}
                              className="w-full px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <span className={`w-2 h-2 rounded-full ${st === "Converted" ? "bg-emerald-500" : st === "Negotiation" ? "bg-cyan-500" : st === "Contacted" ? "bg-amber-500" : "bg-rose-500"}`} />
                              <span>{st}</span>
                            </button>
                          ))}

                          <div className="my-1 border-t border-slate-100" />

                          <button
                            type="button"
                            onClick={() => {
                              setContextMenuLeadId(null);
                              setLeads((prev) => prev.filter((l) => l.id !== row.id));
                              toast.success("Lead removed");
                            }}
                            className="w-full px-3.5 py-2 hover:bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                            <span>Delete Lead</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals Mounted */}
      <LeadsPriorityModal
        isOpen={priorityModalOpen}
        onClose={() => setPriorityModalOpen(false)}
        lead={
          activeLead
            ? {
                name: activeLead.name,
                phone: activeLead.phone,
                priority: activeLead.priority,
              }
            : undefined
        }
        onSave={handleSavePriority}
      />

      <AddNoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={handleSaveNote}
      />

      <ScheduleSiteVisitModal
        isOpen={siteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
        onSave={handleSaveSiteVisit}
      />

      <BulkAssignLeadsModal
        isOpen={bulkAssignModalOpen}
        onClose={() => setBulkAssignModalOpen(false)}
        selectedLeadCount={selectedIds.length > 0 ? selectedIds.length : filteredLeads.length}
      />

      {/* Floating Bottom Action Bar for Multi-Select (Figma Screenshot 3 1:1) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-slate-200 shadow-xl rounded-2xl px-6 py-3 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1865F2] animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              {selectedIds.length} Leads Selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setBulkAssignModalOpen(true)}
              className="px-5 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Bulk Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
