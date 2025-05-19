import { useCallback } from "react";

export default function useSessionWithExpiry() {
  const set = useCallback((key: string, value: any, ttlMinutes: number) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttlMinutes * 60 * 1000,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }, []);

  const get = useCallback((key: string) => {
    if (typeof window === "undefined") return null;
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;
    try {
      const item = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch {
      return null;
    }
  }, []);

  return { set, get };
}