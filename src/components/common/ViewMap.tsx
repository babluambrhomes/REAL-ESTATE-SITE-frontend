"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Maximize, Minimize, X } from "lucide-react";
import type { Property, MapComponentProps } from "@/types";
import { PropertyCard } from "@/components/card/PropertyCard";

export default function ViewMap({
  height = "250px",
  properties = [],
  navPosition = "bottom-right",
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const selectedPropertyRef = useRef<Property | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [cardHeight, setCardHeight] = useState(170);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current?.resize();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProperty) {
          selectedPropertyRef.current = null;
          setSelectedProperty(null);
          setMarkerPosition(null);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, selectedProperty]);

  // Measure container size so getCardStyle avoids reading refs during render
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const update = () =>
      setContainerSize({ width: el.clientWidth, height: el.clientHeight });

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Measure card height on mount and when content changes
  useEffect(() => {
    if (selectedProperty) {
      // Small delay to let card render
      const timer = setTimeout(() => {
        const cardEl = document.querySelector(".property-card-measure");
        if (cardEl) {
          setCardHeight(cardEl.clientHeight);
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [selectedProperty]);

  const createCustomMarker = (property: Property) => {
    const markerEl = document.createElement("div");

    markerEl.className = "custom-marker";
    markerEl.style.cssText = `
      width: 36px;
      height: 36px;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const img = document.createElement("img");
    img.src = "/icon/map_icon.png";
    img.alt = property.title;
    img.style.cssText = `
      width: 36px;
      height: 36px;
      object-fit: contain;
      transition: all 0.25s ease;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.22));
    `;

    markerEl.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.1) translateY(-3px)";
      img.style.filter = "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.32))";
    });

    markerEl.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) translateY(0)";
      img.style.filter = "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.22))";
    });

    markerEl.addEventListener("click", (e) => {
      e.stopPropagation();
      
      if (mapRef.current && property.coordinates) {
        const point = mapRef.current.project(property.coordinates);
        setMarkerPosition({
          x: point.x,
          y: point.y,
        });

        // Ensure marker has room below so the card fits smoothly without clipping
        const containerHeight = mapContainerRef.current?.clientHeight || 0;
        const estimatedHeight = 145;
        if (containerHeight && point.y + estimatedHeight + 15 > containerHeight) {
          const dy = point.y + estimatedHeight + 25 - containerHeight;
          mapRef.current.panBy([0, dy], { duration: 300 });
        }
      }
      
      selectedPropertyRef.current = property;
      setSelectedProperty(property);
    });

    markerEl.appendChild(img);
    return markerEl;
  };

  const renderMarkers = () => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    properties.forEach((property) => {
      if (!property.coordinates) return;

      const markerElement = createCustomMarker(property);
      const marker = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom",
      })
        .setLngLat(property.coordinates)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialCenter = properties[0]?.coordinates || [77.209, 28.6139];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: initialCenter,
      zoom: 12,
    });

    // Previous navigation control position:
    // map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.NavigationControl(), navPosition || "bottom-right");
    mapRef.current = map;

    map.on("load", () => {
      renderMarkers();
    });

    // Dismiss card when user clicks on empty map
    map.on("click", () => {
      selectedPropertyRef.current = null;
      setSelectedProperty(null);
      setMarkerPosition(null);
    });

    // Update marker position live when map moves, zooms, or pans
    map.on("move", () => {
      const current = selectedPropertyRef.current;
      if (current && current.coordinates && mapRef.current) {
        const point = mapRef.current.project(current.coordinates);
        setMarkerPosition({
          x: point.x,
          y: point.y,
        });
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      renderMarkers();
    }
  }, [properties]);

  // Position card BELOW the marker with bounds checking
  const getCardStyle = () => {
    if (!markerPosition) return {};

    const cardWidth = 165;
    const padding = 8;

    const containerHeight = containerSize.height;
    const containerWidth = containerSize.width;
    if (!containerWidth || !containerHeight) return {};
    
    // Horizontally center beneath marker
    let left = markerPosition.x - cardWidth / 2;

    // Clamp horizontally to container bounds
    if (left < padding) {
      left = padding;
    }
    if (left + cardWidth > containerWidth - padding) {
      left = containerWidth - cardWidth - padding;
    }

    // Position directly BELOW the marker (anchor is bottom, so markerPosition.y is the tip of pin)
    let top = markerPosition.y + 4;

    // Safety clamp vertically so it doesn't get pushed off the bottom
    if (top + cardHeight > containerHeight - padding) {
      top = Math.max(padding, containerHeight - cardHeight - padding);
    }
    if (top < padding) {
      top = padding;
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
      position: "absolute" as const,
      maxHeight: `${containerHeight - padding * 2}px`,
      overflowY: "auto" as const,
    };
  };

  return (
    <div
      style={isFullscreen ? { height: "100vh" } : { height }}
      className={
        isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen bg-white rounded-none"
          : "relative w-full rounded-xl overflow-hidden"
      }
    >
      <button
        onClick={toggleFullscreen}
        type="button"
        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        className="absolute top-3 left-3 z-10 p-1.5 bg-white/50 text-gray-700 rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center justify-center cursor-pointer"
      >
        {isFullscreen ? (
          <Minimize className="w-4 h-4" />
        ) : (
          <Maximize className="w-4 h-4" />
        )}
      </button>

      <div ref={mapContainerRef} className="w-full h-full relative">
        {/* Card positioned relative to marker with bounds checking */}
        {selectedProperty && markerPosition && (
          <div
            className="z-30 w-[165px] shadow-lg rounded-xl property-card-measure transition-all duration-150"
            style={getCardStyle()}
          >
            <div className="relative bg-white rounded-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectedPropertyRef.current = null;
                  setSelectedProperty(null);
                  setMarkerPosition(null);
                }}
                type="button"
                aria-label="Close"
                className="absolute top-1 right-1 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white/95 backdrop-blur-xs shadow-sm hover:bg-gray-100 transition-all text-gray-600 hover:text-black cursor-pointer"
              >
                <X className="h-2.5 w-2.5" />
              </button>
              <PropertyCard {...selectedProperty} layout="mapcard" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}