"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

interface PropertyGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title?: string;
  initialIndex?: number;
}

const DEFAULT_GALLERY_FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

export const PropertyGalleryModal = ({
  isOpen,
  onClose,
  images = [],
  title = "Property Gallery",
  initialIndex = 0,
}: PropertyGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setFailedImages({});
    }
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0] || DEFAULT_GALLERY_FALLBACK;
  const displayImage = failedImages[currentIndex] ? DEFAULT_GALLERY_FALLBACK : currentImage;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-opacity duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 text-white z-10">
        <div>
          <h3 className="text-base sm:text-lg font-bold truncate max-w-[280px] sm:max-w-md">
            {title}
          </h3>
          <p className="text-xs text-white/60">
            Photo {currentIndex + 1} of {images.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer backdrop-blur-xs"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Main Image */}
        <div className="relative w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center">
          <Image
            src={displayImage}
            alt={`${title} - Photo ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
            unoptimized
            onError={() => {
              setFailedImages((prev) => ({ ...prev, [currentIndex]: true }));
            }}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer backdrop-blur-xs"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="px-4 sm:px-8 py-3 bg-black/60 border-t border-white/10 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max mx-auto">
            {images.map((img, idx) => {
              const thumbSrc = failedImages[idx] ? DEFAULT_GALLERY_FALLBACK : img;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? "border-[#1865F2] scale-105 shadow-md"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumbSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [idx]: true }));
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
