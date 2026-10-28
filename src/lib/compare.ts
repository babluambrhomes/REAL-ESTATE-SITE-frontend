"use client";

import { useState, useEffect, useCallback } from "react";
import type { Property } from "@/types";
import toast from "react-hot-toast";

const STORAGE_KEY = "roofin_compared_properties";
const DATA_KEY = "roofin_compared_properties_data";
const EVENT_NAME = "roofin_compare_change";
const MAX_COMPARE_LIMIT = 3;

export function getComparedPropertyIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getComparedPropertiesData(): Record<string, Property> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function toggleComparedProperty(
  property: Property
): { isAdded: boolean; success: boolean } {
  if (typeof window === "undefined") return { isAdded: false, success: false };
  try {
    const strId = String(property.id || property.title);
    const current = getComparedPropertyIds();
    const dataMap = getComparedPropertiesData();

    if (current.includes(strId)) {
      // Remove
      const updated = current.filter((item) => item !== strId);
      delete dataMap[strId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(DATA_KEY, JSON.stringify(dataMap));
      window.dispatchEvent(new Event(EVENT_NAME));
      toast.success("Removed from comparison list");
      return { isAdded: false, success: true };
    }

    // Add - check max limit
    if (current.length >= MAX_COMPARE_LIMIT) {
      toast.error(`You can compare up to ${MAX_COMPARE_LIMIT} properties at a time.`);
      return { isAdded: false, success: false };
    }

    const updated = [...current, strId];
    dataMap[strId] = {
      ...property,
      id: strId,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(DATA_KEY, JSON.stringify(dataMap));
    window.dispatchEvent(new Event(EVENT_NAME));
    toast.success(`Added to compare (${updated.length}/${MAX_COMPARE_LIMIT})`);
    return { isAdded: true, success: true };
  } catch {
    return { isAdded: false, success: false };
  }
}

export function removeComparedProperty(id: string | number): void {
  if (typeof window === "undefined") return;
  try {
    const strId = String(id);
    const current = getComparedPropertyIds();
    const dataMap = getComparedPropertiesData();

    const updated = current.filter((item) => item !== strId);
    delete dataMap[strId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(DATA_KEY, JSON.stringify(dataMap));
    window.dispatchEvent(new Event(EVENT_NAME));
    toast.success("Property removed from comparison");
  } catch {}
}

export function clearAllCompared(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DATA_KEY);
    window.dispatchEvent(new Event(EVENT_NAME));
    toast.success("Comparison list cleared");
  } catch {}
}

export function useCompare() {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [comparedList, setComparedList] = useState<Property[]>([]);

  const sync = useCallback(() => {
    const ids = getComparedPropertyIds();
    const dataMap = getComparedPropertiesData();
    const list: Property[] = [];

    ids.forEach((id) => {
      if (dataMap[id]) {
        list.push(dataMap[id]);
      }
    });

    setComparedIds(ids);
    setComparedList(list);
  }, []);

  useEffect(() => {
    sync();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === DATA_KEY) {
        sync();
      }
    };

    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [sync]);

  const isCompared = useCallback(
    (id?: string | number, title?: string) => {
      const key = String(id || title);
      return comparedIds.includes(key);
    },
    [comparedIds]
  );

  const toggle = useCallback((property: Property) => {
    return toggleComparedProperty(property);
  }, []);

  const remove = useCallback((id: string | number) => {
    removeComparedProperty(id);
  }, []);

  const clearAll = useCallback(() => {
    clearAllCompared();
  }, []);

  return {
    comparedIds,
    comparedList,
    count: comparedIds.length,
    isCompared,
    toggle,
    remove,
    clearAll,
    maxLimit: MAX_COMPARE_LIMIT,
  };
}
