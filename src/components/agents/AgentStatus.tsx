"use client";

import Link from "next/link";
import { useAgents } from "@/context/AgentsProvider";
import * as React from "react";

export default function AgentStatus() {
  const { agents } = useAgents();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const active = mounted ? agents.filter(a => a.online).length : 0;
  const connected = mounted && active > 0;
  return (
    <div className="rounded-card border border-line/60 bg-white p-3 shadow-elevation-sm dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 pr-1">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-success" : "bg-neutral-400"}`} />
          <span className="text-xs font-medium text-ink/90" suppressHydrationWarning>{connected ? "Connected" : "Offline"}</span>
        </div>
        <span className="rounded-full bg-primary/5 px-2 py-1 text-[12px] text-primary" suppressHydrationWarning>{mounted ? `${active} active` : "—"}</span>
        <span className="rounded-full bg-primary/5 px-2 py-1 text-[12px] text-primary">128 runs</span>
        <span className="rounded-full bg-primary/5 px-2 py-1 text-[12px] text-primary">1.4s latency</span>
      </div>
      <div className="mt-2">
        <Link href="/agents/overview" className="inline-flex items-center gap-1 text-[12px] text-primary hover:underline">
          View agent analytics <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}



