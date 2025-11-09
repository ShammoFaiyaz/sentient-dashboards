"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const NewsCenterCtx = createContext<Ctx | null>(null);

export function NewsCenterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  // Keyboard shortcut disabled per request

  return <NewsCenterCtx.Provider value={{ isOpen, setOpen }}>{children}</NewsCenterCtx.Provider>;
}

export function useNewsCenter() {
  const ctx = useContext(NewsCenterCtx);
  if (!ctx) throw new Error("useNewsCenter must be inside provider");
  return ctx;
}


