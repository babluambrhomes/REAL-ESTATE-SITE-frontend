"use client";

import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";

interface PostPropertyTopAnnouncementProps {
  onClose?: () => void;
  isFixed?: boolean;
}

export const PostPropertyTopAnnouncement = ({ onClose, isFixed = true }: PostPropertyTopAnnouncementProps) => {
  return <TopAnnouncementBar onClose={onClose} isFixed={isFixed} />;
};

