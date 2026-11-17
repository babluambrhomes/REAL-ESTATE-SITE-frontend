"use client";

import Link from "next/link";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins text-slate-800">
      <SearchHeader />
      <div className="h-[75px] sm:h-[85px]" />

      <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#1865F2]/10 flex items-center justify-center text-[#1865F2]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: January 2025</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Information We Collect</h2>
              <p>
                Roofin collects information to provide better real estate discovery and connection services.
                This includes details you provide when registering, submitting property enquiries, posting listings,
                or searching properties across Delhi NCR.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. How We Use Information</h2>
              <p>
                We use the information collected to verify property listings, connect verified buyers with licensed agents
                and builders, personalize your search preferences, and ensure a secure real estate ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Information Sharing & Security</h2>
              <p>
                Your privacy is our priority. We never sell your personal contact details to unauthorized third parties.
                We employ industry-standard encryption and security measures to safeguard all data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact Our Privacy Team</h2>
              <p>
                If you have questions regarding this privacy policy, please reach us at{" "}
                <a href="mailto:roofin@realstate.com" className="text-[#1865F2] font-medium hover:underline">
                  roofin@realstate.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link href="/" className="text-xs font-semibold text-[#1865F2] hover:underline">
              ← Return to Home
            </Link>
            <Link href="/terms" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              Terms & Conditions →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

