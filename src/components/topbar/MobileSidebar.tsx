"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { createPortal } from "react-dom";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-line/60 bg-white p-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portal the drawer to body to avoid stacking/overflow issues */}
      {mounted &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              onClick={() => setOpen(false)}
              aria-hidden={!open}
              className={[
                "fixed inset-0 z-[1000] bg-black/40 backdrop-blur-[3px] transition-opacity lg:hidden",
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
              ].join(" ")}
            />

            {/* Panel */}
            <aside
              className={[
                "fixed inset-y-0 right-0 z-[1010] h-full w-[min(92vw,360px)] transform-gpu bg-white transition-transform duration-200 ease-out lg:hidden",
                open ? "translate-x-0" : "translate-x-full",
              ].join(" ")}
              role="dialog"
              aria-label="Navigation drawer"
            >
              <Sidebar mobile onClose={() => setOpen(false)} />
            </aside>
          </>,
          document.body
        )}
    </>
  );
}


