"use client";

import Link from "next/link";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins text-slate-800">
      <SearchHeader />
      <div className="h-[75px] sm:h-[85px]" />

      <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#1865F2]/10 flex items-center justify-center text-[#1865F2]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">Terms & Conditions</h1>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: January 2025</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Roofin platform, website, or associated services, you agree to comply with
                and be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Property Listings & Verification</h2>
              <p>
                Roofin strives to ensure all listed properties, prices, and floor plans are accurate and verified
                with RERA authorities. However, users are encouraged to conduct independent due diligence before
                entering into financial agreements.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. User Conduct & Responsibilities</h2>
              <p>
                Users, agents, and developers must provide honest and authentic details when posting listings or
                submitting leads. Any fraudulent, defamatory, or deceptive content is strictly prohibited and subject
                to immediate removal.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact & Inquiries</h2>
              <p>
                For questions regarding these terms, please contact our legal and support team at{" "}
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
            <Link href="/privacy" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

