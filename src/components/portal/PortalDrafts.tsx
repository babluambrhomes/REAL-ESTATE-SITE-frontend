"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, ArrowRight, Trash2, Clock, PlusCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface PortalDraftsProps {
  onResumeDraft: () => void;
  onPostProperty: () => void;
}

export const PortalDrafts = ({
  onResumeDraft,
  onPostProperty,
}: PortalDraftsProps) => {
  const [draft, setDraft] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("roofin_post_property_draft");
      if (saved) {
        setDraft(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load draft", e);
    }
  }, []);

  const handleDeleteDraft = () => {
    try {
      localStorage.removeItem("roofin_post_property_draft");
      setDraft(null);
      toast.success("Draft discarded successfully");
    } catch (e) {
      toast.error("Could not discard draft");
    }
  };

  return (
    <div className="space-y-6 font-jakarta">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#0B132B]">
            Saved Property Drafts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continue where you left off. Saved drafts expire after 30 days.
          </p>
        </div>

        <button
          type="button"
          onClick={onPostProperty}
          className="px-5 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>New Property</span>
        </button>
      </div>

      {draft ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#1865F2] flex items-center justify-center font-bold shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#0B132B]">
                  {draft.bhk || "3 BHK"} {draft.selectedSubtype || "Apartment"}
                </h3>
                <p className="text-xs text-slate-500">
                  {draft.societyName || "Draft Project"} • {draft.selectedCity || "Noida"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold flex items-center gap-1.5">
                <Clock size={12} />
                <span>Step {draft.currentStep || 1} of 7</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
              <span className="font-semibold text-slate-800">{draft.propertyCategory || "Sell"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Price</span>
              <span className="font-semibold text-slate-800">₹ {draft.totalPrice || "Not set"}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Built-up Area</span>
              <span className="font-semibold text-slate-800">{draft.builtUpArea || 1270} sq.ft</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Saved</span>
              <span className="font-semibold text-slate-800">
                {draft.savedAt ? new Date(draft.savedAt).toLocaleDateString() : "Today"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDeleteDraft}
              className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Discard Draft</span>
            </button>

            <button
              type="button"
              onClick={onResumeDraft}
              className="px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Resume Editing</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-2xs space-y-3">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1865F2] flex items-center justify-center mx-auto">
            <FileText size={24} />
          </div>
          <h3 className="text-[17px] font-bold text-[#0B132B]">No Saved Drafts</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you start posting a property and save as draft, your unfinished listings will appear here.
          </p>
          <button
            type="button"
            onClick={onPostProperty}
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#1865F2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Post a Property</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
