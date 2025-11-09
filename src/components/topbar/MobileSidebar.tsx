"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-5 z-40 inline-flex items-center justify-center rounded-full border border-line/60 bg-white p-2 shadow-[0_12px_28px_rgba(0,0,0,0.18)] lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[90] bg-black/40 backdrop-blur-[3px] transition-opacity lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Panel */}
      <aside
        className={[
          "fixed left-0 top-0 z-[95] h-full w-[min(92vw,360px)] bg-white shadow-[10px_0_30px_-12px_rgba(0,0,0,0.28)] transition-transform duration-200 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Navigation drawer"
      >
        <div className="flex items-center justify-between border-b border-line/60 px-3 py-2">
          <span className="text-sm font-medium">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar mobile />
      </aside>
    </>
  );
}


