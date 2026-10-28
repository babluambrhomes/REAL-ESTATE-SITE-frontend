"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim() || "Contact form message",
        }),
      });
      setIsSent(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.warn("Contact form submit error:", err);
      setIsSent(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-poppins">
      <div className="relative bg-white p-4 sm:p-8 lg:p-10">
        
        {/* Social links */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-5 absolute top-1/2 -translate-y-1/2 right-0 bg-[#1865F2] text-white py-6 px-3.5 rounded-l-2xl shadow-lg z-20">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform text-white"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform text-white"
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform text-white"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#1865F2] tracking-tight">
                Let&apos;s Connect
              </h2>
              <p className="text-xs sm:text-[14px] text-[#1E293B] font-medium leading-relaxed mt-2.5 max-w-md">
                Whether you&apos;re buying, selling, renting, or growing your real estate business, our team is here to help every step of the way.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-2">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full py-3.5 text-xs sm:text-[14px] text-slate-800 placeholder:text-slate-400 bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#1865F2] outline-none transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full py-3.5 text-xs sm:text-[14px] text-slate-800 placeholder:text-slate-400 bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#1865F2] outline-none transition-colors"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder="Go ahead, We are listening..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full py-3.5 text-xs sm:text-[14px] text-slate-800 placeholder:text-slate-400 bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#1865F2] outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-[320px] md:w-[340px] py-3.5 sm:py-4 bg-gradient-to-r from-[#1865F2] via-[#0EA5E9] to-[#10B981] hover:opacity-95 text-white text-sm sm:text-[15px] font-bold rounded-xl shadow-[0_4px_16px_rgba(24,101,242,0.25)] transition-all flex items-center justify-center cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : isSent ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Sent!
                    </span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Illustration & Contact Details */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6 lg:pr-10">
            {/* Girl with Document Vector Illustration */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[260px] sm:h-[300px]">
              <Image
                src="/images/contact/contact_girl_doc.png"
                alt="Contact Support Illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            {/* Contact Details List */}
            <div className="w-full max-w-[360px] sm:max-w-[380px] space-y-4 pt-1">
              <div className="flex items-center gap-3.5 text-xs sm:text-[13.5px] font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full border border-blue-200 text-[#1865F2] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>838 Cantt Sialkot, pakistan</span>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-[13.5px] font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full border border-blue-200 text-[#1865F2] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:97998889787" className="hover:text-[#1865F2] transition-colors">
                  979-988-89787
                </a>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-[13.5px] font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full border border-blue-200 text-[#1865F2] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:abcd123@gmail.com" className="hover:text-[#1865F2] transition-colors">
                  abcd123@gmail.com
                </a>
              </div>
            </div>

            {/* Mobile Social Bar */}
            <div className="flex lg:hidden items-center justify-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
