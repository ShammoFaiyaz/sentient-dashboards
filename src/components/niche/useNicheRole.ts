"use client";

import { useEffect, useState } from "react";

export function useNicheRole(slug: string, fallback = "Role") {
  const storageKey = `niche.role.${slug}`;
  const [role, setRole] = useState<string>(fallback);

  useEffect(() => {
    if (!slug) return;
    const read = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        setRole(saved || fallback);
      } catch {
        setRole(fallback);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) read();
    };
    const onCustom = (e: Event) => {
      // always re-read when any niche role changes; inexpensive
      read();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("niche-role-changed", onCustom as any);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("niche-role-changed", onCustom as any);
    };
  }, [slug, storageKey, fallback]);

  return role;
}


