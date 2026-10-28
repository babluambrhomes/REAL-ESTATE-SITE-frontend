"use client";

import { useState, useEffect, useCallback } from "react";
import type { Property } from "@/types";
import { apiClient } from "@/lib/axios";

const STORAGE_KEY = "roofin_saved_properties";
const DATA_KEY = "roofin_saved_properties_data";
const EVENT_NAME = "roofin_wishlist_change";

export function getSavedPropertyIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSavedPropertiesData(): Record<string, Property> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function toggleSavedProperty(
  id: string | number,
  propertyData?: Property
): boolean {
  if (typeof window === "undefined") return false;
  try {
    const strId = String(id);
    const current = getSavedPropertyIds();
    let updated: string[];
    let isNowSaved = false;

    const dataMap = getSavedPropertiesData();

    if (current.includes(strId)) {
      updated = current.filter((item) => item !== strId);
      isNowSaved = false;
      delete dataMap[strId];
    } else {
      updated = [...current, strId];
      isNowSaved = true;
      if (propertyData) {
        dataMap[strId] = {
          ...propertyData,
          id: strId,
        };
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(DATA_KEY, JSON.stringify(dataMap));
    window.dispatchEvent(new Event(EVENT_NAME));

    // Sync live with backend wishlist endpoint
    apiClient.patch(`/properties/${strId}/wishlist`).catch(() => {});

    return isNowSaved;
  } catch {
    return false;
  }
}

export function clearAllWishlist(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DATA_KEY);
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // ignore
  }
}

export function useWishlist() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setSavedIds(getSavedPropertyIds());
  }, []);

  useEffect(() => {
    refresh();
    const handleStorage = () => refresh();
    window.addEventListener(EVENT_NAME, handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  const toggle = useCallback(
    (id: string | number, propertyData?: Property) => {
      return toggleSavedProperty(id, propertyData);
    },
    []
  );

  const clearAll = useCallback(() => {
    clearAllWishlist();
  }, []);

  const isSaved = useCallback(
    (id: string | number) => {
      return savedIds.includes(String(id));
    },
    [savedIds]
  );

  return {
    savedIds,
    count: savedIds.length,
    toggle,
    clearAll,
    isSaved,
  };
}

