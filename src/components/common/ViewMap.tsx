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
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [cardHeight, setCardHeight] = useState(350);

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

  // Measure card height on mount and when content changes
  useEffect(() => {
    if (selectedProperty) {
      // Small delay to let card render
      const timer = setTimeout(() => {
        const cardEl = document.querySelector(".property-card-measure");
        if (cardEl) {
          setCardHeight(cardEl.clientHeight);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedProperty]);

  const createCustomMarker = (property: Property) => {
    const markerEl = document.createElement("div");

    markerEl.className = "custom-marker";
    markerEl.style.cssText = `
      width: 50px;
      height: 50px;
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
      width: 50px;
      height: 50px;
      object-fit: contain;
      transition: all 0.3s ease;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
    `;

    markerEl.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.15) translateY(-5px)";
      img.style.filter = "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))";
    });

    markerEl.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) translateY(0)";
      img.style.filter = "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))";
    });

    markerEl.addEventListener("click", (e) => {
      e.stopPropagation();
      
      if (mapRef.current && property.coordinates) {
        const point = mapRef.current.project(property.coordinates);
        setMarkerPosition({
          x: point.x,
          y: point.y,
        });
      }
      
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

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    map.on("load", () => {
      renderMarkers();
    });

    // Update marker position when map moves
    map.on("move", () => {
      if (selectedProperty && selectedProperty.coordinates) {
        const point = map.project(selectedProperty.coordinates);
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

  // Get card position with proper bounds checking
  const getCardStyle = () => {
    if (!markerPosition) return {};

    const cardWidth = 220;
    const actualCardHeight = cardHeight + 30; // Add some padding

    const container = mapContainerRef.current;
    if (!container) return {};

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    
    // Calculate initial position - ABOVE the marker
    let left = markerPosition.x - cardWidth / 2;
    let top = markerPosition.y - actualCardHeight - 30;

    // Clamp horizontally to container bounds
    const padding = 10;
    if (left < padding) {
      left = padding;
    }
    if (left + cardWidth > containerWidth - padding) {
      left = containerWidth - cardWidth - padding;
    }

    // Check if card fits above
    const fitsAbove = top >= padding;
    
    // Check if card fits below
    const fitsBelow = markerPosition.y + 30 + actualCardHeight <= containerHeight - padding;

    if (fitsAbove) {
      // Show ABOVE marker
      top = markerPosition.y - actualCardHeight - 30;
    } else if (fitsBelow) {
      // Show BELOW marker
      top = markerPosition.y + 30;
    } else {
      // If neither fits, show above with scroll (clamp to top)
      top = padding;
      // Or show below with clamp to bottom
      // top = containerHeight - actualCardHeight - padding;
    }

    // Final safety clamp
    if (top < padding) {
      top = padding;
    }
    if (top + actualCardHeight > containerHeight - padding) {
      top = containerHeight - actualCardHeight - padding;
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
            className="z-30 w-[220px] shadow-lg rounded-xl property-card-measure"
            style={getCardStyle()}
          >
            <div className="relative bg-white rounded-xl">
              <button
                onClick={() => {
                  setSelectedProperty(null);
                  setMarkerPosition(null);
                }}
                type="button"
                aria-label="Close"
                className="absolute top-1 right-1 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
              >
                <X className="h-3.5 w-3.5 text-gray-600" />
              </button>
              <PropertyCard {...selectedProperty} layout="mapcard" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}