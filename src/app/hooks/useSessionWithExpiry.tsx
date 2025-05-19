import { useCallback } from "react";

type ProductSession = {
  cep: string;
  selectedSize: string | null;
  selectedColor: string | null;
  cepResult: {
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
  } | null;
};

export default function useSessionWithExpiry() {
  const set = useCallback((key: string, value: ProductSession, ttlMinutes: number) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttlMinutes * 60 * 1000,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }, []);

  const get = useCallback((key: string): ProductSession | null => {
    if (typeof window === "undefined") return null;
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;
    try {
      const item = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }
      return item.value as ProductSession;
    } catch {
      return null;
    }
  }, []);

  return { set, get };
}