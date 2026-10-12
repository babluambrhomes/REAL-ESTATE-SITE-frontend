"use client";

import { useState } from "react";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactMapBanner } from "@/components/contact/ContactMapBanner";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";

export default function ContactPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="min-h-screen bg-white relative flex flex-col font-jakarta overflow-x-clip">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top Announcement Bar */}
        {showAnnouncement && (
          <TopAnnouncementBar
            isFixed={true}
            onClose={() => setShowAnnouncement(false)}
          />
        )}

        {/* 2. Global Unified Search Header */}
        <SearchHeader hasAnnouncement={showAnnouncement} />

        {/* Main Page Sections */}
        <main className="flex-1 pb-12">
          {/* 3. Hero Banner with Floating Avatars */}
          <ContactHero />

          {/* 4. Let's Connect Form & Illustration Section */}
          <ContactFormSection />

          {/* 5. Interactive Satellite Map with Location Pin */}
          <ContactMapBanner />

          {/* 6. FAQs & Vector Illustration Section */}
          <ContactFaqSection />
          
        </main>
      </div>
    </div>
  );
}
