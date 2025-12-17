"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";

function Kpi({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md bg-white border border-line/60"
      style={{
        background:
          colorHex === "#004AAD"
            ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#008C74"
            ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#6D28D9"
            ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#EF4444"
            ? "linear-gradient(180deg, rgba(239,68,68,0.12) 0%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function LogisticsWarehouseOpsPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const roleLabel = useNicheRole("logistics-dashboard", "Warehouse Supervisor");
  const featured = agents.filter((a) => config.agentIds.includes(a.id)).slice(0, 3);

  const sections = [
    { title: "Inbound Schedule", description: "Trucks due to arrive and their appointment windows." },
    { title: "Outbound Schedule", description: "Shipments leaving the dock and cut-off adherence." },
    { title: "Dock Utilization", description: "How busy each dock door is over the day." },
    { title: "Put-away Queues", description: "Loads waiting to be put away to storage locations." },
    { title: "Picking Queues", description: "Wave and batch picking queues by priority." },
    { title: "Packing & Loading", description: "Status of orders being packed and loaded." },
    { title: "Labor Allocation", description: "Which tasks current staff are assigned to." },
    { title: "Task Backlog", description: "Outstanding tasks needing assignment." },
    { title: "Cycle Count Plan", description: "Upcoming cycle counts by zone." },
    { title: "Slotting Opportunities", description: "Candidates for slot optimization to reduce travel time." },
    { title: "Equipment Status", description: "MHE and scanners that are in use, idle, or down." },
    { title: "Safety Board", description: "Open safety items and housekeeping checks." },
    { title: "Shift Handover Notes", description: "Information passed between shifts." },
    { title: "Wave Progress", description: "Percentage complete for each active picking wave." },
    { title: "Carrier Staging", description: "Shipments staged and ready for carrier pick-up." },
    { title: "Exception Workflows", description: "Damages, shorts, and mispicks being resolved." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Warehouse Flow Agent — orchestrates inbound, storage, picking, and outbound tasks across the DC.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Lines Picked / Hr" value="1,920" hint="all shifts" colorHex="#004AAD" />
        <Kpi label="Order Fill Rate" value="98.7%" hint="yesterday" colorHex="#008C74" />
        <Kpi label="Dock-to-Stock Time" value="2.4h" hint="avg receiving" colorHex="#6D28D9" />
        <Kpi label="Open Exceptions" value="29" hint="warehouse incidents" colorHex="#EF4444" />
      </div>

      {/* Dummy sections (16) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
            <div className="text-sm font-semibold text-ink mb-1">{s.title}</div>
            <p className="text-xs text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}








