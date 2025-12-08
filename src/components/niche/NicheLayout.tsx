"use client";

import { AgentsProvider } from "@/context/AgentsProvider";
import type { NicheConfig } from "@/niches/config";
import NicheSidebar from "./NicheSidebar";

export default function NicheLayout({
  config,
  children,
}: {
  config: NicheConfig;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <NicheSidebar config={config} />
      <main className="relative flex-1 pt-16 pb-16">
        <div className="fixed right-4 top-5 z-40">
          <div className="flex items-center gap-2 rounded-full border border-line/60 bg-white px-2 py-1 shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            <span className="text-xs text-muted">{config.title}</span>
          </div>
        </div>
        <AgentsProvider storageKey={config.storageKey}>{children}</AgentsProvider>
      </main>
    </div>
  );
}


