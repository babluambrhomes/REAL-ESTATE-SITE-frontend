"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MapPin, Maximize, X } from "lucide-react";

type VideoCardProps = {
  image: string;
  title: string;
  location: string;
  duration?: string;
  videoId?: string;
};

export const VideoCard = ({
  image,
  title,
  location,
  videoId,
}: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group overflow-hidden rounded-b-2xl bg-white ">
        <div className="relative h-96 w-full overflow-hidden rounded-t-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />

          <button
            type="button"
            aria-label="Play video"
            onClick={() => videoId && setIsOpen(true)}
            className="absolute left-1/2 cursor-pointer top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full  shadow-lg transition-transform duration-200 group-hover:scale-110"
          >
            <Image
              src="/play_button.png"
              alt="play button"
              width={50}
              height={50}
              className="object-contain "
            />
          </button>

          <div className="absolute flex justify-between items-end bottom-0 left-0 w-full ">
            <div className="p-4">
              <h3 className=" text-base font-normal line-clamp-1 text-white">
                {title}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] line-clamp-1 text-white">
                <MapPin className="h-4 w-4 shrink-0 text-[#C99732]" />
                {location}
              </p>
            </div>
            <button
              type="button"
              aria-label="Watch on big screen"
              onClick={() => videoId && setIsOpen(true)}
              className=" flex h-8 w-8 items-center cursor-pointer justify-center  text-white  transition-transform hover:scale-110"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {isOpen &&
        videoId &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition-transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
