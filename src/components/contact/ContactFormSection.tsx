"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 900);
  };

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-jakarta">
      <div className="relative bg-white rounded-[28px] border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-12 overflow-hidden">
        
        {/* Right-edge Attached Vertical Social Strip (Figma 1:1) */}
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
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition-transform text-white"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1865F2] tracking-tight">
                Let&apos;s Connect
              </h2>
              <p className="text-xs sm:text-[13.5px] text-[#475569] font-medium leading-relaxed mt-2 max-w-md">
                Whether you buy, sell, rent, letting, or getting your walk on the business, our team is always ready to hear and guide you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3.5 rounded-lg border-b-2 border-slate-200 bg-slate-50/70 text-xs sm:text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3.5 rounded-lg border-b-2 border-slate-200 bg-slate-50/70 text-xs sm:text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              {/* Phone Field */}
              <div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-lg border-b-2 border-slate-200 bg-slate-50/70 text-xs sm:text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  rows={4}
                  placeholder="Go ahead, We are listening..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-lg border-b-2 border-slate-200 bg-slate-50/70 text-xs sm:text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1865F2] focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-[200px] py-3.5 bg-gradient-to-r from-[#1865F2] to-[#10B981] hover:opacity-95 text-white text-xs sm:text-[13.5px] font-bold rounded-xl shadow-[0_4px_14px_rgba(24,101,242,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : isSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Illustration & Contact Details */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6 lg:pr-8">
            {/* Girl with Document Vector */}
            <div className="relative w-full max-w-[380px] h-[260px] sm:h-[300px]">
              <Image
                src="/images/contact/contact_girl_doc.png"
                alt="Contact Support Illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 380px"
                priority
              />
            </div>

            {/* Contact Details List */}
            <div className="w-full max-w-[380px] space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>835 Cantt Sialkot, pakistan</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:97998889787" className="hover:text-[#1865F2] transition-colors">
                  979-988-89787
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1865F2] flex items-center justify-center shrink-0 shadow-2xs">
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
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1865F2] text-white flex items-center justify-center shadow-xs"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
